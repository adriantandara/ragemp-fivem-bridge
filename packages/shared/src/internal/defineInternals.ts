export interface Internals<T extends object> {
  init(owner: object, value: T): T;
  get(owner: object): T;
  peek(owner: object): T | undefined;
}

export function defineInternals<T extends object>(): Internals<T> {
  const store = new WeakMap<object, T>();
  return {
    init(owner: object, value: T): T {
      store.set(owner, value);
      return value;
    },
    get(owner: object): T {
      const value = store.get(owner);
      if (value === undefined) {
        throw new Error("internals accessed before initialization");
      }
      return value;
    },
    peek(owner: object): T | undefined {
      return store.get(owner);
    },
  };
}
