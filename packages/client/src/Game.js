import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { withGameNatives } from "./utils/native";

function toVec3(arr) {
  return new Vector3(arr[0] ?? 0, arr[1] ?? 0, arr[2] ?? 0);
}

function createUnkProxy() {
  const cache = new Map();
  return new Proxy({}, {
    get(_, prop) {
      if (typeof prop !== "string") return undefined;
      if (cache.has(prop)) return cache.get(prop);
      if (prop.startsWith("_0x") || prop.startsWith("_0X")) {
        const hash = prop.slice(1);
        const fn = (...args) => Citizen.invokeNative(hash, ...args);
        cache.set(prop, fn);
        return fn;
      }
      return undefined;
    },
  });
}

class GameGxt {
  _entries = new Map();

  set(labelNameOrHash, newLabelValue) {
    const key = String(labelNameOrHash);
    this._entries.set(key, newLabelValue);
    AddTextEntry(key, newLabelValue);
  }

  get(labelNameOrHash) {
    return GetLabelText(String(labelNameOrHash));
  }

  getDefault(labelNameOrHash) {
    return GetLabelText(String(labelNameOrHash));
  }

  reset() {
    for (const [key] of this._entries) AddTextEntry(key, "");
    this._entries.clear();
  }
}

class GameEntityNs {
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

class GamePedNs {
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

  getVehicleSeatIsIn(ped) { return GetPedInVehicleSeat(GetVehiclePedIsIn(ped, false), ped); }
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

class GamePlayerNs {
  unk = createUnkProxy();

  getPed(player) { return GetPlayerPed(player); }
  getPedScriptIndex(player) { return GetPlayerPed(player); }
  setModel(player, model) { SetPlayerModel(player, model); }
  getId(player) { return GetPlayerServerId(player); }
  getIndex(player) { return player; }
  getName(player) { return GetPlayerName(player); }

  getTeam(player) { return GetPlayerTeam(player); }
  setTeam(player, team) { SetPlayerTeam(player, team); }
  getNumberOfPlayersInTeam(team) {
    let count = 0;
    for (let i = 0; i < 32; i++) if (NetworkIsPlayerActive(i) && GetPlayerTeam(i) === team) count++;
    return count;
  }

  getWantedLevel(player) { return GetPlayerWantedLevel(player); }
  setWantedLevel(player, wantedLevel, disableNoMission) {
    SetPlayerWantedLevel(player, wantedLevel, disableNoMission ?? false);
    SetPlayerWantedLevelNow(player, false);
  }
  clearWantedLevel(player) { ClearPlayerWantedLevel(player); }
  isWantedLevelGreater(player, wantedLevel) { return GetPlayerWantedLevel(player) > wantedLevel; }

  setWeaponDamageModifier(player, modifier) { SetPlayerWeaponDamageModifier(player, modifier); }
  setMeleeWeaponDamageModifier(player, modifier, p2) { SetPlayerMeleeWeaponDamageModifier(player, modifier, p2 ?? false); }
  disableFiring(player, toggle) { DisablePlayerFiring(player, toggle); }

  specialAbilityActivate(player, p0, p1) { SpecialAbilityActivate(player, p0, p1); }
  specialAbilityDeactivate(player, p1) { SpecialAbilityDeactivate(player, p1); }
  isSpecialAbilityActive(player, p1) { return IsSpecialAbilityActive(player, p1); }

  setParachuteTintIndex(player, tintIndex) { SetPlayerParachuteTintIndex(player, tintIndex); }
  setParachuteSmokeTrailColor(player, r, g, b) { SetPlayerParachuteSmokeTrailColor(player, r, g, b); }

  startTeleport(player, x, y, z, heading, tpVehicle, setToGround, fadeOut) {
    StartPlayerTeleport(player, x, y, z, heading, tpVehicle ?? false, setToGround ?? false, fadeOut ?? true);
  }
  isTeleportActive(player) { return IsPlayerTeleportActive(player); }
  stopTeleport() { StopPlayerTeleport(); }

  isActive(player) { return NetworkIsPlayerActive(player); }
  getNumActiveCharacters() { return NetworkGetNumConnectedPlayers(); }
  isPlayingBackRecording(player) { return IsPlayerPlayingBackRecording(player); }
  hasControlOfEntity(entity) { return NetworkHasControlOfEntity(entity); }

  setHealthRechargeMultiplier(player, rechargeRate) { SetPlayerHealthRechargeMultiplier(player, rechargeRate); }
  setMaxArmour(player, value) { SetPlayerMaxArmour(player, value); }
  setSwimMultiplier(player, multiplier) { SetPlayerSwimMultiplier(player, multiplier); }
  setRunSpeedMultiplier(player, multiplier) { SetRunSpeedMultiplierForPlayer(player, multiplier); }
  setFallDistance(player, fallDistance) { SetPlayerFallDistance(player, fallDistance); }
  restoreStamina(player, p1) { RestorePlayerStamina(player ?? PlayerId(), p1 ?? 1.0); }
  resetStamina(player) { ResetPlayerStamina(player ?? PlayerId()); }
  getStamina(player) { return GetPlayerSprintStaminaRemaining(player ?? PlayerId()); }
}

class GameVehicleNs {
  unk = createUnkProxy();

  create(modelHash, x, y, z, heading, isNetwork, bScriptHostVeh, p7) {
    return CreateVehicle(modelHash, x, y, z, heading, isNetwork ?? true, bScriptHostVeh ?? false);
  }
  delete(vehicle) { DeleteVehicle(vehicle); }

  setDoorsLocked(vehicle, doorLockStatus) { SetVehicleDoorsLocked(vehicle, doorLockStatus); }
  setDoorOpen(vehicle, doorIndex, loose, openInstantly) { SetVehicleDoorOpen(vehicle, doorIndex, loose, openInstantly); }
  setDoorShut(vehicle, doorIndex, closeInstantly) { SetVehicleDoorShut(vehicle, doorIndex, closeInstantly); }
  breakDoor(vehicle, doorIndex, deleteRealDoor) { BreakOffVehicleDoor(vehicle, doorIndex, deleteRealDoor ?? false); }
  removeWindow(vehicle, windowIndex) { RemoveVehicleWindow(vehicle, windowIndex); }
  rollDownWindow(vehicle, windowIndex) { RollDownWindow(vehicle, windowIndex); }
  rollUpWindow(vehicle, windowIndex) { RollUpWindow(vehicle, windowIndex); }
  smashWindow(vehicle, index) { SmashVehicleWindow(vehicle, index); }
  fixWindow(vehicle, index) { FixVehicleWindow(vehicle, index); }

  setColours(vehicle, colorPrimary, colorSecondary) { SetVehicleColours(vehicle, colorPrimary, colorSecondary); }
  getColours(vehicle) {
    const [p, s] = GetVehicleColours(vehicle);
    return { primary: p, secondary: s };
  }
  setCustomPrimaryColour(vehicle, r, g, b) { SetVehicleCustomPrimaryColour(vehicle, r, g, b); }
  getCustomPrimaryColour(vehicle) {
    const [r, g, b] = GetVehicleCustomPrimaryColour(vehicle);
    return { r, g, b };
  }
  setCustomSecondaryColour(vehicle, r, g, b) { SetVehicleCustomSecondaryColour(vehicle, r, g, b); }
  getCustomSecondaryColour(vehicle) {
    const [r, g, b] = GetVehicleCustomSecondaryColour(vehicle);
    return { r, g, b };
  }
  setNeonLightsColour(vehicle, r, g, b) { SetVehicleNeonLightsColour(vehicle, r, g, b); }
  getNeonLightsColour(vehicle) {
    const [r, g, b] = GetVehicleNeonLightsColour(vehicle);
    return { r, g, b };
  }
  setExtraColours(vehicle, pearlescentColor, wheelColor) { SetVehicleExtraColours(vehicle, pearlescentColor, wheelColor); }
  getExtraColours(vehicle) {
    const [p, w] = GetVehicleExtraColours(vehicle);
    return { pearlescent: p, wheel: w };
  }
  setTyreSmokeColor(vehicle, r, g, b) { SetVehicleTyreSmokeColor(vehicle, r, g, b); }

  setEngineOn(vehicle, value, instantly, disableAutoStart) {
    SetVehicleEngineOn(vehicle, value, instantly ?? false, disableAutoStart ?? false);
  }
  setEngineHealth(vehicle, health) { SetVehicleEngineHealth(vehicle, health); }
  getEngineHealth(vehicle) { return GetVehicleEngineHealth(vehicle); }
  setMaxSpeed(vehicle, speed) { SetVehicleMaxSpeed(vehicle, speed); }
  modifyTopSpeed(vehicle, value) { ModifyVehicleTopSpeed(vehicle, value); }
  setForwardSpeed(vehicle, speed) { SetVehicleForwardSpeed(vehicle, speed); }

  setFixed(vehicle) { SetVehicleFixed(vehicle); }
  setDamage(vehicle, xOffset, yOffset, zOffset, damage, radius, focusOnModel) {
    SetVehicleDamage(vehicle, xOffset, yOffset, zOffset, damage, radius, focusOnModel ?? true);
  }
  getPetrolTankHealth(vehicle) { return GetVehiclePetrolTankHealth(vehicle); }
  getBodyHealth(vehicle) { return GetVehicleBodyHealth(vehicle); }
  setBodyHealth(vehicle, value) { SetVehicleBodyHealth(vehicle, value); }

