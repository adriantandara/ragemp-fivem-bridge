import { setupBroadcastSync } from "./broadcastSyncService";
import type { DummyMpPool } from "../../Pools/DummyMpPool";

export function setupDummyPool(pool: DummyMpPool): void {
  setupBroadcastSync(pool, "ragemp:dummySyncAll");
}
