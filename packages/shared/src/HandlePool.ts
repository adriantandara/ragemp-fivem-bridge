import { Pool } from "./Pool";
import { Entity } from "./Entity";
import { initHandlePool, handlePoolStore } from "./internal/handlePoolStore";

export interface HandlePoolEntity extends Entity {
  _handle: number;
}

export class HandlePool extends Pool<HandlePoolEntity> {
  constructor() {
    super();
    initHandlePool(this);
  }

  atHandle(handle: number): HandlePoolEntity | null {
    return handlePoolStore(this).handleToEntity.get(handle) ?? null;
  }
}