  setLights(vehicle, state) { SetVehicleLights(vehicle, state); }
  setFullbeam(vehicle, toggle) { SetVehicleFullbeam(vehicle, toggle); }
  setIndicatorLights(vehicle, turnSignal, toggle) { SetVehicleIndicatorLights(vehicle, turnSignal, toggle); }
  setBrakeLights(vehicle, toggle) { SetVehicleBrakeLights(vehicle, toggle); }
  setInteriorlight(vehicle, toggle) { SetVehicleInteriorlight(vehicle, toggle); }
  setSiren(vehicle, toggle) { SetVehicleSiren(vehicle, toggle); }
  setNeonLightEnabled(vehicle, index, toggle) { SetVehicleNeonLightEnabled(vehicle, index, toggle); }
  isNeonLightEnabled(vehicle, index) { return IsVehicleNeonLightEnabled(vehicle, index); }

  setMod(vehicle, modType, modIndex, customTires) { SetVehicleMod(vehicle, modType, modIndex, customTires ?? false); }
  getMod(vehicle, modType) { return GetVehicleMod(vehicle, modType); }
  setModColor1(vehicle, paintType, color, pearlescentColor) { SetVehicleModColor_1(vehicle, paintType, color, pearlescentColor); }
  setModColor2(vehicle, paintType, color) { SetVehicleModColor_2(vehicle, paintType, color); }
  setLivery(vehicle, livery) { SetVehicleLivery(vehicle, livery); }
  getLivery(vehicle) { return GetVehicleLivery(vehicle); }
  toggleMod(vehicle, modType, toggle) { ToggleVehicleMod(vehicle, modType, toggle); }

  setTyreBurst(vehicle, index, onRim, p3) { SetVehicleTyreBurst(vehicle, index, onRim ?? false, p3 ?? 1000); }
  setTyreFixed(vehicle, tyreIndex) { SetVehicleTyreFixed(vehicle, tyreIndex); }
  getTyreHealth(vehicle, wheelIndex) { return GetTyreHealth(vehicle, wheelIndex); }

  attachToTrailer(vehicle, trailer, radius) { AttachVehicleToTrailer(vehicle, trailer, radius); }
  detachFromTrailer(vehicle) { DetachVehicleFromTrailer(vehicle); }
  attachToTowTruck(towTruck, vehicle, rear, hookOffsetX, hookOffsetY, hookOffsetZ) {
    AttachVehicleToTowTruck(towTruck, vehicle, rear, hookOffsetX, hookOffsetY, hookOffsetZ);
  }
  detachFromTowTruck(towTruck, vehicle) { DetachVehicleFromTowTruck(towTruck, vehicle); }

  getNumberOfPassengers(vehicle) { return GetVehicleNumberOfPassengers(vehicle); }
  getMaxNumberOfPassengers(vehicle) { return GetVehicleMaxNumberOfPassengers(vehicle); }
  getPedInSeat(vehicle, seatIndex) { return GetPedInVehicleSeat(vehicle, seatIndex); }
  isSeatFree(vehicle, seatIndex, isTaskRunning) { return IsVehicleSeatFree(vehicle, seatIndex, isTaskRunning ?? false); }

  setNumberPlateText(vehicle, plateText) { SetVehicleNumberPlateText(vehicle, plateText); }
  getNumberPlateText(vehicle) { return GetVehicleNumberPlateText(vehicle); }
  setAlarm(vehicle, state) { SetVehicleAlarm(vehicle, !!state); }
  setHandbrake(vehicle, toggle) { SetVehicleHandbrake(vehicle, toggle); }
  setBurnout(vehicle, toggle) { SetVehicleBurnout(vehicle, toggle); }
  setHydraulicRaised(vehicle, raised) { SetVehicleHydraulicRaised(vehicle, raised); }

  doesExist(vehicle) { return DoesEntityExist(vehicle); }
  isDead(vehicle) { return IsEntityDead(vehicle); }
  isOnAllWheels(vehicle) { return IsVehicleOnAllWheels(vehicle); }
  isStolen(vehicle) { return IsVehicleStolen(vehicle); }
  isEngineRunning(vehicle) { return GetIsVehicleEngineRunning(vehicle); }

  setWheelType(vehicle, wheelType) { SetVehicleWheelType(vehicle, wheelType); }
  getWheelType(vehicle) { return GetVehicleWheelType(vehicle); }
  setWindowTint(vehicle, tint) { SetVehicleWindowTint(vehicle, tint); }
  getWindowTint(vehicle) { return GetVehicleWindowTint(vehicle); }
  setNumberPlateTextIndex(vehicle, plateIndex) { SetVehicleNumberPlateTextIndex(vehicle, plateIndex); }
  getNumberPlateTextIndex(vehicle) { return GetVehicleNumberPlateTextIndex(vehicle); }
}

class GameTaskNs {
  unk = createUnkProxy();

  goStraightToCoord(ped, x, y, z, speed, timeout) {
    TaskGoStraightToCoord(ped, x, y, z, speed ?? 1.0, timeout ?? -1, 0, 0);
  }
  goToCoordAnyMeans(ped, x, y, z, speed, p5, p6, walkingStyle) {
    TaskGoToCoordAnyMeans(ped, x, y, z, speed ?? 1.0, 0, walkingStyle ?? 0);
  }
  followNavMeshToCoord(ped, x, y, z, speed, p5, p6, p7, p8) {
    TaskFollowNavMeshToCoord(ped, x, y, z, speed ?? 1.0, p5 ?? -1, p6 ?? 0.1, p7 ?? 0, p8 ?? 0);
  }
  vehicleDriveToCoord(ped, vehicle, x, y, z, speed, p6, vehicleModel, drivingStyle, stopRange, p10) {
    TaskVehicleDriveToCoord(ped, vehicle, x, y, z, speed ?? 10.0, p6 ?? 0, vehicleModel ?? 0, drivingStyle ?? 786603, stopRange ?? 4.0, p10 ?? -1);
  }
  vehicleDriveToCoordLongrange(ped, vehicle, x, y, z, speed, drivingStyle, stopRange) {
    TaskVehicleDriveToCoordLongrange(ped, vehicle, x, y, z, speed ?? 10.0, drivingStyle ?? 786603, stopRange ?? 4.0);
  }
  vehicleDriveWander(ped, vehicle, speed, drivingStyle) {
    TaskVehicleDriveWander(ped, vehicle, speed ?? 10.0, drivingStyle ?? 786603);
  }
  vehicleChase(ped, targetPed) { TaskVehicleChase(ped, targetPed); }
  vehicleFollow(ped, vehicle, targetVehicle, speed, drivingStyle, maxDistance) {
    TaskVehicleFollow(ped, vehicle, targetVehicle, speed ?? 10.0, drivingStyle ?? 786603, maxDistance ?? 10);
  }

  playAnim(ped, animDict, animName, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ) {
    TaskPlayAnim(ped, animDict, animName, speed ?? 8.0, speedMultiplier ?? -8.0, duration ?? -1, flag ?? 0, playbackRate ?? 0, lockX ?? false, lockY ?? false, lockZ ?? false);
  }
  playAnimAdvanced(ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed, speedMultiplier, duration, flag, playbackRate, p14, p15) {
    TaskPlayAnimAdvanced(ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed ?? 8.0, speedMultiplier ?? -8.0, duration ?? -1, flag ?? 0, playbackRate ?? 0, p14 ?? 0, p15 ?? 0);
  }
  stopAnim(ped) { ClearPedTasks(ped); }

  aimGunAtCoord(ped, x, y, z, duration, p5, p6) {
    TaskAimGunAtCoord(ped, x, y, z, duration ?? -1, p5 ?? false, p6 ?? false);
  }
  aimGunAtEntity(ped, entity, duration, p4, p5) {
    TaskAimGunAtEntity(ped, entity, duration ?? -1, p4 ?? false);
  }
  shootAtCoord(ped, x, y, z, duration, weaponHash) {
    TaskShootAtCoord(ped, x, y, z, duration ?? -1, weaponHash);
  }
  shootAtEntity(ped, entity, duration, weaponHash) {
    TaskShootAtEntity(ped, entity, duration ?? -1, weaponHash);
  }
  combatPed(ped, targetPed, combatType, p4) {
    TaskCombatPed(ped, targetPed, combatType ?? 0, p4 ?? 16);
  }
  combatHatedTargetsInArea(ped, x, y, z, radius, p5) {
    TaskCombatHatedTargetsInArea(ped, x, y, z, radius, p5 ?? 0);
  }
  combatHatedTargetsAroundPed(ped, radius, p2) {
    TaskCombatHatedTargetsAroundPed(ped, radius, p2 ?? 0);
  }
  fleeFromEntity(ped, fleeTarget, duration, distanceToFleeAt) {
    TaskSmartFleeEntity(ped, fleeTarget, duration ?? -1, distanceToFleeAt ?? 0, false, false);
  }

  enterVehicle(ped, vehicle, timeout, seatIndex, speed, flag, p6) {
    TaskEnterVehicle(ped, vehicle, timeout ?? -1, seatIndex ?? -1, speed ?? 1.0, flag ?? 1, p6 ?? 0);
  }
  leaveVehicle(ped, vehicle, flags) { TaskLeaveVehicle(ped, vehicle, flags ?? 0); }
  openVehicleDoor(ped, vehicle, timeOut, doorIndex, speed) {
    TaskOpenVehicleDoor(ped, vehicle, timeOut ?? 1000, doorIndex, speed ?? 1.0);
  }
  vehicleGotoNavmesh(ped, vehicle, x, y, z, speed, behaviour, stopRange) {
    TaskVehicleGotoNavmesh(ped, vehicle, x, y, z, speed ?? 10.0, behaviour ?? 786603, stopRange ?? 4.0);
  }
  driveBy(ped, targetPed, targetVehicle, x, y, z, distanceToLeadVehicle, speed, drivingStyle, weaponHash) {
    TaskDriveBy(ped, targetPed ?? 0, targetVehicle ?? 0, x ?? 0, y ?? 0, z ?? 0, distanceToLeadVehicle ?? 0, speed ?? 10.0, drivingStyle ?? 786603, true, weaponHash ?? 0);
  }

