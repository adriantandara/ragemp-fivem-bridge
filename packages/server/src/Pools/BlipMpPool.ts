import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { BroadcastPool } from "./BroadcastPool";
import { BlipMp } from "../Entities/BlipMp";
import { setupBlipPool } from "../internal/pools/blipPoolService";

export class BlipMpPool extends BroadcastPool<BlipMp> {
  protected override readonly createEvent = "ragemp:blipCreate";

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
    const blip = new BlipMp(CONSTRUCT, this.nextId(), sprite, position, options);
    return this.register(blip);
  }
}
