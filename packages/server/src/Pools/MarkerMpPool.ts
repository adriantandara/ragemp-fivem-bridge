import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolAdd, EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { MarkerMp } from "../Entities/MarkerMp";
import { MarkerInternals } from "../internal/markerInternals";
import { setupMarkerPool } from "../internal/pools/markerPoolService";

let markerIdCounter = 0;

export class MarkerMpPool extends Pool {
  constructor() {
    super();
    setupMarkerPool(this);
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
    const rec = MarkerInternals.get(marker);

    if (options.color) {
      const c = options.color;
      const arr = Array.isArray(c);
      rec.r = (arr ? (c as number[])[0] : (c as any).r) ?? rec.r;
      rec.g = (arr ? (c as number[])[1] : (c as any).g) ?? rec.g;
      rec.b = (arr ? (c as number[])[2] : (c as any).b) ?? rec.b;
      rec.a = (arr ? (c as number[])[3] : (c as any).a) ?? rec.a;
    }
    if (options.dimension !== undefined) EntityInternals.get(marker).dimension = options.dimension;
    if (options.direction !== undefined) rec.direction = options.direction;
    if (options.rotation !== undefined) rec.rotation = options.rotation;
    if (options.visible !== undefined) rec.visible = options.visible;

    poolAdd(this, marker as any);

    emitNet("ragemp:markerCreate", -1, marker.toData());

    return marker;
  }
}
