import { Vector3Like } from "./Vector3";
import { initPool, poolStore, setPoolLifecycleSink } from "./internal/poolStore";

export interface PoolEntity {
  id: number;
  dimension: number;
  position: { distance(v: Vector3Like): number; distanceSqr(v: Vector3Like): number };
  [key: string]: unknown;
}

export { setPoolLifecycleSink };

export class Pool {
  constructor() {
    initPool(this);
  }

  get length(): number {
    return poolStore(this).entities.size;
  }

  get size(): number {
    return poolStore(this).entities.size;
  }

  at(id: number): PoolEntity | null {
    return poolStore(this).entities.get(id) ?? null;
  }

  exists(entity: number | PoolEntity): boolean {
    const entities = poolStore(this).entities;
    if (typeof entity === "number") {
      return entities.has(entity);
    }
    if (!entity || typeof entity !== "object") return false;
    return entities.has(entity.id);
  }

  forEach(fn: (entity: PoolEntity) => void): void {
    poolStore(this).entities.forEach(fn);
  }

  apply(fn: (entity: PoolEntity) => void): void {
    this.forEach(fn);
  }

  toArray(): PoolEntity[] {
    return Array.from(poolStore(this).entities.values());
  }

  forEachFast(fn: (entity: PoolEntity) => void): void {
    this.forEach(fn);
  }

  forEachInRange(position: Vector3Like, range: number, dimensionOrFn: number | ((entity: PoolEntity) => void), maybeFn?: (entity: PoolEntity) => void): void {
    const hasDimension = typeof dimensionOrFn === "number";
    const fn = hasDimension ? maybeFn! : (dimensionOrFn as (entity: PoolEntity) => void);
    const dimension = hasDimension ? (dimensionOrFn as number) : null;
    poolStore(this).entities.forEach((entity) => {
      if (hasDimension && entity.dimension !== dimension) return;
      if (entity.position.distance(position) <= range) {
        fn(entity);
      }
    });
  }

  forEachInDimension(dimension: number, fn: (entity: PoolEntity) => void): void {
    poolStore(this).entities.forEach((entity) => {
      if (entity.dimension === dimension) {
        fn(entity);
      }
    });
  }

  getClosest(position: Vector3Like, limit: number = 1): PoolEntity[] {
    if (limit === 1) {
      let best: PoolEntity | null = null;
      let bestDist = Infinity;
      poolStore(this).entities.forEach((entity) => {
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

  toArrayFast(): PoolEntity[] {
    return this.toArray();
  }

  get streamed(): PoolEntity[] {
    return this.toArray();
  }

  get maxStreamed(): number {
    return poolStore(this).maxStreamed;
  }

  set maxStreamed(v: number) {
    poolStore(this).maxStreamed = v;
  }

  forEachInStreamRange(fn: (entity: PoolEntity) => void): void {
    this.forEach(fn);
  }

  getClosestInDimension(position: Vector3Like, dimension: number, limit: number = 1): PoolEntity[] {
    if (limit === 1) {
      let best: PoolEntity | null = null;
      let bestDist = Infinity;
      poolStore(this).entities.forEach((entity) => {
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

  [Symbol.iterator](): IterableIterator<PoolEntity> {
    return poolStore(this).entities.values();
  }
}