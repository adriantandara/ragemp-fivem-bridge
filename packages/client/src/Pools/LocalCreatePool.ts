import { Entity, Pool } from "@ragemp-fivem-bridge/shared";

const LOCAL_ID_BASE = 100000;

export abstract class LocalCreatePool<T extends Entity> extends Pool<T> {
  private localIdCounter = LOCAL_ID_BASE;

  protected nextLocalId(): number {
    return ++this.localIdCounter;
  }
}
