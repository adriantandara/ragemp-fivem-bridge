import { Pool, PoolEntity } from "./Pool";
import { initHandlePool, handlePoolStore } from "./internal/handlePoolStore";

export interface HandlePoolEntity extends PoolEntity {
  _handle: number;
}

export class HandlePool extends Pool {
  constructor() {
    super();
    initHandlePool(this);
  }

  atHandle(handle: number): HandlePoolEntity | null {
    return handlePoolStore(this).handleToEntity.get(handle) ?? null;
  }
}
