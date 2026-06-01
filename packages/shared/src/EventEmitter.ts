export type EventHandler = (...args: unknown[]) => void;

export class EventEmitter {
  _handlers: Map<string, Set<EventHandler>> = new Map();

  _getHandlers(eventName: string): Set<EventHandler> {
    if (!this._handlers.has(eventName)) {
      this._handlers.set(eventName, new Set());
    }
    return this._handlers.get(eventName)!;
  }

  _fire(eventName: string, ...args: unknown[]): void {
    const handlers = this._handlers.get(eventName);
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
    this._getHandlers(eventName).add(handler!);
    this._onAdd(eventName, handler!);
  }

  _onAdd(eventName: string, handler: EventHandler): void {}

  remove(eventName: string, handler?: EventHandler): void {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    if (handler) {
      handlers.delete(handler);
    } else {
      handlers.clear();
    }
    this._onRemove(eventName);
  }

  _onRemove(eventName: string): void {}

  getAllOf(eventName: string): EventHandler[] {
    return [...(this._handlers.get(eventName) ?? [])];
  }
}
