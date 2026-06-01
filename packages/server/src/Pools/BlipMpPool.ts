import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { BlipMp } from "../Entities/BlipMp";

let blipIdCounter = 0;

export class BlipMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync(): void {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const blips: ReturnType<BlipMp["toData"]>[] = [];
      this.forEach(((blip: BlipMp) => blips.push(blip.toData())) as any);
      if (blips.length > 0) {
        emitNet("ragemp:blipSyncAll", playerSource, blips);
      }
    });
  }

  new(sprite: number, position: Vector3, options: {
    alpha?: number;
    color?: number;
    dimension?: number;
    drawDistance?: number;
    name?: string;
    rotation?: number;
    scale?: number;
    shortRange?: boolean;
  } = {}): BlipMp {
    const id = ++blipIdCounter;
    const blip = new BlipMp(id, sprite, position, options);

    this._add(blip as any);

    emitNet("ragemp:blipCreate", -1, blip.toData());

    return blip;
  }
}
