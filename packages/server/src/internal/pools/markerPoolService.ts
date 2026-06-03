import { setupBroadcastSync } from "./broadcastSyncService";
import type { MarkerMpPool } from "../../Pools/MarkerMpPool";

export function setupMarkerPool(pool: MarkerMpPool): void {
  setupBroadcastSync(pool, "ragemp:markerSyncAll");
}
