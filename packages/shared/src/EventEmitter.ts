import { EventEmitterInternals, initEventEmitterInternals, type EventHandler } from "./internal/eventEmitterInternals";

export type { EventHandler };

export abstract class EventEmitter {
  constructor() {
    initEventEmitterInternals(this);
  }

  call(eventName: string, ...args: any[]): void {
    const handlers = EventEmitterInternals.get(this).handlers.get(eventName);
    if (!handlers) return;
    for (const handler of handlers) {
      handler(...args);
    }
  }

  add(eventNameOrObject: string | Record<string, EventHandler>, handler?: EventHandler): void {
    if (typeof eventNameOrObject === "object" && handler === undefined) {
      for (const [name, fn] of Object.entries(eventNameOrObject)) {
        this.add(name, fn);
      }
      return;
    }
    const eventName = eventNameOrObject as string;
    const handlers = EventEmitterInternals.get(this).handlers;
    let set = handlers.get(eventName);
    if (!set) {
      set = new Set();
      handlers.set(eventName, set);
    }
    set.add(handler!);
  }

  remove(eventName: string, handler?: EventHandler): void {
    const handlers = EventEmitterInternals.get(this).handlers.get(eventName);
    if (!handlers) return;
    if (handler) {
      handlers.delete(handler);
    } else {
      handlers.clear();
    }
  }

  getAllOf(eventName: string): EventHandler[] {
    return [...(EventEmitterInternals.get(this).handlers.get(eventName) ?? [])];
  }
}
