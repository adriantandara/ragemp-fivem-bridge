import { Pool } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { DummyMp } from "../Entities/DummyMp";
import { setupDummyPool } from "../internal/pools/dummyPoolService";
import { nextBroadcastId, registerBroadcast } from "../internal/pools/broadcastPoolService";

export class DummyMpPool extends Pool<DummyMp> {
  constructor() {
    super();
    setupDummyPool(this);
  }

  new(dummyType: number, data: Record<string, any>): DummyMp {
    const dummy = new DummyMp(CONSTRUCT, nextBroadcastId(this), dummyType, data);
    return registerBroadcast(this, dummy);
  }

  forEachByType(type: number, fn: (entity: DummyMp) => void): void {
    this.forEach(((d: DummyMp) => {
      if (d.dummyType === type) fn(d);
    }) as any);
  }
}
