import { Pool } from "@ragemp-fivem-bridge/shared";
import { VehicleMp } from "../Entities/VehicleMp";

let vehicleIdCounter = 0;

export class VehicleMpPool extends Pool {
  _handleToEntity = new Map();

  new(model, position, options = {}) {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;
    const heading = options.heading ?? 0;
    const dimension = options.dimension ?? 0;

    const handle = CreateVehicle(modelHash, position.x, position.y, position.z, heading, true, true);
    const id = ++vehicleIdCounter;
    const vehicle = new VehicleMp(id, handle);

    if (dimension !== 0) {
      vehicle.dimension = dimension;
    }

    if (options.alpha !== undefined) {
      vehicle._alpha = options.alpha;
      emitNet("ragemp:vehicleAlpha", -1, NetworkGetNetworkIdFromEntity(handle), options.alpha);
    }

    if (options.color !== undefined) {
      SetVehicleColours(handle, options.color[0], options.color[1]);
    }

    if (options.engine !== undefined) {
      vehicle._engine = options.engine;
      const netId = NetworkGetNetworkIdFromEntity(handle);
      emitNet("ragemp:vehicleEngine", -1, netId, options.engine);
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

  _remove(id) {
    const entity = this._entities.get(id);
    if (entity) {
      this._handleToEntity.delete(entity._handle);
    }
    super._remove(id);
  }
}
