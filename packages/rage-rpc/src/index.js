import * as util from "./util.js";

const ERR_NOT_FOUND = "PROCEDURE_NOT_FOUND";
const MAX_DATA_SIZE = 32000;

const IDENTIFIER = "__rpc:id";
const PROCESS_EVENT = "__rpc:process";
const PROCESS_EVENT_PARTIAL = "__rpc:processPartial";
const BROWSER_REGISTER = "__rpc:browserRegister";
const BROWSER_UNREGISTER = "__rpc:browserUnregister";
const TRIGGER_EVENT = "__rpc:triggerEvent";
const TRIGGER_EVENT_BROWSERS = "__rpc:triggerEventBrowsers";

let initialized = false;
let environment = null;

function getMp() {
  return globalThis.mp;
}

function ensureInitialized() {
  if (initialized) return;

  environment = util.getEnvironment();
  if (!environment) throw new Error("rage-rpc: Unknown RAGE environment");

  const g = globalThis;

  if (g[PROCESS_EVENT]) {
    initialized = true;
    return;
  }

  const mp = getMp();

  g.__rpcListeners = g.__rpcListeners || {};
  g.__rpcPending = g.__rpcPending || {};
  g.__rpcEvListeners = g.__rpcEvListeners || {};
  g.__rpcPartialData = g.__rpcPartialData || {};

  g[PROCESS_EVENT_PARTIAL] = (player, id, index, size, rawData) => {
    if (environment !== "server") {
      rawData = size;
      size = index;
      index = id;
      id = player;
    }

    if (!g.__rpcPartialData[id]) {
      g.__rpcPartialData[id] = new Array(size);
    }

    g.__rpcPartialData[id][index] = rawData;

    if (!g.__rpcPartialData[id].includes(undefined)) {
      const full = g.__rpcPartialData[id].join("");
      if (environment === "server") g[PROCESS_EVENT](player, full);
      else g[PROCESS_EVENT](full);
      delete g.__rpcPartialData[id];
    }
  };

  g[PROCESS_EVENT] = (player, rawData) => {
    if (environment !== "server") rawData = player;

    let data;
    try { data = util.parseData(rawData); } catch (e) { return; }

    if (data.req) {
      const info = { id: data.id, environment: data.fenv || data.env };
      if (environment === "server") info.player = player;

      const part = { ret: 1, id: data.id, env: environment };
      let ret = null;

      switch (environment) {
        case "server":
          ret = (ev) => info.player.call(PROCESS_EVENT, util.stringifyData(ev));
          break;
        case "client":
          if (data.env === "server") {
            ret = (ev) => getMp().events.callRemote(PROCESS_EVENT, util.stringifyData(ev));
          } else if (data.env === "cef") {
            const browser = data.b && g.__rpcBrowsers && g.__rpcBrowsers[data.b];
            info.browser = browser;
            ret = (ev) => browser && util.isBrowserValid(browser) && passEventToBrowser(browser, ev, true);
          }
          break;
        case "cef":
          ret = (ev) => getMp().trigger(PROCESS_EVENT, util.stringifyData(ev));
          break;
      }

      if (ret) {
        const promise = callProcedure(data.name, data.args, info);
        if (!data.noRet) {
          promise
            .then((res) => ret({ ...part, res }))
            .catch((err) => ret({ ...part, err: err == null ? null : err }));
        }
      }
    } else if (data.ret) {
      const info = g.__rpcPending[data.id];
      if (environment === "server" && info && info.player !== player) return;
      if (info) {
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
      g[IDENTIFIER] = new Promise((resolve) => {
        if (typeof window !== "undefined" && window.name) resolve(window.name);
        else g[`${IDENTIFIER}:resolve`] = resolve;
      });
    }
  } else {
    mp.events.add(PROCESS_EVENT, g[PROCESS_EVENT]);
    mp.events.add(PROCESS_EVENT_PARTIAL, g[PROCESS_EVENT_PARTIAL]);

    if (environment === "client") {
      register("__rpc:callServer", ([name, args, noRet], info) => _callServer(name, args, { fenv: info.environment, noRet }));
      register("__rpc:callBrowsers", ([name, args, noRet], info) => _callBrowsers(null, name, args, { fenv: info.environment, noRet }));

      g.__rpcBrowsers = {};
      const initBrowser = (browser) => {
        const id = util.generateId();
        Object.keys(g.__rpcBrowsers).forEach((key) => {
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
      mp.events.add(BROWSER_REGISTER, (data) => {
        const [browserId, name] = JSON.parse(data);
        g.__rpcBrowserProcedures[name] = browserId;
      });
      mp.events.add(BROWSER_UNREGISTER, (data) => {
        const [browserId, name] = JSON.parse(data);
        if (g.__rpcBrowserProcedures[name] === browserId) delete g.__rpcBrowserProcedures[name];
      });

      register(TRIGGER_EVENT_BROWSERS, ([name, args], info) => {
        Object.keys(g.__rpcBrowsers).forEach((key) => {
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

  register(TRIGGER_EVENT, ([name, args], info) => callEvent(name, args, info));

  initialized = true;
}

function passEventToBrowser(browser, data, ignoreNotFound) {
  const raw = util.stringifyData(data);
  const fallback = ignoreNotFound ? "" : `mp.trigger("${PROCESS_EVENT}", '{"ret":1,"id":"${data.id}","err":"${ERR_NOT_FOUND}","env":"cef"}');`;
  browser.execute(`var __p = window["${PROCESS_EVENT}"]; if(__p){ __p(${JSON.stringify(raw)}); }else{ ${fallback} }`);
}

function callProcedure(name, args, info) {
  const listener = globalThis.__rpcListeners[name];
  if (!listener) return util.promiseReject(`${ERR_NOT_FOUND} (${name})`);
  return util.promiseResolve(listener(args, info));
}

function sendEventData(event, player) {
  const sendString = util.stringifyData(event);
  const env = event.env;

  const dispatch = (...parts) => {
    if (env === "client") getMp().events.callRemote(...parts);
    else if (env === "server") player.call(...parts);
  };

  if (sendString.length > MAX_DATA_SIZE) {
    const chunks = util.chunkSubstr(sendString, MAX_DATA_SIZE);
    chunks.forEach((partString, index) => {
      dispatch(PROCESS_EVENT_PARTIAL, event.id, index, chunks.length, partString);
    });
  } else {
    dispatch(PROCESS_EVENT, sendString);
  }
}

export function register(name, cb) {
  ensureInitialized();
  if (typeof name !== "string" || !cb || typeof cb !== "function") {
    throw new Error(`register expects 2 arguments: "name" and "cb" - ("${name}")`);
  }
  util.log(`Registered procedure "${name}"`);

  const g = globalThis;
  if (environment === "cef") {
    g[IDENTIFIER].then((id) => getMp().trigger(BROWSER_REGISTER, JSON.stringify([id, name])));
  }
  g.__rpcListeners[name] = cb;
  return () => unregister(name);
}

export function unregister(name) {
  ensureInitialized();
  if (typeof name !== "string") throw new Error(`unregister expects 1 argument: "name" - ("${name}")`);
  util.log(`Unregistered procedure "${name}"`);

  const g = globalThis;
  if (environment === "cef") {
    g[IDENTIFIER].then((id) => getMp().trigger(BROWSER_UNREGISTER, JSON.stringify([id, name])));
  }
  g.__rpcListeners[name] = undefined;
}

export function call(name, args, options = {}) {
  ensureInitialized();
  if (typeof name !== "string") {
    return util.promiseReject(`call expects 1 to 3 arguments: "name", optional "args", and optional "options"`);
  }
  return util.promiseTimeout(callProcedure(name, args, { environment }), options.timeout);
}

function _callServer(name, args, extraData = {}) {
  const g = globalThis;
  switch (environment) {
    case "server":
      return call(name, args);
    case "client": {
      const id = util.generateId();
      return new Promise((resolve) => {
        if (!extraData.noRet) g.__rpcPending[id] = { resolve };
        sendEventData({ req: 1, id, name, env: environment, args, ...extraData });
      });
    }
    case "cef":
      return callClient("__rpc:callServer", [name, args, Number(!!extraData.noRet)]);
  }
}

export function callServer(name, args, options = {}) {
  ensureInitialized();
  if (typeof name !== "string") {
    return util.promiseReject(`callServer expects 1 to 3 arguments: "name", optional "args", and optional "options"`);
  }
  const extra = {};
  if (options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callServer(name, args, extra), options.timeout);
}

function _callClient(player, name, args, extraData = {}) {
  const g = globalThis;
  switch (environment) {
    case "client":
      return call(name, args);
    case "server": {
      const id = util.generateId();
      return new Promise((resolve) => {
        if (!extraData.noRet) g.__rpcPending[id] = { resolve, player };
        sendEventData({ req: 1, id, name, env: environment, args, ...extraData }, player);
      });
    }
    case "cef": {
      const id = util.generateId();
      return g[IDENTIFIER].then((browserId) => new Promise((resolve) => {
        if (!extraData.noRet) g.__rpcPending[id] = { resolve };
        getMp().trigger(PROCESS_EVENT, util.stringifyData({ b: browserId, req: 1, id, name, env: environment, args, ...extraData }));
      }));
    }
  }
}

export function callClient(player, name, args, options = {}) {
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
  const extra = {};
  if (options && options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callClient(player, name, args, extra), options && options.timeout);
}

function _callBrowser(browser, name, args, extraData = {}) {
  const g = globalThis;
  return new Promise((resolve) => {
    const id = util.generateId();
    if (!extraData.noRet) g.__rpcPending[id] = { resolve };
    passEventToBrowser(browser, { req: 1, id, name, env: environment, args, ...extraData }, false);
  });
}

function _callBrowsers(player, name, args, extraData = {}) {
  const g = globalThis;
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
}

export function callBrowsers(player, name, args, options = {}) {
  ensureInitialized();
  let promise;
  const extra = {};
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

export function callBrowser(browser, name, args, options = {}) {
  ensureInitialized();
  if (environment !== "client") return util.promiseReject("callBrowser can only be used in the client environment");
  if (!util.isBrowserValid(browser) || typeof name !== "string") {
    return util.promiseReject(`callBrowser expects 2 to 4 arguments: "browser", "name", optional "args", optional "options"`);
  }
  const extra = {};
  if (options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callBrowser(browser, name, args, extra), options.timeout);
}

function callEvent(name, args, info) {
  const listeners = globalThis.__rpcEvListeners[name];
  if (listeners) listeners.forEach((listener) => listener(args, info));
}

export function on(name, cb) {
  ensureInitialized();
  if (typeof name !== "string" || !cb || typeof cb !== "function") {
    throw new Error(`on expects 2 arguments: "name" and "cb" - ("${name}")`);
  }
  util.log(`Registered procedure listener "${name}"`);
  const g = globalThis;
  const listeners = g.__rpcEvListeners[name] || new Set();
  listeners.add(cb);
  g.__rpcEvListeners[name] = listeners;
  return () => off(name, cb);
}

export function off(name, cb) {
  ensureInitialized();
  const listeners = globalThis.__rpcEvListeners[name];
  if (listeners) {
    util.log(`Unregistered procedure listener "${name}"`);
    listeners.delete(cb);
  }
}

export function trigger(name, args) {
  ensureInitialized();
  if (typeof name !== "string") throw new Error(`trigger expects 1 or 2 arguments: "name", and optional "args"`);
  callEvent(name, args, { environment });
}

export function triggerClient(player, name, args) {
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

export function triggerServer(name, args) {
  ensureInitialized();
  if (typeof name !== "string") throw new Error(`triggerServer expects 1 or 2 arguments: "name", and optional "args"`);
  void _callServer(TRIGGER_EVENT, [name, args], { noRet: 1 });
}

export function triggerBrowsers(player, name, args) {
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

export function triggerBrowser(browser, name, args) {
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
