import { Vector3, Pool } from "@ragemp-fivem-bridge/shared";
import { EntityInternals, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { TextLabelMp } from "../Entities/TextLabelMp";
import { TextLabelInternals } from "../internal/textLabelInternals";
import { setupTextLabelPool } from "../internal/pools/textLabelPoolService";
import { nextBroadcastId, registerBroadcast } from "../internal/pools/broadcastPoolService";

export class TextLabelMpPool extends Pool<TextLabelMp> {
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
    const label = new TextLabelMp(CONSTRUCT, nextBroadcastId(this), text, position);
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

    return registerBroadcast(this, label);
  }
}
