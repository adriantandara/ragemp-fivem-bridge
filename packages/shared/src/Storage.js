const PREFIX = "rmp_storage:";

function kvpGet(key) {
  return typeof GetResourceKvpString === "function"
    ? GetResourceKvpString(key)
    : null;
}

function kvpWrite(key, value) {
  if (typeof SetResourceKvpNoSync === "function") {
    SetResourceKvpNoSync(key, value);
  } else if (typeof SetResourceKvp === "function") {
    SetResourceKvp(key, value);
  }
}

function kvpDelete(key) {
  if (typeof DeleteResourceKvpNoSync === "function") {
    DeleteResourceKvpNoSync(key);
  } else if (typeof DeleteResourceKvp === "function") {
    DeleteResourceKvp(key);
  }
}

function kvpFlush() {
  if (typeof FlushResourceKvp === "function") FlushResourceKvp();
}

export class StorageMp {
  constructor() {
    this._sessionData = {};
    this._cache = this._hydrate();
    this._flushScheduled = false;
    this._topProxy = null;
    this._subProxies = new WeakMap();
  }

  _hydrate() {
    const out = {};
    if (
      typeof StartFindKvp !== "function" ||
      typeof FindKvp !== "function" ||
      typeof EndFindKvp !== "function"
    ) {
      return out;
    }
    let handle;
    try {
      handle = StartFindKvp(PREFIX);
    } catch {
      return out;
    }
    if (handle === undefined || handle === null || handle === -1) return out;
    try {
      for (;;) {
        const fullKey = FindKvp(handle);
        if (fullKey === null || fullKey === undefined || fullKey === "") break;
        const shortKey = fullKey.slice(PREFIX.length);
        const raw = kvpGet(fullKey);
        if (raw !== null && raw !== undefined) {
          try {
            out[shortKey] = JSON.parse(raw);
          } catch {
            out[shortKey] = raw;
          }
        }
      }
    } finally {
      EndFindKvp(handle);
    }
    return out;
  }

  _scheduleFlush() {
    if (this._flushScheduled) return;
    this._flushScheduled = true;
    const run = () => {
      this._flushScheduled = false;
      kvpFlush();
    };
    if (typeof queueMicrotask === "function") queueMicrotask(run);
    else if (typeof setTimeout === "function") setTimeout(run, 0);
    else run();
  }

  _persistKey(key) {
    const value = this._cache[key];
    if (value === undefined) {
      kvpDelete(PREFIX + key);
    } else {
      kvpWrite(PREFIX + key, JSON.stringify(value));
    }
    this._scheduleFlush();
  }

  _wrap(obj, rootKey) {
    if (!obj || typeof obj !== "object") return obj;
    const cached = this._subProxies.get(obj);
    if (cached) return cached;
    const self = this;
    const proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (value && typeof value === "object" && typeof prop === "string") {
          return self._wrap(value, rootKey);
        }
        return value;
      },
      set(target, prop, value, receiver) {
        Reflect.set(target, prop, value, receiver);
        self._persistKey(rootKey);
        return true;
      },
      deleteProperty(target, prop) {
        Reflect.deleteProperty(target, prop);
        self._persistKey(rootKey);
        return true;
      },
    });
    this._subProxies.set(obj, proxy);
    return proxy;
  }

  get data() {
    if (this._topProxy) return this._topProxy;
    const self = this;
    this._topProxy = new Proxy(this._cache, {
      get(target, prop, receiver) {
        if (typeof prop !== "string") return Reflect.get(target, prop, receiver);
        const value = target[prop];
        return value && typeof value === "object"
          ? self._wrap(value, prop)
          : value;
      },
      set(target, prop, value) {
        if (typeof prop !== "string") return false;
        target[prop] = value;
        self._persistKey(prop);
        return true;
      },
      deleteProperty(target, prop) {
        if (typeof prop !== "string") return false;
        const existed = prop in target;
        delete target[prop];
        if (existed) self._persistKey(prop);
        return true;
      },
    });
    return this._topProxy;
  }

  set data(value) {
    for (const key of Object.keys(this._cache)) {
      kvpDelete(PREFIX + key);
    }
    this._cache = value && typeof value === "object" ? { ...value } : {};
    this._topProxy = null;
    this._subProxies = new WeakMap();
    for (const key of Object.keys(this._cache)) {
      kvpWrite(PREFIX + key, JSON.stringify(this._cache[key]));
    }
    this._scheduleFlush();
  }

  get sessionData() {
    return this._sessionData;
  }

  set sessionData(value) {
    this._sessionData = value || {};
  }

  flush() {
    kvpFlush();
  }
}
