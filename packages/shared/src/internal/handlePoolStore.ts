import { defineInternals } from "./defineInternals";
import { poolStore, poolRemove } from "./poolStore";
import { Registry } from "./Registry";
import type { HandlePoolEntity } from "../HandlePool";

export interface HandlePoolStore {
  handleToEntity: Registry<number, HandlePoolEntity>;
}

const Store = defineInternals<HandlePoolStore>();

export function initHandlePool(pool: object): HandlePoolStore {
  return Store.init(pool, { handleToEntity: new Registry() });
}

export function handlePoolStore(pool: object): HandlePoolStore {
  return Store.get(pool);
}

export function peekHandlePool(pool: object): HandlePoolStore | undefined {
  return Store.peek(pool);
}

export function removeFromPool(pool: object, id: number): void {
  const handles = Store.peek(pool);
  if (handles) {
    const entity = poolStore(pool).entities.get(id) as { handle?: number; _handle?: number } | undefined;
    if (entity) handles.handleToEntity.delete(entity.handle ?? entity._handle ?? -1);
  }
  poolRemove(pool, id);
}
