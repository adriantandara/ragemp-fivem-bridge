import { Pool } from "@ragemp-fivem-bridge/shared";
import { DummyMp } from "../Entities/DummyMp";
import { setupDummyPool } from "../internal/pools/dummyPoolService";

export class DummyMpPool extends Pool {
  at!: (id: number) => DummyMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: DummyMp) => void) => void;
  toArray!: () => DummyMp[];

  constructor() {
    super();
    setupDummyPool(this);
  }

  atRemoteId(remoteId: number): DummyMp | null {
    return this.at(remoteId);
  }

  forEachByType(type: number, fn: (d: DummyMp) => void): void {
    this.forEach((d: DummyMp) => {
      if (d.dummyType === type) fn(d);
    });
  }
}
