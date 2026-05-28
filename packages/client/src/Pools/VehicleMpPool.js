import { Pool } from "@ragemp-fivem-bridge/shared";
import { VehicleMp } from "../Entities/VehicleMp";
import { safeGetNetworkId } from "../utils/netId";

export class VehicleMpPool extends Pool {
  _handleToEntity = new Map();

  constructor() {
    super();
    this._setupStreaming();
    this._setupServerSync();
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  atHandle(handle) {
    return this._handleToEntity.get(handle) ?? null;
  }

  _setupStreaming() {
    setTick(() => {
      const vehicles = GetGamePool("CVehicle");
      const activeSet = new Set();

      for (const handle of vehicles) {
        const netId = safeGetNetworkId(handle);
        if (netId === 0) continue;
        activeSet.add(netId);

        if (!this._handleToEntity.has(handle)) {
          const veh = new VehicleMp(netId, handle);
          this._add(veh);
          this._handleToEntity.set(handle, veh);
        }
      }

      for (const [handle, entity] of this._handleToEntity) {
        if (!activeSet.has(entity.id)) {
          this._entities.delete(entity.id);
          this._handleToEntity.delete(handle);
        }
      }
    });
  }

  _setupServerSync() {
    onNet("ragemp:setEntityVar", (netId, key, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (!handle || !DoesEntityExist(handle)) return;
      const entity = this._handleToEntity.get(handle);
      if (entity) entity._variables.set(key, value);
    });

    onNet("ragemp:vehicleEngine", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleEngineOn(handle, value, false, false);
      }
    });

    onNet("ragemp:vehicleLivery", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleLivery(handle, value);
      }
    });

    onNet("ragemp:vehicleNumberPlateType", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleNumberPlateTextIndex(handle, value);
      }
    });

    onNet("ragemp:vehicleWindowTint", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleWindowTint(handle, value);
      }
    });

    onNet("ragemp:vehicleNeonEnabled", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        for (let i = 0; i < 4; i++) SetVehicleNeonLightEnabled(handle, i, value);
      }
    });

    onNet("ragemp:vehicleCustomTires", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleModKit(handle, 0);
        ToggleVehicleMod(handle, 18, value);
      }
    });

    onNet("ragemp:vehicleWheelType", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleWheelType(handle, value);
      }
    });

    onNet("ragemp:vehicleExplode", (netId) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        NetworkExplodeVehicle(handle, true, false, false);
      }
    });

    onNet("ragemp:vehicleRepair", (netId) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleFixed(handle);
        SetVehicleEngineHealth(handle, 1000.0);
        SetVehicleBodyHealth(handle, 1000.0);
      }
    });

    onNet("ragemp:vehicleExtra", (netId, extraId, invertedState) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleExtra(handle, extraId, invertedState);
      }
    });

    onNet("ragemp:vehicleMod", (netId, modType, modIndex) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleModKit(handle, 0);
        SetVehicleMod(handle, modType, modIndex, false);
      }
    });

    onNet("ragemp:vehicleNeonColor", (netId, r, g, b) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleNeonLightsColour(handle, r, g, b);
      }
    });

    onNet("ragemp:vehicleAlpha", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetEntityAlpha(handle, value, false);
      }
    });

    onNet("ragemp:vehicleEngineHealth", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleEngineHealth(handle, value);
      }
    });

    onNet("ragemp:vehicleDashboardColor", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleDashboardColour(handle, value);
      }
    });

    onNet("ragemp:vehiclePearlescentColor", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        const [_, wheelCol] = GetVehicleExtraColours(handle);
        SetVehicleExtraColours(handle, value, wheelCol);
      }
    });

    onNet("ragemp:vehicleTaxiLights", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetTaxiLights(handle, value);
      }
    });

    onNet("ragemp:vehicleTrimColor", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        SetVehicleInteriorColour(handle, value);
      }
    });

    onNet("ragemp:vehicleWheelColor", (netId, value) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (handle && DoesEntityExist(handle)) {
        const [pearlCol, _] = GetVehicleExtraColours(handle);
        SetVehicleExtraColours(handle, pearlCol, value);
      }
    });
  }

  _remove(id) {
    const entity = this._entities.get(id);
    if (entity) {
      this._handleToEntity.delete(entity._handle);
    }
    super._remove(id);
  }
}
