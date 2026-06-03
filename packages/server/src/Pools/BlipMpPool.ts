import { Vector3, Pool } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { BlipMp } from "../Entities/BlipMp";
import { setupBlipPool } from "../internal/pools/blipPoolService";
import { nextBroadcastId, registerBroadcast } from "../internal/pools/broadcastPoolService";

export class BlipMpPool extends Pool<BlipMp> {
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
    const blip = new BlipMp(CONSTRUCT, nextBroadcastId(this), sprite, position, options);
    return registerBroadcast(this, blip);
  }
}
