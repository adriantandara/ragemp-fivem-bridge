import { Pool } from "@ragemp-fivem-bridge/shared";
import { BlipMp } from "../Entities/BlipMp";
import { setupBlipPool, createBlip } from "../internal/pools/blipPoolService";

export class BlipMpPool extends Pool<BlipMp> {
  constructor() {
    super();
    setupBlipPool(this);
  }

  new(sprite: number, position: { x: number; y: number; z: number }, options: any = {}): BlipMp {
    return createBlip(this, sprite, position, options);
  }
}
