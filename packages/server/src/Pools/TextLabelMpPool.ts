import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolAdd, EntityInternals } from "@ragemp-fivem-bridge/shared/internal";
import { TextLabelMp } from "../Entities/TextLabelMp";
import { TextLabelInternals } from "../internal/textLabelInternals";
import { setupTextLabelPool } from "../internal/pools/textLabelPoolService";

let labelIdCounter = 0;

export class TextLabelMpPool extends Pool {
  constructor() {
    super();
    setupTextLabelPool(this);
  }

  new(text: string, position: Vector3, options: {
    color?: { r?: number; g?: number; b?: number; a?: number };
    dimension?: number;
    drawDistance?: number;
    font?: number;
    los?: boolean;
  } = {}): TextLabelMp {
    const id = ++labelIdCounter;
    const label = new TextLabelMp(id, text, position);
    const rec = TextLabelInternals.get(label);

    if (options.color !== undefined) {
      rec.r = options.color.r ?? 255;
      rec.g = options.color.g ?? 255;
      rec.b = options.color.b ?? 255;
      rec.a = options.color.a ?? 255;
    }
    if (options.dimension !== undefined) EntityInternals.get(label).dimension = options.dimension;
    if (options.drawDistance !== undefined) rec.drawDistance = options.drawDistance;
    if (options.font !== undefined) rec.font = options.font;
    if (options.los !== undefined) rec.los = options.los;

    poolAdd(this, label as any);

    emitNet("ragemp:labelCreate", -1, label.toData());

    return label;
  }
}
