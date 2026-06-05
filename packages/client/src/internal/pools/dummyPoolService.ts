import { removeFromPool, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { addNetworked, freeClientId } from "./clientPool";
import { DummyMp } from "../../Entities/DummyMp";
import type { DummyMpPool } from "../../Pools/DummyMpPool";

function addDummy(pool: DummyMpPool, data: any): void {
  if (pool.atRemoteId(data.id)) return;
  const dummy = new DummyMp(CONSTRUCT, data.id, data.dummyType, data.data);
  addNetworked(pool, dummy);
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
    const dummy = pool.atRemoteId(id);
    if (dummy) {
      removeFromPool(pool, dummy.id);
      freeClientId(pool, dummy.id);
      globalThis.mp?.events?.call("dummyEntityDestroyed", dummy);
    }
  });
}
