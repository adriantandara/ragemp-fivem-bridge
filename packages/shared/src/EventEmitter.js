export class EventEmitter {
  _handlers = new Map();

  _getHandlers(eventName) {
    if (!this._handlers.has(eventName)) {
      this._handlers.set(eventName, new Set());
    }
    return this._handlers.get(eventName);
  }

  _fire(eventName, ...args) {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    for (const handler of handlers) {
      handler(...args);
    }
  }

  add(eventNameOrObject, handler) {
    if (typeof eventNameOrObject === "object" && handler === undefined) {
      for (const [name, fn] of Object.entries(eventNameOrObject)) {
        this.add(name, fn);
      }
      return;
    }
    const eventName = eventNameOrObject;
    this._getHandlers(eventName).add(handler);
    this._onAdd(eventName, handler);
  }

  _onAdd(eventName, handler) {}

  remove(eventName, handler) {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    if (handler) {
      handlers.delete(handler);
    } else {
      handlers.clear();
    }
    this._onRemove(eventName);
  }

  _onRemove(eventName) {}

  getAllOf(eventName) {
    return [...(this._handlers.get(eventName) ?? [])];
  }
}
