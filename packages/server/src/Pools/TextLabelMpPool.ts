import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { TextLabelMp } from "../Entities/TextLabelMp";

let labelIdCounter = 0;

export class TextLabelMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync(): void {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const labels: ReturnType<TextLabelMp["toData"]>[] = [];
      this.forEach(((label: TextLabelMp) => labels.push(label.toData())) as any);
      if (labels.length > 0) {
        emitNet("ragemp:labelSyncAll", playerSource, labels);
      }
    });
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

    if (options.color !== undefined) {
      label._r = options.color.r ?? 255;
      label._g = options.color.g ?? 255;
      label._b = options.color.b ?? 255;
      label._a = options.color.a ?? 255;
    }
    if (options.dimension !== undefined) label._dimension = options.dimension;
    if (options.drawDistance !== undefined) label._drawDistance = options.drawDistance;
    if (options.font !== undefined) label._font = options.font;
    if (options.los !== undefined) label._los = options.los;

    this._add(label as any);

    emitNet("ragemp:labelCreate", -1, label.toData());

    return label;
  }
}
