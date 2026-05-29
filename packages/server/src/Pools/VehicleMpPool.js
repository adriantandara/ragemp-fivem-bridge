import { Pool } from "@ragemp-fivem-bridge/shared";
import { VehicleMp } from "../Entities/VehicleMp";

let vehicleIdCounter = 0;

export class VehicleMpPool extends Pool {
  _handleToEntity = new Map();
  _netIdToEntity = new Map();

  new(model, position, options = {}) {
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

    if (options.alpha !== undefined) {
      vehicle._alpha = options.alpha;
      vehicle._emit("ragemp:vehicleAlpha", options.alpha);
    }

    if (options.color !== undefined) {
      SetVehicleColours(handle, options.color[0], options.color[1]);
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

    this._add(vehicle);
    this._handleToEntity.set(handle, vehicle);

    return vehicle;
  }

  atHandle(handle) {
    return this._handleToEntity.get(handle) ?? null;
  }

  atNetId(netId) {
    if (!netId) return null;
    const cached = this._netIdToEntity.get(netId);
    if (cached && this._handleToEntity.has(cached._handle)) return cached;
    if (typeof NetworkGetEntityFromNetworkId !== "function") return null;
    const handle = NetworkGetEntityFromNetworkId(netId);
    if (!handle) return null;
    const existing = this._handleToEntity.get(handle);
    if (existing) {
      this._netIdToEntity.set(netId, existing);
      return existing;
    }
    if (typeof DoesEntityExist === "function" && !DoesEntityExist(handle)) return null;
    if (typeof GetEntityType === "function" && GetEntityType(handle) !== 2) return null;
    const vehicle = new VehicleMp(++vehicleIdCounter, handle);
    this._add(vehicle);
    this._handleToEntity.set(handle, vehicle);
    this._netIdToEntity.set(netId, vehicle);
    return vehicle;
  }

  _remove(id) {
    const entity = this._entities.get(id);
    if (entity) {
      this._handleToEntity.delete(entity._handle);
      for (const [netId, e] of this._netIdToEntity) {
        if (e === entity) this._netIdToEntity.delete(netId);
      }
    }
    super._remove(id);
  }
}
