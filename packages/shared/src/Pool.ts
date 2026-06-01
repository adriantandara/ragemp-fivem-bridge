import { Vector3Like } from "./Vector3";

export interface PoolEntity {
  id: number;
  dimension: number;
  position: { distance(v: Vector3Like): number; distanceSqr(v: Vector3Like): number };
  [key: string]: unknown;
}

type LifecycleEvent = "entityCreated" | "entityDestroyed";
type LifecycleSink = (event: LifecycleEvent, entity: PoolEntity) => void;

let _lifecycleSink: LifecycleSink | null = null;

export function setPoolLifecycleSink(fn: LifecycleSink): void {
  _lifecycleSink = fn;
}

export class Pool {
  _entities: Map<number, PoolEntity> = new Map();

  get length(): number {
    return this._entities.size;
  }

  get size(): number {
    return this._entities.size;
  }

  at(id: number): PoolEntity | null {
    return this._entities.get(id) ?? null;
  }

  exists(entity: number | PoolEntity): boolean {
    if (typeof entity === "number") {
      return this._entities.has(entity);
    }
    if (!entity || typeof entity !== "object") return false;
    return this._entities.has(entity.id);
  }

  forEach(fn: (entity: PoolEntity) => void): void {
    this._entities.forEach((entity) => fn(entity));
  }

  apply(fn: (entity: PoolEntity) => void): void {
    this.forEach(fn);
  }

  toArray(): PoolEntity[] {
    return Array.from(this._entities.values());
  }

  _add(entity: PoolEntity): void {
    this._entities.set(entity.id, entity);
    _lifecycleSink?.("entityCreated", entity);
  }

  _remove(id: number): void {
    const entity = this._entities.get(id);
    this._entities.delete(id);
    if (entity) _lifecycleSink?.("entityDestroyed", entity);
  }

  forEachFast(fn: (entity: PoolEntity) => void): void {
    this.forEach(fn);
  }

  forEachInRange(position: Vector3Like, range: number, dimensionOrFn: number | ((entity: PoolEntity) => void), maybeFn?: (entity: PoolEntity) => void): void {
    const hasDimension = typeof dimensionOrFn === "number";
    const fn = hasDimension ? maybeFn! : (dimensionOrFn as (entity: PoolEntity) => void);
    const dimension = hasDimension ? (dimensionOrFn as number) : null;
    this._entities.forEach((entity) => {
      if (hasDimension && entity.dimension !== dimension) return;
      if (entity.position.distance(position) <= range) {
        fn(entity);
      }
    });
  }

  forEachInDimension(dimension: number, fn: (entity: PoolEntity) => void): void {
    this._entities.forEach((entity) => {
      if (entity.dimension === dimension) {
        fn(entity);
      }
    });
  }

  getClosest(position: Vector3Like, limit: number = 1): PoolEntity[] {
    if (limit === 1) {
      let best: PoolEntity | null = null;
      let bestDist = Infinity;
      this._entities.forEach((entity) => {
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
    return (this as unknown as { _maxStreamed?: number })._maxStreamed ?? 64;
  }

  set maxStreamed(v: number) {
    (this as unknown as { _maxStreamed?: number })._maxStreamed = v;
  }

  forEachInStreamRange(fn: (entity: PoolEntity) => void): void {
    this.forEach(fn);
  }

  getClosestInDimension(position: Vector3Like, dimension: number, limit: number = 1): PoolEntity[] {
    if (limit === 1) {
      let best: PoolEntity | null = null;
      let bestDist = Infinity;
      this._entities.forEach((entity) => {
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
    return this._entities.values();
  }
}
