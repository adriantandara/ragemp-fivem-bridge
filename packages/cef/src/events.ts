import { toClient, log } from "./transport.js";
import { report, serializeError } from "./errors.js";

type Handler = (...args: unknown[]) => unknown;
type ProcHandler = (...args: unknown[]) => unknown;
type PendingEntry = { resolve: (value: unknown) => void; reject: (reason: unknown) => void };

export class EventManager {
  _handlers: Map<string, Set<Handler>> = new Map();
  _procs: Map<string, ProcHandler> = new Map();
  _procCounter: number = 0;
  _pendingProcs: Map<number, PendingEntry> = new Map();
  _getSelfId: () => string | null;

  constructor(getSelfId: () => string | null) {
    this._getSelfId = getSelfId || (() => null);
  }

  _getHandlers(eventName: string): Set<Handler> {
    if (!this._handlers.has(eventName))
      this._handlers.set(eventName, new Set());
    return this._handlers.get(eventName)!;
  }

  _fire(eventName: string, ...args: unknown[]): void {
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

  add(eventNameOrObject: string | Record<string, Handler>, handler?: Handler): void {
    if (typeof eventNameOrObject === "object" && handler === undefined) {
      for (const [name, fn] of Object.entries(eventNameOrObject))
        this.add(name, fn);
      return;
    }
    this._getHandlers(eventNameOrObject as string).add(handler!);
  }

  call(eventName: string, ...args: unknown[]): void {
    this._fire(eventName, ...args);
  }

  remove(eventName: string, handler?: Handler): void {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    if (handler) handlers.delete(handler);
    else handlers.clear();
  }

  addProc(procName: string, handler: ProcHandler): void {
    this._procs.set(procName, handler);
  }

  callProc(procName: string, ...args: unknown[]): Promise<unknown> {
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

  resolveProc(requestId: number, result: unknown, error: string | undefined): void {
    const pending = this._pendingProcs.get(requestId);
    if (!pending) return;
    this._pendingProcs.delete(requestId);
    if (error) pending.reject(new Error(error));
    else pending.resolve(result);
  }

  async runProc(procName: string, args: unknown[]): Promise<unknown> {
    const handler = this._procs.get(procName);
    if (!handler) return Promise.reject(new Error(`Unknown proc: ${procName}`));
    return Promise.resolve().then(() => handler(...(args || [])));
  }

  binded(eventName: string): boolean {
    const handlers = this._handlers.get(eventName);
    return handlers !== undefined && handlers.size > 0;
  }

  getAllOf(eventName: string): Handler[] {
    const handlers = this._handlers.get(eventName);
    return handlers ? Array.from(handlers) : [];
  }

  reset(): void {
    this._handlers.clear();
    this._procs.clear();
    this._pendingProcs.clear();
  }
}
