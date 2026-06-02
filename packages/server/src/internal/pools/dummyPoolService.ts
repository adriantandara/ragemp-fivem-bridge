import { poolStore } from "@ragemp-fivem-bridge/shared/internal";
import type { DummyMp } from "../../Entities/DummyMp";
import type { DummyMpPool } from "../../Pools/DummyMpPool";

export function setupDummyPool(pool: DummyMpPool): void {
  onNet("ragemp:playerReady", () => {
    const playerSource = source;
    const dummies: ReturnType<DummyMp["toData"]>[] = [];
    poolStore(pool).entities.forEach((d) => dummies.push((d as unknown as DummyMp).toData()));
    if (dummies.length > 0) {
      emitNet("ragemp:dummySyncAll", playerSource, dummies);
    }
  });
}
