import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { TextLabelMp } from "../Entities/TextLabelMp";

export interface TextLabelInternalsRec {
  text: string;
  r: number;
  g: number;
  b: number;
  a: number;
  drawDistance: number;
  los: boolean;
  font: number;
}

export const TextLabelInternals = defineInternals<TextLabelInternalsRec>();

export function initTextLabelInternals(label: TextLabelMp, text: string): TextLabelInternalsRec {
  return TextLabelInternals.init(label, {
    text,
    r: 255,
    g: 255,
    b: 255,
    a: 255,
    drawDistance: 50,
    los: false,
    font: 0,
  });
}
