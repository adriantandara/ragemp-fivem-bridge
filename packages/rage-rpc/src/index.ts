import * as util from "./util.js";

const ERR_NOT_FOUND = "PROCEDURE_NOT_FOUND";
const MAX_DATA_SIZE = 32000;
const MAX_PARTIAL_CHUNKS = 1024;
const PARTIAL_TTL_MS = 10000;
const PENDING_TTL_MS = 60000;

const IDENTIFIER = "__rpc:id";
const PROCESS_EVENT = "__rpc:process";
const PROCESS_EVENT_PARTIAL = "__rpc:processPartial";
const BROWSER_REGISTER = "__rpc:browserRegister";
const BROWSER_UNREGISTER = "__rpc:browserUnregister";
const TRIGGER_EVENT = "__rpc:triggerEvent";
const TRIGGER_EVENT_BROWSERS = "__rpc:triggerEventBrowsers";

let initialized = false;
let environment: string | null = null;

function getMp(): any {
  return (globalThis as any).mp;
}

function rpcNameAllowed(name: string): boolean {
  if (typeof name === "string" && name.indexOf("__rpc:") === 0) return true;
  const list = (globalThis as any).mp?.config?.security?.rpcAllowlist;
  if (!list) return true;
  return list.indexOf(name) !== -1;
}

function addPending(id: string, entry: { resolve: (v: any) => void; timer?: any; player?: any }): void {
  const g = globalThis as any;
  entry.timer = setTimeout(() => {
    if (g.__rpcPending[id] === entry) {
      delete g.__rpcPending[id];
      entry.resolve(util.promiseReject("RPC_TIMEOUT"));
    }
  }, PENDING_TTL_MS);
  g.__rpcPending[id] = entry;
}

