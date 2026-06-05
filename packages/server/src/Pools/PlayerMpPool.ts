import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { PlayerMp } from "../Entities/PlayerMp";
import { PlayerInternals } from "../internal/playerInternals";
import { setupPlayerPool } from "../internal/pools/playerPoolService";

export class PlayerMpPool extends Pool<PlayerMp> {
  constructor() {
    super();
    setupPlayerPool(this);
  }

  broadcast(text: string): void {
    this.forEach(((player: PlayerMp) => player.outputChatBox(text)) as any);
  }

  broadcastInRange(position: Vector3, range: number, dimensionOrText: number | string, maybeText?: string): void {
    const hasDimension = typeof dimensionOrText === "number";
    const dimension = hasDimension ? dimensionOrText as number : null;
    const text = hasDimension ? maybeText! : dimensionOrText as string;
    this.forEach(((player: PlayerMp) => {
      if (!PlayerInternals.get(player).ready) return;
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
      if (!PlayerInternals.get(player).ready) return;
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
