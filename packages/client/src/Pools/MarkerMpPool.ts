import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolAdd, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { MarkerMp } from "../Entities/MarkerMp";
import { LocalCreatePool } from "./LocalCreatePool";
import { MarkerInternals } from "../internal/markerInternals";
import { setupMarkerPool } from "../internal/pools/markerPoolService";

export class MarkerMpPool extends LocalCreatePool<MarkerMp> {
  constructor() {
    super();
    setupMarkerPool(this);
  }

  atRemoteId(remoteId: number): MarkerMp | null {
    return this.at(remoteId) as unknown as MarkerMp | null;
  }

  new(type: number, position: { x: number; y: number; z: number } | Vector3, scale: number, options: any = {}): MarkerMp {
    const marker = new MarkerMp(CONSTRUCT, this.nextLocalId(), type);
    const rec = MarkerInternals.get(marker);
    rec.position = position instanceof Vector3 ? position : new Vector3(position.x, position.y, position.z);
    rec.scale = scale;

    if (options.color) {
      const c = options.color;
      const arr = Array.isArray(c);
      rec.r = (arr ? c[0] : c.r) ?? rec.r;
      rec.g = (arr ? c[1] : c.g) ?? rec.g;
      rec.b = (arr ? c[2] : c.b) ?? rec.b;
      rec.a = (arr ? c[3] : c.a) ?? rec.a;
    }
    if (options.direction !== undefined) {
      rec.direction = options.direction instanceof Vector3 ? options.direction : new Vector3(options.direction.x, options.direction.y, options.direction.z);
    }
    if (options.rotation !== undefined) {
      rec.rotation = options.rotation instanceof Vector3 ? options.rotation : new Vector3(options.rotation.x, options.rotation.y, options.rotation.z);
    }
    if (options.visible !== undefined) rec.visible = options.visible;
    if (options.dimension !== undefined) rec.dimension = options.dimension;

    poolAdd(this, marker as any);
    return marker;
  }
}
