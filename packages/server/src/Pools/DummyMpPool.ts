import { Pool } from "@ragemp-fivem-bridge/shared";
import { poolAdd } from "@ragemp-fivem-bridge/shared/internal";
import { DummyMp } from "../Entities/DummyMp";
import { setupDummyPool } from "../internal/pools/dummyPoolService";

let dummyIdCounter = 0;

export class DummyMpPool extends Pool {
  constructor() {
    super();
    setupDummyPool(this);
  }

  new(dummyType: number, data: Record<string, any>): DummyMp {
    const id = ++dummyIdCounter;
    const dummy = new DummyMp(id, dummyType, data);
    poolAdd(this, dummy as any);
    emitNet("ragemp:dummyCreate", -1, dummy.toData());
    return dummy;
  }

  forEachByType(type: number, fn: (entity: DummyMp) => void): void {
    this.forEach(((d: DummyMp) => {
      if (d.dummyType === type) fn(d);
    }) as any);
  }
}
