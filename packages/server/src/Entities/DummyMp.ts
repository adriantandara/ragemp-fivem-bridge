import { Entity } from "@ragemp-fivem-bridge/shared";
import { DummyInternals, initDummyInternals } from "../internal/dummyInternals";
import { removeFromPool } from "@ragemp-fivem-bridge/shared/internal";

export class DummyMp extends Entity {
  constructor(id: number, dummyType: number, data: Record<string, any>) {
    super(id, "dummy");
    initDummyInternals(this, {
      dummyType,
      data: data ?? {},
    });
  }

  get dummyType(): number {
    return DummyInternals.get(this).dummyType;
  }

  toData(): Record<string, any> {
    const rec = DummyInternals.get(this);
    return { id: this.id, dummyType: rec.dummyType, data: rec.data };
  }

  destroy(): void {
    emitNet("ragemp:dummyDestroy", -1, this.id);
    const pool = globalThis.mp?.dummies;
    if (pool) removeFromPool(pool, this.id);
  }
}
