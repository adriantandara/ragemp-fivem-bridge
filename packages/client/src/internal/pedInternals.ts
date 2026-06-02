import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { Vector3 } from "@ragemp-fivem-bridge/shared";
import type { PedMp } from "../Entities/PedMp";

export interface PedInternalsRec {
  invincible: boolean;
  dynamic: boolean;
  spawnPosition: Vector3 | null;
}

export const PedInternals = defineInternals<PedInternalsRec>();

export function initPedInternals(ped: PedMp): PedInternalsRec {
  return PedInternals.init(ped, {
    invincible: false,
    dynamic: false,
    spawnPosition: null,
  });
}
