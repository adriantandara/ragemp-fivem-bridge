import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";

export interface PickupRec {
  handle: number | null;
  collected: boolean;
}

export const PickupInternals = defineInternals<PickupRec>();

export function initPickupInternals(pickup: object): PickupRec {
  return PickupInternals.init(pickup, { handle: null, collected: false });
}
