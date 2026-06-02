import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import type { MarkerMp } from "../Entities/MarkerMp";

export interface MarkerInternalsRec {
  type: number;
  direction: Vector3;
  rotation: Vector3;
  scale: number;
  r: number;
  g: number;
  b: number;
  a: number;
  visible: boolean;
}

export const MarkerInternals = defineInternals<MarkerInternalsRec>();

export function initMarkerInternals(marker: MarkerMp, type: number, scale: number): MarkerInternalsRec {
  return MarkerInternals.init(marker, {
    type,
    direction: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale,
    r: 255,
    g: 0,
    b: 0,
    a: 255,
    visible: true,
  });
}
