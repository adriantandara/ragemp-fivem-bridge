import { Pool } from "@ragemp-fivem-bridge/shared";
import { setupPickupPool, pickupMap, type ClientPickup } from "../internal/pools/pickupPoolService";

export class PickupMpPool extends Pool {
  constructor() {
    super();
    setupPickupPool(this);
  }

  at(id: number): ClientPickup | null {
    return pickupMap(this).get(id) ?? null;
  }

  exists(idOrPickup: number | { id: number }): boolean {
    const id = typeof idOrPickup === "number" ? idOrPickup : idOrPickup?.id;
    return pickupMap(this).has(id);
  }

  forEach(fn: (p: ClientPickup) => void): void {
    pickupMap(this).forEach((p) => fn(p));
  }

  toArray(): ClientPickup[] {
    return Array.from(pickupMap(this).values());
  }

  get length(): number {
    return pickupMap(this).size;
  }

  get size(): number {
    return pickupMap(this).size;
  }
}
