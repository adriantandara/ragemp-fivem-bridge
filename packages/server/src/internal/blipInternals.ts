import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { BlipMp } from "../Entities/BlipMp";

export interface BlipInternalsRec {
  sprite: number;
  color: number;
  scale: number;
  name: string;
  shortRange: boolean;
  drawDistance: number;
  rotation: number;
}

export const BlipInternals = defineInternals<BlipInternalsRec>();

export function initBlipInternals(blip: BlipMp, defaults: BlipInternalsRec): BlipInternalsRec {
  return BlipInternals.init(blip, { ...defaults });
}