  startScenarioInPlace(ped, scenario, p2, p3) {
    TaskStartScenarioInPlace(ped, scenario, p2 ?? 0, p3 ?? true);
  }
  startScenarioAtPosition(ped, scenario, x, y, z, heading, duration, isStanding, canWarpIntoScenario) {
    TaskStartScenarioAtPosition(ped, scenario, x, y, z, heading ?? 0, duration ?? -1, isStanding ?? true, canWarpIntoScenario ?? true);
  }
  useNearestScenarioToCoord(ped, x, y, z, radius, p5) {
    TaskUseNearestScenarioToCoord(ped, x, y, z, radius, p5 ?? -1);
  }
  wanderInArea(ped, x, y, z, radius, p5, p6) {
    TaskWanderInArea(ped, x, y, z, radius, p5 ?? 1, p6 ?? 10);
  }
  wanderStandard(ped, heading, radius) { TaskWanderStandard(ped, heading ?? 0, radius ?? 0); }
  patrol(ped, p1, p2) { TaskPatrol(ped, p1 ?? 0, p2 ?? 0, true, false); }

  seekCoverFromPos(ped, x, y, z, p4, p5) { TaskSeekCoverFromPos(ped, x, y, z, p4 ?? -1, p5 ?? true); }
  guardCurrentPosition(ped, x, y, z, p4) { TaskGuardCurrentPosition(ped, x ?? 0, y ?? 0, p4 ?? true); }
  stayInCover(ped) { TaskStayInCover(ped); }

  followWaypointRecording(ped, recording, clipSet, speed, p4) {
    TaskFollowWaypointRecording(ped, recording, p4 ?? 0, clipSet ?? "", speed ?? 1.0);
  }

  clearImmediately(ped) { ClearPedTasksImmediately(ped); }
  clearAll(ped) { ClearPedTasks(ped); }
  clearSecondary(ped) { ClearPedSecondaryTask(ped); }
  pause(ped, time) { TaskPause(ped, time ?? 0); }
  handsUp(ped, time, target, p3, anyMeansFlag) {
    TaskHandsUp(ped, time ?? -1, target ?? 0, p3 ?? -1, anyMeansFlag ?? false);
  }
  lookAtEntity(ped, entity, duration, boneIndex, priority) {
    TaskLookAtEntity(ped, entity, duration ?? -1, boneIndex ?? 0, priority ?? 2);
  }
  clearLookAt(ped) { TaskClearLookAtEntity(ped); }
}

class GameStreamingNs {
  unk = createUnkProxy();

  requestModel(model) { RequestModel(model); }
  hasModelLoaded(model) { return HasModelLoaded(model); }
  setModelAsNoLongerNeeded(model) { SetModelAsNoLongerNeeded(model); }
  isModelValid(model) { return IsModelValid(model); }
  isModelAPed(model) { return IsModelAPed(model); }
  isModelAVehicle(model) { return IsModelAVehicle(model); }
  isModelAnObject(model) { return IsModelAnObject(model); }
  isModelInCdimage(model) { return IsModelInCdimage(model); }

  requestAnimDict(animDict) { RequestAnimDict(animDict); }
  hasAnimDictLoaded(animDict) { return HasAnimDictLoaded(animDict); }
  removeAnimDict(animDict) { RemoveAnimDict(animDict); }
  requestAnimSet(animSet) { RequestAnimSet(animSet); }
  hasAnimSetLoaded(animSet) { return HasAnimSetLoaded(animSet); }
  removeAnimSet(animSet) { RemoveAnimSet(animSet); }
  requestClipSet(clipSet) { RequestClipSet(clipSet); }
  hasClipSetLoaded(clipSet) { return HasClipSetLoaded(clipSet); }
  removeClipSet(clipSet) { RemoveClipSet(clipSet); }

  requestPtfxAsset(ptfxAsset) { RequestParticleFxAsset(ptfxAsset); }
  hasPtfxAssetLoaded(ptfxAsset) { return HasParticleFxAssetLoaded(ptfxAsset); }
  removePtfxAsset(ptfxAsset) { RemoveParticleFxAsset(ptfxAsset); }
  requestNamedPtfxAsset(fxName) { RequestNamedPtfxAsset(fxName); }
  hasNamedPtfxAssetLoaded(fxName) { return HasNamedPtfxAssetLoaded(fxName); }

  requestCollisionForModel(modelHash) { RequestCollisionForModel(modelHash); }
  hasCollisionForModelLoaded(modelHash) { return HasCollisionForModelLoaded(modelHash); }

  requestIpl(iplName) { RequestIpl(iplName); }
  removeIpl(iplName) { RemoveIpl(iplName); }
  isIplActive(iplName) { return IsIplActive(iplName); }

  requestStreamedTextureDict(textureDict, p1) { RequestStreamedTextureDict(textureDict, p1 ?? false); }
  hasStreamedTextureDictLoaded(textureDict) { return HasStreamedTextureDictLoaded(textureDict); }
  releaseStreamedTextureDict(textureDict) { SetStreamedTextureDictAsNoLongerNeeded(textureDict); }

  loadScene(x, y, z) { LoadScene(x, y, z); }
  startPlayerSwitch(from, to, flags, switchType) { StartPlayerSwitch(from, to, flags ?? 0, switchType ?? 0); }
  stopPlayerSwitch() { StopPlayerSwitch(); }
  isPlayerSwitchInProgress() { return IsPlayerSwitchInProgress(); }

  async requestModelAsync(model, timeout = 5000) {
    RequestModel(model);
    const start = GetGameTimer();
    while (!HasModelLoaded(model)) {
      if (GetGameTimer() - start > timeout) return false;
      await new Promise((r) => setTimeout(r, 0));
    }
    return true;
  }
  async requestAnimDictAsync(name, timeout = 5000) {
    RequestAnimDict(name);
    const start = GetGameTimer();
    while (!HasAnimDictLoaded(name)) {
      if (GetGameTimer() - start > timeout) return false;
      await new Promise((r) => setTimeout(r, 0));
    }
    return true;
  }
  async requestAnimSetAsync(name, timeout = 5000) {
    RequestAnimSet(name);
    const start = GetGameTimer();
    while (!HasAnimSetLoaded(name)) {
      if (GetGameTimer() - start > timeout) return false;
      await new Promise((r) => setTimeout(r, 0));
    }
    return true;
  }
  async requestClipSetAsync(name, timeout = 5000) {
    RequestClipSet(name);
    const start = GetGameTimer();
    while (!HasClipSetLoaded(name)) {
      if (GetGameTimer() - start > timeout) return false;
      await new Promise((r) => setTimeout(r, 0));
    }
    return true;
  }
  async requestNamedPtfxAssetAsync(name, timeout = 5000) {
    RequestNamedPtfxAsset(name);
    const start = GetGameTimer();
    while (!HasNamedPtfxAssetLoaded(name)) {
      if (GetGameTimer() - start > timeout) return false;
      await new Promise((r) => setTimeout(r, 0));
    }
    return true;
  }
  async requestCollisionForModelAsync(modelHash, timeout = 5000) {
    RequestCollisionForModel(modelHash);
    const start = GetGameTimer();
    while (!HasCollisionForModelLoaded(modelHash)) {
      if (GetGameTimer() - start > timeout) return false;
      await new Promise((r) => setTimeout(r, 0));
    }
    return true;
  }
}

class GamePadNs {
  unk = createUnkProxy();

  useDefaultVehicleEntering = true;

  isControlEnabled(padIndex, control) { return IsControlEnabled(padIndex, control); }
  isControlPressed(padIndex, control) { return IsControlPressed(padIndex, control); }
  isControlReleased(padIndex, control) { return IsControlReleased(padIndex, control); }
  isControlJustPressed(padIndex, control) { return IsControlJustPressed(padIndex, control); }
  isControlJustReleased(padIndex, control) { return IsControlJustReleased(padIndex, control); }

  getControlValue(padIndex, control) { return GetControlValue(padIndex, control); }
  getControlNormal(padIndex, control) { return GetControlNormal(padIndex, control); }
  getControlUnboundNormal(padIndex, control) { return GetControlUnboundNormal(padIndex, control); }
  setControlNormal(padIndex, control, amount) { return SetControlNormal(padIndex, control, amount); }

  isDisabledControlPressed(padIndex, control) { return IsDisabledControlPressed(padIndex, control); }
  isDisabledControlReleased(padIndex, control) { return IsDisabledControlReleased(padIndex, control); }
  isDisabledControlJustPressed(padIndex, control) { return IsDisabledControlJustPressed(padIndex, control); }
  isDisabledControlJustReleased(padIndex, control) { return IsDisabledControlJustReleased(padIndex, control); }
  getDisabledControlNormal(padIndex, control) { return GetDisabledControlNormal(padIndex, control); }
  getDisabledControlUnboundNormal(padIndex, control) { return GetDisabledControlUnboundNormal(padIndex, control); }

  disableControlAction(padIndex, control, disable) { DisableControlAction(padIndex, control, disable); }
  enableControlAction(padIndex, control, enable) { EnableControlAction(padIndex, control, enable); }
  disableAllControlActions(padIndex) { DisableAllControlActions(padIndex); }
  enableAllControlActions(padIndex) { EnableAllControlActions(padIndex); }

  setDisableControlActionBatch(isMoveOrLook, controlActions) {
    if (!Array.isArray(controlActions)) return;
    this._batchedDisables = { isMoveOrLook, controlActions };
  }
  applyDisableControlActionBatch() {
    if (!this._batchedDisables) return;
    const { controlActions } = this._batchedDisables;
    for (const action of controlActions) DisableControlAction(0, action, true);
  }

