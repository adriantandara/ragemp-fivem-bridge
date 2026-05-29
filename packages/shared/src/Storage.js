export class StorageMp {
  constructor() {
    this._sessionData = {};
  }

  get data() {
    return new Proxy(
      {},
      {
        get(_, key) {
          const val = GetResourceKvpString(key);
          if (val === null || val === undefined) return undefined;
          try {
            return JSON.parse(val);
          } catch {
            return val;
          }
        },
        set(_, key, value) {
          SetResourceKvp(key, JSON.stringify(value));
          return true;
        },
        deleteProperty(_, key) {
          DeleteResourceKvp(key);
          return true;
        },
      }
    );
  }

  get sessionData() {
    return this._sessionData;
  }

  set sessionData(v) {
    this._sessionData = v;
  }

  flush() {
    if (typeof FlushResourceKvp === "function") FlushResourceKvp();
  }
}
