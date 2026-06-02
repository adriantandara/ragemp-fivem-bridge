import { poolStore, poolAdd, poolRemove } from "@ragemp-fivem-bridge/shared/internal";
import { PlayerMp } from "../../Entities/PlayerMp";
import { PlayerInternals, resolvePlayerProc } from "../playerInternals";
import type { PlayerMpPool } from "../../Pools/PlayerMpPool";

export function setupPlayerPool(pool: PlayerMpPool): void {
  on("playerConnecting", (_name: string, _setKickReason: any, _deferrals: any) => {
    const playerSource = source;
    if (!poolStore(pool).entities.has(playerSource)) {
      const player = new PlayerMp(playerSource);
      PlayerInternals.get(player).ready = false;
      poolAdd(pool, player as any);
    }
  });

  on("playerJoining", (oldId: string | number) => {
    const realSource = source;
    const old = Number(oldId);
    const entities = poolStore(pool).entities;
    const existing = entities.get(old) as PlayerMp | undefined;
    if (existing && old !== realSource) {
      entities.delete(old);
      existing.id = realSource;
      PlayerInternals.get(existing).ready = true;
      entities.set(realSource, existing as any);
    } else {
      const existingAtReal = entities.get(realSource) as PlayerMp | undefined;
      if (existingAtReal) {
        PlayerInternals.get(existingAtReal).ready = true;
      } else {
        poolAdd(pool, new PlayerMp(realSource) as any);
      }
    }
  });

  on("playerDropped", (_reason: string) => {
    const playerSource = source;
    const player = poolStore(pool).entities.get(playerSource) as PlayerMp | undefined;
    if (player && typeof player.cancelPendingProc === "function") {
      player.cancelPendingProc();
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
