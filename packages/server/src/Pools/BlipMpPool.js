import { Pool } from "@ragemp-fivem-bridge/shared";
import { BlipMp } from "../Entities/BlipMp";

let blipIdCounter = 0;

export class BlipMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync() {
    onNet("ragemp:playerReady", () => {
      const playerSource = globalThis.source;
      const blips = [];
      this.forEach((blip) => blips.push(blip.toData()));
      if (blips.length > 0) {
        emitNet("ragemp:blipSyncAll", playerSource, blips);
      }
    });
  }

  new(sprite, position, options = {}) {
    const id = ++blipIdCounter;
    const blip = new BlipMp(id, sprite, position, options);

    this._add(blip);

    emitNet("ragemp:blipCreate", -1, blip.toData());

    return blip;
  }
}
