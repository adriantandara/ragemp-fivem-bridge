import { Entity } from "@ragemp-fivem-bridge/shared";
import { removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { DummyInternals, initDummyInternals } from "../internal/dummyInternals";

export class DummyMp extends Entity {
  constructor(token: symbol, id: number, dummyType: number, data: Record<string, any> | undefined) {
    super(token, id, "dummy");
    initDummyInternals(this, dummyType, data);
  }

  get dummyType(): number {
    return DummyInternals.get(this).dummyType;
  }

  override get data(): Record<string, any> {
    return DummyInternals.get(this).data;
  }

  override destroy(): void {
    const pool = globalThis.mp?.dummies;
    if (pool) removeFromPool(pool, this.id);
  }
}
