import { Pool } from "./Pool";

export class HandlePool extends Pool {
  _handleToEntity = new Map();

  atHandle(handle) {
    return this._handleToEntity.get(handle) ?? null;
  }

  _remove(id) {
    const entity = this._entities.get(id);
    if (entity) this._handleToEntity.delete(entity._handle);
    super._remove(id);
  }
}
