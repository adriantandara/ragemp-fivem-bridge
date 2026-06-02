import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { ColshapeMp } from "../Entities/ColshapeMp";

export interface ColshapeInternalsRec {
  shapeType: string;
  params: Record<string, any>;
}

export const ColshapeInternals = defineInternals<ColshapeInternalsRec>();

export function initColshapeInternals(colshape: ColshapeMp, defaults: ColshapeInternalsRec): ColshapeInternalsRec {
  return ColshapeInternals.init(colshape, { ...defaults });
}
