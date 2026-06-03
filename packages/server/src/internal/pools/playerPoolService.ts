import { poolStore, poolAdd, poolRemove, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { PlayerMp } from "../../Entities/PlayerMp";
import { PlayerInternals, resolvePlayerProc } from "../playerInternals";
import type { PlayerMpPool } from "../../Pools/PlayerMpPool";

export function setupPlayerPool(pool: PlayerMpPool): void {
  on("playerJoining", () => {
    const realSource = source;
    const entities = poolStore(pool).entities;
    if (entities.has(realSource)) {
      PlayerInternals.get(entities.get(realSource) as PlayerMp).ready = true;
      return;
    }
    const player = new PlayerMp(CONSTRUCT, realSource);
    PlayerInternals.get(player).ready = true;
    poolAdd(pool, player as any);
    globalThis.mp?.events?.call?.("playerJoin", player);
  });

  on("playerDropped", (reason: string) => {
    const playerSource = source;
    const player = poolStore(pool).entities.get(playerSource) as PlayerMp | undefined;
    if (player) {
      globalThis.mp?.events?.call?.("playerQuit", player, "disconnect", reason);
      if (typeof player.cancelPendingProc === "function") {
        player.cancelPendingProc();
      }
    }
    poolRemove(pool, playerSource);
  });

  onNet("ragemp:callProcResult", (reqId: number, error: string | null, result: any) => {
    const player = poolStore(pool).entities.get(source) as PlayerMp | undefined;
    if (player) resolvePlayerProc(player, reqId, error, result);
  });

  onNet("ragemp:playerReady", () => {
    const src = source;
    emitNet("ragemp:setDimension", src, GetPlayerRoutingBucket(src.toString()));
  });
}
