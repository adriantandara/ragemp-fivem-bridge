import { Pool } from "@ragemp-fivem-bridge/shared";
import { rageHealthToGtaPed } from "@ragemp-fivem-bridge/shared";
import type { Vector3 } from "@ragemp-fivem-bridge/shared";
import { PlayerMp } from "../Entities/PlayerMp";
import { onWorldScan } from "../utils/worldScan";

export class PlayerMpPool extends Pool {
  local!: PlayerMp;
  _entities!: Map<number, PlayerMp>;
  _add!: (entity: PlayerMp) => void;
  _remove!: (id: number) => void;
  at!: (id: number) => PlayerMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: PlayerMp) => void) => void;
  toArray!: () => PlayerMp[];

  constructor() {
    super();
    this._setupLocal();
    this._setupStreaming();
    this._setupServerSync();
  }

  _setupLocal(): void {
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

  atRemoteId(remoteId: number): PlayerMp | null {
    return this.at(remoteId);
  }

  get weapon(): number {
    return this.local?.weapon ?? 0;
  }

  get health(): number {
    return this.local?.health ?? 100;
  }

  get position(): Vector3 | null {
    return this.local?.position ?? null;
  }

  get heading(): number {
    return this.local?.heading ?? 0;
  }

  get streamed(): PlayerMp[] {
    return this.toArray().filter((p: PlayerMp) => p !== this.local);
  }

  forEachInStreamRange(fn: (player: PlayerMp) => void): void {
    this.streamed.forEach(fn);
  }

  _setupServerSync(): void {
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

  _activePlayerSet: Set<number> = new Set();

  _setupStreaming(): void {
    onWorldScan((cache: { players: number[]; vehicles: number[]; peds: number[] }) => {
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
