export const name = "vehicle-sync";

export default function setup({ mp, plugin }) {
  function buildSnapshot(vehicle) {
    const snap = {};

    if (vehicle._engine) snap.engine = true;
    if (vehicle._alpha !== 255) snap.alpha = vehicle._alpha;
    if (vehicle._livery >= 0) snap.livery = vehicle._livery;
    if (vehicle._numberPlateType) snap.numberPlateType = vehicle._numberPlateType;
    if (vehicle._windowTint) snap.windowTint = vehicle._windowTint;
    if (vehicle._wheelType) snap.wheelType = vehicle._wheelType;
    if (vehicle._engineHealth !== 1000) snap.engineHealth = vehicle._engineHealth;
    if (vehicle._neonEnabled) snap.neonEnabled = true;
    if (vehicle._customTires) snap.customTires = true;
    if (vehicle._dashboardColor) snap.dashboardColor = vehicle._dashboardColor;
    if (vehicle._pearlescentColor) snap.pearlescentColor = vehicle._pearlescentColor;
    if (vehicle._taxiLights) snap.taxiLights = true;
    if (vehicle._trimColor) snap.trimColor = vehicle._trimColor;
    if (vehicle._wheelColor) snap.wheelColor = vehicle._wheelColor;

    const neon = vehicle._neonColor;
    if (neon && (neon[0] || neon[1] || neon[2])) snap.neonColor = neon;

    if (vehicle._mods && Object.keys(vehicle._mods).length) snap.mods = vehicle._mods;
    if (vehicle._extras && Object.keys(vehicle._extras).length) snap.extras = vehicle._extras;
    if (vehicle._colorRGB) snap.colorRGB = vehicle._colorRGB;

    return snap;
  }

  onNet("ragemp:vehicleSync:request", (netId) => {
    const src = source;
    const vehicle = mp.vehicles.atNetId(netId);
    if (!vehicle) return;
    const snap = buildSnapshot(vehicle);

    emitNet("ragemp:vehicleSync:apply", src, netId, snap);
  });

  plugin.log("authoritative vehicle replication active");
}
