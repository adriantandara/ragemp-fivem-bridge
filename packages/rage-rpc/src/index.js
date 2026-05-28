import * as util from "./util.js";

const ERR_NOT_FOUND = "PROCEDURE_NOT_FOUND";
const IDENTIFIER = "__rpc:id";
const PROCESS_EVENT = "__rpc:process";
const BROWSER_REGISTER = "__rpc:browserRegister";
const BROWSER_UNREGISTER = "__rpc:browserUnregister";
const TRIGGER_EVENT = "__rpc:triggerEvent";
const TRIGGER_EVENT_BROWSERS = "__rpc:triggerEventBrowsers";

let initialized = false;
let environment = null;

function getMp() { return globalThis.mp; }

function glob() {
  return environment === "cef" ? globalThis : globalThis;
}

function ensureInitialized() {
  if (initialized) return;
  environment = util.getEnvironment();
  if (!environment) throw new Error("rage-rpc: Unknown RAGE environment");

  const g = glob();
  if (g[PROCESS_EVENT]) { initialized = true; return; }

  g.__rpcListeners = {};
  g.__rpcPending = {};
  g.__rpcEvListeners = {};

  g[PROCESS_EVENT] = (player, rawData) => {
    if (environment !== "server") rawData = player;
    let data;
    try { data = util.parseData(rawData); } catch (e) { return; }

    if (data.req) {
      const info = { id: data.id, environment: data.fenv || data.env };
      if (environment === "server") info.player = player;
      const part = { ret: 1, id: data.id, env: environment };
      let ret = null;
      const mp = getMp();
      switch (environment) {
        case "server":
          ret = (ev) => info.player.call(PROCESS_EVENT, util.stringifyData(ev));
          break;
        case "client":
          if (data.env === "server") {
            ret = (ev) => mp.events.callRemote(PROCESS_EVENT, util.stringifyData(ev));
          } else if (data.env === "cef") {
            const browser = data.b && g.__rpcBrowsers && g.__rpcBrowsers[data.b];
            info.browser = browser;
            ret = (ev) => browser && util.isBrowserValid(browser) && passEventToBrowser(browser, ev, true);
          }
          break;
        case "cef":
          ret = (ev) => mp.trigger(PROCESS_EVENT, util.stringifyData(ev));
          break;
      }
      if (ret) {
        const promise = callProcedure(data.name, data.args, info);
        if (!data.noRet) {
          promise.then((res) => ret({ ...part, res })).catch((err) => ret({ ...part, err: err == null ? null : err }));
        }
      }
    } else if (data.ret) {
      const info = g.__rpcPending[data.id];
      if (environment === "server" && info && info.player !== player) return;
      if (info) {
        if (Object.prototype.hasOwnProperty.call(data, "err")) info.reject(data.err);
        else info.resolve(data.res);
        delete g.__rpcPending[data.id];
      }
    }
  };

  const mp = getMp();

  if (environment !== "cef") {
    mp.events.add(PROCESS_EVENT, g[PROCESS_EVENT]);

    if (environment === "client") {
      register("__rpc:callServer", ([name, args, noRet], info) => _callServer(name, args, { fenv: info.environment, noRet }));
      register("__rpc:callBrowsers", ([name, args, noRet], info) => _callBrowsers(null, name, args, { fenv: info.environment, noRet }));

      g.__rpcBrowsers = {};
      const initBrowser = (browser) => {
        const id = util.uid();
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
        Object.values(g.__rpcBrowsers).forEach((browser) => {
          _callBrowser(browser, TRIGGER_EVENT, [name, args], { fenv: info.environment, noRet: 1 });
        });
      });
    }
  } else {
    if (typeof g[IDENTIFIER] === "undefined") {
      g[IDENTIFIER] = new Promise((resolve) => {
        if (typeof window !== "undefined" && window.name) resolve(window.name);
        else g[IDENTIFIER + ":resolve"] = resolve;
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
  const g = glob();
  const listener = g.__rpcListeners[name];
  if (!listener) return util.promiseReject(ERR_NOT_FOUND);
  return util.promiseResolve(listener(args, info));
}

export function register(name, cb) {
  ensureInitialized();
  if (arguments.length !== 2) throw new Error('register expects 2 arguments: "name" and "cb"');
  const g = glob();
  const mp = getMp();
  if (environment === "cef") {
    g[IDENTIFIER].then((id) => mp.trigger(BROWSER_REGISTER, JSON.stringify([id, name])));
  }
  g.__rpcListeners[name] = cb;
  return () => unregister(name);
}

export function unregister(name) {
  ensureInitialized();
  const g = glob();
  const mp = getMp();
  if (environment === "cef") {
    g[IDENTIFIER].then((id) => mp.trigger(BROWSER_UNREGISTER, JSON.stringify([id, name])));
  }
  g.__rpcListeners[name] = undefined;
}

export function call(name, args, options = {}) {
  ensureInitialized();
  return util.promiseTimeout(callProcedure(name, args, { environment }), options.timeout);
}

function _callServer(name, args, extraData = {}) {
  const mp = getMp();
  const g = glob();
  switch (environment) {
    case "server": return call(name, args);
    case "client": {
      const id = util.uid();
      return new Promise((resolve, reject) => {
        if (!extraData.noRet) g.__rpcPending[id] = { resolve, reject };
        const event = { req: 1, id, name, env: environment, args, ...extraData };
        mp.events.callRemote(PROCESS_EVENT, util.stringifyData(event));
      });
    }
    case "cef": return callClient("__rpc:callServer", [name, args, +(!!extraData.noRet)]);
  }
}

export function callServer(name, args, options = {}) {
  ensureInitialized();
  const extra = {};
  if (options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callServer(name, args, extra), options.timeout);
}

function _callClient(player, name, args, extraData = {}) {
  const mp = getMp();
  const g = glob();
  switch (environment) {
    case "client": return call(name, args);
    case "server": {
      const id = util.uid();
      return new Promise((resolve, reject) => {
        if (!extraData.noRet) g.__rpcPending[id] = { resolve, reject, player };
        const event = { req: 1, id, name, env: environment, args, ...extraData };
        player.call(PROCESS_EVENT, util.stringifyData(event));
      });
    }
    case "cef": {
      const id = util.uid();
      return g[IDENTIFIER].then((browserId) => new Promise((resolve, reject) => {
        if (!extraData.noRet) g.__rpcPending[id] = { resolve, reject };
        const event = { b: browserId, req: 1, id, name, env: environment, args, ...extraData };
        mp.trigger(PROCESS_EVENT, util.stringifyData(event));
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
      if (typeof player !== "object" || !player) return util.promiseReject(`callClient from server expects: "player", "name", optional "args", optional "options"`);
      break;
  }
  const extra = {};
  if (options && options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callClient(player, name, args, extra), options && options.timeout);
}

function _callBrowser(browser, name, args, extraData = {}) {
  const g = glob();
  return new Promise((resolve, reject) => {
    const id = util.uid();
    if (!extraData.noRet) g.__rpcPending[id] = { resolve, reject };
    passEventToBrowser(browser, { req: 1, id, name, env: environment, args, ...extraData }, false);
  });
}

function _callBrowsers(player, name, args, extraData = {}) {
  const g = glob();
  switch (environment) {
    case "client": {
      const browserId = g.__rpcBrowserProcedures[name];
      if (!browserId) return util.promiseReject(ERR_NOT_FOUND);
      const browser = g.__rpcBrowsers[browserId];
      if (!browser || !util.isBrowserValid(browser)) return util.promiseReject(ERR_NOT_FOUND);
      return _callBrowser(browser, name, args, extraData);
    }
    case "server":
      return _callClient(player, "__rpc:callBrowsers", [name, args, +(!!extraData.noRet)], extraData);
    case "cef":
      return _callClient(null, "__rpc:callBrowsers", [name, args, +(!!extraData.noRet)], extraData);
  }
}

export function callBrowsers(player, name, args, options = {}) {
  ensureInitialized();
  let promise; const extra = {};
  switch (environment) {
    case "client":
    case "cef":
      options = args || {};
      args = name;
      name = player;
      if (options.noRet) extra.noRet = 1;
      promise = _callBrowsers(null, name, args, extra);
      break;
    case "server":
      if (options.noRet) extra.noRet = 1;
      promise = _callBrowsers(player, name, args, extra);
      break;
  }
  return promise ? util.promiseTimeout(promise, options.timeout) : undefined;
}

export function callBrowser(browser, name, args, options = {}) {
  ensureInitialized();
  if (environment !== "client") return util.promiseReject("callBrowser can only be used in the client environment");
  const extra = {};
  if (options.noRet) extra.noRet = 1;
  return util.promiseTimeout(_callBrowser(browser, name, args, extra), options.timeout);
}

function callEvent(name, args, info) {
  const g = glob();
  const listeners = g.__rpcEvListeners[name];
  if (listeners) listeners.forEach((listener) => listener(args, info));
}

export function on(name, cb) {
  ensureInitialized();
  const g = glob();
  const listeners = g.__rpcEvListeners[name] || new Set();
  listeners.add(cb);
  g.__rpcEvListeners[name] = listeners;
  return () => off(name, cb);
}

export function off(name, cb) {
  ensureInitialized();
  const g = glob();
  const listeners = g.__rpcEvListeners[name];
  if (listeners) listeners.delete(cb);
}

export function trigger(name, args) {
  ensureInitialized();
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
      if (typeof player !== "object" || !player) throw new Error(`triggerClient from server expects: "player", "name", optional "args"`);
      break;
  }
  _callClient(player, TRIGGER_EVENT, [name, args], { noRet: 1 });
}

export function triggerServer(name, args) {
  ensureInitialized();
  _callServer(TRIGGER_EVENT, [name, args], { noRet: 1 });
}

export function triggerBrowsers(player, name, args) {
  ensureInitialized();
  switch (environment) {
    case "client":
    case "cef":
      args = name;
      name = player;
      player = null;
      break;
    case "server":
      break;
  }
  _callClient(player, TRIGGER_EVENT_BROWSERS, [name, args], { noRet: 1 });
}

export function triggerBrowser(browser, name, args) {
  ensureInitialized();
  if (environment !== "client") throw new Error("triggerBrowser can only be used in the client environment");
  _callBrowser(browser, TRIGGER_EVENT, [name, args], { noRet: 1 });
}

const api = {
  register, unregister, call,
  callServer, callClient, callBrowsers, callBrowser,
  on, off, trigger,
  triggerServer, triggerClient, triggerBrowsers, triggerBrowser,
};

export default api;
