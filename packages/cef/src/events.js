import { toClient, log } from "./transport.js";
import { report, serializeError } from "./errors.js";

export class EventManager {
  _handlers = new Map();
  _procs = new Map();
  _procCounter = 0;
  _pendingProcs = new Map();

  constructor(getSelfId) {
    this._getSelfId = getSelfId || (() => null);
  }

  _getHandlers(eventName) {
    if (!this._handlers.has(eventName))
      this._handlers.set(eventName, new Set());
    return this._handlers.get(eventName);
  }

  _fire(eventName, ...args) {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    for (const handler of handlers) {
      try {
        handler(...args);
      } catch (e) {
        log("handler error", eventName, String(e));
        console.error(`[ragemp] error in handler for "${eventName}":`, e);
        report({ kind: "handler", event: eventName, ...serializeError(e) });
      }
    }
  }

  add(eventNameOrObject, handler) {
    if (typeof eventNameOrObject === "object" && handler === undefined) {
      for (const [name, fn] of Object.entries(eventNameOrObject))
        this.add(name, fn);
      return;
    }
    this._getHandlers(eventNameOrObject).add(handler);
  }

  call(eventName, ...args) {
    this._fire(eventName, ...args);
  }

  remove(eventName, handler) {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    if (handler) handlers.delete(handler);
    else handlers.clear();
  }

  addProc(procName, handler) {
    this._procs.set(procName, handler);
  }

  callProc(procName, ...args) {
    const requestId = ++this._procCounter;
    return new Promise((resolve, reject) => {
      this._pendingProcs.set(requestId, { resolve, reject });
      toClient("ragemp:cefProc", {
        browserId: this._getSelfId(),
        procName,
        requestId,
        args,
      }).catch((err) => {
        this._pendingProcs.delete(requestId);
        reject(err);
      });
      setTimeout(() => {
        if (this._pendingProcs.has(requestId)) {
          this._pendingProcs.delete(requestId);
          reject(new Error("Proc timeout"));
        }
      }, 10000);
    });
  }

  resolveProc(requestId, result, error) {
    const pending = this._pendingProcs.get(requestId);
    if (!pending) return;
    this._pendingProcs.delete(requestId);
    if (error) pending.reject(new Error(error));
    else pending.resolve(result);
  }

  async runProc(procName, args) {
    const handler = this._procs.get(procName);
    if (!handler) return Promise.reject(new Error(`Unknown proc: ${procName}`));
    return Promise.resolve().then(() => handler(...(args || [])));
  }

  binded(eventName) {
    const handlers = this._handlers.get(eventName);
    return handlers !== undefined && handlers.size > 0;
  }

  getAllOf(eventName) {
    const handlers = this._handlers.get(eventName);
    return handlers ? Array.from(handlers) : [];
  }

  reset() {
    this._handlers.clear();
    this._procs.clear();
    this._pendingProcs.clear();
  }
}
