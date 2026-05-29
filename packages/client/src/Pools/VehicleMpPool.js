import { StreamingPool } from "./StreamingPool";
import { VehicleMp } from "../Entities/VehicleMp";
import { getVehiclePool } from "../utils/worldScan";
import {
  applyVehicleProp,
  applyVehicleMod,
  applyVehicleRepair,
} from "../utils/vehicleSync";

const VEHICLE_DISPATCH = {
  "ragemp:vehicleEngine": (h, v) => applyVehicleProp(h, "engine", v),
  "ragemp:vehicleAlpha": (h, v) => applyVehicleProp(h, "alpha", v),
  "ragemp:vehicleLivery": (h, v) => applyVehicleProp(h, "livery", v),
  "ragemp:vehicleNumberPlateType": (h, v) => applyVehicleProp(h, "numberPlateType", v),
  "ragemp:vehicleWindowTint": (h, v) => applyVehicleProp(h, "windowTint", v),
  "ragemp:vehicleNeonEnabled": (h, v) => applyVehicleProp(h, "neonEnabled", v),
  "ragemp:vehicleCustomTires": (h, v) => applyVehicleProp(h, "customTires", v),
  "ragemp:vehicleWheelType": (h, v) => applyVehicleProp(h, "wheelType", v),
  "ragemp:vehicleEngineHealth": (h, v) => applyVehicleProp(h, "engineHealth", v),
  "ragemp:vehicleDashboardColor": (h, v) => applyVehicleProp(h, "dashboardColor", v),
  "ragemp:vehiclePearlescentColor": (h, v) => applyVehicleProp(h, "pearlescentColor", v),
  "ragemp:vehicleTaxiLights": (h, v) => applyVehicleProp(h, "taxiLights", v),
  "ragemp:vehicleTrimColor": (h, v) => applyVehicleProp(h, "trimColor", v),
  "ragemp:vehicleWheelColor": (h, v) => applyVehicleProp(h, "wheelColor", v),
  "ragemp:vehicleNeonColor": (h, r, g, b) => applyVehicleProp(h, "neonColor", [r, g, b]),
  "ragemp:vehicleMod": (h, modType, modIndex) => applyVehicleMod(h, modType, modIndex),
  "ragemp:vehicleExtra": (h, extraId, invertedState) => SetVehicleExtra(h, extraId, invertedState),
  "ragemp:vehicleExplode": (h) => NetworkExplodeVehicle(h, true, false, false),
  "ragemp:vehicleRepair": (h) => applyVehicleRepair(h),
};

export class VehicleMpPool extends StreamingPool {
  _streamInHandlers = new Set();

  constructor() {
    super();
    this._startStreaming(getVehiclePool, (netId, handle) => new VehicleMp(netId, handle));
    this._setupServerSync();
  }

  onVehicleStreamIn(handler) {
    this._streamInHandlers.add(handler);
    return () => this._streamInHandlers.delete(handler);
  }

  _onStreamIn(entity, handle, netId) {
    for (const handler of this._streamInHandlers) {
      try { handler(entity, handle, netId); } catch (e) {}
    }
  }

  _setupServerSync() {
    onNet("ragemp:vehicle:batch", (netId, items) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (!handle || !DoesEntityExist(handle)) return;
      for (const [event, args] of items) {
        const fn = VEHICLE_DISPATCH[event];
        if (fn) fn(handle, ...(args || []));
      }
    });
  }
}