  isInputDisabled(padIndex) { return IsInputDisabled(padIndex); }
  isUsingKeyboard(padIndex) { return IsUsingKeyboard(padIndex); }
  isLookInverted() { return IsLookInverted(); }
}

class GameCamNs {
  unk = createUnkProxy();

  createCam(camName, p1) { return CreateCam(camName, p1 ?? false); }
  createCamWithParams(camName, x, y, z, rotX, rotY, rotZ, fov, p8, p9) {
    return CreateCamWithParams(camName, x, y, z, rotX, rotY, rotZ, fov, p8 ?? false, p9 ?? 0);
  }
  createCamera(camHash, p1) { return CreateCamera(camHash, p1 ?? false); }
  createCameraWithParams(camHash, x, y, z, rotX, rotY, rotZ, fov, p8, p9) {
    return CreateCameraWithParams(camHash, x, y, z, rotX, rotY, rotZ, fov, p8 ?? false, p9 ?? 0);
  }
  destroyCam(cam, bScriptHostCam) { DestroyCam(cam, bScriptHostCam ?? false); }
  destroyAllCams(bScriptHostCam) { DestroyAllCams(bScriptHostCam ?? false); }
  doesCamExist(cam) { return DoesCamExist(cam); }

  getCoord(cam) { return toVec3(GetCamCoord(cam)); }
  setCoord(cam, x, y, z) { SetCamCoord(cam, x, y, z); }
  getRot(cam, rotationOrder) { return toVec3(GetCamRot(cam, rotationOrder ?? 2)); }
  setRot(cam, pitch, roll, yaw, rotationOrder) { SetCamRot(cam, pitch, roll, yaw, rotationOrder ?? 2); }
  getFov(cam) { return GetCamFov(cam); }
  setFov(cam, fov) { SetCamFov(cam, fov); }
  getNearClip(cam) { return GetCamNearClip(cam); }
  setNearClip(cam, nearClip) { SetCamNearClip(cam, nearClip); }
  getFarClip(cam) { return GetCamFarClip(cam); }
  setFarClip(cam, farClip) { SetCamFarClip(cam, farClip); }
  getNearDof(cam) { return GetCamNearDof(cam); }
  setNearDof(cam, nearDOF) { SetCamNearDof(cam, nearDOF); }
  getFarDof(cam) { return GetCamFarDof(cam); }
  setFarDof(cam, farDOF) { SetCamFarDof(cam, farDOF); }
  setDofStrength(cam, strength) { SetCamDofStrength(cam, strength); }
  setDofPlanes(cam, nearStart, nearEnd, farStart, farEnd) { SetCamDofPlanes(cam, nearStart, nearEnd, farStart, farEnd); }
  setMotionBlurStrength(cam, strength) { SetCamMotionBlurStrength(cam, strength); }

  isActive(cam) { return IsCamActive(cam); }
  setActive(cam, active) { SetCamActive(cam, active); }
  isInterpolating(cam) { return IsCamInterpolating(cam); }
  setActiveWithInterp(camTo, camFrom, duration, easeLocation, easeRotation) {
    SetCamActiveWithInterp(camTo, camFrom, duration, easeLocation ?? 1, easeRotation ?? 1);
  }
  renderScriptCams(render, ease, easeTime, easeCoordsAnim, p4) {
    RenderScriptCams(render, ease ?? false, easeTime ?? 0, easeCoordsAnim ?? true, p4 ?? false);
  }

  attachToEntity(cam, entity, xOffset, yOffset, zOffset, isRelative) {
    AttachCamToEntity(cam, entity, xOffset, yOffset, zOffset, isRelative ?? true);
  }
  attachToPedBone(cam, ped, boneIndex, xOffset, yOffset, zOffset, heading) {
    AttachCamToPedBone(cam, ped, boneIndex, xOffset, yOffset, zOffset, heading ?? true);
  }
  attachToVehicleBone(cam, vehicle, boneIndex, xOffset, yOffset, zOffset, isRelative) {
    AttachCamToVehicleBone(cam, vehicle, boneIndex, xOffset, yOffset, zOffset, isRelative ?? true);
  }
  detach(cam) { DetachCam(cam); }
  pointAtCoord(cam, x, y, z) { PointCamAtCoord(cam, x, y, z); }
  pointAtEntity(cam, entity, offsetX, offsetY, offsetZ, isRelative) {
    PointCamAtEntity(cam, entity, offsetX ?? 0, offsetY ?? 0, offsetZ ?? 0, isRelative ?? false);
  }
  pointAtPedBone(cam, ped, boneIndex, x, y, z, isRelative) {
    PointCamAtPedBone(cam, ped, boneIndex, x ?? 0, y ?? 0, z ?? 0, isRelative ?? false);
  }
  stopPointing(cam) { StopCamPointing(cam); }

  shake(cam, shakeName, intensity) { ShakeCam(cam, shakeName, intensity); }
  stopShake(cam) { StopCamShaking(cam, true); }
  isShaking(cam) { return IsCamShaking(cam); }

  getGameplayCoord() { return toVec3(GetGameplayCamCoord()); }
  getGameplayRot(rotationOrder) { return toVec3(GetGameplayCamRot(rotationOrder ?? 2)); }
  getGameplayFov() { return GetGameplayCamFov(); }
  setGameplayRelativeHeading(heading) { SetGameplayCamRelativeHeading(heading); }
  setGameplayRelativePitch(pitch, scalingFactor) { SetGameplayCamRelativePitch(pitch, scalingFactor ?? 1.0); }
  clampGameplayCamYaw(minimum, maximum) { ClampGameplayCamYaw(minimum, maximum); }
  clampGameplayCamPitch(minimum, maximum) { ClampGameplayCamPitch(minimum, maximum); }

  doScreenFadeIn(duration) { DoScreenFadeIn(duration); }
  doScreenFadeOut(duration) { DoScreenFadeOut(duration); }
  isScreenFadedIn() { return IsScreenFadedIn(); }
  isScreenFadedOut() { return IsScreenFadedOut(); }
  isScreenFadingIn() { return IsScreenFadingIn(); }
  isScreenFadingOut() { return IsScreenFadingOut(); }
  setCinematicModeActive(p0) { SetCinematicModeActive(p0); }
  isCinematicCamActive() { return IsCinematicCamActive(); }
  setWidescreenBorders(p0) { SetWidescreenBorders(p0); }
}

class GameAudioNs {
  unk = createUnkProxy();

  getSoundId() { return GetSoundId(); }
  releaseSoundId(soundId) { ReleaseSoundId(soundId); }
  playSound(soundId, audioName, audioRef, p3, p4, p5) {
    PlaySound(soundId, audioName, audioRef, p3 ?? false, p4 ?? 0, p5 ?? true);
  }
  playSoundFrontend(soundId, audioName, audioRef, p3) {
    PlaySoundFrontend(soundId, audioName, audioRef, p3 ?? true);
  }
  playSoundFromEntity(soundId, audioName, entity, audioRef, p4, p5) {
    PlaySoundFromEntity(soundId, audioName, entity, audioRef, p4 ?? false, p5 ?? 0);
  }
  playSoundFromCoord(soundId, audioName, x, y, z, audioRef, isNetwork, rangeMax, p8) {
    PlaySoundFromCoord(soundId, audioName, x, y, z, audioRef, isNetwork ?? false, rangeMax ?? 0, p8 ?? false);
  }
  stopSound(soundId) { StopSound(soundId); }
  hasSoundFinished(soundId) { return HasSoundFinished(soundId); }

  playPedAmbientSpeechNative(ped, speechName, speechParam, p3) {
    PlayPedAmbientSpeechNative(ped, speechName, speechParam, p3 ?? 0);
  }
  playPedAmbientSpeech(ped, speechName) {
    PlayPedAmbientSpeechNative(ped, speechName, "SPEECH_PARAMS_STANDARD", 0);
  }
  stopCurrentPlayingSpeech(ped) { StopCurrentPlayingSpeech(ped); }
  isAnySpeechPlaying(ped) { return IsAmbientSpeechPlaying(ped); }
  isSpeechPlaying(ped, _speechName) { return IsScriptedSpeechPlaying(ped); }

  setRadioToStationName(stationName) { SetRadioToStationName(stationName); }
  setRadioToStationIndex(radioStation) { SetRadioToStationIndex(radioStation); }
  getPlayerRadioStationIndex() { return GetPlayerRadioStationIndex(); }
  getPlayerRadioStationName() { return GetPlayerRadioStationName(); }
  skipRadioForward() { SkipRadioForward(); }

  setVehRadioStation(vehicle, radioStation) { SetVehRadioStation(vehicle, radioStation); }
  setVehicleRadioEnabled(vehicle, toggle) { SetVehicleRadioEnabled(vehicle, toggle); }
  overrideVehHorn(vehicle, override, hornHash) { OverrideVehHorn(vehicle, override, hornHash); }
  triggerSiren(vehicle) { TriggerSiren(vehicle); }

  setAmbZoneState(ambZoneName, state) { SetAmbZoneState(ambZoneName, state, 0, 1000); }
  clearAmbZoneState(ambZoneName) { SetAmbZoneState(ambZoneName, false, 0, 1000); }
  activateAudioScene(audioSceneName) { ActivateAudioScene(audioSceneName); }
  deactivateAudioScene(audioSceneName) { DeactivateAudioScene(audioSceneName); }
  isAudioSceneActive(audioSceneName) { return IsAudioSceneActive(audioSceneName); }

  setMusicVolume(level) { SetMusicVolume(level); }
  setMusicVolumeSmoothly(level, timeMs) { SetMusicVolumeSmoothly(level, timeMs); }
  triggerMusicEvent(eventName) { TriggerMusicEvent(eventName); }
  cancelMusicEvent(eventName) { CancelMusicEvent(eventName); }
}

class GameHudNs {
  unk = createUnkProxy();

