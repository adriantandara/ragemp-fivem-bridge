import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import { EntitySyncQueue } from "../utils/EntitySyncQueue";
import type { VehicleMp } from "../Entities/VehicleMp";

export interface VehicleInternalsRec {
  neonEnabled: boolean;
  customTires: boolean;
  engine: boolean;
  colorRGB: [[number, number, number], [number, number, number]] | null;
  neonColor: [number, number, number];
  mods: Record<number, number>;
  extras: Record<number, boolean>;
  brake: boolean;
  highbeams: boolean;
  horn: boolean;
  rocketBoost: boolean;
  siren: boolean;
  steerAngle: number;
  dashboardColor: number;
  movable: boolean;
  pearlescentColor: number;
  taxiLights: boolean;
  trimColor: number;
  wheelColor: number;
  paint: { primary: number | null; secondary: number | null };
  livery: number;
  numberPlateType: number;
  windowTint: number;
  wheelType: number;
  engineHealth: number;
  bodyHealth: number;
  sync: EntitySyncQueue;
  orphanMode?: number;
  orphanModeScheduled?: boolean;
  netIdReady?: boolean;
  cachedNetId?: number;
  numberPlate?: string;
  varFlushScheduled: boolean;
  pending?: boolean;
  pendingHeading?: number;
  pendingCancelled?: boolean;
  pendingOptions?: any;
  pendingOps?: Array<() => void>;
}

export const VehicleInternals = defineInternals<VehicleInternalsRec>();

export function initVehicleInternals(vehicle: VehicleMp): VehicleInternalsRec {
  return VehicleInternals.init(vehicle, {
    neonEnabled: false,
    customTires: false,
    engine: false,
    colorRGB: null,
    neonColor: [0, 0, 0],
    mods: {},
    extras: {},
    brake: false,
    highbeams: false,
    horn: false,
    rocketBoost: false,
    siren: false,
    steerAngle: 0,
    dashboardColor: 0,
    movable: true,
    pearlescentColor: 0,
    taxiLights: false,
    trimColor: 0,
    wheelColor: 0,
    paint: { primary: null, secondary: null },
    livery: -1,
    numberPlateType: 0,
    windowTint: 0,
    wheelType: 0,
    engineHealth: 1000,
    bodyHealth: 1000,
    sync: new EntitySyncQueue(() => vehicle.handle, "ragemp:vehicle:batch", {
      range: 250 /* Streaming Distance */,
      useRoutingBucket: true,
    }),
    varFlushScheduled: false,
  });
}

export function emitVehicle(vehicle: VehicleMp, event: string, ...args: any[]): void {
  VehicleInternals.get(vehicle).sync.emit(event, ...args);
}
