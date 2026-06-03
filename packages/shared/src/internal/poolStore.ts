import { defineInternals } from "./defineInternals";
import { INVALID_REMOTE_ID } from "./entityInternals";
import type { Entity } from "../Entity";

export type LifecycleEvent = "entityCreated" | "entityDestroyed";
type LifecycleSink = (event: LifecycleEvent, entity: Entity) => void;

let lifecycleSink: LifecycleSink | null = null;

export function setPoolLifecycleSink(fn: LifecycleSink): void {
  lifecycleSink = fn;
}

export interface PoolStore<T extends Entity = Entity> {
  entities: Map<number, T>;
  remoteIndex: Map<number, T>;
  maxStreamed: number;
}

const Store = defineInternals<PoolStore>();

export function initPool(pool: object): PoolStore {
  return Store.init(pool, { entities: new Map(), remoteIndex: new Map(), maxStreamed: 64 });
}

export function poolStore<T extends Entity = Entity>(pool: object): PoolStore<T> {
  return Store.get(pool) as PoolStore<T>;
}

export function poolAdd(pool: object, entity: Entity): void {
  const store = Store.get(pool);
  store.entities.set(entity.id, entity);
  if (entity.remoteId !== INVALID_REMOTE_ID) store.remoteIndex.set(entity.remoteId, entity);
  lifecycleSink?.("entityCreated", entity);
}

export function poolRemove(pool: object, id: number): void {
  const store = Store.get(pool);
  const entity = store.entities.get(id);
  store.entities.delete(id);
  if (entity) {
    if (store.remoteIndex.get(entity.remoteId) === entity) store.remoteIndex.delete(entity.remoteId);
    lifecycleSink?.("entityDestroyed", entity);
  }
}

export function poolAtRemote<T extends Entity = Entity>(pool: object, remoteId: number): T | null {
  return (Store.get(pool).remoteIndex.get(remoteId) as T | undefined) ?? null;
}
