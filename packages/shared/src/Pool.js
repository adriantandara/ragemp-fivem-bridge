export class Pool {
  _entities = new Map();

  get length() {
    return this._entities.size;
  }

  get size() {
    return this._entities.size;
  }

  at(id) {
    return this._entities.get(id) ?? null;
  }

  exists(entity) {
    if (typeof entity === "number") {
      return this._entities.has(entity);
    }
    return this._entities.has(entity.id);
  }

  forEach(fn) {
    this._entities.forEach((entity) => fn(entity));
  }

  apply(fn) {
    this.forEach(fn);
  }

  toArray() {
    return Array.from(this._entities.values());
  }

  _add(entity) {
    this._entities.set(entity.id, entity);
    if (globalThis.mp?.events) {
      globalThis.mp.events._fire("entityCreated", entity);
      globalThis.mp.events._fire("entityStreamIn", entity);
    }
  }

  _remove(id) {
    const entity = this._entities.get(id);
    this._entities.delete(id);
    if (entity && globalThis.mp?.events) {
      globalThis.mp.events._fire("entityDestroyed", entity);
      globalThis.mp.events._fire("entityStreamOut", entity);
    }
  }

  forEachFast(fn) {
    this.forEach(fn);
  }

  forEachInRange(position, range, dimensionOrFn, maybeFn) {
    const hasDimension = typeof dimensionOrFn === "number";
    const fn = hasDimension ? maybeFn : dimensionOrFn;
    const dimension = hasDimension ? dimensionOrFn : null;
    this._entities.forEach((entity) => {
      if (hasDimension && entity.dimension !== dimension) return;
      if (entity.position.distance(position) <= range) {
        fn(entity);
      }
    });
  }

  forEachInDimension(dimension, fn) {
    this._entities.forEach((entity) => {
      if (entity.dimension === dimension) {
        fn(entity);
      }
    });
  }

  getClosest(position, limit = 1) {
    const sorted = this.toArray()
      .map((entity) => ({ entity, dist: entity.position.distance(position) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, limit)
      .map((x) => x.entity);
    return sorted;
  }

  toArrayFast() {
    return this.toArray();
  }

  get streamed() {
    return this.toArray();
  }

  get maxStreamed() {
    return this._maxStreamed ?? 64;
  }

  set maxStreamed(v) {
    this._maxStreamed = v;
  }

  forEachInStreamRange(fn) {
    this.forEach(fn);
  }

  getClosestInDimension(position, dimension, limit = 1) {
    const sorted = this.toArray()
      .filter((entity) => entity.dimension === dimension)
      .map((entity) => ({ entity, dist: entity.position.distance(position) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, limit)
      .map((x) => x.entity);
    return sorted;
  }

  [Symbol.iterator]() {
    return this._entities.values();
  }
}