  beginTextCommandPrint(GxtEntry) { BeginTextCommandPrint(GxtEntry); }
  endTextCommandPrint(duration, drawImmediately) { EndTextCommandPrint(duration, drawImmediately ?? true); }
  addTextComponentSubstringPlayerName(text) { AddTextComponentSubstringPlayerName(text); }
  addTextComponentFloat(value, decimalPlaces) { AddTextComponentFloat(value, decimalPlaces ?? 2); }
  addTextComponentFormattedInteger(value, commaSeparated) { AddTextComponentFormattedInteger(value, commaSeparated ?? false); }
  setTextEntry(text) { SetTextEntry(text); }
  addTextEntry(entryKey, entryText) { AddTextEntry(entryKey, entryText); }
  setTextFont(fontType) { SetTextFont(fontType); }
  setTextScale(scale, scale2) { SetTextScale(scale, scale2); }
  setTextColour(red, green, blue, alpha) { SetTextColour(red, green, blue, alpha); }
  setTextProportional(p0) { SetTextProportional(p0); }
  setTextCentre(align) { SetTextCentre(align); }
  setTextRightJustify(p0) { SetTextRightJustify(p0); }
  setTextWrap(start, end) { SetTextWrap(start, end); }
  setTextDropShadow() { SetTextDropShadow(); }
  setTextOutline() { SetTextOutline(); }
  setTextEdge(p0, r, g, b, a) { SetTextEdge(p0, r, g, b, a); }
  drawText(x, y) { DrawText(x, y); }

  setNotificationTextEntry(text) { SetNotificationTextEntry(text); }
  drawNotification(blink, p1) { return DrawNotification(blink ?? false, p1 ?? true); }
  thefeedNextPostBackgroundColor(r, g, b, a) { ThefeedNextPostBackgroundColor(r, g, b, a); }

  hideHudComponentThisFrame(id) { HideHudComponentThisFrame(id); }
  showHudComponentThisFrame(id) { ShowHudComponentThisFrame(id); }
  setRadarAsInteriorThisFrame(interior, x, y, z, heading) { SetRadarAsInteriorThisFrame(interior, x, y, z, heading); }
  setRadarAsExteriorThisFrame() { if (typeof SetRadarAsExteriorThisFrame === "function") SetRadarAsExteriorThisFrame(); }
  isHudComponentActive(id) { return IsHudComponentActive(id); }
  hideHudAndRadarThisFrame() { HideHudAndRadarThisFrame(); }
  isHudHidden() { return IsHudHidden(); }
  isRadarHidden() { return IsRadarHidden(); }

  addBlipForCoord(x, y, z) { return AddBlipForCoord(x, y, z); }
  addBlipForEntity(entity) { return AddBlipForEntity(entity); }
  addBlipForRadius(x, y, z, radius) { return AddBlipForRadius(x, y, z, radius); }
  removeBlip(blip) { RemoveBlip(blip); }
  setBlipSprite(blip, spriteId) { SetBlipSprite(blip, spriteId); }
  setBlipColour(blip, color) { SetBlipColour(blip, color); }
  setBlipRoute(blip, enabled) { SetBlipRoute(blip, enabled); }
  setBlipScale(blip, scale) { SetBlipScale(blip, scale); }
  setBlipName(blip, name) { BeginTextCommandSetBlipName("STRING"); AddTextComponentSubstringPlayerName(name); EndTextCommandSetBlipName(blip); }
  setBlipFlashes(blip, toggle) { SetBlipFlashes(blip, toggle); }
  setBlipAlpha(blip, alpha) { SetBlipAlpha(blip, alpha); }
  setBlipDisplay(blip, display) { SetBlipDisplay(blip, display); }
  setBlipCategory(blip, index) { SetBlipCategory(blip, index); }
  setBlipAsFriendly(blip, toggle) { SetBlipAsFriendly(blip, toggle); }
  setBlipHighDetail(blip, toggle) { SetBlipHighDetail(blip, toggle); }
  setBlipRotation(blip, rotation) { SetBlipRotation(blip, rotation); }
  isBlipOnMinimap(blip) { return IsBlipOnMinimap(blip); }
  getBlipAlpha(blip) { return GetBlipAlpha(blip); }
  getBlipColour(blip) { return GetBlipColour(blip); }
  getBlipSprite(blip) { return GetBlipSprite(blip); }
  getFirstBlipInfoId(blipType) { return GetFirstBlipInfoId(blipType); }
  getNextBlipInfoId(blipType) { return GetNextBlipInfoId(blipType); }

  setRadarZoom(zoomLevel) { SetRadarZoom(zoomLevel); }
  setMinimapVisible(toggle) { SetMinimapVisible(toggle); }
  displayAreaName(toggle) { DisplayAreaName(toggle); }
  displayCash(toggle) { DisplayCash(toggle); }
  displayHud(toggle) { DisplayHud(toggle); }
  displayRadar(toggle) { DisplayRadar(toggle); }
  lockMinimapPosition(x, y) { LockMinimapPosition(x, y); }
  unlockMinimapPosition() { UnlockMinimapPosition(); }
  setMinimapComponentPosition(name, alignX, alignY, posX, posY, sizeX, sizeY) {
    SetMinimapComponentPosition(name, alignX, alignY, posX, posY, sizeX, sizeY);
  }

  isPauseMenuActive() { return IsPauseMenuActive(); }
  isThisHelpMessageBeingDisplayed(labelName) { return IsThisHelpMessageBeingDisplayed(labelName); }

  getScreenPositionFromWorldPosition(worldX, worldY, worldZ) {
    const [ok, screenX, screenY] = GetScreenCoordFromWorldCoord(worldX, worldY, worldZ);
    return ok ? { x: screenX, y: screenY } : null;
  }
  drawRect(x, y, width, height, r, g, b, a) { DrawRect(x, y, width, height, r, g, b, a); }
  drawSprite(textureDict, textureName, screenX, screenY, width, height, heading, r, g, b, a) {
    DrawSprite(textureDict, textureName, screenX, screenY, width, height, heading, r, g, b, a);
  }
  drawLine(x1, y1, z1, x2, y2, z2, r, g, b, a) { DrawLine(x1, y1, z1, x2, y2, z2, r, g, b, a); }
  draw3DText(x, y, z, text) { DrawText3d(x, y, z, text); }

  getHudColour(hudColorIndex) {
    const [r, g, b, a] = GetHudColour(hudColorIndex);
    return { r, g, b, a };
  }
  setHudColour(hudColorIndex, r, g, b, a) { SetHudColour(hudColorIndex, r, g, b, a); }
}

class GameMiscNs {
  unk = createUnkProxy();

  setWeatherTypePersist(weatherType) { SetWeatherTypePersist(weatherType); }
  setWeatherTypeNow(weatherType) { SetWeatherTypeNow(weatherType); }
  setWeatherTypeNowPersist(weatherType) { SetWeatherTypeNowPersist(weatherType); }
  getWeatherTypeTransition() {
    const [w1, w2, p] = GetWeatherTypeTransition();
    return { weatherType1: w1, weatherType2: w2, percent: p };
  }
  setWindSpeed(speed) { SetWindSpeed(speed); }
  setRainLevel(intensity) { SetRainLevel(intensity); }
  setSnowLevel(level) { SetSnowLevel(level); }

  getGroundZFor3DCoord(x, y, z, ignoreWater) {
    const [, z2] = GetGroundZFor_3dCoord(x, y, z, ignoreWater ?? false);
    return z2;
  }
  getDistanceBetweenCoords(x1, y1, z1, x2, y2, z2, useZ) {
    return GetDistanceBetweenCoords(x1, y1, z1, x2, y2, z2, useZ ?? true);
  }
  getHeadingFromVector2D(dx, dy) { return GetHeadingFromVector_2d(dx, dy); }
  getAngleBetween2dVectors(x1, y1, x2, y2) { return GetAngleBetween_2dVectors(x1, y1, x2, y2); }

  setTimeScale(timeScale) { SetTimeScale(timeScale); }
  setMissionFlag(toggle) { SetMissionFlag(toggle); }
  getMissionFlag() { return GetMissionFlag(); }
  setGamePaused(toggle) { SetGamePaused(toggle); }

  shootSingleBulletBetweenCoords(fromX, fromY, fromZ, toX, toY, toZ, damage, pureAccuracy, weaponHash, ownerPed, isAudible, isInvisible, speed) {
    ShootSingleBulletBetweenCoords(fromX, fromY, fromZ, toX, toY, toZ, damage, pureAccuracy ?? true, weaponHash, ownerPed, isAudible ?? true, isInvisible ?? false, speed ?? 1.0);
  }
  isProjectileTypeInArea(x1, y1, z1, x2, y2, z2, type, ownedByPlayer) {
    return IsProjectileTypeInArea(x1, y1, z1, x2, y2, z2, type, ownedByPlayer ?? false);
  }

  getModelDimensions(modelHash) {
    const [min, max] = GetModelDimensions(modelHash);
    return {
      min: toVec3(min) ?? new Vector3(min[0], min[1], min[2]),
      max: toVec3(max) ?? new Vector3(max[0], max[1], max[2]),
    };
  }

  getHashKey(string) { return GetHashKey(string); }
  getRandomIntInRange(startRange, endRange) { return GetRandomIntInRange(startRange, endRange); }
  getRandomFloatInRange(startRange, endRange) { return GetRandomFloatInRange(startRange, endRange); }
  areStringsEqual(string1, string2) { return string1 === string2; }

