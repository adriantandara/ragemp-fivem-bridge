import { createUnkProxy, toVec3 } from "./_helpers.js";

export class GameEntityNs {
  unk = createUnkProxy();

  doesExist(entity) { return DoesEntityExist(entity); }
  isAPed(entity) { return IsEntityAPed(entity); }
  isAVehicle(entity) { return IsEntityAVehicle(entity); }
  isAnObject(entity) { return IsEntityAnObject(entity); }
  createModelHide(x, y, z, radius, model, p5) { CreateModelHide(x, y, z, radius, model, p5 ?? false); }
  createModelHideExcludingScriptObjects(x, y, z, radius, model, p5) { CreateModelHideExcludingScriptObjects(x, y, z, radius, model, p5 ?? false); }
  removeModelHide(x, y, z, radius, model, p5) { if (typeof RemoveModelHide === "function") RemoveModelHide(x, y, z, radius, model, p5 ?? false); }
  getType(entity) { return GetEntityType(entity); }
  getModel(entity) { return GetEntityModel(entity); }

  getCoords(entity, alive) { return toVec3(GetEntityCoords(entity, alive)); }
  setCoords(entity, xPos, yPos, zPos, xAxis, yAxis, zAxis, clearArea) {
    SetEntityCoords(entity, xPos, yPos, zPos, xAxis, yAxis, zAxis, clearArea);
  }
  getHeading(entity) { return GetEntityHeading(entity); }
  setHeading(entity, heading) { SetEntityHeading(entity, heading); }
  getRotation(entity, rotationOrder) { return toVec3(GetEntityRotation(entity, rotationOrder)); }
  setRotation(entity, pitch, roll, yaw, rotationOrder, p5) {
    SetEntityRotation(entity, pitch, roll, yaw, rotationOrder, p5 ?? true);
  }

  playAnim(entity, animName, animDict, p3, loop, stayInAnim, p6, delta, bitset) {
    return PlayEntityAnim(entity, animName, animDict, p3, loop, stayInAnim, p6, delta ?? 0, bitset ?? 0);
  }
  stopAnim(entity, animation, animGroup, p3) { return StopEntityAnim(entity, animation, animGroup, p3); }
  isPlayingAnim(entity, animDict, animName, taskFlag) { return IsEntityPlayingAnim(entity, animDict, animName, taskFlag); }
  getAnimCurrentTime(entity, animDict, animName) { return GetEntityAnimCurrentTime(entity, animDict, animName); }
  getAnimTotalTime(entity, animDict, animName) { return GetEntityAnimTotalTime(entity, animDict, animName); }
  setAnimCurrentTime(entity, animDict, animName, time) { SetEntityAnimCurrentTime(entity, animDict, animName, time); }

  getVelocity(entity) { return toVec3(GetEntityVelocity(entity)); }
  setVelocity(entity, x, y, z) { SetEntityVelocity(entity, x, y, z); }
  getSpeed(entity) { return GetEntitySpeed(entity); }
  setMaxSpeed(entity, speed) { SetEntityMaxSpeed(entity, speed); }
  applyForceToCenterOfMass(entity, forceType, x, y, z, p5, isDirectionRel, isForceRel, p8) {
    ApplyForceToEntity(entity, forceType, x, y, z, 0, 0, 0, 0, isDirectionRel ?? false, isForceRel ?? false, p8 ?? false, false, false);
  }
  setHasGravity(entity, toggle) { SetEntityHasGravity(entity, toggle); }

  getHealth(entity) { return GetEntityHealth(entity); }
  setHealth(entity, health) { SetEntityHealth(entity, health); }
  getMaxHealth(entity) { return GetEntityMaxHealth(entity); }
  setMaxHealth(entity, value) { SetEntityMaxHealth(entity, value); }
  setCanBeDamaged(entity, toggle) { SetEntityCanBeDamaged(entity, toggle); }
  setProofs(entity, bulletProof, fireProof, explosionProof, collisionProof, meleeProof, p6, p7, drownProof) {
    SetEntityProofs(entity, bulletProof, fireProof, explosionProof, collisionProof, meleeProof, p6 ?? false, p7 ?? false, drownProof ?? false);
  }
  setInvincible(entity, toggle) { SetEntityInvincible(entity, toggle); }

