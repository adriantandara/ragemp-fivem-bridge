import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { MarkerInternals, initMarkerInternals } from "../internal/markerInternals";
import { removeFromPool, EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

type MarkerColor = { r: number; g: number; b: number; a: number };

export class MarkerMp extends Entity {
  constructor(id: number, type: number, position: Vector3, scale: number) {
    super(id, "marker");
    const rec = EntityInternals.get(this);
    rec.position = position;
    rec.dimension = 0;
    initMarkerInternals(this, type, scale);
  }

  _sync(): void {
    emitNet("ragemp:markerUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
    const rec = MarkerInternals.get(this);
    const ent = EntityInternals.get(this);
    return {
      id: this.id,
      type: rec.type,
      x: ent.position!.x,
      y: ent.position!.y,
      z: ent.position!.z,
      dirX: rec.direction.x,
      dirY: rec.direction.y,
      dirZ: rec.direction.z,
      rotX: rec.rotation.x,
      rotY: rec.rotation.y,
      rotZ: rec.rotation.z,
      scale: rec.scale,
      r: rec.r,
      g: rec.g,
      b: rec.b,
      a: rec.a,
      visible: rec.visible,
      dimension: ent.dimension,
    };
  }

  get position(): Vector3 {
    return EntityInternals.get(this).position!;
  }

  set position(value: Vector3) {
    EntityInternals.get(this).position = value;
    this._sync();
  }

  get dimension(): number {
    return EntityInternals.get(this).dimension;
  }

  set dimension(value: number) {
    EntityInternals.get(this).dimension = value;
    this._sync();
  }

  get direction(): Vector3 {
    return MarkerInternals.get(this).direction;
  }

  set direction(value: Vector3) {
    MarkerInternals.get(this).direction = value;
    this._sync();
  }

  get scale(): number {
    return MarkerInternals.get(this).scale;
  }

  set scale(value: number) {
    MarkerInternals.get(this).scale = value;
    this._sync();
  }

  get visible(): boolean {
    return MarkerInternals.get(this).visible;
  }

  set visible(value: boolean) {
    MarkerInternals.get(this).visible = value;
    this._sync();
  }

  get color(): MarkerColor {
    const rec = MarkerInternals.get(this);
    return { r: rec.r, g: rec.g, b: rec.b, a: rec.a };
  }

  set color(value: MarkerColor) {
    const rec = MarkerInternals.get(this);
    rec.r = value.r;
    rec.g = value.g;
    rec.b = value.b;
    rec.a = value.a;
    this._sync();
  }

  get rotation(): Vector3 {
    return MarkerInternals.get(this).rotation;
  }

  set rotation(value: Vector3) {
    MarkerInternals.get(this).rotation = value;
    this._sync();
  }

  // Override Entity.type (string) with marker type (number) — runtime shadowing; any suppresses base mismatch
  get type(): any {
    return MarkerInternals.get(this).type;
  }

  getColor(): number[] {
    const rec = MarkerInternals.get(this);
    return [rec.r, rec.g, rec.b, rec.a];
  }

  setColor(r: number, g: number, b: number, a: number): void {
    const rec = MarkerInternals.get(this);
    rec.r = r;
    rec.g = g;
    rec.b = b;
    rec.a = a;
    this._sync();
  }

  hideFor(player: any): void {
    emitNet("ragemp:markerHide", player.id, this.id);
  }

  showFor(player: any): void {
    emitNet("ragemp:markerShow", player.id, this.id);
  }

  destroy(): void {
    emitNet("ragemp:markerDestroy", -1, this.id);
    removeFromPool(globalThis.mp.markers, this.id);
  }
}