function ensureInitialized(): void {
  if (initialized) return;

  environment = util.getEnvironment();
  if (!environment) throw new Error("rage-rpc: Unknown RAGE environment");

  const g = globalThis as any;

  if (g[PROCESS_EVENT]) {
    initialized = true;
    return;
  }

  const mp = getMp();

  g.__rpcListeners = g.__rpcListeners || {};
  g.__rpcPending = g.__rpcPending || {};
  g.__rpcEvListeners = g.__rpcEvListeners || {};
  g.__rpcPartialData = g.__rpcPartialData || {};

  g[PROCESS_EVENT_PARTIAL] = (player: any, id: any, index: any, size: any, rawData: any) => {
    let owner: any = player;
    if (environment !== "server") {
      rawData = size;
      size = index;
      index = id;
      id = player;
      owner = null;
    }

    size = Number(size);
    index = Number(index);
    if (!Number.isInteger(size) || size <= 0 || size > MAX_PARTIAL_CHUNKS) return;
    if (!Number.isInteger(index) || index < 0 || index >= size) return;
    if (typeof rawData !== "string" || rawData.length > MAX_DATA_SIZE) return;

    const key = owner != null ? `${owner}:${id}` : String(id);
    let entry = g.__rpcPartialData[key];
    if (!entry) {
      entry = { chunks: new Array(size), received: 0, size, timer: null };
      entry.timer = setTimeout(() => {
        delete g.__rpcPartialData[key];
      }, PARTIAL_TTL_MS);
      g.__rpcPartialData[key] = entry;
    }
    if (entry.size !== size || entry.chunks[index] !== undefined) return;

    entry.chunks[index] = rawData;
    entry.received++;

    if (entry.received >= entry.size) {
      if (entry.timer) clearTimeout(entry.timer);
      delete g.__rpcPartialData[key];
      const full = entry.chunks.join("");
      if (environment === "server") g[PROCESS_EVENT](player, full);
      else g[PROCESS_EVENT](full);
    }
  };

  g[PROCESS_EVENT] = (player: any, rawData: any) => {
    if (environment !== "server") rawData = player;

    let data: any;
    try { data = util.parseData(rawData); } catch (e) { return; }

    if (data.req) {
      const info: { id: any; environment: any; player?: any; browser?: any } = { id: data.id, environment: data.fenv || data.env };
      if (environment === "server") info.player = player;

      const part = { ret: 1, id: data.id, env: environment };
      let ret: ((ev: any) => void) | null = null;

      switch (environment) {
        case "server":
          ret = (ev: any) => info.player.call(PROCESS_EVENT, util.stringifyData(ev));
          break;
        case "client":
          if (data.env === "server") {
            ret = (ev: any) => getMp().events.callRemote(PROCESS_EVENT, util.stringifyData(ev));
          } else if (data.env === "cef") {
            const browser = data.b && g.__rpcBrowsers && g.__rpcBrowsers[data.b];
            info.browser = browser;
            ret = (ev: any) => browser && util.isBrowserValid(browser) && passEventToBrowser(browser, ev, true);
          }
          break;
        case "cef":
          ret = (ev: any) => getMp().trigger(PROCESS_EVENT, util.stringifyData(ev));
          break;
      }

      if (ret) {
        let promise: Promise<any>;
        if (environment === "server" && !rpcNameAllowed(data.name)) {
          util.log(`Blocked RPC "${data.name}" (not in ragemp_rpc_allowlist)`, "warn");
          promise = util.promiseReject(`${ERR_NOT_FOUND} (${data.name})`);
        } else {
          promise = callProcedure(data.name, data.args, info);
        }
        if (!data.noRet) {
          promise
            .then((res: any) => ret!({ ...part, res }))
            .catch((err: any) => ret!({ ...part, err: err == null ? null : err }));
        } else {
          promise.catch(() => {});
        }
      }
    } else if (data.ret) {
      const info = g.__rpcPending[data.id];
      if (environment === "server" && info && info.player !== player) return;
      if (info) {
        if (info.timer) clearTimeout(info.timer);
        info.resolve(
          Object.prototype.hasOwnProperty.call(data, "err")
            ? Promise.reject(data.err)
            : Promise.resolve(data.res)
        );
        delete g.__rpcPending[data.id];
      }
    }
  };

  if (environment === "cef") {
    if (typeof g[IDENTIFIER] === "undefined") {
      g[IDENTIFIER] = new Promise((resolve: (v: string) => void) => {
        if (typeof window !== "undefined" && window.name) resolve(window.name);
        else g[`${IDENTIFIER}:resolve`] = resolve;
      });
    }
  } else {
    mp.events.add(PROCESS_EVENT, g[PROCESS_EVENT]);
    mp.events.add(PROCESS_EVENT_PARTIAL, g[PROCESS_EVENT_PARTIAL]);

    if (environment === "client") {
      register("__rpc:callServer", ([name, args, noRet]: [string, any, any], info: any) => _callServer(name, args, { fenv: info.environment, noRet }));
      register("__rpc:callBrowsers", ([name, args, noRet]: [string, any, any], info: any) => _callBrowsers(null, name, args, { fenv: info.environment, noRet }));

      g.__rpcBrowsers = {};
      const initBrowser = (browser: any) => {
        const id = util.generateId();
        Object.keys(g.__rpcBrowsers).forEach((key: string) => {
          const b = g.__rpcBrowsers[key];
          if (!b || !util.isBrowserValid(b) || b === browser) delete g.__rpcBrowsers[key];
        });
        g.__rpcBrowsers[id] = browser;
        browser.execute(`
          window.name = '${id}';
          if(typeof window['${IDENTIFIER}'] === 'undefined'){
            window['${IDENTIFIER}'] = Promise.resolve(window.name);
          }else if(window['${IDENTIFIER}:resolve']){
            window['${IDENTIFIER}:resolve'](window.name);
          }
        `);
      };
      if (mp.browsers && typeof mp.browsers.forEach === "function") mp.browsers.forEach(initBrowser);
      mp.events.add("browserCreated", initBrowser);

      g.__rpcBrowserProcedures = {};
      mp.events.add(BROWSER_REGISTER, (data: string) => {
        const [browserId, name] = JSON.parse(data);
        g.__rpcBrowserProcedures[name] = browserId;
      });
      mp.events.add(BROWSER_UNREGISTER, (data: string) => {
        const [browserId, name] = JSON.parse(data);
        if (g.__rpcBrowserProcedures[name] === browserId) delete g.__rpcBrowserProcedures[name];
      });

      register(TRIGGER_EVENT_BROWSERS, ([name, args]: [string, any], info: any) => {
        Object.keys(g.__rpcBrowsers).forEach((key: string) => {
          const browser = g.__rpcBrowsers[key];
          if (!browser || !util.isBrowserValid(browser)) {
            delete g.__rpcBrowsers[key];
          } else {
            void _callBrowser(browser, TRIGGER_EVENT, [name, args], { fenv: info.environment, noRet: 1 });
          }
        });
      });
    }
  }

  register(TRIGGER_EVENT, ([name, args]: [string, any], info: any) => callEvent(name, args, info));

  initialized = true;
}

