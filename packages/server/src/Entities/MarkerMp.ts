import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { BroadcastEntity } from "./BroadcastEntity";
import { MarkerInternals, initMarkerInternals } from "../internal/markerInternals";
import { getPlayerSource } from "../internal/playerInternals";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

type MarkerColor = { r: number; g: number; b: number; a: number };

export class MarkerMp extends BroadcastEntity {
  protected override readonly updateEvent = "ragemp:markerUpdate";
  protected override readonly destroyEvent = "ragemp:markerDestroy";

  constructor(token: symbol, id: number, type: number, position: Vector3, scale: number) {
    super(token, id, "marker");
    const rec = EntityInternals.get(this);
    rec.position = position;
    rec.dimension = 0;
    initMarkerInternals(this, type, scale);
  }

  protected override pool(): object | null | undefined {
    return globalThis.mp.markers;
  }

  override toData(): Record<string, any> {
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

  get direction(): Vector3 {
    return MarkerInternals.get(this).direction;
  }

  set direction(value: Vector3) {
    MarkerInternals.get(this).direction = value;
    this.sync();
  }

  get scale(): number {
    return MarkerInternals.get(this).scale;
  }

  set scale(value: number) {
    MarkerInternals.get(this).scale = value;
    this.sync();
  }

  get visible(): boolean {
    return MarkerInternals.get(this).visible;
  }

  set visible(value: boolean) {
    MarkerInternals.get(this).visible = value;
    this.sync();
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
    this.sync();
  }

  get rotation(): Vector3 {
    return MarkerInternals.get(this).rotation;
  }

  set rotation(value: Vector3) {
    MarkerInternals.get(this).rotation = value;
    this.sync();
  }

  // Override Entity.type (string) with marker type (number) — runtime shadowing; any suppresses base mismatch
  override get type(): any {
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
    this.sync();
  }

  hideFor(player: any): void {
    emitNet("ragemp:markerHide", typeof player === "object" && player ? getPlayerSource(player) : player, this.id);
  }

  showFor(player: any): void {
    emitNet("ragemp:markerShow", typeof player === "object" && player ? getPlayerSource(player) : player, this.id);
  }
}
