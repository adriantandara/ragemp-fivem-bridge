import { Pool } from "@ragemp-fivem-bridge/shared";
import { TextLabelMp } from "../Entities/TextLabelMp";

let labelIdCounter = 0;

export class TextLabelMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync() {
    onNet("ragemp:playerReady", () => {
      const playerSource = globalThis.source;
      const labels = [];
      this.forEach((label) => labels.push(label.toData()));
      if (labels.length > 0) {
        emitNet("ragemp:labelSyncAll", playerSource, labels);
      }
    });
  }

  new(text, position, options = {}) {
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

    this._add(label);

    emitNet("ragemp:labelCreate", -1, label.toData());

    return label;
  }
}
