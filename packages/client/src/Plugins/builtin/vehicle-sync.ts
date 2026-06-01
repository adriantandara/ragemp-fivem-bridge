import { applyVehicleSnapshot } from "../../utils/vehicleSync";

interface PluginContext {
  log: (...args: unknown[]) => void;
  [key: string]: unknown;
}

export const name = "vehicle-sync";

export default function setup({ mp, plugin }: { mp: any; plugin: PluginContext }): void {
  const requested = new Set<number>();

  mp.vehicles.onVehicleStreamIn((_vehicle: unknown, _handle: unknown, netId: number) => {
    if (requested.has(netId)) return;
    requested.add(netId);
    emitNet("ragemp:vehicleSync:request", netId);
    setTimeout(() => requested.delete(netId), 5000);
  });

  onNet("ragemp:vehicleSync:apply", (netId: number, snapshot: Record<string, any>) => {
    const handle = NetworkGetEntityFromNetworkId(netId);
    if (!handle || !DoesEntityExist(handle)) {
      requested.delete(netId);
      return;
    }

    applyVehicleSnapshot(handle, snapshot);

    if (snapshot && snapshot.vars) {
      const vehicle = mp.vehicles?.atHandle?.(handle);
      if (vehicle && vehicle._variables) {
        for (const key in snapshot.vars) {
          if (!vehicle._variables.has(key)) vehicle._variables.set(key, snapshot.vars[key]);
        }
      }
    }

    requested.delete(netId);
  });

  plugin.log("requesting authoritative state on vehicle stream-in");
}
