import { Vector3, Pool } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { PickupMp } from "../Entities/PickupMp";
import { setupPickupPool } from "../internal/pools/pickupPoolService";
import { nextBroadcastId, registerBroadcast } from "../internal/pools/broadcastPoolService";

export class PickupMpPool extends Pool<PickupMp> {
  constructor() {
    super();
    setupPickupPool(this);
  }

  new(pickupHash: number, position: Vector3, options: {
    value?: number;
    alpha?: number;
    dimension?: number;
  } = {}): PickupMp {
    const pickup = new PickupMp(CONSTRUCT, nextBroadcastId(this), pickupHash, position, options);
    return registerBroadcast(this, pickup);
  }
}
