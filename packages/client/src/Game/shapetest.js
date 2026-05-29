import { createUnkProxy, toVec3 } from "./_helpers.js";
import { testPointToPoint, testCapsule } from "../utils/raycast";

export class GameShapetestNs {
  unk = createUnkProxy();

  testPointToPoint(startPos, endPos, ignoreEntity, flags) {
    return testPointToPoint(startPos, endPos, ignoreEntity, flags);
  }

  testCapsule(startPos, endPos, radius, ignoreEntity, flags) {
    return testCapsule(startPos, endPos, radius, ignoreEntity, flags);
  }

  startShapeTestRay(x1, y1, z1, x2, y2, z2, flags, entity, p8) {
    return StartShapeTestRay(x1, y1, z1, x2, y2, z2, flags, entity ?? 0, p8 ?? 4);
  }
  startShapeTestCapsule(x1, y1, z1, x2, y2, z2, radius, flags, entity, p9) {
    return StartShapeTestCapsule(x1, y1, z1, x2, y2, z2, radius, flags, entity ?? 0, p9 ?? 4);
  }
  getShapeTestResult(shapeTestHandle) {
    const [, hit, endCoords, surfaceNormal, entityHit] = GetShapeTestResult(shapeTestHandle);
    return { hit: !!hit, endCoords: endCoords ? toVec3(endCoords) : null, surfaceNormal: surfaceNormal ? toVec3(surfaceNormal) : null, entityHit };
  }
}