  clearArea(x, y, z, radius, p4, p5, p6, p7) {
    ClearAreaOfEverything(x, y, z, radius, p4 ?? false, p5 ?? false, p6 ?? false, p7 ?? false);
  }
  clearAreaOfVehicles(x, y, z, radius, p4, p5, p6, p7, p8) {
    ClearAreaOfVehicles(x, y, z, radius, p4 ?? false, p5 ?? false, p6 ?? false, p7 ?? false, p8 ?? false);
  }
  clearAreaOfPeds(x, y, z, radius, p4) {
    ClearAreaOfPeds(x, y, z, radius, p4 ?? false);
  }
  clearAreaOfObjects(x, y, z, radius, p4) {
    ClearAreaOfObjects(x, y, z, radius, p4 ?? 0);
  }
  clearAreaOfCops(x, y, z, radius) { ClearAreaOfCops(x, y, z, radius, false); }

  setGravityLevel(level) { SetGravityLevel(level); }
  resetGravityLevel() { SetGravityLevel(0); }

  getGameTimer() { return GetGameTimer(); }
  getFrameTime() { return GetFrameTime(); }
  getFrameCount() { return GetFrameCount(); }

  isInteriorScene() { return IsInteriorScene(); }
  getInteriorFromEntityOrCoords(entity, x, y, z) { return GetInteriorFromEntityOrCoords(entity, x, y, z); }
  getActiveInteriorForEntity(entity) { return GetInteriorFromEntity(entity); }
}

class GameWeaponNs {
  unk = createUnkProxy();

  unequipEmptyWeapons = true;

  cancelCurrentDamageEvent() {}
  setCurrentDamageEventAmount(_amount) {}
  setEnableLocalOutgoingDamage(_toggle) {}
  setCurrentDamageEventCritical(_toggle) {}
  setSimulateLocalDamageImpacts(_doSimulate) {}

  giveToPed(ped, weaponHash, ammoCount, isHidden, bForceInHand) {
    GiveWeaponToPed(ped, weaponHash, ammoCount, isHidden ?? false, bForceInHand ?? true);
  }
  removeFromPed(ped, weaponHash) { RemoveWeaponFromPed(ped, weaponHash); }
  getAmmoInClip(ped, weaponHash) {
    const [, ammo] = GetAmmoInClip(ped, weaponHash);
    return ammo;
  }
  setAmmoInClip(ped, weaponHash, ammo) { return SetAmmoInClip(ped, weaponHash, ammo); }
  removeAllWeapons(ped, p1) { RemoveAllPedWeapons(ped, p1 ?? true); }
  hasWeapon(ped, weaponHash) { return HasPedGotWeapon(ped, weaponHash, false); }
  getCurrentWeapon(ped) {
    const [, hash] = GetCurrentPedWeapon(ped, true);
    return hash;
  }
  setCurrentWeapon(ped, weaponHash, equip) { SetCurrentPedWeapon(ped, weaponHash, equip ?? true); }
  getWeaponTintIndex(ped, weaponHash) { return GetPedWeaponTintIndex(ped, weaponHash); }
  setWeaponTintIndex(ped, weaponHash, tintIndex) { SetPedWeaponTintIndex(ped, weaponHash, tintIndex); }
  giveComponent(ped, weaponHash, componentHash) { GiveWeaponComponentToPed(ped, weaponHash, componentHash); }
  removeComponent(ped, weaponHash, componentHash) { RemoveWeaponComponentFromPed(ped, weaponHash, componentHash); }
  hasComponent(ped, weaponHash, componentHash) { return HasPedGotWeaponComponent(ped, weaponHash, componentHash); }

  createObject(weaponHash, ammoCount, x, y, z, showWorldModel, scale) {
    return CreateWeaponObject(weaponHash, ammoCount, x, y, z, showWorldModel ?? true, scale ?? 1.0, 0);
  }
  enableLaserSightRendering(toggle) { EnableLaserSightRendering(toggle); }
  getAmmoTypeFromWeapon(ped, weaponHash) { return GetPedAmmoTypeFromWeapon(ped, weaponHash); }
}

class GameClockNs {
  unk = createUnkProxy();

  getHours() { return GetClockHours(); }
  getMinutes() { return GetClockMinutes(); }
  getSeconds() { return GetClockSeconds(); }
  getDayOfMonth() { return GetClockDayOfMonth(); }
  getDayOfWeek() { return GetClockDayOfWeek(); }
  getMonth() { return GetClockMonth(); }
  getYear() { return GetClockYear(); }
  setDate(day, month, year) { SetClockDate(day, month, year); }
  setTime(hours, minutes, seconds) { NetworkOverrideClockTime(hours, minutes, seconds); }
  setMillisecondsPerGameMinute(ms) { NetworkOverrideClockMillisecondsPerGameMinute(ms); }
}

class GameFireNs {
  unk = createUnkProxy();

  addExplosion(x, y, z, explosionType, damageScale, isAudible, isInvisible, cameraShake) {
    AddExplosion(x, y, z, explosionType, damageScale ?? 1.0, isAudible ?? true, isInvisible ?? false, cameraShake ?? 1.0);
  }
  addExplosionWithUserVfx(x, y, z, explosionType, explosionFx, damageScale, isAudible, isInvisible, cameraShake) {
    AddExplosionWithUserVfx(x, y, z, explosionType, explosionFx, damageScale ?? 1.0, isAudible ?? true, isInvisible ?? false, cameraShake ?? 1.0);
  }
  startEntityFire(entity) { return StartEntityFire(entity); }
  stopEntityFire(entity) { StopEntityFire(entity); }
  startScriptedFire(x, y, z, radius, strength) { return StartScriptedFire(x, y, z, radius ?? 1.0, strength ?? 1); }
  stopScriptedFire(handle) { StopScriptedFire(handle); }
  isEntityOnFire(entity) { return IsEntityOnFire(entity); }
  getNumberOfFiresInRange(x, y, z, radius) { return GetNumberOfFiresInRange(x, y, z, radius); }
  stopAllFiresInRange(x, y, z, radius) { StopFireInRange(x, y, z, radius); }
}

class GameObjectNs {
  unk = createUnkProxy();

  create(modelHash, x, y, z, dynamic, isNetwork, bScriptHostObj) {
    return CreateObject(modelHash, x, y, z, isNetwork ?? true, dynamic ?? true, bScriptHostObj ?? false);
  }
  delete(object) { DeleteObject(object); }
  doesExist(object) { return DoesObjectExist(object); }
  isAtCoords(object, x, y, z, dist) { return IsObjectAtCoords(object, x, y, z, dist ?? 0.1, false, false, false); }
  placeOnGroundProperly(object) { PlaceObjectOnGroundProperly(object); }
  slideToCoord(object, toX, toY, toZ, speedX, speedY, speedZ) {
    SlideObjectToCoords(object, toX, toY, toZ, speedX ?? 5, speedY ?? 5, speedZ ?? 5);
  }
  doorControl(doorHash, x, y, z, locked, xRotMult, yRotMult, zRotMult) {
    DoorControl(doorHash, x, y, z, !!locked, xRotMult ?? 0.0, yRotMult ?? 0.0, zRotMult ?? 0.0);
  }
}

class GameShapetestNs {
  unk = createUnkProxy();

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

class GameInteriorNs {
  unk = createUnkProxy();

  getInteriorFromEntity(entity) { return GetInteriorFromEntity(entity); }
  getInteriorAtCoords(x, y, z) { return GetInteriorAtCoords(x, y, z); }
  getInteriorAtCoordsWithType(x, y, z, interiorType) { return GetInteriorAtCoordsWithType(x, y, z, interiorType); }
  enableInteriorProp(interiorId, propName) { EnableInteriorProp(interiorId, propName); }
  disableInteriorProp(interiorId, propName) { DisableInteriorProp(interiorId, propName); }
  isInteriorPropEnabled(interiorId, propName) { return IsInteriorPropEnabled(interiorId, propName); }
  refreshInterior(interiorId) { RefreshInterior(interiorId); }
  isValidInterior(interiorId) { return IsValidInterior(interiorId); }
  isInteriorScene() { return IsInteriorScene(); }
  getEntityInteriorLocation(entity) { return GetEntityInteriorLocation(entity); }
}

class GameZoneNs {
  unk = createUnkProxy();

  getNameOfZone(x, y, z) { return GetNameOfZone(x, y, z); }
  getZoneAtCoords(x, y, z) { return GetZoneAtCoords(x, y, z); }
  getZoneIndex(zoneName) { return GetZoneIndex(zoneName); }
  getZonePopType(zoneIndex) { return GetZonePopType(zoneIndex); }
  setZonePopType(zoneIndex, popType) { SetZonePopType(zoneIndex, popType); }
  setZoneDensityMultiplierForPeds(zoneIndex, multiplier) { SetZoneDensityMultiplierForPeds(zoneIndex, multiplier); }
}

class GamePathfindNs {
  unk = createUnkProxy();

  getRandomVehicleNode(x, y, z) {
    const [hit, coords, heading] = GetNthClosestVehicleNodeWithHeading(x, y, z, 0, 1, 3, 0);
    if (!hit || !coords) return null;
    return { x: coords[0], y: coords[1], z: coords[2], heading };
  }
  getClosestVehicleNode(x, y, z, nodeFlags) {
    const [hit, coords, heading] = GetClosestVehicleNodeWithHeading(x, y, z, nodeFlags ?? 1, 3.0, 0);
    if (!hit || !coords) return null;
    return { x: coords[0], y: coords[1], z: coords[2], heading };
  }
  getClosestRoad(x, y, z, minimumEdgeLength, minimumLaneCount, onlyMajorRoads) {
    const [hit, road1, road2, heading1, heading2, density] = GetClosestRoad(x, y, z, minimumEdgeLength ?? 0, minimumLaneCount ?? 1, onlyMajorRoads ?? false);
    if (!hit) return null;
    return {
      roads: [road1 ? { x: road1[0], y: road1[1], z: road1[2] } : null, road2 ? { x: road2[0], y: road2[1], z: road2[2] } : null],
      headings: [heading1, heading2],
      density,
    };
  }
  isPointOnRoad(x, y, z, entity) { return IsPointOnRoad(x, y, z, entity ?? 0); }
  generateDirectionsToCoord(x, y, z) { GenerateDirectionsToCoord(x, y, z); }
  getStreetNameAtCoord(x, y, z) {
    const [streetName, crossingRoad] = GetStreetNameAtCoord(x, y, z);
    return { streetName, crossingRoad };
  }
}

class GamePhysicsNs {
  unk = createUnkProxy();

