import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { MarkerMp } from "../Entities/MarkerMp";

let markerIdCounter = 0;

export class MarkerMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync(): void {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const markers: ReturnType<MarkerMp["toData"]>[] = [];
      this.forEach(((marker: MarkerMp) => markers.push(marker.toData())) as any);
      if (markers.length > 0) {
        emitNet("ragemp:markerSyncAll", playerSource, markers);
      }
    });
  }

  new(type: number, position: Vector3, scale: number, options: {
    color?: [number, number, number, number] | { r?: number; g?: number; b?: number; a?: number };
    dimension?: number;
    direction?: Vector3;
    rotation?: Vector3;
    visible?: boolean;
  } = {}): MarkerMp {
    const id = ++markerIdCounter;
    const marker = new MarkerMp(id, type, position, scale);

    if (options.color) {
      const c = options.color;
      const arr = Array.isArray(c);
      marker._r = (arr ? (c as number[])[0] : (c as any).r) ?? marker._r;
      marker._g = (arr ? (c as number[])[1] : (c as any).g) ?? marker._g;
      marker._b = (arr ? (c as number[])[2] : (c as any).b) ?? marker._b;
      marker._a = (arr ? (c as number[])[3] : (c as any).a) ?? marker._a;
    }
    if (options.dimension !== undefined) marker._dimension = options.dimension;
    if (options.direction !== undefined) marker._direction = options.direction;
    if (options.rotation !== undefined) marker._rotation = options.rotation;
    if (options.visible !== undefined) marker._visible = options.visible;

    this._add(marker as any);

    emitNet("ragemp:markerCreate", -1, marker.toData());

    return marker;
  }
}
