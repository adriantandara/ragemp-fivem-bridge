import { poolStore } from "@ragemp-fivem-bridge/shared/internal";
import type { MarkerMp } from "../../Entities/MarkerMp";
import type { MarkerMpPool } from "../../Pools/MarkerMpPool";

export function setupMarkerPool(pool: MarkerMpPool): void {
  onNet("ragemp:playerReady", () => {
    const playerSource = source;
    const markers: ReturnType<MarkerMp["toData"]>[] = [];
    poolStore(pool).entities.forEach((marker) => markers.push((marker as unknown as MarkerMp).toData()));
    if (markers.length > 0) {
      emitNet("ragemp:markerSyncAll", playerSource, markers);
    }
  });
}
