import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { ObjectMp } from "../Entities/ObjectMp";

export interface ObjectInternalsRec {
  isWeak: boolean;
  notifyStreaming: boolean;
  streamingRange: number;
}

export const ObjectInternals = defineInternals<ObjectInternalsRec>();

export function initObjectInternals(object: ObjectMp): ObjectInternalsRec {
  return ObjectInternals.init(object, {
    isWeak: false,
    notifyStreaming: false,
    streamingRange: 0,
  });
}
