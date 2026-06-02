import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { removeFromPool } from "@ragemp-fivem-bridge/shared/internal";
import { MarkerInternals, initMarkerInternals } from "../internal/markerInternals";

export class MarkerMp extends Entity {
  id: number;

  constructor(id: number, type: number) {
    super(id, "marker");
    initMarkerInternals(this, type);
  }

  get position(): Vector3 {
    return MarkerInternals.get(this).position;
  }

  set position(value: { x: number; y: number; z: number }) {
    MarkerInternals.get(this).position = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get direction(): Vector3 {
    return MarkerInternals.get(this).direction;
  }

  set direction(value: { x: number; y: number; z: number }) {
    MarkerInternals.get(this).direction = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get rotation(): Vector3 {
    return MarkerInternals.get(this).rotation;
  }

  set rotation(value: { x: number; y: number; z: number }) {
    MarkerInternals.get(this).rotation = value instanceof Vector3 ? value : new Vector3(value.x, value.y, value.z);
  }

  get scale(): number {
    return MarkerInternals.get(this).scale;
  }

  set scale(value: number) {
    MarkerInternals.get(this).scale = value;
  }

  get visible(): boolean {
    return MarkerInternals.get(this).visible;
  }

  set visible(value: boolean) {
    MarkerInternals.get(this).visible = value;
  }

  get color(): { r: number; g: number; b: number; a: number } {
    const rec = MarkerInternals.get(this);
    return { r: rec.r, g: rec.g, b: rec.b, a: rec.a };
  }

  set color(value: { r: number; g: number; b: number; a: number }) {
    const rec = MarkerInternals.get(this);
    rec.r = value.r;
    rec.g = value.g;
    rec.b = value.b;
    rec.a = value.a;
  }

  destroy(): void {
    if (globalThis.mp.markers) removeFromPool(globalThis.mp.markers, this.id);
  }
}
