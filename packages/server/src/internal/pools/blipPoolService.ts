import { setupBroadcastPool } from "./broadcastPoolService";
import type { BlipMpPool } from "../../Pools/BlipMpPool";

export function setupBlipPool(pool: BlipMpPool): void {
  setupBroadcastPool(pool, "ragemp:blipCreate", "ragemp:blipSyncAll");
}
