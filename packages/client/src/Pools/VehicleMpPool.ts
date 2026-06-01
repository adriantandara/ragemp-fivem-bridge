import { StreamingPool } from "./StreamingPool";
import { VehicleMp } from "../Entities/VehicleMp";
import { getVehiclePool } from "../utils/worldScan";
import {
  applyVehicleProp,
  applyVehicleMod,
  applyVehicleRepair,
} from "../utils/vehicleSync";

const VEHICLE_DISPATCH: Record<string, (h: number, ...args: any[]) => void> = {
  "ragemp:vehicleEngine": (h: number, v: any) => applyVehicleProp(h, "engine", v),
  "ragemp:vehicleAlpha": (h: number, v: any) => applyVehicleProp(h, "alpha", v),
  "ragemp:vehicleLivery": (h: number, v: any) => applyVehicleProp(h, "livery", v),
  "ragemp:vehicleNumberPlateType": (h: number, v: any) => applyVehicleProp(h, "numberPlateType", v),
  "ragemp:vehicleWindowTint": (h: number, v: any) => applyVehicleProp(h, "windowTint", v),
  "ragemp:vehicleNeonEnabled": (h: number, v: any) => applyVehicleProp(h, "neonEnabled", v),
  "ragemp:vehicleCustomTires": (h: number, v: any) => applyVehicleProp(h, "customTires", v),
  "ragemp:vehicleWheelType": (h: number, v: any) => applyVehicleProp(h, "wheelType", v),
  "ragemp:vehicleEngineHealth": (h: number, v: any) => applyVehicleProp(h, "engineHealth", v),
  "ragemp:vehicleDashboardColor": (h: number, v: any) => applyVehicleProp(h, "dashboardColor", v),
  "ragemp:vehiclePearlescentColor": (h: number, v: any) => applyVehicleProp(h, "pearlescentColor", v),
  "ragemp:vehicleTaxiLights": (h: number, v: any) => applyVehicleProp(h, "taxiLights", v),
  "ragemp:vehicleTrimColor": (h: number, v: any) => applyVehicleProp(h, "trimColor", v),
  "ragemp:vehicleWheelColor": (h: number, v: any) => applyVehicleProp(h, "wheelColor", v),
  "ragemp:vehicleNeonColor": (h: number, r: number, g: number, b: number) => applyVehicleProp(h, "neonColor", [r, g, b]),
  "ragemp:vehicleColorRGB": (h: number, value: any) => applyVehicleProp(h, "colorRGB", value),
  "ragemp:vehicleMod": (h: number, modType: number, modIndex: number) => applyVehicleMod(h, modType, modIndex),
  "ragemp:vehicleExtra": (h: number, extraId: number, invertedState: boolean) => SetVehicleExtra(h, extraId, invertedState),
  "ragemp:vehicleExplode": (h: number) => NetworkExplodeVehicle(h, true, false, false),
  "ragemp:vehicleRepair": (h: number) => applyVehicleRepair(h),
};

export class VehicleMpPool extends StreamingPool {
  _streamInHandlers: Set<(entity: VehicleMp, handle: number, netId: number) => void> = new Set();

  constructor() {
    super();
    this._startStreaming(getVehiclePool, (netId: number, handle: number) => new VehicleMp(netId, handle));
    this._setupServerSync();
  }

  onVehicleStreamIn(handler: (entity: VehicleMp, handle: number, netId: number) => void): () => void {
    this._streamInHandlers.add(handler);
    return () => this._streamInHandlers.delete(handler);
  }

  _onStreamIn(entity: VehicleMp, handle: number, netId: number): void {
    for (const handler of this._streamInHandlers) {
      try { handler(entity, handle, netId); } catch (e) {}
    }
  }

  _setupServerSync(): void {
    onNet("ragemp:vehicle:batch", (netId: number, items: [string, any[]][]) => {
      const handle = NetworkGetEntityFromNetworkId(netId);
      if (!handle || !DoesEntityExist(handle)) return;
      for (const [event, args] of items) {
        const fn = VEHICLE_DISPATCH[event];
        if (fn) fn(handle, ...(args || []));
      }
    });
  }
}
