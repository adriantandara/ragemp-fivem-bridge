import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolAdd } from "@ragemp-fivem-bridge/shared/internal";
import { PickupMp } from "../Entities/PickupMp";
import { setupPickupPool } from "../internal/pools/pickupPoolService";

let pickupIdCounter = 0;

export class PickupMpPool extends Pool {
  constructor() {
    super();
    setupPickupPool(this);
  }

  new(pickupHash: number, position: Vector3, options: {
    value?: number;
    alpha?: number;
    dimension?: number;
  } = {}): PickupMp {
    const id = ++pickupIdCounter;
    const pickup = new PickupMp(id, pickupHash, position, options);
    poolAdd(this, pickup as any);
    emitNet("ragemp:pickupCreate", -1, pickup.toData());
    return pickup;
  }
}
