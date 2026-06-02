import { defineInternals, poolStore, poolAdd, removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { rageHealthToGtaPed } from "@ragemp-fivem-bridge/shared";
import { onWorldScan } from "../../utils/worldScan";
import { PlayerMp } from "../../Entities/PlayerMp";
import type { PlayerMpPool } from "../../Pools/PlayerMpPool";

interface PlayerPoolState {
  activePlayerSet: Set<number>;
}

const Store = defineInternals<PlayerPoolState>();

export function setupPlayerPool(pool: PlayerMpPool): void {
  Store.init(pool, { activePlayerSet: new Set() });
  setupLocal(pool);
  setupStreaming(pool);
  setupServerSync();
}

function setupLocal(pool: PlayerMpPool): void {
  try {
    const playerId = PlayerId();
    const serverId = GetPlayerServerId(playerId);
    pool.local = new PlayerMp(serverId || playerId, playerId);
    poolAdd(pool, pool.local);
  } catch (e) {
    const tick = setTick(() => {
      try {
        const playerId = PlayerId();
        const serverId = GetPlayerServerId(playerId);
        if (!serverId) return;
        clearTick(tick);
        pool.local = new PlayerMp(serverId, playerId);
        poolAdd(pool, pool.local);
      } catch (_) {}
    });
  }
}

function setupStreaming(pool: PlayerMpPool): void {
  onWorldScan((cache: { players: number[]; vehicles: number[]; peds: number[] }) => {
    const activePlayers = cache.players;
    const activeSet = Store.get(pool).activePlayerSet;
    activeSet.clear();

    for (const playerIndex of activePlayers) {
      const serverId = GetPlayerServerId(playerIndex);
      activeSet.add(serverId);

      if (!pool.exists(serverId)) {
        const player = new PlayerMp(serverId, playerIndex);
        poolAdd(pool, player);
      }
    }

    for (const [id] of poolStore(pool).entities) {
      if (id !== pool.local.id && !activeSet.has(id)) {
        removeFromPool(pool, id);
      }
    }
  });
}

function setupServerSync(): void {
  onNet("ragemp:setHealth", (value: number) => {
    SetEntityHealth(PlayerPedId(), rageHealthToGtaPed(value));
  });

  onNet("ragemp:setArmour", (value: number) => {
    SetPedArmour(PlayerPedId(), value);
  });

  onNet("ragemp:setAlpha", (value: number) => {
    SetEntityAlpha(PlayerPedId(), value, false);
  });

  onNet("ragemp:enableVoiceTo", (targetServerId: number) => {
    const voiceChat = globalThis.mp?.voiceChat;
    if (voiceChat) voiceChat.listenTo(targetServerId);
  });

  onNet("ragemp:disableVoiceTo", (targetServerId: number) => {
    const voiceChat = globalThis.mp?.voiceChat;
    if (voiceChat) voiceChat.stopListenTo(targetServerId);
  });
}