  hasClearLosToEntity(entity1, entity2, traceType) { return HasEntityClearLosToEntity(entity1, entity2, traceType); }
  hasCollidedWithAnything(entity) { return HasEntityCollidedWithAnything(entity); }
  setCollision(entity, toggle, keepPhysics) { SetEntityCollision(entity, toggle, keepPhysics); }
  isOnScreen(entity) { return IsEntityOnScreen(entity); }
  isVisible(entity) { return IsEntityVisible(entity); }
  setVisible(entity, toggle, unk) { SetEntityVisible(entity, toggle, unk ?? false); }

  attachToEntity(entity1, entity2, boneIndex, xPos, yPos, zPos, xRot, yRot, zRot, p9, useSoftPinning, collision, isPed, vertexIndex, fixedRot) {
    AttachEntityToEntity(entity1, entity2, boneIndex, xPos, yPos, zPos, xRot, yRot, zRot, p9, useSoftPinning, collision, isPed, vertexIndex, fixedRot);
  }
  isAttached(entity) { return IsEntityAttached(entity); }
  detach(entity, dynamic, collision) { DetachEntity(entity, dynamic, collision); }
  getAttachedTo(entity) { return GetEntityAttachedTo(entity); }

  getBoneIndexByName(entity, boneName) { return GetEntityBoneIndexByName(entity, boneName); }
  getBonePosition2(entity, boneIndex) { return toVec3(GetWorldPositionOfEntityBone(entity, boneIndex)); }
  getBoneRotation(entity, boneIndex) { return toVec3(GetEntityBoneObjectRotation(entity, boneIndex)); }
  getBoneCount(entity) { return GetEntityBoneCount(entity); }
  getWorldPositionOfBone(entity, boneIndex) { return toVec3(GetWorldPositionOfEntityBone(entity, boneIndex)); }

  isDead(entity) { return IsEntityDead(entity); }
  isInAir(entity) { return IsEntityInAir(entity); }
  setAlpha(entity, alphaLevel, skin) { SetEntityAlpha(entity, alphaLevel, skin ?? false); }
  getAlpha(entity) { return GetEntityAlpha(entity); }
  resetAlpha(entity) { ResetEntityAlpha(entity); }
  setLodDist(entity, value) { SetEntityLodDist(entity, value); }
  freezePosition(entity, toggle) { FreezeEntityPosition(entity, toggle); }

  isMissionEntity(entity) { return IsEntityAMissionEntity(entity); }
  getForwardVector(entity) { return toVec3(GetEntityForwardVector(entity)); }
  getForwardX(entity) { return GetEntityForwardX(entity); }
  getForwardY(entity) { return GetEntityForwardY(entity); }
  getUpVector(entity) { return toVec3(GetEntityUpVector(entity)); }
  getRightVector(entity) { return toVec3(GetEntityRightVector(entity)); }
  getOffsetFromWorldCoords(entity, x, y, z) { return toVec3(GetOffsetFromEntityInWorldCoords(entity, x, y, z)); }
  getWorldCoordsFromOffset(entity, x, y, z) { return toVec3(GetOffsetFromEntityGivenWorldCoords(entity, x, y, z)); }
  hasBeenDamagedByEntity(entity, entity2, exactEntityType) { return HasEntityBeenDamagedByEntity(entity, entity2, exactEntityType); }
  hasBeenDamagedByWeapon(entity, weaponHash, weaponType) { return HasEntityBeenDamagedByWeapon(entity, weaponHash, weaponType); }
  clearLastDamageEntity(entity) { ClearEntityLastDamageEntity(entity); }
  setRecordsCollisions(entity, toggle) { SetEntityRecordsCollisions(entity, toggle); }
  isInWater(entity) { return IsEntityInWater(entity); }
  isOnFire(entity) { return IsEntityOnFire(entity); }
}