  addRope(x, y, z, rotX, rotY, rotZ, length, ropeType, maxLength, minLength, windingSpeed, p11, rigid, breakable, p14) {
    return AddRope(x, y, z, rotX, rotY, rotZ, length, ropeType, maxLength, minLength, windingSpeed, p11 ?? false, rigid ?? false, breakable ?? true, p14 ?? 0);
  }
  deleteRope(rope) { DeleteRope(rope); }
  doesRopeExist(rope) { return DoesRopeExist(rope); }
  attachEntitiesToRope(rope, ent1, ent2, ent1X, ent1Y, ent1Z, ent2X, ent2Y, ent2Z, length, p10, p11, p12, p13) {
    AttachEntitiesToRope(rope, ent1, ent2, ent1X, ent1Y, ent1Z, ent2X, ent2Y, ent2Z, length, p10 ?? false, p11 ?? false, p12 ?? 0, p13 ?? 0);
  }
  detachRopeFromEntity(rope, entity) { DetachRopeFromEntity(rope, entity); }
  pinRopeVertex(rope, vertex, x, y, z) { PinRopeVertex(rope, vertex, x, y, z); }
  unpinRopeVertex(rope, vertex) { UnpinRopeVertex(rope, vertex); }
  getRopeVertexCount(rope) { return GetRopeVertexCount(rope); }
}

class GameWaterNs {
  unk = createUnkProxy();

  getWaterHeight(x, y, z) {
    const [, h] = GetWaterHeight(x, y, z);
    return h;
  }
  testProbeAgainstWater(x1, y1, z1, x2, y2, z2) {
    const [hit, coords] = TestProbeAgainstWater(x1, y1, z1, x2, y2, z2);
    if (!hit || !coords) return null;
    return { x: coords[0], y: coords[1], z: coords[2] };
  }
  modifyWater(x, y, z, p3, p4) { ModifyWater(x, y, z, p3 ?? 1.0, p4 ?? 1.0); }
  resetWaterLevel() { ResetDeepOceanScaler(); }
}

class GameGraphicsNs {
  unk = createUnkProxy();

  drawLight(x, y, z, r, g, b, intensity, radius) { DrawLightWithRangeAndShadow(x, y, z, r, g, b, radius ?? 20.0, intensity ?? 1.0, 0); }
  drawSpotLight(x, y, z, dirX, dirY, dirZ, r, g, b, distance, brightness, roundness, radius, falloff) {
    DrawSpotLight(x, y, z, dirX, dirY, dirZ, r, g, b, distance, brightness, roundness, radius, falloff);
  }
  drawSpotLightWithShadow(x, y, z, dirX, dirY, dirZ, r, g, b, distance, brightness, roundness, radius, falloff, shadowId) {
    DrawSpotLightWithShadow(x, y, z, dirX, dirY, dirZ, r, g, b, distance, brightness, roundness, radius, falloff, shadowId);
  }

  useParticleFxAssetNextCall(name) { UseParticleFxAssetNextCall(name); }
  startParticleFxLoopedAtCoord(fxName, x, y, z, xRot, yRot, zRot, scale, p7, p8, p9, p10) {
    return StartParticleFxLoopedAtCoord(fxName, x, y, z, xRot ?? 0, yRot ?? 0, zRot ?? 0, scale ?? 1.0, p7 ?? false, p8 ?? false, p9 ?? false, p10 ?? false);
  }
  startParticleFxLoopedOnEntity(fxName, entity, xOff, yOff, zOff, xRot, yRot, zRot, scale) {
    return StartParticleFxLoopedOnEntity(fxName, entity, xOff ?? 0, yOff ?? 0, zOff ?? 0, xRot ?? 0, yRot ?? 0, zRot ?? 0, scale ?? 1.0);
  }
  stopParticleFxLooped(ptFxHandle, killImmediate) { StopParticleFxLooped(ptFxHandle, killImmediate ?? false); }
  startParticleFxNonLoopedAtCoord(fxName, x, y, z, xRot, yRot, zRot, scale, p7, p8, p9) {
    return StartParticleFxNonLoopedAtCoord(fxName, x, y, z, xRot ?? 0, yRot ?? 0, zRot ?? 0, scale ?? 1.0, p7 ?? false, p8 ?? false, p9 ?? false);
  }
  startParticleFxNonLoopedOnEntity(fxName, entity, xOff, yOff, zOff, xRot, yRot, zRot, scale) {
    return StartParticleFxNonLoopedOnEntity(fxName, entity, xOff ?? 0, yOff ?? 0, zOff ?? 0, xRot ?? 0, yRot ?? 0, zRot ?? 0, scale ?? 1.0);
  }
  removeParticleFx(ptFxHandle, killImmediate) { RemoveParticleFx(ptFxHandle, killImmediate ?? false); }
  doesParticleFxLoopedExist(ptFxHandle) { return DoesParticleFxLoopedExist(ptFxHandle); }
  setParticleFxLoopedEvolution(ptFxHandle, propertyName, amount, noMult) {
    SetParticleFxLoopedEvolution(ptFxHandle, propertyName, amount, noMult ?? false);
  }
  setParticleFxNonLoopedColour(r, g, b) { SetParticleFxNonLoopedColour(r, g, b); }
  setParticleFxLoopedColour(ptFxHandle, r, g, b, noMult) { SetParticleFxLoopedColour(ptFxHandle, r, g, b, noMult ?? false); }
  setParticleFxLoopedAlpha(ptFxHandle, alpha) { SetParticleFxLoopedAlpha(ptFxHandle, alpha); }
  setParticleFxLoopedScale(ptFxHandle, scale) { SetParticleFxLoopedScale(ptFxHandle, scale); }

  setArtificialLightsState(toggle) { SetArtificialLightsState(toggle); }
  setArtificialLightsStateAffectsVehicles(toggle) { SetArtificialLightsStateAffectsVehicles(toggle); }

  requestStreamedTextureDict(textureDict, p1) { RequestStreamedTextureDict(textureDict, p1 ?? false); }
  hasStreamedTextureDictLoaded(textureDict) { return HasStreamedTextureDictLoaded(textureDict); }
  releaseStreamedTextureDict(textureDict) { SetStreamedTextureDictAsNoLongerNeeded(textureDict); }
  drawSprite(textureDict, textureName, screenX, screenY, width, height, heading, r, g, b, alpha, unk) {
    DrawSprite(textureDict, textureName, screenX, screenY, width, height, heading ?? 0, r, g, b, alpha ?? 255, unk ?? false);
  }
}

class GameStatsNs {
  unk = createUnkProxy();

  statSetInt(statName, value, save) { StatSetInt(statName, value, save ?? true); }
  statSetFloat(statName, value, save) { StatSetFloat(statName, value, save ?? true); }
  statSetBool(statName, value, save) { StatSetBool(statName, value, save ?? true); }
  statSetString(statName, value, save) { StatSetString(statName, value, save ?? true); }
  statGetInt(statName) {
    const [, out] = StatGetInt(statName, 0);
    return out;
  }
  statGetFloat(statName) {
    const [, out] = StatGetFloat(statName, 0);
    return out;
  }
  statGetBool(statName) {
    const [, out] = StatGetBool(statName, false);
    return out;
  }
  statGetString(statName) {
    return StatGetString(statName, -1);
  }
}

class GameNetworkNs {
  unk = createUnkProxy();

  isSessionActive() { return NetworkIsSessionActive(); }
  isInMpSession() { return NetworkIsInMpSession(); }
  getNumConnectedPlayers() { return NetworkGetNumConnectedPlayers(); }
  isPlayerActive(player) { return NetworkIsPlayerActive(player); }
  getPlayerFromServerId(serverId) { return GetPlayerFromServerId(serverId); }
  getServerId(player) { return GetPlayerServerId(player); }
  isHost() { return NetworkIsHost(); }

  getEntityNetworkId(entity) {
    if (!entity || !DoesEntityExist(entity)) return 0;
    if (!NetworkGetEntityIsNetworked(entity)) return 0;
    return NetworkGetNetworkIdFromEntity(entity);
  }
  getEntityFromNetworkId(netId) { return NetworkGetEntityFromNetworkId(netId); }
  doesEntityExistWithNetworkId(netId) { return NetworkDoesEntityExistWithNetworkId(netId); }
  requestControlOfEntity(entity) { return NetworkRequestControlOfEntity(entity); }
  hasControlOfEntity(entity) { return NetworkHasControlOfEntity(entity); }
  doesNetworkEntityExist(entity) { return NetworkIsEntityNetworked(entity); }

  registerEntityAsNetworked(entity) { RegisterNetworkEntityAsNetworked(entity); }
  unregisterNetworkedEntity(entity) { UnregisterNetworkEntityAsNetworked(entity); }
}

class GameScriptNs {
  unk = createUnkProxy();

  isThreadActive(threadId) { return IsThreadActive(threadId); }
  terminateThread(threadId) { TerminateThread(threadId); }
  doesThreadExist(threadId) { return !!GetNameOfThread(threadId); }
  getIdOfThisThread() { return GetIdOfThisThread(); }
  getNameOfThread(threadId) { return GetNameOfThread(threadId); }
  requestScriptWithNameHash(scriptHash) { RequestScriptWithNameHash(scriptHash); }
  hasScriptWithNameHashLoaded(scriptHash) { return HasScriptWithNameHashLoaded(scriptHash); }
  triggerScriptEvent(eventGroup, eventDataSize, playerBits) { return TriggerScriptEvent(eventGroup, eventDataSize, playerBits); }
}

class GameMobileNs {
  unk = createUnkProxy();

