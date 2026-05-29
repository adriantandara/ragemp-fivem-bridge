import { createUnkProxy } from "./_helpers.js";

export class GamePedNs {
  unk = createUnkProxy();

  create(modelHash, x, y, z, heading) {
    return CreatePed(4, modelHash, x, y, z, heading, true, false);
  }
  delete(ped) { DeletePed(ped); }
  clone(ped) { return ClonePed(ped, false, true, true); }
  createInsideVehicle(vehicle, seatIndex, modelHash) {
    return CreatePedInsideVehicle(vehicle, 4, modelHash, seatIndex, true, false);
  }

  isInVehicle(ped, vehicle) { return IsPedInVehicle(ped, vehicle ?? 0, false); }
  isInAnyVehicle(ped) { return IsPedInAnyVehicle(ped, false); }
  isInModel(ped, modelHash) {
    if (!IsPedInAnyVehicle(ped, false)) return false;
    const veh = GetVehiclePedIsIn(ped, false);
    return veh !== 0 && GetEntityModel(veh) === modelHash;
  }
  isInjured(ped) { return IsPedInjured(ped); }
  isCopInArea3D(x1, y1, z1, x2, y2, z2) { return IsCopPedInArea_3d(x1, y1, z1, x2, y2, z2); }
  isInMeleeCombat(ped) { return IsPedInMeleeCombat(ped); }
  isFacingPed(ped, otherPed, angle) { return IsPedFacingPed(ped, otherPed, angle); }
  isOnFoot(ped) { return IsPedOnFoot(ped); }
  isJumpingOutOfVehicle(ped) { return IsPedJumpingOutOfVehicle(ped); }
  isSprinting(ped) { return IsPedSprinting(ped); }
  isStill(ped) { return IsPedStill(ped); }
  isRunning(ped) { return IsPedRunning(ped); }
  isSwimming(ped) { return IsPedSwimming(ped); }
  isDead(ped) { return IsEntityDead(ped); }
  isFalling(ped) { return IsPedFalling(ped); }
  isInParachuteFreeFall(ped) { return IsPedInParachuteFreeFall(ped); }

  setAccuracy(ped, accuracy) { SetPedAccuracy(ped, accuracy); }
  getAccuracy(ped) { return GetPedAccuracy(ped); }
  setFiringPattern(ped, pattern) { SetPedFiringPattern(ped, pattern); }
  setShootRate(ped, rate) { SetPedShootRate(ped, rate); }
  explodeHead(ped, explosionTag) { ExplodePedHead(ped, explosionTag); }
  applyDamageTo(ped, damageAmount) { ApplyDamageToPed(ped, damageAmount, false); }

  setComponentVariation(ped, componentId, drawableId, textureId, paletteId) {
    SetPedComponentVariation(ped, componentId, drawableId, textureId, paletteId);
  }
  getComponentVariation(ped, componentId) { return GetPedDrawableVariation(ped, componentId); }
  getNumberOfPedDrawableVariations(ped, componentId) { return GetNumberOfPedDrawableVariations(ped, componentId); }
  getNumberOfPedTextureVariations(ped, componentId, drawableId) { return GetNumberOfPedTextureVariations(ped, componentId, drawableId); }

  setHeadBlendData(ped, shape, skin, thirdId, shapeMix, skinMix, thirdMix, isParent) {
    SetPedHeadBlendData(ped, shape, skin, thirdId ?? 0, shape, skin, thirdId ?? 0, shapeMix ?? 0, skinMix ?? 0, thirdMix ?? 0, isParent ?? false);
  }
  setHairColor(ped, colorID, highlightColorID) { SetPedHairColor(ped, colorID, highlightColorID); }
  setHeadOverlay(ped, overlayID, index, opacity) { SetPedHeadOverlay(ped, overlayID, index, opacity); }
  setHeadOverlayColor(ped, overlayID, colorType, colorId, secondColorId) {
    SetPedHeadOverlayColor(ped, overlayID, colorType, colorId, secondColorId);
  }
  setFaceFeature(ped, index, scale) { SetPedFaceFeature(ped, index, scale); }
  setMicroMorph(ped, index, scale) { SetPedMicroMorph(ped, index, scale); }
  setEyeColor(ped, index) { SetPedEyeColor(ped, index); }
  clearDecorations(ped) { ClearPedDecorations(ped); }
  addDecoration(ped, collection, overlay) { AddPedDecoration(ped, collection, overlay); }

