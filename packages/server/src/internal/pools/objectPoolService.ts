import { defineInternals, poolStore, removeFromPool, Registry } from "@ragemp-fivem-bridge/shared/internal";
import type { ObjectMp } from "../../Entities/ObjectMp";
import type { ObjectMpPool } from "../../Pools/ObjectMpPool";
import { ObjectInternals } from "../objectInternals";
import { entityDestroyed } from "../../utils/entityRegistry";

interface ObjectPoolState {
  netIdToEntity: Registry<number, ObjectMp>;
}

const Store = defineInternals<ObjectPoolState>();

export function setupObjectPool(pool: ObjectMpPool): void {
  Store.init(pool, { netIdToEntity: new Registry() });
}

export function objectNetIdMap(pool: object): Registry<number, ObjectMp> {
  return Store.get(pool).netIdToEntity;
}

export function removeFromObjectPool(pool: ObjectMpPool, id: number): void {
  const entity = poolStore(pool).entities.get(id) as unknown as ObjectMp | undefined;
  if (entity) {
    const rec = ObjectInternals.get(entity);
    if (rec.cachedNetId !== undefined) {
      Store.get(pool).netIdToEntity.delete(rec.cachedNetId);
      rec.cachedNetId = undefined;
    }
  }
  entityDestroyed("object", id);
  removeFromPool(pool, id);
}
