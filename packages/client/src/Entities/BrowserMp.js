import { Entity } from "@ragemp-fivem-bridge/shared";

let _procCounter = 0;
const _pendingProcs = new Map();

if (typeof RegisterNuiCallbackType === "function") {
  RegisterNuiCallbackType("ragemp:cefProcResult");
  on("__cfx_nui:ragemp:cefProcResult", (data, cb) => {
    const pending = _pendingProcs.get(data.requestId);
    if (pending) {
      _pendingProcs.delete(data.requestId);
      if (data.error) {
        pending.reject(new Error(data.error));
      } else {
        pending.resolve(data.result);
      }
    }
    cb({});
  });

  RegisterNuiCallbackType("ragemp:cefProc");
  on("__cfx_nui:ragemp:cefProc", (data, cb) => {
    const { procName, requestId, args } = data;
    const handler = globalThis.mp?.events?._procs?.get(procName);
    if (!handler) { cb({ error: `Unknown proc: ${procName}` }); return; }
    Promise.resolve(handler(...(args ?? []))).then(result => cb({ requestId, result })).catch(err => cb({ requestId, error: String(err) }));
  });
}

export class BrowserMp extends Entity {
  _url;
  _active = false;
  _isChatBrowser = false;

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
    SendNuiMessage(JSON.stringify({ type: "__ragemp:exec", code }));
  }

  executeCached(code) {
    this.execute(code);
  }

  markAsChat(flag) {
    this._isChatBrowser = flag;
    if (flag) {
      SetNuiFocusKeepInput(true);
    }
  }

  reload(ignoreCache) {
    SendNuiMessage(JSON.stringify({ type: "__ragemp:reload", ignoreCache: !!ignoreCache }));
  }

  call(eventName, ...args) {
    SendNuiMessage(JSON.stringify({ event: eventName, args }));
  }

  callProc(procName, ...args) {
    const requestId = ++_procCounter;
    return new Promise((resolve, reject) => {
      _pendingProcs.set(requestId, { resolve, reject });
      SendNuiMessage(JSON.stringify({ proc: procName, requestId, args }));
      setTimeout(() => {
        if (_pendingProcs.has(requestId)) {
          _pendingProcs.delete(requestId);
          reject(new Error("Proc timeout"));
        }
      }, 10000);
    });
  }

  destroy() {
    if (this._active) {
      this._active = false;
      SetNuiFocus(false, false);
    }
    globalThis.mp?.browsers?._remove(this.id);
  }
}