function passEventToBrowser(browser: any, data: any, ignoreNotFound: boolean): void {
  const raw = util.stringifyData(data);
  const fallback = ignoreNotFound ? "" : `mp.trigger("${PROCESS_EVENT}", '{"ret":1,"id":"${data.id}","err":"${ERR_NOT_FOUND}","env":"cef"}');`;
  browser.execute(`var __p = window["${PROCESS_EVENT}"]; if(__p){ __p(${JSON.stringify(raw)}); }else{ ${fallback} }`);
}

function callProcedure(name: string, args: any, info: any): Promise<any> {
  const listener = (globalThis as any).__rpcListeners[name];
  if (!listener) return util.promiseReject(`${ERR_NOT_FOUND} (${name})`);
  return util.promiseResolve(listener(args, info));
}

function sendEventData(event: any, player?: any): void {
  const sendString = util.stringifyData(event);
  const env = event.env;

  const dispatch = (...parts: any[]) => {
    if (env === "client") getMp().events.callRemote(...parts);
    else if (env === "server") player.call(...parts);
  };

  if (sendString.length > MAX_DATA_SIZE) {
    const chunks = util.chunkSubstr(sendString, MAX_DATA_SIZE);
    chunks.forEach((partString: string, index: number) => {
      dispatch(PROCESS_EVENT_PARTIAL, event.id, index, chunks.length, partString);
    });
  } else {
    dispatch(PROCESS_EVENT, sendString);
  }
}

export function register(name: string, cb: (...args: any[]) => any): () => void {
  ensureInitialized();
  if (typeof name !== "string" || !cb || typeof cb !== "function") {
    throw new Error(`register expects 2 arguments: "name" and "cb" - ("${name}")`);
  }
  util.log(`Registered procedure "${name}"`);

  const g = globalThis as any;
  if (environment === "cef") {
    g[IDENTIFIER].then((id: string) => getMp().trigger(BROWSER_REGISTER, JSON.stringify([id, name])));
  }
  g.__rpcListeners[name] = cb;
  return () => unregister(name);
}

export function unregister(name: string): void {
  ensureInitialized();
  if (typeof name !== "string") throw new Error(`unregister expects 1 argument: "name" - ("${name}")`);
  util.log(`Unregistered procedure "${name}"`);

  const g = globalThis as any;
  if (environment === "cef") {
    g[IDENTIFIER].then((id: string) => getMp().trigger(BROWSER_UNREGISTER, JSON.stringify([id, name])));
  }
  g.__rpcListeners[name] = undefined;
}

export function call(name: string, args?: any, options: { timeout?: number } = {}): Promise<any> {
  ensureInitialized();
  if (typeof name !== "string") {
    return util.promiseReject(`call expects 1 to 3 arguments: "name", optional "args", and optional "options"`);
  }
  return util.promiseTimeout(callProcedure(name, args, { environment }), options.timeout);
}

function _callServer(name: string, args?: any, extraData: Record<string, any> = {}): Promise<any> | undefined {
  const g = globalThis as any;
  switch (environment) {
    case "server":
      return call(name, args);
    case "client": {
      const id = util.generateId();
      return new Promise((resolve) => {
        if (!extraData.noRet) addPending(id, { resolve });
        sendEventData({ req: 1, id, name, env: environment, args, ...extraData });
      });
    }
    case "cef":
      return callClient("__rpc:callServer", [name, args, Number(!!extraData.noRet)]);
  }
  return undefined;
}

