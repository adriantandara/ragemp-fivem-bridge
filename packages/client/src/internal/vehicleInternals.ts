import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { VehicleMp } from "../Entities/VehicleMp";

export interface VehicleInternalsRec {
  paintType: number;
  defaultGearRatios: number[] | null;
}

export const VehicleInternals = defineInternals<VehicleInternalsRec>();

export function initVehicleInternals(vehicle: VehicleMp): VehicleInternalsRec {
  return VehicleInternals.init(vehicle, {
    paintType: 0,
    defaultGearRatios: null,
  });
}
