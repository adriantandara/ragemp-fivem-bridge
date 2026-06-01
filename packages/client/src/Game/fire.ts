import { createUnkProxy, toVec3 } from "./_helpers.js";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GameFireNs {
  unk = createUnkProxy();

  startScriptFire(X: number, Y: number, Z: number, maxChildren: number, isGasFire: boolean): number { return StartScriptFire(X, Y, Z, maxChildren, isGasFire); }
  removeScriptFire(fireHandle: number): void { RemoveScriptFire(fireHandle); }
  stopFireInRange(x: number, y: number, z: number, radius: number): void { StopFireInRange(x, y, z, radius); }
  getClosestFirePos(x: number, y: number, z: number): Vector3 { return toVec3((GetClosestFirePos as any)(x, y, z)); }
  addSpecfxExplosion(x: number, y: number, z: number, explosionType: number, explosionFx: number, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void { AddExplosionWithUserVfx(x, y, z, explosionType, explosionFx, damageScale, !!isAudible, !!isInvisible, cameraShake); }
  getPedInsideExplosionArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, radius: number): number { return GetOwnerOfExplosionInAngledArea(explosionType, x1, y1, z1, x2, y2, z2, radius); }
  startScript(X: number, Y: number, Z: number, maxChildren: number, isGasFire: boolean): number { return StartScriptFire(X, Y, Z, maxChildren, isGasFire); }
  removeScript(fireHandle: number): void { RemoveScriptFire(fireHandle); }
  startEntity(entity: number): number { return StartEntityFire(entity); }
  stopEntity(entity: number): void { StopEntityFire(entity); }
  isEntityOn(entity: number): boolean { return IsEntityOnFire(entity); }
  getNumberOfFiresInRange(x: number, y: number, z: number, radius: number): number { return GetNumberOfFiresInRange(x, y, z, radius); }
  stopInRange(x: number, y: number, z: number, radius: number): void { StopFireInRange(x, y, z, radius); }
  getClosestPos(x: number, y: number, z: number): Vector3 { return toVec3((GetClosestFirePos as any)(x, y, z)); }
  setSpreadRate(p0: number): void { SetFireSpreadRate(p0); } // unverified
  addExplosion(x: number, y: number, z: number, explosionType: number, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void { AddExplosion(x, y, z, explosionType, damageScale, !!isAudible, !!isInvisible, cameraShake); }
  addOwnedExplosion(ped: number, x: number, y: number, z: number, explosionType: number, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void { AddOwnedExplosion(ped, x, y, z, explosionType, damageScale, !!isAudible, !!isInvisible, cameraShake); }
  addExplosionWithUserVfx(x: number, y: number, z: number, explosionType: number, explosionFx: number, damageScale: number, isAudible: boolean, isInvisible: boolean, cameraShake: number): void { AddExplosionWithUserVfx(x, y, z, explosionType, explosionFx, damageScale, !!isAudible, !!isInvisible, cameraShake); }
  isExplosionInArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean { return IsExplosionInArea(explosionType, x1, y1, z1, x2, y2, z2); }
  isExplosionActiveInArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean { return IsExplosionActiveInArea(explosionType, x1, y1, z1, x2, y2, z2); }
  isExplosionInSphere(explosionType: number, x: number, y: number, z: number, radius: number): boolean { return IsExplosionInSphere(explosionType, x, y, z, radius); }
  getEntityInsideExplosionSphere(explosionType: number, x: number, y: number, z: number, radius: number): number { return GetOwnerOfExplosionInSphere(explosionType, x, y, z, radius); }
  isExplosionInAngledArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, width: number): boolean { return IsExplosionInAngledArea(explosionType, x1, y1, z1, x2, y2, z2, width); }
  getEntityInsideExplosionArea(explosionType: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, radius: number): number { return GetOwnerOfExplosionInAngledArea(explosionType, x1, y1, z1, x2, y2, z2, radius); }
}
