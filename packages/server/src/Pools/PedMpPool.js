import { Pool } from "@ragemp-fivem-bridge/shared";
import { PedMp } from "../Entities/PedMp";

let pedIdCounter = 0;

export class PedMpPool extends Pool {
  _handleToEntity = new Map();

  new(model, position, options = {}) {
    const modelHash = typeof model === "string" ? GetHashKey(model) : model;
    const heading = options.heading ?? 0;
    const dimension = options.dimension ?? 0;

    const handle = CreatePed(4, modelHash, position.x, position.y, position.z, heading, true, false);
    const id = ++pedIdCounter;
    const ped = new PedMp(id, handle);

    if (dimension !== 0) {
      ped.dimension = dimension;
    }

    if (options.frozen) {
      ped.frozen = true;
    }

    if (options.invincible) {
      ped.invincible = true;
    }

    ped._dynamic = options.dynamic ?? true;
    ped._lockController = options.lockController ?? false;

    this._add(ped);
    this._handleToEntity.set(handle, ped);

    return ped;
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
