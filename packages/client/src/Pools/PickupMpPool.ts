import { Pool } from "@ragemp-fivem-bridge/shared";
import { setupPickupPool, pickupMap, pickupByLocal } from "../internal/pools/pickupPoolService";
import { PickupMp } from "../Entities/PickupMp";

export class PickupMpPool extends Pool<PickupMp> {
  constructor() {
    super();
    setupPickupPool(this);
  }

  override at(id: number): PickupMp | null {
    return pickupByLocal(this).get(id) ?? null;
  }

  override atRemoteId(remoteId: number): PickupMp | null {
    return pickupMap(this).get(remoteId) ?? null;
  }

  override exists(idOrPickup: number | PickupMp): boolean {
    const id = typeof idOrPickup === "number" ? idOrPickup : idOrPickup?.id;
    return pickupByLocal(this).has(id);
  }

  override forEach(fn: (p: PickupMp) => void): void {
    pickupMap(this).forEach((p) => fn(p));
  }

  override toArray(): PickupMp[] {
    return Array.from(pickupMap(this).values());
  }

  override get length(): number {
    return pickupMap(this).size;
  }

  override get size(): number {
    return pickupMap(this).size;
  }
}
