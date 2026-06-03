import { defineInternals } from "./defineInternals";
import type { Entity } from "../Entity";

export type LifecycleEvent = "entityCreated" | "entityDestroyed";
type LifecycleSink = (event: LifecycleEvent, entity: Entity) => void;

let lifecycleSink: LifecycleSink | null = null;

export function setPoolLifecycleSink(fn: LifecycleSink): void {
  lifecycleSink = fn;
}

export interface PoolStore<T extends Entity = Entity> {
  entities: Map<number, T>;
  maxStreamed: number;
}

const Store = defineInternals<PoolStore>();

export function initPool(pool: object): PoolStore {
  return Store.init(pool, { entities: new Map(), maxStreamed: 64 });
}

export function poolStore<T extends Entity = Entity>(pool: object): PoolStore<T> {
  return Store.get(pool) as PoolStore<T>;
}

export function poolAdd(pool: object, entity: Entity): void {
  Store.get(pool).entities.set(entity.id, entity);
  lifecycleSink?.("entityCreated", entity);
}

export function poolRemove(pool: object, id: number): void {
  const store = Store.get(pool);
  const entity = store.entities.get(id);
  store.entities.delete(id);
  if (entity) lifecycleSink?.("entityDestroyed", entity);
}
