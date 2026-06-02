import { poolStore } from "@ragemp-fivem-bridge/shared/internal";
import type { TextLabelMp } from "../../Entities/TextLabelMp";
import type { TextLabelMpPool } from "../../Pools/TextLabelMpPool";

export function setupTextLabelPool(pool: TextLabelMpPool): void {
  onNet("ragemp:playerReady", () => {
    const playerSource = source;
    const labels: ReturnType<TextLabelMp["toData"]>[] = [];
    poolStore(pool).entities.forEach((label) => labels.push((label as unknown as TextLabelMp).toData()));
    if (labels.length > 0) {
      emitNet("ragemp:labelSyncAll", playerSource, labels);
    }
  });
}
