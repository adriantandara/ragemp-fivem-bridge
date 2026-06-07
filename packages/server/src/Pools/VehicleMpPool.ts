import { HandlePool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolStore, poolAdd, handlePoolStore, EntityInternals, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { VehicleMp } from "../Entities/VehicleMp";
import { whenNetworked } from "../utils/whenNetworked";
import { safeGetEntityFromNetId } from "../utils/netId";
import { entityCreated, entityBindNetId } from "../utils/entityRegistry";
import { VehicleInternals , emitVehicle } from "../internal/vehicleInternals";
import {
  setupVehiclePool,
  vehicleNetIdMap,
  vehicleIds,
  getVehicleCreateStrategy,
  getStrategyDefaultOrphanMode,
  getVehicleSpawnFallback,
  removeFromVehiclePool,
} from "../internal/pools/vehiclePoolService";

export class VehicleMpPool extends HandlePool {
  constructor() {
    super();
    setupVehiclePool(this);
  }

  new(model: number | string, position: Vector3, options: {
    heading?: number;
    dimension?: number;
    orphanMode?: number;
    vehicleType?: string;
    alpha?: number;
    color?: [number, number] | [[number, number, number], [number, number, number]];
    engine?: boolean;
    locked?: boolean;
    numberPlate?: string;
  } = {}): VehicleMp | null {
    const opts = { ...options };
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;
    const modelName = typeof model === "string" ? model : undefined;
    const heading = opts.heading ?? 0;
    const dimension = opts.dimension ?? 0;

    const handle = getVehicleCreateStrategy()(modelHash, position.x, position.y, position.z, heading, {
      modelName,
      vehicleType: opts.vehicleType,
      heading,
      dimension,
    });

    const defaultOrphan = getStrategyDefaultOrphanMode();
    if (opts.orphanMode === undefined && defaultOrphan !== undefined) {
      opts.orphanMode = defaultOrphan;
    }

    if (handle) {
      return this._register(modelHash, position, opts, handle);
    }

    const fallback = getVehicleSpawnFallback();
    if (fallback) {
      const vehicle = this._register(modelHash, position, opts, null);
      fallback({
        vehicle,
        modelHash,
        bind: (h: number) => this._bindHandle(vehicle, h, modelHash, opts),
        reject: (reason: string) => this._rejectPending(vehicle, reason),
      });
      return vehicle;
    }

    console.warn("[bridge] mp.vehicles.new failed: FiveM cannot create a server-side vehicle with no players near the coordinates. Spawn it near a player, or enable the world-vehicles plugin.");
    return null;
  }

  private _register(modelHash: number, position: Vector3, options: any, handle: number | null): VehicleMp {
    const id = vehicleIds.allocate();
    const vehicle = new VehicleMp(CONSTRUCT, id, handle);
    const dimension = options.dimension ?? 0;

    if (handle) {
      this._applyOptions(vehicle, options);
      poolAdd(this, vehicle as any);
      handlePoolStore(this).handleToEntity.set(handle, vehicle as any);
      this._finalizeNetworking(vehicle, handle, modelHash, position, dimension);
      return vehicle;
    }

    const ent = EntityInternals.get(vehicle);
    ent.position = new Vector3(position.x, position.y, position.z);
    ent.model = modelHash;
    ent.dimension = dimension;

    const rec = VehicleInternals.get(vehicle);
    rec.pending = true;
    rec.pendingHeading = options.heading ?? 0;
    rec.pendingOptions = options;

    if (options.alpha !== undefined) ent.alpha = options.alpha;
    if (options.engine !== undefined) rec.engine = options.engine;
    if (options.orphanMode !== undefined) rec.orphanMode = options.orphanMode;
    if (options.numberPlate !== undefined) rec.numberPlate = options.numberPlate;

    poolAdd(this, vehicle as any);
    return vehicle;
  }

  private _applyOptions(vehicle: VehicleMp, options: any): void {
    const dimension = options.dimension ?? 0;

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
      SetVehicleColours(vehicle.handle, (options.color as any)[0], (options.color as any)[1]);
    }

    if (options.engine !== undefined) {
      VehicleInternals.get(vehicle).engine = options.engine;
      emitVehicle(vehicle, "ragemp:vehicleEngine", options.engine);
    }

    if (options.locked !== undefined) {
      SetVehicleDoorsLocked(vehicle.handle, options.locked ? 2 : 1);
    }

    if (options.numberPlate !== undefined) {
      SetVehicleNumberPlateText(vehicle.handle, options.numberPlate);
    }
  }

  private _finalizeNetworking(vehicle: VehicleMp, handle: number, modelHash: number, position: Vector3, dimension: number): void {
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
  }

  private _bindHandle(vehicle: VehicleMp, handle: number, modelHash: number, options: any): void {
    const rec = VehicleInternals.get(vehicle);
    if (rec.pendingCancelled || !poolStore(this).entities.has(vehicle.id)) {
      if (handle && typeof DeleteEntity === "function") DeleteEntity(handle);
      return;
    }

    const ent = EntityInternals.get(vehicle);
    ent.handle = handle;
    rec.pending = false;
    rec.pendingOptions = undefined;

    handlePoolStore(this).handleToEntity.set(handle, vehicle as any);
    this._applyOptions(vehicle, options);

    if (rec.pendingOps) {
      for (const op of rec.pendingOps) {
        try {
          op();
        } catch (e) {
          console.error("[bridge] pending vehicle op failed:", e);
        }
      }
      rec.pendingOps = undefined;
    }

    this._finalizeNetworking(vehicle, handle, modelHash, vehicle.position, options.dimension ?? 0);

    const mp = globalThis.mp;
    if (mp && mp.events) mp.events.call("vehicleSpawnResolved", vehicle);
  }

  private _rejectPending(vehicle: VehicleMp, reason: string): void {
    console.warn(`[bridge] mp.vehicles.new deferred spawn abandoned: ${reason}`);
    removeFromVehiclePool(this, vehicle.id);

    const mp = globalThis.mp;
    if (mp && mp.events) mp.events.call("vehicleSpawnFailed", vehicle, reason);
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
    const vehicle = new VehicleMp(CONSTRUCT, vehicleIds.allocate(), handle);
    poolAdd(this, vehicle as any);
    handlePoolStore(this).handleToEntity.set(handle, vehicle as any);
    map.set(netId, vehicle);
    VehicleInternals.get(vehicle).cachedNetId = netId;
    entityCreated("vehicle", vehicle.id, { model: GetEntityModel(handle) });
    entityBindNetId("vehicle", vehicle.id, netId);
    return vehicle;
  }
}
