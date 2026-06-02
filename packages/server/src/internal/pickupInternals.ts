import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { PickupMp } from "../Entities/PickupMp";

export interface PickupInternalsRec {
  pickupHash: number;
  value: number;
}

export const PickupInternals = defineInternals<PickupInternalsRec>();

export function initPickupInternals(pickup: PickupMp, pickupHash: number, value: number): PickupInternalsRec {
  return PickupInternals.init(pickup, {
    pickupHash,
    value,
  });
}
