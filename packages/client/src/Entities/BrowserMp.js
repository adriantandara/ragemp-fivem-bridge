import { Entity } from "@ragemp-fivem-bridge/shared";
import { ensureNuiPauseGuard } from "../utils/nuiFocus";

let _procCounter = 0;
let _procTimeout = 10000;

export function setBrowserProcTimeout(ms) {
  if (typeof ms === "number" && ms > 0) _procTimeout = ms;
}

export function getBrowserProcTimeout() {
  return _procTimeout;
}

function postFocusState(browserId, active) {
  if (typeof SendNuiMessage !== "function") return;
  SendNuiMessage(
    JSON.stringify({
      type: active ? "__ragemp:browser:focus" : "__ragemp:browser:blur",
      browserId,
    })
  );
}
const _pendingProcs = new Map();

if (typeof RegisterNuiCallbackType === "function") {

  RegisterNuiCallbackType("ragemp:cefProcResult");
  on("__cfx_nui:ragemp:cefProcResult", (data, cb) => {
    const pending = _pendingProcs.get(data.requestId);
    if (pending) {
      _pendingProcs.delete(data.requestId);
      if (data.error) pending.reject(new Error(data.error));
      else pending.resolve(data.result);
    }
    cb({});
  });

  RegisterNuiCallbackType("ragemp:cefProc");
  on("__cfx_nui:ragemp:cefProc", (data, cb) => {
    const { procName, requestId, args, browserId } = data;
    const handler = globalThis.mp?.events?._procs?.get(procName);
    if (!handler) {

      SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:procResult", browserId, requestId, error: `Unknown proc: ${procName}` }));
      cb({});
      return;
    }
    Promise.resolve()
      .then(() => handler(...(args ?? [])))
      .then((result) => SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:procResult", browserId, requestId, result })))
      .catch((err) => SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:procResult", browserId, requestId, error: String(err) })));
    cb({});
  });
}

export class BrowserMp extends Entity {
  _url;
  _active = false;
  _isChatBrowser = false;
  _destroyed = false;
  _inputEnabled = true;
  _mouseInputEnabled = true;
  _orderId = 0;
  _domReady = false;
  _cachedExec = [];

  constructor(id, url) {
    super(id, "browser");
    this._url = url;
  }

  get url() {
    return this._url;
  }

  get active() {
    return this._active;
  }

  set active(value) {
    this._active = !!value;
    SetNuiFocus(this._active, this._active);
    postFocusState(this.id, this._active);
    if (this._active) ensureNuiPauseGuard();
  }

  execute(code) {
    if (this._destroyed) return;
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:exec", browserId: this.id, code }));
  }

  executeCached(code) {
    if (this._destroyed) return;
    this._cachedExec.push(code);
    if (this._domReady) this.execute(code);
  }

  _onDomReady() {
    this._domReady = true;
    if (this._cachedExec.length === 0) return;
    for (const code of this._cachedExec) this.execute(code);
  }

  _applyPointerEvents() {
    if (this._destroyed || typeof SendNuiMessage !== "function") return;
    SendNuiMessage(
      JSON.stringify({
        type: "__ragemp:browser:pointerEvents",
        browserId: this.id,
        enabled: this._inputEnabled && this._mouseInputEnabled,
      })
    );
  }

  get inputEnabled() {
    return this._inputEnabled;
  }

  set inputEnabled(value) {
    this._inputEnabled = !!value;
    this._applyPointerEvents();
  }

  get mouseInputEnabled() {
    return this._mouseInputEnabled;
  }

  set mouseInputEnabled(value) {
    this._mouseInputEnabled = !!value;
    this._applyPointerEvents();
  }

  get orderId() {
    return this._orderId;
  }

  set orderId(value) {
    this._orderId = value | 0;
    if (this._destroyed || typeof SendNuiMessage !== "function") return;
    SendNuiMessage(
      JSON.stringify({
        type: "__ragemp:browser:orderId",
        browserId: this.id,
        orderId: this._orderId,
      })
    );
  }

  markAsChat(flag) {
    const enabled = flag === undefined ? true : !!flag;
    this._isChatBrowser = enabled;
    const pool = globalThis.mp?.browsers;
    if (pool) {
      if (enabled) pool._chatBrowser = this;
      else if (pool._chatBrowser === this) pool._chatBrowser = null;
    }
  }

  reload(ignoreCache) {
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:reload", browserId: this.id, ignoreCache: !!ignoreCache }));
  }

  call(eventName, ...args) {
    if (this._destroyed) return;
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:event", browserId: this.id, event: eventName, args }));
  }

  callProc(procName, ...args) {
    if (this._destroyed) return Promise.reject(new Error("Browser destroyed"));
    const requestId = ++_procCounter;
    return new Promise((resolve, reject) => {
      _pendingProcs.set(requestId, { resolve, reject });
      SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:proc", browserId: this.id, proc: procName, requestId, args }));
      setTimeout(() => {
        if (_pendingProcs.has(requestId)) {
          _pendingProcs.delete(requestId);
          reject(new Error(`Proc "${procName}" timed out after ${_procTimeout}ms`));
        }
      }, _procTimeout);
    });
  }

  destroy() {
    if (this._destroyed) return;
    this._destroyed = true;
    if (this._active) {
      this._active = false;
      SetNuiFocus(false, false);
    }
    postFocusState(this.id, false);
    const pool = globalThis.mp?.browsers;
    if (pool && pool._chatBrowser === this) pool._chatBrowser = null;
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:destroy", browserId: this.id }));
    pool?._remove(this.id);
  }
}
