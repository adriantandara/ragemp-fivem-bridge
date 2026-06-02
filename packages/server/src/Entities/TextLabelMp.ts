import { Entity, Vector3 } from "@ragemp-fivem-bridge/shared";
import { TextLabelInternals, initTextLabelInternals } from "../internal/textLabelInternals";
import { removeFromPool, EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

type LabelColor = { r?: number; g?: number; b?: number; a?: number };

export class TextLabelMp extends Entity {
  constructor(id: number, text: string, position: Vector3) {
    super(id, "textlabel");
    const rec = EntityInternals.get(this);
    rec.position = position;
    rec.dimension = 0;
    initTextLabelInternals(this, text);
  }

  _sync(): void {
    emitNet("ragemp:labelUpdate", -1, this.id, this.toData());
  }

  toData(): Record<string, any> {
    const rec = TextLabelInternals.get(this);
    const ent = EntityInternals.get(this);
    return {
      id: this.id,
      text: rec.text,
      x: ent.position!.x,
      y: ent.position!.y,
      z: ent.position!.z,
      r: rec.r,
      g: rec.g,
      b: rec.b,
      a: rec.a,
      drawDistance: rec.drawDistance,
      los: rec.los,
      font: rec.font,
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

  get text(): string {
    return TextLabelInternals.get(this).text;
  }

  set text(value: string) {
    TextLabelInternals.get(this).text = value;
    this._sync();
  }

  get color(): { r: number; g: number; b: number; a: number } {
    const rec = TextLabelInternals.get(this);
    return { r: rec.r, g: rec.g, b: rec.b, a: rec.a };
  }

  set color(value: LabelColor) {
    const rec = TextLabelInternals.get(this);
    rec.r = value.r ?? rec.r;
    rec.g = value.g ?? rec.g;
    rec.b = value.b ?? rec.b;
    rec.a = value.a ?? rec.a;
    this._sync();
  }

  get drawDistance(): number {
    return TextLabelInternals.get(this).drawDistance;
  }

  set drawDistance(value: number) {
    TextLabelInternals.get(this).drawDistance = value;
    this._sync();
  }

  get los(): boolean {
    return TextLabelInternals.get(this).los;
  }

  set los(value: boolean) {
    TextLabelInternals.get(this).los = value;
    this._sync();
  }

  get font(): number {
    return TextLabelInternals.get(this).font;
  }

  set font(value: number) {
    TextLabelInternals.get(this).font = value;
    this._sync();
  }

  get dimension(): number {
    return EntityInternals.get(this).dimension;
  }

  set dimension(value: number) {
    EntityInternals.get(this).dimension = value;
    this._sync();
  }

  destroy(): void {
    emitNet("ragemp:labelDestroy", -1, this.id);
    removeFromPool(globalThis.mp.labels, this.id);
  }
}
