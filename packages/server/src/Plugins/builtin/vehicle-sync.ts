import { VehicleInternals } from "../../internal/vehicleInternals";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

export const name = "vehicle-sync";

interface PluginContext {
  name: string;
  resource: string;
  builtin: boolean;
  namespace(eventName: string): string;
  log(...args: any[]): void;
}

export default function setup({ mp, plugin }: { mp: any; plugin: PluginContext }): void {
  function buildSnapshot(vehicle: any): Record<string, any> {
    const snap: Record<string, any> = {};
    const rec = VehicleInternals.get(vehicle);
    const ent = EntityInternals.get(vehicle);

    if (rec.engine) snap.engine = true;
    if (ent.alpha !== 255) snap.alpha = ent.alpha;
    if (rec.livery >= 0) snap.livery = rec.livery;
    if (rec.numberPlateType) snap.numberPlateType = rec.numberPlateType;
    if (rec.windowTint) snap.windowTint = rec.windowTint;
    if (rec.wheelType) snap.wheelType = rec.wheelType;
    if (rec.engineHealth !== 1000) snap.engineHealth = rec.engineHealth;
    if (rec.bodyHealth !== 1000) snap.bodyHealth = rec.bodyHealth;
    if (rec.neonEnabled) snap.neonEnabled = true;
    if (rec.customTires) snap.customTires = true;
    if (rec.dashboardColor) snap.dashboardColor = rec.dashboardColor;
    if (rec.pearlescentColor) snap.pearlescentColor = rec.pearlescentColor;
    if (rec.taxiLights) snap.taxiLights = true;
    if (rec.trimColor) snap.trimColor = rec.trimColor;
    if (rec.wheelColor) snap.wheelColor = rec.wheelColor;

    const neon = rec.neonColor;
    if (neon && (neon[0] || neon[1] || neon[2])) snap.neonColor = neon;

    if (rec.numberPlate != null) snap.numberPlate = rec.numberPlate;
    if (rec.locked) snap.locked = true;
    if (rec.mods && Object.keys(rec.mods).length) snap.mods = rec.mods;
    if (rec.extras && Object.keys(rec.extras).length) snap.extras = rec.extras;
    if (rec.colorRGB) snap.colorRGB = rec.colorRGB;
    if (rec.paint.primary != null)
      snap.color = { primary: rec.paint.primary, secondary: rec.paint.secondary };

    if (ent.variables && ent.variables.size) {
      const vars: Record<string, any> = {};
      for (const [k, v] of ent.variables) {
        if (v !== undefined && v !== null) vars[k] = v;
      }
      if (Object.keys(vars).length) snap.vars = vars;
    }

    return snap;
  }

  onNet("ragemp:vehicleSync:request", (netId: number) => {
    const src = source;
    const vehicle = mp.vehicles.atNetId(netId);
    if (!vehicle) return;
    const snap = buildSnapshot(vehicle);

    emitNet("ragemp:vehicleSync:apply", src, netId, snap);
  });

  plugin.log("authoritative vehicle replication active");
}
