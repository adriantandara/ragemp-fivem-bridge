import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { PlayerMp } from "../Entities/PlayerMp";

export class PlayerMpPool extends Pool {
  constructor() {
    super();
    this._setupListeners();
  }

  _setupListeners(): void {
    on("playerConnecting", (name: string, setKickReason: any, deferrals: any) => {
      const playerSource = source;
      if (!this._entities.has(playerSource)) {
        const player = new PlayerMp(playerSource);
        player._ready = false;
        this._add(player as any);
      }
    });

    on("playerJoining", (oldId: string | number) => {
      const realSource = source;
      const old = Number(oldId);
      const existing = this._entities.get(old);
      if (existing && old !== realSource) {
        this._entities.delete(old);
        existing.id = realSource;
        existing._ready = true;
        this._entities.set(realSource, existing);
      } else {
        const existingAtReal = this._entities.get(realSource);
        if (existingAtReal) {
          existingAtReal._ready = true;
        } else {
          this._add(new PlayerMp(realSource) as any);
        }
      }
    });

    on("playerDropped", (reason: string) => {
      const playerSource = source;
      const player = this._entities.get(playerSource);
      if (player && typeof player.cancelPendingProc === "function") {
        player.cancelPendingProc();
      }
      this._remove(playerSource);
    });

    onNet("ragemp:callProcResult", (reqId: number, error: string | null, result: any) => {
      const player = this._entities.get(source);
      if (player && typeof player._resolveProc === "function") {
        player._resolveProc(reqId, error, result);
      }
    });

    onNet("ragemp:playerReady", () => {
      const src = source;
      emitNet("ragemp:setDimension", src, GetPlayerRoutingBucket(src.toString()));
    });
  }

  broadcast(text: string): void {
    this.forEach(((player: PlayerMp) => player.outputChatBox(text)) as any);
  }

  broadcastInRange(position: Vector3, range: number, dimensionOrText: number | string, maybeText?: string): void {
    const hasDimension = typeof dimensionOrText === "number";
    const dimension = hasDimension ? dimensionOrText as number : null;
    const text = hasDimension ? maybeText! : dimensionOrText as string;
    this.forEach(((player: PlayerMp) => {
      if ((player as any)._ready === false) return;
      if (hasDimension && player.dimension !== dimension) return;
      if ((player.position as any).distance(position) <= range) player.outputChatBox(text);
    }) as any);
  }

  broadcastInDimension(dimension: number, text: string): void {
    this.forEach(((player: PlayerMp) => {
      if (player.dimension === dimension) player.outputChatBox(text);
    }) as any);
  }

  call(playersOrEventName: PlayerMp[] | string, ...rest: any[]): void {
    if (typeof playersOrEventName === "string") {
      const [args] = rest;
      this.forEach(((player: PlayerMp) => player.call(playersOrEventName, args)) as any);
    } else {
      const [eventName, args] = rest;
      for (const player of playersOrEventName) player.call(eventName, args);
    }
  }

  callInDimension(dimension: number, eventName: string, args?: any[]): void {
    this.forEach(((player: PlayerMp) => {
      if (player.dimension === dimension) player.call(eventName, args);
    }) as any);
  }

  callInRange(position: Vector3, range: number, eventName: string, args?: any[]): void {
    this.forEach(((player: PlayerMp) => {
      if ((player as any)._ready === false) return;
      if ((player.position as any).distance(position) <= range) player.call(eventName, args);
    }) as any);
  }

  callUnreliable(...args: any[]): void {
    (this.call as (...a: any[]) => void)(...args);
  }

  callInDimensionUnreliable(dimension: number, eventName: string, args?: any[]): void {
    this.callInDimension(dimension, eventName, args);
  }

  callInRangeUnreliable(position: Vector3, range: number, eventName: string, args?: any[]): void {
    this.callInRange(position, range, eventName, args);
  }
}
