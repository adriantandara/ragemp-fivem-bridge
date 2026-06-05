import { setupBroadcastPool } from "./broadcastPoolService";
import type { TextLabelMpPool } from "../../Pools/TextLabelMpPool";

export function setupTextLabelPool(pool: TextLabelMpPool): void {
  setupBroadcastPool(pool, "ragemp:labelCreate", "ragemp:labelSyncAll");
}
