import { Pool } from "@ragemp-fivem-bridge/shared";
import type { Vector3 } from "@ragemp-fivem-bridge/shared";
import { PlayerMp } from "../Entities/PlayerMp";
import { setupPlayerPool } from "../internal/pools/playerPoolService";

export class PlayerMpPool extends Pool {
  local!: PlayerMp;
  at!: (id: number) => PlayerMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: PlayerMp) => void) => void;
  toArray!: () => PlayerMp[];

  constructor() {
    super();
    setupPlayerPool(this);
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
}
