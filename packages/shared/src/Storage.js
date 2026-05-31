const BLOB_KEY = "rmp_store_v2";
const LEGACY_PREFIX = "rmp_storage:";

function kvpGet(key) {
  return typeof GetResourceKvpString === "function"
    ? GetResourceKvpString(key)
    : null;
}

function kvpSet(key, value) {
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

function stringify(obj) {
  try {
    const json = JSON.stringify(obj === undefined ? {} : obj);
    return json === undefined ? "{}" : json;
  } catch {
    return "{}";
  }
}

export class StorageMp {
  constructor() {
    this._sessionData = {};
    this._cache = null;
    this._hydrated = false;
    this._proxy = null;
    this._subProxies = null;
    this._flushScheduled = false;
  }

  _ensureHydrated() {
    if (this._hydrated) return;
    this._hydrated = true;
    this._subProxies = new WeakMap();
    this._cache = this._hydrate();
  }

  _hydrate() {
    const raw = kvpGet(BLOB_KEY);
    if (raw !== null && raw !== undefined) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed;
      } catch {}
      return {};
    }
    return this._migrateLegacy();
  }

  _migrateLegacy() {
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
      handle = StartFindKvp(LEGACY_PREFIX);
    } catch {
      return out;
    }
    if (handle === undefined || handle === null || handle === -1) return out;
    const legacyKeys = [];
    try {
      for (;;) {
        const fullKey = FindKvp(handle);
        if (fullKey === null || fullKey === undefined || fullKey === "") break;
        legacyKeys.push(fullKey);
        const shortKey = fullKey.slice(LEGACY_PREFIX.length);
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
    if (legacyKeys.length) {
      kvpSet(BLOB_KEY, stringify(out));
      for (const key of legacyKeys) kvpDelete(key);
      kvpFlush();
    }
    return out;
  }

  _scheduleFlush() {
    if (this._flushScheduled) return;
    this._flushScheduled = true;
    const run = () => {
      this._flushScheduled = false;
      kvpSet(BLOB_KEY, stringify(this._cache));
      kvpFlush();
    };
    if (typeof queueMicrotask === "function") queueMicrotask(run);
    else if (typeof setTimeout === "function") setTimeout(run, 0);
    else run();
  }

  _wrap(obj) {
    if (!obj || typeof obj !== "object") return obj;
    const cached = this._subProxies.get(obj);
    if (cached) return cached;
    const self = this;
    const proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        if (value && typeof value === "object" && typeof prop === "string") {
          return self._wrap(value);
        }
        return value;
      },
      set(target, prop, value, receiver) {
        Reflect.set(target, prop, value, receiver);
        self._scheduleFlush();
        return true;
      },
      deleteProperty(target, prop) {
        Reflect.deleteProperty(target, prop);
        self._scheduleFlush();
        return true;
      },
    });
    this._subProxies.set(obj, proxy);
    return proxy;
  }

  get data() {
    this._ensureHydrated();
    if (!this._proxy) this._proxy = this._wrap(this._cache);
    return this._proxy;
  }

  set data(value) {
    this._ensureHydrated();
    this._cache = value && typeof value === "object" ? { ...value } : {};
    this._subProxies = new WeakMap();
    this._proxy = null;
    this._scheduleFlush();
  }

  get sessionData() {
    return this._sessionData;
  }

  set sessionData(value) {
    this._sessionData = value || {};
  }

  flush() {
    this._ensureHydrated();
    this._flushScheduled = false;
    kvpSet(BLOB_KEY, stringify(this._cache));
    kvpFlush();
  }
}
