import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { CheckpointMp } from "../Entities/CheckpointMp";

export interface CheckpointInternalsRec {
  radius: number | undefined;
  visible: boolean | undefined;
  r: number | undefined;
  g: number | undefined;
  b: number | undefined;
  a: number | undefined;
  origin: string | undefined;
}

export const CheckpointInternals = defineInternals<CheckpointInternalsRec>();

export function initCheckpointInternals(cp: CheckpointMp): CheckpointInternalsRec {
  return CheckpointInternals.init(cp, {
    radius: undefined,
    visible: undefined,
    r: undefined,
    g: undefined,
    b: undefined,
    a: undefined,
    origin: undefined,
  });
}
