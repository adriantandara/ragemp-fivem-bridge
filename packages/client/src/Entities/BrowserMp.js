import { Entity } from "@ragemp-fivem-bridge/shared";

let _procCounter = 0;
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
  }

  execute(code) {
    if (this._destroyed) return;
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:exec", browserId: this.id, code }));
  }

  executeCached(code) {
    this.execute(code);
  }

  markAsChat(flag) {
    this._isChatBrowser = flag;
    if (flag) SetNuiFocusKeepInput(true);
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
          reject(new Error("Proc timeout"));
        }
      }, 10000);
    });
  }

  destroy() {
    if (this._destroyed) return;
    this._destroyed = true;
    if (this._active) {
      this._active = false;
      SetNuiFocus(false, false);
    }
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:destroy", browserId: this.id }));
    globalThis.mp?.browsers?._remove(this.id);
  }
}
