import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { PedMp } from "../Entities/PedMp";

export interface PedInternalsRec {
  frozen: boolean;
  invincible: boolean;
  netIdReady?: boolean;
  cachedNetId?: number;
  dynamic?: boolean;
  lockController?: boolean;
  varFlushScheduled: boolean;
}

export const PedInternals = defineInternals<PedInternalsRec>();

export function initPedInternals(ped: PedMp): PedInternalsRec {
  return PedInternals.init(ped, {
    frozen: false,
    invincible: false,
    varFlushScheduled: false,
  });
}
