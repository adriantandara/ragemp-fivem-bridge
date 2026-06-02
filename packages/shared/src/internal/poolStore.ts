import { defineInternals } from "./defineInternals";
import type { PoolEntity } from "../Pool";

export type LifecycleEvent = "entityCreated" | "entityDestroyed";
type LifecycleSink = (event: LifecycleEvent, entity: PoolEntity) => void;

let lifecycleSink: LifecycleSink | null = null;

export function setPoolLifecycleSink(fn: LifecycleSink): void {
  lifecycleSink = fn;
}

export interface PoolStore {
  entities: Map<number, PoolEntity>;
  maxStreamed: number;
}

const Store = defineInternals<PoolStore>();

export function initPool(pool: object): PoolStore {
  return Store.init(pool, { entities: new Map(), maxStreamed: 64 });
}

export function poolStore(pool: object): PoolStore {
  return Store.get(pool);
}

export function poolAdd(pool: object, entity: PoolEntity): void {
  Store.get(pool).entities.set(entity.id, entity);
  lifecycleSink?.("entityCreated", entity);
}

export function poolRemove(pool: object, id: number): void {
  const store = Store.get(pool);
  const entity = store.entities.get(id);
  store.entities.delete(id);
  if (entity) lifecycleSink?.("entityDestroyed", entity);
}
