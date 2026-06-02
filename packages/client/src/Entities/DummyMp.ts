import { Entity } from "@ragemp-fivem-bridge/shared";
import { removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { DummyInternals, initDummyInternals } from "../internal/dummyInternals";

export class DummyMp extends Entity {
  id: number;

  constructor(id: number, dummyType: number, data: Record<string, any> | undefined) {
    super(id, "dummy");
    initDummyInternals(this, dummyType, data);
  }

  get dummyType(): number {
    return DummyInternals.get(this).dummyType;
  }

  get data(): Record<string, any> {
    return DummyInternals.get(this).data;
  }

  destroy(): void {
    const pool = globalThis.mp?.dummies;
    if (pool) removeFromPool(pool, this.id);
  }
}
