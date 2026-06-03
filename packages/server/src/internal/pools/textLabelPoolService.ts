import { setupBroadcastSync } from "./broadcastSyncService";
import type { TextLabelMpPool } from "../../Pools/TextLabelMpPool";

export function setupTextLabelPool(pool: TextLabelMpPool): void {
  setupBroadcastSync(pool, "ragemp:labelSyncAll");
}