  setAlternateWalkAnim(ped, animDict, animName) { SetPedAlternateWalkAnim(ped, animDict, animName, 1.0, false); }
  setMovementClipset(ped, clipset) { SetPedMovementClipset(ped, clipset, 1.0); }
  resetMovementClipset(ped) { ResetPedMovementClipset(ped, false); }
  setWeaponMovementClipset(ped, clipset) { SetPedWeaponMovementClipset(ped, clipset); }
  playFacialAnim(ped, animName, animDict) { PlayFacialAnim(ped, animName, animDict); }

  setIntoVehicle(ped, vehicle, seatIndex) { SetPedIntoVehicle(ped, vehicle, seatIndex); }
  getVehicleIsIn(ped, lastVehicle) { return GetVehiclePedIsIn(ped, lastVehicle ?? false); }
  resetLastVehicle(ped) { ClearPedLastVehicle(ped); }

  canRagdoll(ped) { return CanPedRagdoll(ped); }
  setToRagdoll(ped, time, p2) { return SetPedToRagdoll(ped, time, p2 ?? time, 0, false, false, false); }
  isRagdoll(ped) { return IsPedRagdoll(ped); }
  setCanRagdoll(ped, toggle) { SetPedCanRagdoll(ped, toggle); }

  setFleeAttributes(ped, attributes, add) { SetPedFleeAttributes(ped, attributes, add); }
  setCombatAttributes(ped, attributeIndex, enabled) { SetPedCombatAttributes(ped, attributeIndex, enabled); }
  setCombatAbility(ped, ability) { SetPedCombatAbility(ped, ability); }
  setCombatRange(ped, combatRange) { SetPedCombatRange(ped, combatRange); }
  setTargetLossResponse(ped, responseType) { SetPedTargetLossResponse(ped, responseType); }

  createGroup(unused) { return CreatePedGroup(unused ?? 0); }
  setAsGroupLeader(ped, groupHandle) { SetPedAsGroupLeader(ped, groupHandle); }
  setAsGroupMember(ped, groupHandle) { SetPedAsGroupMember(ped, groupHandle); }
  removeFromGroup(ped) { RemovePedFromGroup(ped); }
  isGroupMember(ped, groupHandle) { return IsPedGroupMember(ped, groupHandle); }
  getGroupSize(groupHandle) { return GetGroupSize(groupHandle); }

  registerHeadshot(ped) { return RegisterPedheadshot(ped); }
  registerHeadshot3(ped) { return RegisterPedheadshot_3(ped); }
  unregisterHeadshot(handle) { UnregisterPedheadshot(handle); }
  isHeadshotValid(handle) { return IsPedheadshotValid(handle); }
  isHeadshotReady(handle) { return IsPedheadshotReady(handle); }
  getHeadshotTxdString(handle) { return GetPedheadshotTxdString(handle); }

  isCurrentWeapon(ped, weaponHash) {
    const [hit, current] = GetCurrentPedWeapon(ped, true);
    return hit && current === weaponHash;
  }
  setCurrentWeapon(ped, weaponHash) { SetCurrentPedWeapon(ped, weaponHash, true); }
  getWeapons(ped) {
    const weapons = [];
    for (let slot = 0; slot < 13; slot++) {
      const hash = GetPedWeapontypeInSlot(ped, slot);
      if (hash && hash !== 0) weapons.push(hash);
    }
    return weapons;
  }
}
