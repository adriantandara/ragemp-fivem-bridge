import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { BroadcastPool } from "./BroadcastPool";
import { PickupMp } from "../Entities/PickupMp";
import { setupPickupPool } from "../internal/pools/pickupPoolService";

export class PickupMpPool extends BroadcastPool<PickupMp> {
  protected override readonly createEvent = "ragemp:pickupCreate";

  constructor() {
    super();
    setupPickupPool(this);
  }

  new(pickupHash: number, position: Vector3, options: {
    value?: number;
    alpha?: number;
    dimension?: number;
  } = {}): PickupMp {
    const pickup = new PickupMp(CONSTRUCT, this.nextId(), pickupHash, position, options);
    return this.register(pickup);
  }
}
