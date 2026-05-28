import rpc from "@ragemp-fivem-bridge/rage-rpc";

function getResourceName() {
  if (typeof GetParentResourceName === "function") {
    return GetParentResourceName();
  }
  return "ragemp-fivem-bridge";
}

class EventManager {
  _handlers = new Map();

  _procs = new Map();

  _procCounter = 0;

  _pendingProcs = new Map();

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

    this._getHandlers(eventNameOrObject).add(handler);
  }

  call(eventName, ...args) {
    this._fire(eventName, ...args);
  }

  remove(eventName, handler) {
    const handlers = this._handlers.get(eventName);
    if (!handlers) return;
    if (handler) {
      handlers.delete(handler);
    } else {
      handlers.clear();
    }
  }

  addProc(procName, handler) {
    this._procs.set(procName, handler);
  }

  callProc(procName, ...args) {
    const requestId = ++this._procCounter;

    return new Promise((resolve, reject) => {
      this._pendingProcs.set(requestId, { resolve, reject });

      fetch(`https://${getResourceName()}/ragemp:cefProc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ procName, requestId, args })
      }).catch((err) => {
        this._pendingProcs.delete(requestId);
        reject(err);
      });
    });
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

const events = new EventManager();

const mp = {
  trigger(eventName, ...args) {
    fetch(`https://${getResourceName()}/ragemp:browserEvent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: eventName, args })
    });
  },

  invoke(eventName, ...args) {
    mp.trigger(eventName, ...args);
  },

  events
};

window.addEventListener("message", (nativeEvent) => {
  const data = nativeEvent.data;
  if (!data || typeof data !== "object") return;

  if (data.type === "__ragemp:exec" && data.code) {
    try { (0, eval)(data.code); } catch (e) { console.error("[ragemp:exec]", e); }
    return;
  }

  if (data.type === "__ragemp:reload") {
    location.reload();
    return;
  }

  if (data.event) {
    const args = Array.isArray(data.args) ? data.args : [];
    events._fire(data.event, ...args);
    return;
  }

  if (data.proc) {
    const handler = events._procs.get(data.proc);
    if (!handler) return;
    const args = Array.isArray(data.args) ? data.args : [];
    try {
      const result = handler(...args);
      Promise.resolve(result).then((value) => {
        fetch(`https://${getResourceName()}/ragemp:cefProcResult`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestId: data.requestId,
            result: value
          })
        });
      }).catch((err) => {
        fetch(`https://${getResourceName()}/ragemp:cefProcResult`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requestId: data.requestId,
            error: err instanceof Error ? err.message : String(err)
          })
        });
      });
    } catch (err) {
      fetch(`https://${getResourceName()}/ragemp:cefProcResult`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId: data.requestId,
          error: err instanceof Error ? err.message : String(err)
        })
      });
    }
    return;
  }

  if (data.procResult) {
    const pending = events._pendingProcs.get(data.requestId);
    if (!pending) return;
    events._pendingProcs.delete(data.requestId);
    if (data.error) {
      pending.reject(new Error(data.error));
    } else {
      pending.resolve(data.result);
    }
  }
});

globalThis.mp = mp;
mp.rpc = rpc;
rpc.register("__rpc:noop", () => true);
