import { Pool, PoolEntity } from "./Pool";

export interface HandlePoolEntity extends PoolEntity {
  _handle: number;
}

export class HandlePool extends Pool {
  _handleToEntity: Map<number, HandlePoolEntity> = new Map();

  atHandle(handle: number): HandlePoolEntity | null {
    return this._handleToEntity.get(handle) ?? null;
  }

  _remove(id: number): void {
    const entity = this._entities.get(id) as HandlePoolEntity | undefined;
    if (entity) this._handleToEntity.delete(entity._handle);
    super._remove(id);
  }
}
