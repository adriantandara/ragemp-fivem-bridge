import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { BroadcastPool } from "./BroadcastPool";
import { DummyMp } from "../Entities/DummyMp";
import { setupDummyPool } from "../internal/pools/dummyPoolService";

export class DummyMpPool extends BroadcastPool<DummyMp> {
  protected override readonly createEvent = "ragemp:dummyCreate";

  constructor() {
    super();
    setupDummyPool(this);
  }

  new(dummyType: number, data: Record<string, any>): DummyMp {
    const dummy = new DummyMp(CONSTRUCT, this.nextId(), dummyType, data);
    return this.register(dummy);
  }

  forEachByType(type: number, fn: (entity: DummyMp) => void): void {
    this.forEach(((d: DummyMp) => {
      if (d.dummyType === type) fn(d);
    }) as any);
  }
}
