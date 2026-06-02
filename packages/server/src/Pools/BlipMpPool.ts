import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolAdd } from "@ragemp-fivem-bridge/shared/internal";
import { BlipMp } from "../Entities/BlipMp";
import { setupBlipPool } from "../internal/pools/blipPoolService";

let blipIdCounter = 0;

export class BlipMpPool extends Pool {
  constructor() {
    super();
    setupBlipPool(this);
  }

  new(sprite: number, position: Vector3, options: {
    alpha?: number;
    color?: number;
    dimension?: number;
    drawDistance?: number;
    name?: string;
    rotation?: number;
    scale?: number;
    shortRange?: boolean;
  } = {}): BlipMp {
    const id = ++blipIdCounter;
    const blip = new BlipMp(id, sprite, position, options);

    poolAdd(this, blip as any);

    emitNet("ragemp:blipCreate", -1, blip.toData());

    return blip;
  }
}
