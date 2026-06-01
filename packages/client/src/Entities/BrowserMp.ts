import { Entity } from "@ragemp-fivem-bridge/shared";
import { ensureNuiPauseGuard } from "../utils/nuiFocus";

let _procCounter: number = 0;
let _procTimeout: number = 10000;

export function setBrowserProcTimeout(ms: number): void {
  if (typeof ms === "number" && ms > 0) _procTimeout = ms;
}

export function getBrowserProcTimeout(): number {
  return _procTimeout;
}

function postFocusState(browserId: number, active: boolean): void {
  if (typeof SendNuiMessage !== "function") return;
  SendNuiMessage(
    JSON.stringify({
      type: active ? "__ragemp:browser:focus" : "__ragemp:browser:blur",
      browserId,
    })
  );
}
const _pendingProcs = new Map<number, { resolve: (value: any) => void; reject: (reason?: any) => void }>();

if (typeof RegisterNuiCallbackType === "function") {

  RegisterNuiCallbackType("ragemp:cefProcResult");
  on("__cfx_nui:ragemp:cefProcResult", (data: any, cb: (result: any) => void) => {
    const pending = _pendingProcs.get(data.requestId);
    if (pending) {
      _pendingProcs.delete(data.requestId);
      if (data.error) pending.reject(new Error(data.error));
      else pending.resolve(data.result);
    }
    cb({});
  });

  RegisterNuiCallbackType("ragemp:cefProc");
  on("__cfx_nui:ragemp:cefProc", (data: any, cb: (result: any) => void) => {
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
  id: number;
  _url: string;
  _active: boolean = false;
  _isChatBrowser: boolean = false;
  _destroyed: boolean = false;
  _inputEnabled: boolean = true;
  _mouseInputEnabled: boolean = true;
  _orderId: number = 0;
  _domReady: boolean = false;
  _cachedExec: string[] = [];

  constructor(id: number, url: string) {
    super(id, "browser");
    this._url = url;
  }

  get url(): string {
    return this._url;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = !!value;
    SetNuiFocus(this._active, this._active);
    postFocusState(this.id, this._active);
    if (this._active) ensureNuiPauseGuard();
  }

  execute(code: string): void {
    if (this._destroyed) return;
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:exec", browserId: this.id, code }));
  }

  executeCached(code: string): void {
    if (this._destroyed) return;
    this._cachedExec.push(code);
    if (this._domReady) this.execute(code);
  }

  _onDomReady(): void {
    this._domReady = true;
    if (this._cachedExec.length === 0) return;
    for (const code of this._cachedExec) this.execute(code);
  }

  _applyPointerEvents(): void {
    if (this._destroyed || typeof SendNuiMessage !== "function") return;
    SendNuiMessage(
      JSON.stringify({
        type: "__ragemp:browser:pointerEvents",
        browserId: this.id,
        enabled: this._inputEnabled && this._mouseInputEnabled,
      })
    );
  }

  get inputEnabled(): boolean {
    return this._inputEnabled;
  }

  set inputEnabled(value: boolean) {
    this._inputEnabled = !!value;
    this._applyPointerEvents();
  }

  get mouseInputEnabled(): boolean {
    return this._mouseInputEnabled;
  }

  set mouseInputEnabled(value: boolean) {
    this._mouseInputEnabled = !!value;
    this._applyPointerEvents();
  }

  get orderId(): number {
    return this._orderId;
  }

  set orderId(value: number) {
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

  // d.ts: markAsChat(): void — but implementation accepts optional flag not in d.ts
  markAsChat(flag?: boolean): void {
    const enabled = flag === undefined ? true : !!flag;
    this._isChatBrowser = enabled;
    const pool = globalThis.mp?.browsers;
    if (pool) {
      if (enabled) pool._chatBrowser = this;
      else if (pool._chatBrowser === this) pool._chatBrowser = null;
    }
  }

  reload(ignoreCache: boolean): void {
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:reload", browserId: this.id, ignoreCache: !!ignoreCache }));
  }

  call(eventName: string, ...args: any[]): void {
    if (this._destroyed) return;
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:event", browserId: this.id, event: eventName, args }));
  }

  callProc<T = any>(procName: string, ...args: any[]): Promise<T> {
    if (this._destroyed) return Promise.reject(new Error("Browser destroyed"));
    const requestId = ++_procCounter;
    return new Promise<T>((resolve, reject) => {
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

  destroy(): void {
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
