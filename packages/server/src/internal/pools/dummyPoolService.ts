import { setupBroadcastPool } from "./broadcastPoolService";
import type { DummyMpPool } from "../../Pools/DummyMpPool";

export function setupDummyPool(pool: DummyMpPool): void {
  setupBroadcastPool(pool, "ragemp:dummyCreate", "ragemp:dummySyncAll");
}
