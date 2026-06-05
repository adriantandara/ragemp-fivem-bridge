import { Pool } from "@ragemp-fivem-bridge/shared";
import { DummyMp } from "../Entities/DummyMp";
import { setupDummyPool } from "../internal/pools/dummyPoolService";

export class DummyMpPool extends Pool<DummyMp> {
  constructor() {
    super();
    setupDummyPool(this);
  }

  forEachByType(type: number, fn: (d: DummyMp) => void): void {
    this.forEach((d: DummyMp) => {
      if (d.dummyType === type) fn(d);
    });
  }
}
