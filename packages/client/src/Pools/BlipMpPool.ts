import { BlipMp } from "../Entities/BlipMp";
import { LocalCreatePool } from "./LocalCreatePool";
import { setupBlipPool, createBlip } from "../internal/pools/blipPoolService";

export class BlipMpPool extends LocalCreatePool<BlipMp> {
  constructor() {
    super();
    setupBlipPool(this);
  }

  atRemoteId(remoteId: number): BlipMp | null {
    return this.at(remoteId) as unknown as BlipMp | null;
  }

  new(sprite: number, position: { x: number; y: number; z: number }, options: any = {}): BlipMp {
    return createBlip(this, this.nextLocalId(), sprite, position, options);
  }
}
