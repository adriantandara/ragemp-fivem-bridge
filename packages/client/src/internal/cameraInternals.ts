import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { CameraMp } from "../Entities/CameraMp";

export interface CameraInternalsRec {
  handle: number;
}

export const CameraInternals = defineInternals<CameraInternalsRec>();

export function initCameraInternals(camera: CameraMp, handle: number): CameraInternalsRec {
  return CameraInternals.init(camera, { handle });
}