export function callServer(name: string, args?: any, options: { noRet?: any; timeout?: number } = {}): Promise<any> {
  ensureInitialized();
  if (typeof name !== "string") {
    return util.promiseReject(`callServer expects 1 to 3 arguments: "name", optional "args", and optional "options"`);
  }
  const extra: Record<string, any> = {};
  if (options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callServer(name, args, extra), options.timeout);
}

function _callClient(player: any, name: string, args?: any, extraData: Record<string, any> = {}): Promise<any> | undefined {
  const g = globalThis as any;
  switch (environment) {
    case "client":
      return call(name, args);
    case "server": {
      const id = util.generateId();
      return new Promise((resolve) => {
        if (!extraData.noRet) addPending(id, { resolve, player });
        sendEventData({ req: 1, id, name, env: environment, args, ...extraData }, player);
      });
    }
    case "cef": {
      const id = util.generateId();
      return g[IDENTIFIER].then((browserId: string) => new Promise((resolve) => {
        if (!extraData.noRet) addPending(id, { resolve });
        getMp().trigger(PROCESS_EVENT, util.stringifyData({ b: browserId, req: 1, id, name, env: environment, args, ...extraData }));
      }));
    }
  }
  return undefined;
}

export function callClient(player: any, name?: any, args?: any, options: { noRet?: any; timeout?: number } = {}): Promise<any> {
  ensureInitialized();
  switch (environment) {
    case "client":
    case "cef":
      options = args || {};
      args = name;
      name = player;
      player = null;
      if (typeof name !== "string") return util.promiseReject(`callClient from ${environment} expects: "name", optional "args", optional "options"`);
      break;
    case "server":
      if (typeof name !== "string" || typeof player !== "object" || !player) {
        return util.promiseReject(`callClient from server expects: "player", "name", optional "args", optional "options"`);
      }
      break;
  }
  const extra: Record<string, any> = {};
  if (options && options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callClient(player, name, args, extra), options && options.timeout);
}

function _callBrowser(browser: any, name: string, args?: any, extraData: Record<string, any> = {}): Promise<any> {
  return new Promise((resolve) => {
    const id = util.generateId();
    if (!extraData.noRet) addPending(id, { resolve });
    passEventToBrowser(browser, { req: 1, id, name, env: environment, args, ...extraData }, false);
  });
}

function _callBrowsers(player: any, name: string, args?: any, extraData: Record<string, any> = {}): Promise<any> | undefined {
  const g = globalThis as any;
  switch (environment) {
    case "client": {
      const browserId = g.__rpcBrowserProcedures[name];
      if (!browserId) return util.promiseReject(`${ERR_NOT_FOUND} (${name})`);
      const browser = g.__rpcBrowsers[browserId];
      if (!browser || !util.isBrowserValid(browser)) return util.promiseReject(`${ERR_NOT_FOUND} (${name})`);
      return _callBrowser(browser, name, args, extraData);
    }
    case "server":
      return _callClient(player, "__rpc:callBrowsers", [name, args, Number(!!extraData.noRet)], extraData);
    case "cef":
      return _callClient(null, "__rpc:callBrowsers", [name, args, Number(!!extraData.noRet)], extraData);
  }
  return undefined;
}

export function callBrowsers(player: any, name?: any, args?: any, options: { noRet?: any; timeout?: number } = {}): Promise<any> | undefined {
  ensureInitialized();
  let promise: Promise<any> | undefined;
  const extra: Record<string, any> = {};
  switch (environment) {
    case "client":
    case "cef":
      options = args || {};
      args = name;
      name = player;
      if (typeof name !== "string") return util.promiseReject(`callBrowsers from ${environment} expects: "name", optional "args", optional "options"`);
      if (options.noRet) extra.noRet = 1;
      promise = _callBrowsers(null, name, args, extra);
      break;
    case "server":
      if (typeof name !== "string" || typeof player !== "object" || !player) {
        return util.promiseReject(`callBrowsers from server expects: "player", "name", optional "args", optional "options"`);
      }
      if (options.noRet) extra.noRet = 1;
      promise = _callBrowsers(player, name, args, extra);
      break;
  }
  return promise ? util.promiseTimeout(promise, options.timeout) : undefined;
}

