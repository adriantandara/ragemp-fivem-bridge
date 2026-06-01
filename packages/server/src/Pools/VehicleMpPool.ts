import { HandlePool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { VehicleMp } from "../Entities/VehicleMp";

let vehicleIdCounter = 0;

export class VehicleMpPool extends HandlePool {
  _netIdToEntity: Map<number, VehicleMp> = new Map();

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
    const vehicle = new VehicleMp(id, handle);

    if (dimension !== 0) {
      vehicle.dimension = dimension;
    }

    if (options.orphanMode !== undefined) {
      vehicle.setOrphanMode(options.orphanMode);
    }

    if (options.alpha !== undefined) {
      vehicle._alpha = options.alpha;
      vehicle._emit("ragemp:vehicleAlpha", options.alpha);
    }

    if (options.color !== undefined) {
      SetVehicleColours(handle, (options.color as any)[0], (options.color as any)[1]);
    }

    if (options.engine !== undefined) {
      vehicle._engine = options.engine;
      vehicle._emit("ragemp:vehicleEngine", options.engine);
    }

    if (options.locked !== undefined) {
      SetVehicleDoorsLocked(handle, options.locked ? 2 : 1);
    }

    if (options.numberPlate !== undefined) {
      SetVehicleNumberPlateText(handle, options.numberPlate);
    }

    this._add(vehicle as any);
    this._handleToEntity.set(handle, vehicle as any);

    return vehicle;
  }

  atNetId(netId: number): VehicleMp | null {
    if (!netId) return null;
    const cached = this._netIdToEntity.get(netId);
    if (cached && this._handleToEntity.has(cached._handle)) return cached;
    if (typeof NetworkGetEntityFromNetworkId !== "function") return null;
    const handle = NetworkGetEntityFromNetworkId(netId);
    if (!handle) return null;
    const existing = this._handleToEntity.get(handle) as unknown as VehicleMp | undefined;
    if (existing) {
      this._netIdToEntity.set(netId, existing);
      existing._cachedNetId = netId;
      return existing;
    }
    if (typeof DoesEntityExist === "function" && !DoesEntityExist(handle)) return null;
    if (typeof GetEntityType === "function" && GetEntityType(handle) !== 2) return null;
    const vehicle = new VehicleMp(++vehicleIdCounter, handle);
    this._add(vehicle as any);
    this._handleToEntity.set(handle, vehicle as any);
    this._netIdToEntity.set(netId, vehicle);
    vehicle._cachedNetId = netId;
    return vehicle;
  }

  _remove(id: number): void {
    const entity = this._entities.get(id) as unknown as VehicleMp | undefined;
    if (entity && entity._cachedNetId !== undefined) {
      this._netIdToEntity.delete(entity._cachedNetId);
      entity._cachedNetId = undefined;
    }
    super._remove(id);
  }
}
