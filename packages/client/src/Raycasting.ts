import { testPointToPoint, testCapsule } from "./utils/raycast";
import type { Vector3 } from "@ragemp-fivem-bridge/shared";

export class RaycastingMp {
  testPointToPoint(startPos: Vector3, endPos: Vector3, ignoreEntity: number, flags: number) {
    return testPointToPoint(startPos, endPos, ignoreEntity, flags);
  }

  testCapsule(startPos: Vector3, endPos: Vector3, radius: number, ignoreEntity: number, flags: number) {
    return testCapsule(startPos, endPos, radius, ignoreEntity, flags);
  }
}
