import { setupBroadcastPool } from "./broadcastPoolService";
import type { MarkerMpPool } from "../../Pools/MarkerMpPool";

export function setupMarkerPool(pool: MarkerMpPool): void {
  setupBroadcastPool(pool, "ragemp:markerCreate", "ragemp:markerSyncAll");
}
