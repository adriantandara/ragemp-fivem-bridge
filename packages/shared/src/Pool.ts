import { Vector3Like } from "./Vector3";
import { initPool, poolStore, poolAtRemote, setPoolLifecycleSink } from "./internal/poolStore";
import { Entity } from "./Entity";

export { setPoolLifecycleSink };

export class Pool<T extends Entity> {
  constructor() {
    initPool(this);
  }

  get length(): number {
    return poolStore<T>(this).entities.size;
  }

  get size(): number {
    return poolStore<T>(this).entities.size;
  }

  at(id: number): T | null {
    return poolStore<T>(this).entities.get(id) ?? null;
  }

  atRemoteId(remoteId: number): T | null {
    return poolAtRemote<T>(this, remoteId);
  }

  exists(entity: number | T): boolean {
    const entities = poolStore<T>(this).entities;
    if (typeof entity === "number") {
      return entities.has(entity);
    }
    if (!entity || typeof entity !== "object") return false;
    return entities.has(entity.id);
  }

  forEach(fn: (entity: T) => void): void {
    poolStore<T>(this).entities.forEach((entity) => fn(entity));
  }

  apply(fn: (entity: T) => void): void {
    this.forEach(fn);
  }

  toArray(): T[] {
    return Array.from(poolStore<T>(this).entities.values());
  }

  forEachFast(fn: (entity: T) => void): void {
    this.forEach(fn);
  }

  forEachInRange(position: Vector3Like, range: number, dimensionOrFn: number | ((entity: T) => void), maybeFn?: (entity: T) => void): void {
    const hasDimension = typeof dimensionOrFn === "number";
    const fn = hasDimension ? maybeFn! : (dimensionOrFn as (entity: T) => void);
    const dimension = hasDimension ? (dimensionOrFn as number) : null;
    poolStore<T>(this).entities.forEach((entity) => {
      if (hasDimension && entity.dimension !== dimension) return;
      if (entity.position.distance(position) <= range) {
        fn(entity);
      }
    });
  }

  forEachInDimension(dimension: number, fn: (entity: T) => void): void {
    poolStore<T>(this).entities.forEach((entity) => {
      if (entity.dimension === dimension) {
        fn(entity);
      }
    });
  }

  getClosest(position: Vector3Like, limit: number = 1): T[] {
    if (limit === 1) {
      let best: T | null = null;
      let bestDist = Infinity;
      poolStore<T>(this).entities.forEach((entity) => {
        const d = entity.position.distanceSqr(position);
        if (d < bestDist) {
          bestDist = d;
          best = entity;
        }
      });
      return best ? [best] : [];
    }
    return this.toArray()
      .map((entity) => ({ entity, dist: entity.position.distanceSqr(position) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, limit)
      .map((x) => x.entity);
  }

  toArrayFast(): T[] {
    return this.toArray();
  }

  get streamed(): T[] {
    return this.toArray();
  }

  get maxStreamed(): number {
    return poolStore<T>(this).maxStreamed;
  }

  set maxStreamed(v: number) {
    poolStore<T>(this).maxStreamed = v;
  }

  forEachInStreamRange(fn: (entity: T) => void): void {
    this.forEach(fn);
  }

  getClosestInDimension(position: Vector3Like, dimension: number, limit: number = 1): T[] {
    if (limit === 1) {
      let best: T | null = null;
      let bestDist = Infinity;
      poolStore<T>(this).entities.forEach((entity) => {
        if (entity.dimension !== dimension) return;
        const d = entity.position.distanceSqr(position);
        if (d < bestDist) {
          bestDist = d;
          best = entity;
        }
      });
      return best ? [best] : [];
    }
    return this.toArray()
      .filter((entity) => entity.dimension === dimension)
      .map((entity) => ({ entity, dist: entity.position.distanceSqr(position) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, limit)
      .map((x) => x.entity);
  }

  [Symbol.iterator](): IterableIterator<T> {
    return poolStore<T>(this).entities.values();
  }
}
