import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { DummyMp } from "../Entities/DummyMp";

export interface DummyInternalsRec {
  dummyType: number;
  data: Record<string, any>;
}

export const DummyInternals = defineInternals<DummyInternalsRec>();

export function initDummyInternals(dummy: DummyMp, defaults: DummyInternalsRec): DummyInternalsRec {
  return DummyInternals.init(dummy, { ...defaults });
}
