import { poolAdd, removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { DummyMp } from "../../Entities/DummyMp";
import type { DummyMpPool } from "../../Pools/DummyMpPool";

function addDummy(pool: DummyMpPool, data: any): void {
  if (pool.exists(data.id)) return;
  const dummy = new DummyMp(data.id, data.dummyType, data.data);
  poolAdd(pool, dummy);
  globalThis.mp?.events?.call("dummyEntityCreated", dummy);
}

export function setupDummyPool(pool: DummyMpPool): void {
  onNet("ragemp:dummyCreate", (data: any) => {
    addDummy(pool, data);
  });

  onNet("ragemp:dummySyncAll", (dummies: any[]) => {
    for (const d of dummies) addDummy(pool, d);
  });

  onNet("ragemp:dummyDestroy", (id: number) => {
    const dummy = pool.at(id);
    if (dummy) {
      removeFromPool(pool, id);
      globalThis.mp?.events?.call("dummyEntityDestroyed", dummy);
    }
  });
}
