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
    const playerId = PlayerId();
    const serverId = GetPlayerServerId(playerId);
    this.local = new PlayerMp(serverId, playerId);
    this._add(this.local);
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  get weapon() {
    return this.local?.weapon ?? 0;
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

  _setupStreaming() {
    onWorldScan((cache) => {
      const activePlayers = cache.players;
      const activeSet = new Set();

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
