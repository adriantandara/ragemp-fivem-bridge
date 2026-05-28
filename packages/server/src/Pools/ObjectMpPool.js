import { Pool } from "@ragemp-fivem-bridge/shared";
import { ObjectMp } from "../Entities/ObjectMp";

let objectIdCounter = 0;

export class ObjectMpPool extends Pool {
  _handleToEntity = new Map();

  new(model, position, options = {}) {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;
    const dimension = options.dimension ?? 0;

    const handle = CreateObjectNoOffset(modelHash, position.x, position.y, position.z, true, true, false);
    const id = ++objectIdCounter;
    const obj = new ObjectMp(id, handle);

    if (options.rotation) {
      obj.rotation = options.rotation;
    }

    if (options.alpha !== undefined) {
      obj.alpha = options.alpha;
    }

    if (dimension !== 0) {
      obj.dimension = dimension;
    }

    this._add(obj);
    this._handleToEntity.set(handle, obj);

    return obj;
  }

  atHandle(handle) {
    return this._handleToEntity.get(handle) ?? null;
  }

  _remove(id) {
    const entity = this._entities.get(id);
    if (entity) {
      this._handleToEntity.delete(entity._handle);
    }
    super._remove(id);
  }
}
