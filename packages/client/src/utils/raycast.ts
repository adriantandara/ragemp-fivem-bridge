import { Vector3 } from "@ragemp-fivem-bridge/shared";

type VecLike = { x?: number; y?: number; z?: number; [0]?: number; [1]?: number; [2]?: number } | null | undefined;
type EntityLike = { handle?: number; id?: number } | number | null | undefined;

interface RaycastResult {
  hit: boolean;
  position: Vector3;
  surfaceNormal: Vector3;
  entity: number;
}

function num(v: unknown): number {
  const n = +(v as number);
  return Number.isFinite(n) ? n : 0;
}

function vx(p: VecLike): number {
  return p == null ? 0 : num(p.x ?? p[0]);
}
function vy(p: VecLike): number {
  return p == null ? 0 : num(p.y ?? p[1]);
}
function vz(p: VecLike): number {
  return p == null ? 0 : num(p.z ?? p[2]);
}

function entityHandle(e: EntityLike): number {
  if (e == null) return 0;
  if (typeof e === "number") return e;
  return e.handle ?? e.id ?? 0;
}

export function testPointToPoint(startPos: VecLike, endPos: VecLike, ignoreEntity: EntityLike, flags?: number): RaycastResult {
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

export function testCapsule(startPos: VecLike, endPos: VecLike, radius: number, ignoreEntity: EntityLike, flags?: number): RaycastResult {
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
