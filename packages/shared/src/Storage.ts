declare function GetResourceKvpString(key: string): string | null;
declare function SetResourceKvpNoSync(key: string, value: string): void;
declare function SetResourceKvp(key: string, value: string): void;
declare function DeleteResourceKvpNoSync(key: string): void;
declare function DeleteResourceKvp(key: string): void;
declare function FlushResourceKvp(): void;
declare function StartFindKvp(prefix: string): number;
declare function FindKvp(handle: number): string | null;
declare function EndFindKvp(handle: number): void;
declare function queueMicrotask(callback: () => void): void;
declare function setTimeout(callback: () => void, ms: number): unknown;

const BLOB_KEY = "rmp_store_v2";
const LEGACY_PREFIX = "rmp_storage:";

function kvpGet(key: string): string | null {
  return typeof GetResourceKvpString === "function"
    ? GetResourceKvpString(key)
    : null;
}

function kvpSet(key: string, value: string): void {
  if (typeof SetResourceKvpNoSync === "function") {
    SetResourceKvpNoSync(key, value);
  } else if (typeof SetResourceKvp === "function") {
    SetResourceKvp(key, value);
  }
}

function kvpDelete(key: string): void {
  if (typeof DeleteResourceKvpNoSync === "function") {
    DeleteResourceKvpNoSync(key);
  } else if (typeof DeleteResourceKvp === "function") {
    DeleteResourceKvp(key);
  }
}

function kvpFlush(): void {
  if (typeof FlushResourceKvp === "function") FlushResourceKvp();
}

function stringify(obj: unknown): string {
  try {
    const json = JSON.stringify(obj === undefined ? {} : obj);
    return json === undefined ? "{}" : json;
  } catch {
    return "{}";
  }
}

export class StorageMp {
  _sessionData: Record<string, unknown>;
  _cache: Record<string, unknown> | null;
  _hydrated: boolean;
  _proxy: Record<string, unknown> | null;
  _subProxies: WeakMap<object, object> | null;
  _flushScheduled: boolean;

  constructor() {
    this._sessionData = {};
    this._cache = null;
    this._hydrated = false;
    this._proxy = null;
    this._subProxies = null;
    this._flushScheduled = false;
  }

  _ensureHydrated(): void {
    if (this._hydrated) return;
    this._hydrated = true;
    this._subProxies = new WeakMap();
    this._cache = this._hydrate();
  }

  _hydrate(): Record<string, unknown> {
    const raw = kvpGet(BLOB_KEY);
    if (raw !== null && raw !== undefined) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") return parsed as Record<string, unknown>;
      } catch {}
      return {};
    }
    return this._migrateLegacy();
  }

  _migrateLegacy(): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    if (
      typeof StartFindKvp !== "function" ||
      typeof FindKvp !== "function" ||
      typeof EndFindKvp !== "function"
    ) {
      return out;
    }
    let handle: number;
    try {
      handle = StartFindKvp(LEGACY_PREFIX);
    } catch {
      return out;
    }
    if (handle === undefined || handle === null || handle === -1) return out;
    const legacyKeys: string[] = [];
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
      EndFindKvp(handle!);
    }
    if (legacyKeys.length) {
      kvpSet(BLOB_KEY, stringify(out));
      for (const key of legacyKeys) kvpDelete(key);
      kvpFlush();
    }
    return out;
  }

  _scheduleFlush(): void {
    if (this._flushScheduled) return;
    this._flushScheduled = true;
    const run = (): void => {
      this._flushScheduled = false;
      kvpSet(BLOB_KEY, stringify(this._cache));
      kvpFlush();
    };
    if (typeof queueMicrotask === "function") queueMicrotask(run);
    else if (typeof setTimeout === "function") setTimeout(run, 0);
    else run();
  }

  _wrap(obj: Record<string, unknown>): Record<string, unknown> {
    if (!obj || typeof obj !== "object") return obj;
    const cached = this._subProxies!.get(obj);
    if (cached) return cached as Record<string, unknown>;
    const self = this;
    const proxy = new Proxy(obj, {
      get(target: Record<string, unknown>, prop: string | symbol, receiver: unknown): unknown {
        const value = Reflect.get(target, prop, receiver);
        if (value && typeof value === "object" && typeof prop === "string") {
          return self._wrap(value as Record<string, unknown>);
        }
        return value;
      },
      set(target: Record<string, unknown>, prop: string | symbol, value: unknown, receiver: unknown): boolean {
        Reflect.set(target, prop, value, receiver);
        self._scheduleFlush();
        return true;
      },
      deleteProperty(target: Record<string, unknown>, prop: string | symbol): boolean {
        Reflect.deleteProperty(target, prop);
        self._scheduleFlush();
        return true;
      },
    });
    this._subProxies!.set(obj, proxy);
    return proxy;
  }

  get data(): Record<string, unknown> {
    this._ensureHydrated();
    if (!this._proxy) this._proxy = this._wrap(this._cache!);
    return this._proxy!;
  }

  set data(value: Record<string, unknown>) {
    this._ensureHydrated();
    this._cache = value && typeof value === "object" ? { ...value } : {};
    this._subProxies = new WeakMap();
    this._proxy = null;
    this._scheduleFlush();
  }

  get sessionData(): Record<string, unknown> {
    return this._sessionData;
  }

  set sessionData(value: Record<string, unknown>) {
    this._sessionData = value || {};
  }

  flush(): void {
    this._ensureHydrated();
    this._flushScheduled = false;
    kvpSet(BLOB_KEY, stringify(this._cache));
    kvpFlush();
  }
}
