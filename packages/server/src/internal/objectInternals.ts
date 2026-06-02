import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { ObjectMp } from "../Entities/ObjectMp";

export interface ObjectInternalsRec {
  netIdReady?: boolean;
  cachedNetId?: number;
  varFlushScheduled: boolean;
}

export const ObjectInternals = defineInternals<ObjectInternalsRec>();

export function initObjectInternals(obj: ObjectMp): ObjectInternalsRec {
  return ObjectInternals.init(obj, {
    varFlushScheduled: false,
  });
}