export function callBrowser(browser: any, name: string, args?: any, options: { noRet?: any; timeout?: number } = {}): Promise<any> {
  ensureInitialized();
  if (environment !== "client") return util.promiseReject("callBrowser can only be used in the client environment");
  if (!util.isBrowserValid(browser) || typeof name !== "string") {
    return util.promiseReject(`callBrowser expects 2 to 4 arguments: "browser", "name", optional "args", optional "options"`);
  }
  const extra: Record<string, any> = {};
  if (options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callBrowser(browser, name, args, extra), options.timeout);
}

function callEvent(name: string, args: any, info: any): void {
  const listeners = (globalThis as any).__rpcEvListeners[name];
  if (listeners) listeners.forEach((listener: (...a: any[]) => any) => listener(args, info));
}

export function on(name: string, cb: (...args: any[]) => any): () => void {
  ensureInitialized();
  if (typeof name !== "string" || !cb || typeof cb !== "function") {
    throw new Error(`on expects 2 arguments: "name" and "cb" - ("${name}")`);
  }
  util.log(`Registered procedure listener "${name}"`);
  const g = globalThis as any;
  const listeners = g.__rpcEvListeners[name] || new Set();
  listeners.add(cb);
  g.__rpcEvListeners[name] = listeners;
  return () => off(name, cb);
}

export function off(name: string, cb: (...args: any[]) => any): void {
  ensureInitialized();
  const listeners = (globalThis as any).__rpcEvListeners[name];
  if (listeners) {
    util.log(`Unregistered procedure listener "${name}"`);
    listeners.delete(cb);
  }
}

export function trigger(name: string, args?: any): void {
  ensureInitialized();
  if (typeof name !== "string") throw new Error(`trigger expects 1 or 2 arguments: "name", and optional "args"`);
  callEvent(name, args, { environment });
}

export function triggerClient(player: any, name?: any, args?: any): void {
  ensureInitialized();
  switch (environment) {
    case "client":
    case "cef":
      args = name;
      name = player;
      player = null;
      if (typeof name !== "string") throw new Error(`triggerClient from ${environment} expects: "name", optional "args"`);
      break;
    case "server":
      if (typeof name !== "string" || typeof player !== "object" || !player) {
        throw new Error(`triggerClient from server expects: "player", "name", optional "args"`);
      }
      break;
  }
  void _callClient(player, TRIGGER_EVENT, [name, args], { noRet: 1 });
}

export function triggerServer(name: string, args?: any): void {
  ensureInitialized();
  if (typeof name !== "string") throw new Error(`triggerServer expects 1 or 2 arguments: "name", and optional "args"`);
  void _callServer(TRIGGER_EVENT, [name, args], { noRet: 1 });
}

export function triggerBrowsers(player: any, name?: any, args?: any): void {
  ensureInitialized();
  switch (environment) {
    case "client":
    case "cef":
      args = name;
      name = player;
      player = null;
      if (typeof name !== "string") throw new Error(`triggerBrowsers from ${environment} expects: "name", optional "args"`);
      break;
    case "server":
      if (typeof name !== "string" || typeof player !== "object" || !player) {
        throw new Error(`triggerBrowsers from server expects: "player", "name", optional "args"`);
      }
      break;
  }
  void _callClient(player, TRIGGER_EVENT_BROWSERS, [name, args], { noRet: 1 });
}

export function triggerBrowser(browser: any, name: string, args?: any): void {
  ensureInitialized();
  if (environment !== "client") throw new Error("triggerBrowser can only be used in the client environment");
  if (!util.isBrowserValid(browser) || typeof name !== "string") {
    throw new Error(`triggerBrowser expects 2 or 3 arguments: "browser", "name", and optional "args"`);
  }
  void _callBrowser(browser, TRIGGER_EVENT, [name, args], { noRet: 1 });
}

export const setDebugMode = util.setDebugMode;

const api = {
  register, unregister, call,
  callServer, callClient, callBrowsers, callBrowser,
  on, off, trigger,
  triggerServer, triggerClient, triggerBrowsers, triggerBrowser,
  setDebugMode,
};

export default api;
