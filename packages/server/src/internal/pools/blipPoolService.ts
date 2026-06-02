import { poolStore } from "@ragemp-fivem-bridge/shared/internal";
import type { BlipMp } from "../../Entities/BlipMp";
import type { BlipMpPool } from "../../Pools/BlipMpPool";

export function setupBlipPool(pool: BlipMpPool): void {
  onNet("ragemp:playerReady", () => {
    const playerSource = source;
    const blips: ReturnType<BlipMp["toData"]>[] = [];
    poolStore(pool).entities.forEach((blip) => blips.push((blip as unknown as BlipMp).toData()));
    if (blips.length > 0) {
      emitNet("ragemp:blipSyncAll", playerSource, blips);
    }
  });
}
