import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { BroadcastEntity } from "./BroadcastEntity";
import { TextLabelInternals, initTextLabelInternals } from "../internal/textLabelInternals";
import { EntityInternals } from "@ragemp-fivem-bridge/shared/internal";

type LabelColor = { r?: number; g?: number; b?: number; a?: number };

export class TextLabelMp extends BroadcastEntity {
  protected override readonly updateEvent = "ragemp:labelUpdate";
  protected override readonly destroyEvent = "ragemp:labelDestroy";

  constructor(token: symbol, id: number, text: string, position: Vector3) {
    super(token, id, "textlabel");
    const rec = EntityInternals.get(this);
    rec.position = position;
    rec.dimension = 0;
    initTextLabelInternals(this, text);
  }

  protected override pool(): object | null | undefined {
    return globalThis.mp.labels;
  }

  override toData(): Record<string, any> {
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

  get text(): string {
    return TextLabelInternals.get(this).text;
  }

  set text(value: string) {
    TextLabelInternals.get(this).text = value;
    this.sync();
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
    this.sync();
  }

  get drawDistance(): number {
    return TextLabelInternals.get(this).drawDistance;
  }

  set drawDistance(value: number) {
    TextLabelInternals.get(this).drawDistance = value;
    this.sync();
  }

  get los(): boolean {
    return TextLabelInternals.get(this).los;
  }

  set los(value: boolean) {
    TextLabelInternals.get(this).los = value;
    this.sync();
  }

  get font(): number {
    return TextLabelInternals.get(this).font;
  }

  set font(value: number) {
    TextLabelInternals.get(this).font = value;
    this.sync();
  }
}
