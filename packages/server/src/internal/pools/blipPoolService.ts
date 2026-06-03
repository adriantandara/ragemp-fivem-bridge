import { setupBroadcastSync } from "./broadcastSyncService";
import type { BlipMpPool } from "../../Pools/BlipMpPool";

export function setupBlipPool(pool: BlipMpPool): void {
  setupBroadcastSync(pool, "ragemp:blipSyncAll");
}
