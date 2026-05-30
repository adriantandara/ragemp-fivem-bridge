import { HandlePool } from "@ragemp-fivem-bridge/shared";
import { PedMp } from "../Entities/PedMp";

let pedIdCounter = 0;

export class PedMpPool extends HandlePool {
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
}
