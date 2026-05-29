import { testPointToPoint, testCapsule } from "./utils/raycast";

export class RaycastingMp {
  testPointToPoint(startPos, endPos, ignoreEntity, flags) {
    return testPointToPoint(startPos, endPos, ignoreEntity, flags);
  }

  testCapsule(startPos, endPos, radius, ignoreEntity, flags) {
    return testCapsule(startPos, endPos, radius, ignoreEntity, flags);
  }
}
