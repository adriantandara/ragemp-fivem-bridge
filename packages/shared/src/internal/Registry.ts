interface RegistryIndex<V> {
  keyFn: (value: V) => unknown;
  map: Map<unknown, V>;
}

export class Registry<K, V> {
  private readonly store = new Map<K, V>();
  private readonly indexes = new Map<string, RegistryIndex<V>>();

  index(name: string, keyFn: (value: V) => unknown): this {
    const map = new Map<unknown, V>();
    for (const value of this.store.values()) {
      const k = keyFn(value);
      if (k !== undefined && k !== null) map.set(k, value);
    }
    this.indexes.set(name, { keyFn, map });
    return this;
  }

  set(key: K, value: V): this {
    const previous = this.store.get(key);
    if (previous !== undefined) this.unindex(previous);
    this.store.set(key, value);
    this.reindex(value);
    return this;
  }

  get(key: K): V | undefined {
    return this.store.get(key);
  }

  has(key: K): boolean {
    return this.store.has(key);
  }

  delete(key: K): boolean {
    const value = this.store.get(key);
    if (value !== undefined) this.unindex(value);
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
    for (const index of this.indexes.values()) index.map.clear();
  }

  get size(): number {
    return this.store.size;
  }

  values(): IterableIterator<V> {
    return this.store.values();
  }

  keys(): IterableIterator<K> {
    return this.store.keys();
  }

  entries(): IterableIterator<[K, V]> {
    return this.store.entries();
  }

  forEach(fn: (value: V, key: K) => void): void {
    this.store.forEach((value, key) => fn(value, key));
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.store[Symbol.iterator]();
  }

  by(indexName: string, key: unknown): V | undefined {
    return this.indexes.get(indexName)?.map.get(key);
  }

  deleteBy(indexName: string, key: unknown): boolean {
    const value = this.indexes.get(indexName)?.map.get(key);
    if (value === undefined) return false;
    for (const [primaryKey, v] of this.store) {
      if (v === value) return this.delete(primaryKey);
    }
    return false;
  }

  private reindex(value: V): void {
    for (const index of this.indexes.values()) {
      const k = index.keyFn(value);
      if (k !== undefined && k !== null) index.map.set(k, value);
    }
  }

  private unindex(value: V): void {
    for (const index of this.indexes.values()) {
      const k = index.keyFn(value);
      if (k !== undefined && k !== null) index.map.delete(k);
    }
  }
}
