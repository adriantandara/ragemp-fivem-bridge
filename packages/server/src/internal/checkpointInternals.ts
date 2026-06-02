import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { CheckpointMp } from "../Entities/CheckpointMp";

export type CheckpointColor = { r: number; g: number; b: number; a: number };

export interface CheckpointInternalsRec {
  type: number;
  nextPosition: Vector3;
  radius: number;
  color: CheckpointColor;
  visible: boolean;
}

export const CheckpointInternals = defineInternals<CheckpointInternalsRec>();

export function initCheckpointInternals(checkpoint: CheckpointMp, defaults: CheckpointInternalsRec): CheckpointInternalsRec {
  return CheckpointInternals.init(checkpoint, { ...defaults });
}
