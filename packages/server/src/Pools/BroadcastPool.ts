import { Entity, Pool } from "@ragemp-fivem-bridge/shared";
import { poolAdd } from "@ragemp-fivem-bridge/shared/internal";

export abstract class BroadcastPool<T extends Entity & { toData(): Record<string, any> }> extends Pool<T> {
  private idCounter = 0;

  protected abstract readonly createEvent: string;

  protected nextId(): number {
    return ++this.idCounter;
  }

  protected register(entity: T): T {
    poolAdd(this, entity as any);
    emitNet(this.createEvent, -1, entity.toData());
    return entity;
  }
}
