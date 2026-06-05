import { poolStore, poolAdd, poolRemove, CONSTRUCT, IdAllocator } from "@ragemp-fivem-bridge/shared/internal";
import { PlayerMp } from "../../Entities/PlayerMp";
import { PlayerInternals, resolvePlayerProc } from "../playerInternals";
import { playerMapped, playerUnmapped, remoteIdForSource, sendPlayerSnapshot, playerBySource } from "../../utils/playerRegistry";
import type { PlayerMpPool } from "../../Pools/PlayerMpPool";

const playerIds = new IdAllocator();

export function setupPlayerPool(pool: PlayerMpPool): void {
  on("playerJoining", () => {
    const realSource = source;
    if (remoteIdForSource(realSource) !== undefined) {
      const existing = playerBySource(realSource) as PlayerMp | null;
      if (existing) PlayerInternals.get(existing).ready = true;
      return;
    }
    const remoteId = playerIds.allocate();
    const player = new PlayerMp(CONSTRUCT, remoteId, realSource);
    PlayerInternals.get(player).ready = true;
    poolAdd(pool, player as any);
    playerMapped(realSource, remoteId);
    globalThis.mp?.events?.call?.("playerJoin", player);
  });

  on("playerDropped", (reason: string) => {
    const playerSource = source;
    const remoteId = remoteIdForSource(playerSource);
    const player = remoteId !== undefined
      ? (poolStore(pool).entities.get(remoteId) as PlayerMp | undefined)
      : undefined;
    if (player) {
      globalThis.mp?.events?.call?.("playerQuit", player, "disconnect", reason);
      if (typeof player.cancelPendingProc === "function") {
        player.cancelPendingProc();
      }
    }
    if (remoteId !== undefined) {
      poolRemove(pool, remoteId);
      playerIds.free(remoteId);
    }
    playerUnmapped(playerSource);
  });

  onNet("ragemp:callProcResult", (reqId: number, error: string | null, result: any) => {
    const player = playerBySource(source) as PlayerMp | null;
    if (player) resolvePlayerProc(player, reqId, error, result);
  });

  onNet("ragemp:playerReady", () => {
    const src = source;
    sendPlayerSnapshot(src);
    emitNet("ragemp:setDimension", src, GetPlayerRoutingBucket(src.toString()));
  });
}
