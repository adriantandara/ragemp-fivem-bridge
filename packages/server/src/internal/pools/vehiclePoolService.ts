import { defineInternals, poolStore, removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import type { VehicleMp } from "../../Entities/VehicleMp";
import type { VehicleMpPool } from "../../Pools/VehicleMpPool";
import { VehicleInternals } from "../vehicleInternals";
import { entityDestroyed } from "../../utils/entityRegistry";

interface VehiclePoolState {
  netIdToEntity: Map<number, VehicleMp>;
}

const Store = defineInternals<VehiclePoolState>();

export function setupVehiclePool(pool: VehicleMpPool): void {
  Store.init(pool, { netIdToEntity: new Map() });
}

export function vehicleNetIdMap(pool: object): Map<number, VehicleMp> {
  return Store.get(pool).netIdToEntity;
}

export function removeFromVehiclePool(pool: VehicleMpPool, id: number): void {
  const entity = poolStore(pool).entities.get(id) as unknown as VehicleMp | undefined;
  if (entity) {
    const rec = VehicleInternals.get(entity);
    if (rec.cachedNetId !== undefined) {
      Store.get(pool).netIdToEntity.delete(rec.cachedNetId);
      rec.cachedNetId = undefined;
    }
  }
  entityDestroyed("vehicle", id);
  removeFromPool(pool, id);
}
