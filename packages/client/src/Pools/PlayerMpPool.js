import { Pool } from "@ragemp-fivem-bridge/shared";
import { PlayerMp } from "../Entities/PlayerMp";
import { onWorldScan } from "../utils/worldScan";

export class PlayerMpPool extends Pool {
  local;

  constructor() {
    super();
    this._setupLocal();
    this._setupStreaming();
    this._setupServerSync();
  }

  _setupLocal() {
    try {
      const playerId = PlayerId();
      const serverId = GetPlayerServerId(playerId);
      this.local = new PlayerMp(serverId || playerId, playerId);
      this._add(this.local);
    } catch (e) {
      const tick = setTick(() => {
        try {
          const playerId = PlayerId();
          const serverId = GetPlayerServerId(playerId);
          if (!serverId) return;
          clearTick(tick);
          this.local = new PlayerMp(serverId, playerId);
          this._add(this.local);
        } catch (_) {}
      });
    }
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  get weapon() {
    return this.local?.weapon ?? 0;
  }

  get health() {
    return this.local?.health ?? 100;
  }

  get position() {
    return this.local?.position ?? null;
  }

  get heading() {
    return this.local?.heading ?? 0;
  }

  get streamed() {
    return this.toArray().filter(p => p !== this.local);
  }

  forEachInStreamRange(fn) {
    this.streamed.forEach(fn);
  }

  _setupServerSync() {
    onNet("ragemp:setHealth", (value) => {
      SetEntityHealth(PlayerPedId(), value);
    });

    onNet("ragemp:setArmour", (value) => {
      SetPedArmour(PlayerPedId(), value);
    });

    onNet("ragemp:setAlpha", (value) => {
      SetEntityAlpha(PlayerPedId(), value, false);
    });

    onNet("ragemp:enableVoiceTo", (targetServerId) => {
      const voiceChat = globalThis.mp?.voiceChat;
      if (voiceChat) voiceChat.listenTo(targetServerId);
    });

    onNet("ragemp:disableVoiceTo", (targetServerId) => {
      const voiceChat = globalThis.mp?.voiceChat;
      if (voiceChat) voiceChat.stopListenTo(targetServerId);
    });
  }

  _activePlayerSet = new Set();

  _setupStreaming() {
    onWorldScan((cache) => {
      const activePlayers = cache.players;
      const activeSet = this._activePlayerSet;
      activeSet.clear();

      for (const playerIndex of activePlayers) {
        const serverId = GetPlayerServerId(playerIndex);
        activeSet.add(serverId);

        if (!this.exists(serverId)) {
          const player = new PlayerMp(serverId, playerIndex);
          this._add(player);
        }
      }

      for (const [id] of this._entities) {
        if (id !== this.local.id && !activeSet.has(id)) {
          this._remove(id);
        }
      }
    });
  }
}
