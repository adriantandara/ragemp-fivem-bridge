import { applyVehicleSnapshot } from "../../utils/vehicleSync";

export const name = "vehicle-sync";

export default function setup({ mp, plugin }) {
  const requested = new Set();

  mp.vehicles.onVehicleStreamIn((_vehicle, _handle, netId) => {
    if (requested.has(netId)) return;
    requested.add(netId);
    emitNet("ragemp:vehicleSync:request", netId);
    setTimeout(() => requested.delete(netId), 5000);
  });

  onNet("ragemp:vehicleSync:apply", (netId, snapshot) => {
    const handle = NetworkGetEntityFromNetworkId(netId);
    if (!handle || !DoesEntityExist(handle)) {
      requested.delete(netId);
      return;
    }

    applyVehicleSnapshot(handle, snapshot);
    requested.delete(netId);
  });

  plugin.log("requesting authoritative state on vehicle stream-in");
}