  createMobilePhone(phoneType) { return CreateMobilePhone(phoneType ?? 0); }
  destroyMobilePhone() { DestroyMobilePhone(); }
  setMobilePhoneScale(scale) { SetMobilePhoneScale(scale); }
  setMobilePhoneRotation(rotX, rotY, rotZ, p3) { SetMobilePhoneRotation(rotX, rotY, rotZ, p3 ?? false); }
  setMobilePhonePosition(offsetX, offsetY, offsetZ) { SetMobilePhonePosition(offsetX, offsetY, offsetZ); }
}

class GameAppNs {
  unk = createUnkProxy();

  getAppData(appName) { return GetAppData(appName ?? 0); }
}

class GameSystemNs {
  unk = createUnkProxy();

  wait(ms) { Wait(ms); }
  startNewScript(scriptName, stackSize) { return StartNewScript(scriptName, stackSize ?? 1000); }
  startNewScriptWithArgs(scriptName, args, argCount, stackSize) {
    return StartNewScriptWithArgs(scriptName, args, argCount, stackSize ?? 1000);
  }

  vdist(x1, y1, z1, x2, y2, z2) {
    const dx = x1 - x2, dy = y1 - y2, dz = z1 - z2;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  vdist2d(x1, y1, x2, y2) {
    const dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  vmag(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
  }

  vmag2d(x, y) {
    return Math.sqrt(x * x + y * y);
  }
}

class GameBrainNs {
  unk = createUnkProxy();

  addVehicleCombatAntiCheatTimer(vehicle, p1) { AddVehicleCombatAntiCheatTimer(vehicle, p1); }
  registerBrainEvent(eventId) { return RegisterBrainEvent(eventId); }
  sendBrainEvent(eventId, args) { SendBrainEvent(eventId, args); }
}

class GameCutsceneNs {
  unk = createUnkProxy();

  startCutscene(cutsceneName, flags) { StartCutscene(cutsceneName, flags ?? 0); }
  stopCutscene(bInstantly) { StopCutscene(bInstantly ?? true); }
  isCutsceneActive() { return IsCutsceneActive(); }
  isCutscenePlaying() { return IsCutscenePlaying(); }
  getCutsceneTime() { return GetCutsceneTime(); }
  wasCutsceneSkipped() { return WasCutsceneSkipped(); }
}

class GameDecoratorNs {
  unk = createUnkProxy();

  decorate(entity, propertyName, value) { DecorSetFloat(entity, propertyName, value); }
  decorSetBool(entity, propertyName, value) { DecorSetBool(entity, propertyName, value); }
  decorSetFloat(entity, propertyName, value) { DecorSetFloat(entity, propertyName, value); }
  decorSetInt(entity, propertyName, value) { DecorSetInt(entity, propertyName, value); }
  decorGetBool(entity, propertyName) { return DecorGetBool(entity, propertyName); }
  decorGetFloat(entity, propertyName) { return DecorGetFloat(entity, propertyName); }
  decorGetInt(entity, propertyName) { return DecorGetInt(entity, propertyName); }
  decorExistOn(entity, propertyName) { return DecorExistOn(entity, propertyName); }
  decorRemove(entity, propertyName) { DecorRemove(entity, propertyName); }
  decorRegister(propertyName, type) { DecorRegister(propertyName, type); }
}

class GameDlcNs {
  unk = createUnkProxy();

  getDlcPackCount() { return GetDlcPackCount(); }
  getDlcPackInstalledAt(dlcPackIndex) { return GetDlcPackInstalledAt(dlcPackIndex); }
  isPackValid(packNameHash) { return IsPackValid(packNameHash); }
  isPackPresent(packNameHash) { return IsPackPresent(packNameHash); }
}

class GameFilesNs {
  unk = createUnkProxy();
  exists(_path) { return false; }
  read(_path) { return null; }
  write(_path, _data) {}
}

class GameLoadingscreenNs {
  unk = createUnkProxy();

  shutdownLoadingScreen() { ShutdownLoadingScreen(); }
  shutdownLoadingScreenNui() { ShutdownLoadingScreenNui(); }
  isLoadingScreenActive() { return IsLoadingScreenActive(); }
}

class GameLocalizationNs {
  unk = createUnkProxy();

  getLanguage() { return GetCurrentLanguage(); }
  getLabelText(labelName) { return GetLabelText(labelName); }
}

class GameItemsetNs {
  unk = createUnkProxy();

  createItemset(size) { return CreateItemset(size); }
  deleteItemset(handle) { DeleteItemset(handle); }
  isItemsetValid(handle) { return IsItemsetValid(handle); }
  addToItemset(handle, item) { AddToItemset(handle, item); }
  removeFromItemset(handle, item) { RemoveFromItemset(handle, item); }
  isInItemset(handle, item) { return IsInItemset(handle, item); }
  getItemInItemset(handle, index) { return GetItemInItemset(handle, index); }
  sizeOfItemset(handle) { return SizeOfItemset(handle); }
}

class GameRecordingNs {
  unk = createUnkProxy();

  startRecording(recordingType) { StartRecording(recordingType ?? 1); }
  stopRecordingAndSaveClip() { StopRecordingAndSaveClip(); }
  isRecordingActive() { return IsRecordingActive(); }
  startRecordingWithOptions(recordingType, p1, p2) { StartRecordingWithOptions(recordingType ?? 1, p1 ?? 0, p2 ?? 0); }
}

class GameReplayNs {
  unk = createUnkProxy();

  activateReplayEditor() { ActivateReplayEditor(); }
  isReplayEditorActive() { return IsReplayEditorActive(); }
}

class GameDatafileNs {
  unk = createUnkProxy();
  requestOwnedEntityHighestPriorityDataFile(entityHandle) {}
  isHigherModel(modelHash) { return IsHigherModel(modelHash); }
}

class GameEventNs {
  unk = createUnkProxy();

  addShockingEvent(type, posX, posY, posZ, p4, p5, p6, duration, p8) {
    return AddShockingEvent(type, posX, posY, posZ, p4 ?? 0, p5 ?? 0, p6 ?? 0, duration ?? 0);
  }
  removeShockingEvent(handle) { RemoveShockingEvent(handle); }
  clearAreaOfShockingEvents(x, y, z, radius) { ClearAreaOfShockingEvents(x, y, z, radius); }
}

export class GameMp {
  constructor() {
    this.entity = new GameEntityNs();
    this.ped = new GamePedNs();
    this.player = new GamePlayerNs();
    this.vehicle = new GameVehicleNs();
    this.task = new GameTaskNs();
    this.streaming = new GameStreamingNs();
    this.pad = new GamePadNs();
    this.cam = new GameCamNs();
    this.audio = new GameAudioNs();
    this.hud = new GameHudNs();
    this.misc = new GameMiscNs();
    this.weapon = new GameWeaponNs();
    this.clock = new GameClockNs();
    this.fire = new GameFireNs();
    this.object = new GameObjectNs();
    this.shapetest = new GameShapetestNs();
    this.interior = new GameInteriorNs();
    this.zone = new GameZoneNs();
    this.pathfind = new GamePathfindNs();
    this.physics = new GamePhysicsNs();
    this.water = new GameWaterNs();
    this.graphics = new GameGraphicsNs();
    this.stats = new GameStatsNs();
    this.network = new GameNetworkNs();
    this.script = new GameScriptNs();
    this.mobile = new GameMobileNs();
    this.app = new GameAppNs();
    this.system = new GameSystemNs();
    this.brain = new GameBrainNs();
    this.cutscene = new GameCutsceneNs();
    this.decorator = new GameDecoratorNs();
    this.dlc = new GameDlcNs();
    this.files = new GameFilesNs();
    this.loadingscreen = new GameLoadingscreenNs();
    this.localization = new GameLocalizationNs();
    this.itemset = new GameItemsetNs();
    this.recording = new GameRecordingNs();
    this.replay = new GameReplayNs();
    this.datafile = new GameDatafileNs();
    this.event = new GameEventNs();

    this.gxt = new GameGxt();

    for (const key of Object.keys(this)) {
      const ns = this[key];
      if (ns && typeof ns === "object") {
        this[key] = withGameNatives(ns, key);
      }
    }

    this.gameplay = this.misc;
    this.ai = this.task;
    this.time = this.clock;
    this.rope = this.physics;
    this.controls = this.pad;
    this.ui = this.hud;
  }

  invoke(hash, ...args) { return Citizen.invokeNative(hash, ...args); }
  invokeFloat(hash, ...args) { return Citizen.invokeNative(hash, Citizen.resultAsFloat(), ...args); }
  invokeString(hash, ...args) { return Citizen.invokeNative(hash, Citizen.resultAsString(), ...args); }
  invokeVector3(hash, ...args) {
    const r = Citizen.invokeNative(hash, Citizen.resultAsVector(), ...args);
    return r ? toVec3(r) : new Vector3(0, 0, 0);
  }

  joaat(text) {
    if (Array.isArray(text)) return text.map((t) => GetHashKey(t));
    return GetHashKey(text);
  }

  wait(ms) { Wait(ms); }
  waitAsync(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
  waitForAsync(callback, timeout) {
    return new Promise((resolve) => {
      const start = GetGameTimer();
      const check = () => {
        if (callback()) { resolve(true); return; }
        if (GetGameTimer() - start >= timeout) { resolve(false); return; }
        setTimeout(check, 0);
      };
      check();
    });
  }
  allocateString(_str) { return 0; }
}
