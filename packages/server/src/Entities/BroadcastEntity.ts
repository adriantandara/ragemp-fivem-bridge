import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { EntityInternals, removeFromPool } from "@ragemp-fivem-bridge/shared/internal";

export abstract class BroadcastEntity extends Entity {
  constructor(token: symbol, id: number, type: string) {
    super(token, id, type);
  }

  protected abstract readonly updateEvent: string;
  protected abstract readonly destroyEvent: string;
  protected abstract pool(): object | null | undefined;
  abstract toData(): Record<string, any>;

  protected sync(): void {
    emitNet(this.updateEvent, -1, this.id, this.toData());
  }

  override get position(): Vector3 {
    return EntityInternals.get(this).position!;
  }

  override set position(value: Vector3) {
    EntityInternals.get(this).position = value;
    this.sync();
  }

  override get dimension(): number {
    return EntityInternals.get(this).dimension;
  }

  override set dimension(value: number) {
    EntityInternals.get(this).dimension = value;
    this.sync();
  }

  override destroy(): void {
    emitNet(this.destroyEvent, -1, this.id);
    const pool = this.pool();
    if (pool) removeFromPool(pool, this.id);
  }
}
