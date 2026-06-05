import { EventEmitter } from "@ragemp-fivem-bridge/shared";
import { sanitizeArgsForNet } from "@ragemp-fivem-bridge/shared";
import { EventEmitterInternals } from "@ragemp-fivem-bridge/shared/internal";
import { ServerEventManagerInternals, initServerEventManagerInternals } from "../internal/eventManagerInternals";
import { setupEventManager, handleEventAdded } from "../internal/eventManagerService";
import { getPlayerSource } from "../internal/playerInternals";
import type { EventHandler } from "@ragemp-fivem-bridge/shared/internal";

export class EventManager extends EventEmitter {
  constructor() {
    super();
    initServerEventManagerInternals(this);
    setupEventManager(this);
  }

  override add(eventNameOrObject: string | Record<string, EventHandler>, handler?: EventHandler): void {
    super.add(eventNameOrObject, handler);
    if (typeof eventNameOrObject === "string") handleEventAdded(this, eventNameOrObject);
  }

  addProc(procName: string, handler: (...args: any[]) => any): void {
    ServerEventManagerInternals.get(this).procs.set(procName, handler);
  }

  removeProc(procName: string): void {
    ServerEventManagerInternals.get(this).procs.delete(procName);
  }

  addDataHandler(key: string, handler: (...args: any[]) => void): void {
    if (!ServerEventManagerInternals.get(this).dataHandlers) ServerEventManagerInternals.get(this).dataHandlers = new Map();
    if (!ServerEventManagerInternals.get(this).dataHandlers!.has(key)) ServerEventManagerInternals.get(this).dataHandlers!.set(key, []);
    ServerEventManagerInternals.get(this).dataHandlers!.get(key)!.push(handler);
  }

  reset(): void {
    for (const key of EventEmitterInternals.get(this).handlers.keys()) {
      if (key.indexOf("__fivem_") === 0 || key.indexOf("__net_") === 0) continue;
      EventEmitterInternals.get(this).handlers.delete(key);
    }
  }

  get binded(): Record<string, boolean> {
    const handlers = EventEmitterInternals.get(this).handlers;
    return new Proxy(
      {},
      {
        get(_: Record<string, boolean>, eventName: string): boolean {
          const set = handlers.get(eventName);
          return set ? set.size > 0 : false;
        },
        has(_: Record<string, boolean>, eventName: string): boolean {
          const set = handlers.get(eventName);
          return set ? set.size > 0 : false;
        },
      },
    );
  }

  addCommand(name: string | Record<string, (...args: any[]) => any>, handler?: (...args: any[]) => any): void {
    if (name && typeof name === "object" && handler === undefined) {
      for (const [cmd, fn] of Object.entries(name)) this.addCommand(cmd, fn);
      return;
    }
    if (typeof name === "string" && typeof handler === "function") {
      ServerEventManagerInternals.get(this).commands.set(name, handler);
    }
  }

  removeCommand(name: string): void {
    ServerEventManagerInternals.get(this).commands.delete(name);
  }

  callRemote(player: any, eventName: string, args: any[] | any): void {
    const list = Array.isArray(args) ? args : args === undefined ? [] : [args];
    emitNet(eventName, getPlayerSource(player), ...sanitizeArgsForNet(list));
  }

  get delayShutdown(): boolean {
    return false;
  }
  set delayShutdown(_v: boolean) {}
  get delayTermination(): boolean {
    return false;
  }
  set delayTermination(_v: boolean) {}
  get delayInitialization(): boolean {
    return false;
  }
  set delayInitialization(_v: boolean) {}
}
