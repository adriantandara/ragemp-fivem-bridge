import { HandlePool } from "@ragemp-fivem-bridge/shared";
import { ObjectMp } from "../Entities/ObjectMp";

let objectIdCounter = 0;

export class ObjectMpPool extends HandlePool {
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
}
