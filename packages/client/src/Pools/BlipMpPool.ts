import { Pool } from "@ragemp-fivem-bridge/shared";
import { BlipMp } from "../Entities/BlipMp";
import { setupBlipPool, createBlip } from "../internal/pools/blipPoolService";

let localBlipIdCounter = 100000;

export class BlipMpPool extends Pool {
  constructor() {
    super();
    setupBlipPool(this);
  }

  atRemoteId(remoteId: number): BlipMp | null {
    return this.at(remoteId) as unknown as BlipMp | null;
  }

  new(sprite: number, position: { x: number; y: number; z: number }, options: any = {}): BlipMp {
    const id = ++localBlipIdCounter;
    return createBlip(this, id, sprite, position, options);
  }
}
