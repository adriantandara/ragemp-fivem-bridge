import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import type { MarkerMp } from "../Entities/MarkerMp";

export interface MarkerInternalsRec {
  type: number;
  position: Vector3;
  direction: Vector3;
  rotation: Vector3;
  scale: number;
  r: number;
  g: number;
  b: number;
  a: number;
  visible: boolean;
  dimension: number | undefined;
  drawDistance: number | undefined;
}

export const MarkerInternals = defineInternals<MarkerInternalsRec>();

export function initMarkerInternals(marker: MarkerMp, type: number): MarkerInternalsRec {
  return MarkerInternals.init(marker, {
    type,
    position: new Vector3(0, 0, 0),
    direction: new Vector3(0, 0, 0),
    rotation: new Vector3(0, 0, 0),
    scale: 1.0,
    r: 255,
    g: 0,
    b: 0,
    a: 255,
    visible: true,
    dimension: undefined,
    drawDistance: undefined,
  });
}
