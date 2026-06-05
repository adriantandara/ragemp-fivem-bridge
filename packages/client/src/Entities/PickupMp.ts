import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { initPickupInternals } from "../internal/pickupInternals";
import { removePickup } from "../internal/pools/pickupPoolService";

export class PickupMp extends Entity {
  pickupHash: number;
  x: number;
  y: number;
  z: number;
  value: number;

  constructor(token: symbol, data: any) {
    super(token, data.id, "pickup");
    this.pickupHash = data.pickupHash;
    this.x = data.x;
    this.y = data.y;
    this.z = data.z;
    this.value = data.value ?? 0;
    this.alpha = data.alpha ?? 255;
    this.dimension = data.dimension ?? 0;
    initPickupInternals(this);
  }

  override get position(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  override destroy(): void {
    const pool = globalThis.mp?.pickups;
    if (pool) removePickup(pool, this.id);
  }
}
