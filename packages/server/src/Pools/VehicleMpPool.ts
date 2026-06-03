import { HandlePool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolStore, poolAdd, handlePoolStore, EntityInternals, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { VehicleMp } from "../Entities/VehicleMp";
import { whenNetworked } from "../utils/whenNetworked";
import { safeGetEntityFromNetId } from "../utils/netId";
import { entityCreated, entityBindNetId } from "../utils/entityRegistry";
import { VehicleInternals , emitVehicle } from "../internal/vehicleInternals";
import { setupVehiclePool, vehicleNetIdMap } from "../internal/pools/vehiclePoolService";

let vehicleIdCounter = 0;

export class VehicleMpPool extends HandlePool {
  constructor() {
    super();
    setupVehiclePool(this);
  }

  new(model: number | string, position: Vector3, options: {
    heading?: number;
    dimension?: number;
    orphanMode?: number;
    alpha?: number;
    color?: [number, number] | [[number, number, number], [number, number, number]];
    engine?: boolean;
    locked?: boolean;
    numberPlate?: string;
  } = {}): VehicleMp | null {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;
    const heading = options.heading ?? 0;
    const dimension = options.dimension ?? 0;

    const handle = CreateVehicle(modelHash, position.x, position.y, position.z, heading, true, true);
    if (!handle) {
      console.warn("[bridge] mp.vehicles.new failed: FiveM cannot create a server-side vehicle with no players near the coordinates. Spawn it near a player.");
      return null;
    }
    const id = ++vehicleIdCounter;
    const vehicle = new VehicleMp(CONSTRUCT, id, handle);

    if (dimension !== 0) {
      vehicle.dimension = dimension;
    }

    if (options.orphanMode !== undefined) {
      vehicle.setOrphanMode(options.orphanMode);
    }

    if (options.alpha !== undefined) {
      EntityInternals.get(vehicle).alpha = options.alpha;
      emitVehicle(vehicle, "ragemp:vehicleAlpha", options.alpha);
    }

    if (options.color !== undefined) {
      SetVehicleColours(handle, (options.color as any)[0], (options.color as any)[1]);
    }

    if (options.engine !== undefined) {
      VehicleInternals.get(vehicle).engine = options.engine;
      emitVehicle(vehicle, "ragemp:vehicleEngine", options.engine);
    }

    if (options.locked !== undefined) {
      SetVehicleDoorsLocked(handle, options.locked ? 2 : 1);
    }

    if (options.numberPlate !== undefined) {
      SetVehicleNumberPlateText(handle, options.numberPlate);
    }

    poolAdd(this, vehicle as any);
    handlePoolStore(this).handleToEntity.set(handle, vehicle as any);

    entityCreated("vehicle", vehicle.id, {
      model: modelHash,
      x: position.x,
      y: position.y,
      z: position.z,
      dimension,
    });

    whenNetworked(
      handle,
      (netId) => {
        vehicleNetIdMap(this).set(netId, vehicle);
        VehicleInternals.get(vehicle).cachedNetId = netId;
        entityBindNetId("vehicle", vehicle.id, netId);
      },
      () => poolStore(this).entities.has(vehicle.id),
    );

    return vehicle;
  }

  atNetId(netId: number): VehicleMp | null {
    if (!netId) return null;
    const map = vehicleNetIdMap(this);
    const cached = map.get(netId);
    if (cached && handlePoolStore(this).handleToEntity.has(cached.handle)) return cached;
    const handle = safeGetEntityFromNetId(netId);
    if (!handle) return null;
    const existing = handlePoolStore(this).handleToEntity.get(handle) as unknown as VehicleMp | undefined;
    if (existing) {
      map.set(netId, existing);
      VehicleInternals.get(existing).cachedNetId = netId;
      return existing;
    }
    if (typeof DoesEntityExist === "function" && !DoesEntityExist(handle)) return null;
    if (typeof GetEntityType === "function" && GetEntityType(handle) !== 2) return null;
    const vehicle = new VehicleMp(CONSTRUCT, ++vehicleIdCounter, handle);
    poolAdd(this, vehicle as any);
    handlePoolStore(this).handleToEntity.set(handle, vehicle as any);
    map.set(netId, vehicle);
    VehicleInternals.get(vehicle).cachedNetId = netId;
    entityCreated("vehicle", vehicle.id, { model: GetEntityModel(handle) });
    entityBindNetId("vehicle", vehicle.id, netId);
    return vehicle;
  }
}
