import { Pool } from "@ragemp-fivem-bridge/shared";
import { MarkerMp } from "../Entities/MarkerMp";

let markerIdCounter = 0;

export class MarkerMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync() {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const markers = [];
      this.forEach((marker) => markers.push(marker.toData()));
      if (markers.length > 0) {
        emitNet("ragemp:markerSyncAll", playerSource, markers);
      }
    });
  }

  new(type, position, scale, options = {}) {
    const id = ++markerIdCounter;
    const marker = new MarkerMp(id, type, position, scale);

    if (options.color) {
      marker._r = options.color.r ?? marker._r;
      marker._g = options.color.g ?? marker._g;
      marker._b = options.color.b ?? marker._b;
      marker._a = options.color.a ?? marker._a;
    }
    if (options.dimension !== undefined) marker._dimension = options.dimension;
    if (options.direction !== undefined) marker._direction = options.direction;
    if (options.rotation !== undefined) marker._rotation = options.rotation;
    if (options.visible !== undefined) marker._visible = options.visible;

    this._add(marker);

    emitNet("ragemp:markerCreate", -1, marker.toData());

    return marker;
  }
}
