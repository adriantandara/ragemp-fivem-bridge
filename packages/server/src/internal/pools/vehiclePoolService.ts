import { defineInternals, poolStore, removeFromPool, Registry, IdAllocator } from "@ragemp-fivem-bridge/shared/internal";
import type { VehicleMp } from "../../Entities/VehicleMp";
import type { VehicleMpPool } from "../../Pools/VehicleMpPool";
import { VehicleInternals } from "../vehicleInternals";
import { entityDestroyed } from "../../utils/entityRegistry";

interface VehiclePoolState {
  netIdToEntity: Registry<number, VehicleMp>;
}

const Store = defineInternals<VehiclePoolState>();

export const vehicleIds = new IdAllocator();

export interface CreateHandleOpts {
  modelName?: string;
  vehicleType?: string;
  heading: number;
  dimension: number;
}

export type CreateHandleStrategy = (
  modelHash: number,
  x: number,
  y: number,
  z: number,
  heading: number,
  opts: CreateHandleOpts,
) => number;

export interface SpawnRequest {
  vehicle: VehicleMp;
  modelHash: number;
  bind: (handle: number) => void;
  reject: (reason: string) => void;
}

export type SpawnFallback = (req: SpawnRequest) => void;

const DEFAULT_STRATEGY: CreateHandleStrategy = (h, x, y, z, heading) =>
  CreateVehicle(h, x, y, z, heading, true, true);

let createStrategy: CreateHandleStrategy = DEFAULT_STRATEGY;
let strategyDefaultOrphanMode: number | undefined;
let spawnFallback: SpawnFallback | null = null;

export function setVehicleCreateStrategy(
  fn: CreateHandleStrategy | null,
  opts?: { defaultOrphanMode?: number },
): void {
  createStrategy = fn ?? DEFAULT_STRATEGY;
  strategyDefaultOrphanMode = fn ? opts?.defaultOrphanMode : undefined;
}

export function getVehicleCreateStrategy(): CreateHandleStrategy {
  return createStrategy;
}

export function getStrategyDefaultOrphanMode(): number | undefined {
  return strategyDefaultOrphanMode;
}

export function setVehicleSpawnFallback(fn: SpawnFallback | null): void {
  spawnFallback = fn;
}

export function getVehicleSpawnFallback(): SpawnFallback | null {
  return spawnFallback;
}

export function setupVehiclePool(pool: VehicleMpPool): void {
  Store.init(pool, { netIdToEntity: new Registry() });
}

export function vehicleNetIdMap(pool: object): Registry<number, VehicleMp> {
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
  vehicleIds.free(id);
}
