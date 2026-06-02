import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import type { ColshapeMp } from "../Entities/ColshapeMp";

export interface ColshapeInternalsRec {
  shapeType: string;
  params: Record<string, any>;
  origin: string;
  position: Vector3 | undefined;
  dimension: number;
}

export const ColshapeInternals = defineInternals<ColshapeInternalsRec>();

export function initColshapeInternals(
  colshape: ColshapeMp,
  shapeType: string,
  position: Vector3 | undefined,
  params: Record<string, any> | undefined,
  dimension: number
): ColshapeInternalsRec {
  return ColshapeInternals.init(colshape, {
    shapeType,
    params: params ?? {},
    origin: "local",
    position,
    dimension,
  });
}
