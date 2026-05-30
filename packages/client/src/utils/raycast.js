import { Vector3 } from "@ragemp-fivem-bridge/shared";

function num(v) {
  const n = +v;
  return Number.isFinite(n) ? n : 0;
}

function vx(p) {
  return p == null ? 0 : num(p.x ?? p[0]);
}
function vy(p) {
  return p == null ? 0 : num(p.y ?? p[1]);
}
function vz(p) {
  return p == null ? 0 : num(p.z ?? p[2]);
}

function entityHandle(e) {
  if (e == null) return 0;
  if (typeof e === "number") return e;
  return e.handle ?? e.id ?? 0;
}

export function testPointToPoint(startPos, endPos, ignoreEntity, flags) {
  const handle = StartShapeTestRay(
    vx(startPos),
    vy(startPos),
    vz(startPos),
    vx(endPos),
    vy(endPos),
    vz(endPos),
    flags || -1,
    entityHandle(ignoreEntity),
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
    vx(startPos),
    vy(startPos),
    vz(startPos),
    vx(endPos),
    vy(endPos),
    vz(endPos),
    radius,
    flags || -1,
    entityHandle(ignoreEntity),
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
