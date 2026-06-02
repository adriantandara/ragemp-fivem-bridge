import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { PlayerMp } from "../Entities/PlayerMp";

export interface PlayerInternalsRec {
  playerIndex: number;
  dimension: number | undefined;
  voiceFX: any;
}

export const PlayerInternals = defineInternals<PlayerInternalsRec>();

export function initPlayerInternals(player: PlayerMp, playerIndex: number): PlayerInternalsRec {
  return PlayerInternals.init(player, {
    playerIndex,
    dimension: undefined,
    voiceFX: undefined,
  });
}
