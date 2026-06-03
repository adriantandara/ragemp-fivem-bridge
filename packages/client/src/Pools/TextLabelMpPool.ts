import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolAdd, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { TextLabelMp } from "../Entities/TextLabelMp";
import { LocalCreatePool } from "./LocalCreatePool";
import { TextLabelInternals } from "../internal/textLabelInternals";
import { setupTextLabelPool } from "../internal/pools/textLabelPoolService";

export class TextLabelMpPool extends LocalCreatePool<TextLabelMp> {
  constructor() {
    super();
    setupTextLabelPool(this);
  }

  atRemoteId(remoteId: number): TextLabelMp | null {
    return this.at(remoteId);
  }

  new(text: string, position: Vector3 | { x: number; y: number; z: number }, options: any = {}): TextLabelMp {
    const label = new TextLabelMp(CONSTRUCT, this.nextLocalId());
    const rec = TextLabelInternals.get(label);

    rec.text = text;
    rec.position = position instanceof Vector3 ? position : new Vector3(position.x, position.y, position.z);

    if (options.color !== undefined) {
      rec.r = options.color.r ?? 255;
      rec.g = options.color.g ?? 255;
      rec.b = options.color.b ?? 255;
      rec.a = options.color.a ?? 255;
    }
    if (options.drawDistance !== undefined) rec.drawDistance = options.drawDistance;
    if (options.font !== undefined) rec.font = options.font;
    if (options.los !== undefined) rec.los = options.los;
    if (options.dimension !== undefined) rec.dimension = options.dimension;

    poolAdd(this, label as any);

    return label;
  }
}
