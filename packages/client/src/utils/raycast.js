import { Vector3 } from "@ragemp-fivem-bridge/shared";

export function testPointToPoint(startPos, endPos, ignoreEntity, flags) {
  const handle = StartShapeTestRay(
    startPos.x,
    startPos.y,
    startPos.z,
    endPos.x,
    endPos.y,
    endPos.z,
    flags || -1,
    ignoreEntity || 0,
    0
  );
  const [, hit, endCoords, surfaceNormal, entityHit] = GetShapeTestResult(handle);
  return {
    hit: !!hit,
    position: new Vector3(endCoords[0], endCoords[1], endCoords[2]),
    surfaceNormal: new Vector3(surfaceNormal[0], surfaceNormal[1], surfaceNormal[2]),
    entity: entityHit,
  };
}

export function testCapsule(startPos, endPos, radius, ignoreEntity, flags) {
  const handle = StartShapeTestCapsule(
    startPos.x,
    startPos.y,
    startPos.z,
    endPos.x,
    endPos.y,
    endPos.z,
    radius,
    flags || -1,
    ignoreEntity || 0,
    7
  );
  const [, hit, endCoords, surfaceNormal, entityHit] = GetShapeTestResult(handle);
  return {
    hit: !!hit,
    position: new Vector3(endCoords[0], endCoords[1], endCoords[2]),
    surfaceNormal: new Vector3(surfaceNormal[0], surfaceNormal[1], surfaceNormal[2]),
    entity: entityHit,
  };
}
