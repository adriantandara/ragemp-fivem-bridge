import { createUnkProxy, toVec3 } from "./_helpers.js";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GameObjectNs {
  unk = createUnkProxy();

  create(modelHash: number, x: number, y: number, z: number, dynamic: boolean, isNetwork: boolean, bScriptHostObj: boolean): number {
    return CreateObject(modelHash, x, y, z, isNetwork ?? true, dynamic ?? true, bScriptHostObj ?? false);
  }
  delete(object: number): void { DeleteObject(object); }
  placeOnGroundProperly(object: number): boolean { return PlaceObjectOnGroundProperly(object); }
  doorControl(doorHash: number, x: number, y: number, z: number, locked: boolean, xRotMult: number, yRotMult: number, zRotMult: number): void {
    DoorControl(doorHash, x, y, z, !!locked, xRotMult ?? 0.0, yRotMult ?? 0.0, zRotMult ?? 0.0);
  }

  createNoOffset(modelHash: number, x: number, y: number, z: number, isNetwork: boolean, bScriptHostObj: boolean, dynamic: boolean): number {
    return CreateObjectNoOffset(modelHash, x, y, z, isNetwork, bScriptHostObj, dynamic);
  }
  getClosestObjectOfType(x: number, y: number, z: number, radius: number, modelHash: number, isMission: boolean, p6: boolean, p7: boolean): number { return GetClosestObjectOfType(x, y, z, radius, modelHash, isMission, p6, p7); }
  hasClosestObjectOfTypeBeenBroken(p0: number, p1: number, p2: number, p3: number, modelHash: number, p5: number): boolean { return HasClosestObjectOfTypeBeenBroken(p0, p1, p2, p3, modelHash, p5); }
  doesObjectOfTypeExistAtCoords(x: number, y: number, z: number, radius: number, hash: number, p5: boolean): boolean { return DoesObjectOfTypeExistAtCoords(x, y, z, radius, hash, p5); }
  getObjectFragmentDamageHealth(p0: number, p1: boolean): number { return GetObjectFragmentDamageHealth(p0, p1); }
  isAnyObjectNearPoint(x: number, y: number, z: number, range: number, p4: boolean): boolean { return IsAnyObjectNearPoint(x, y, z, range, p4); }
  isObjectNearPoint(objectHash: number, x: number, y: number, z: number, range: number): boolean { return IsObjectNearPoint(objectHash, x, y, z, range); }
  trackObjectVisibility(object: number): void { TrackObjectVisibility(object); }
  doesPickupObjectExist(pickupObject: number): boolean { return DoesPickupObjectExist(pickupObject); }
  setTeamPickupObject(object: number, p1: number, p2: boolean): void { SetTeamPickupObject(object, p1, p2); }
  setForceObjectThisFrame(x: number, y: number, z: number, p3: number): void { SetForceObjectThisFrame(x, y, z, p3); }
  slide(object: number, toX: number, toY: number, toZ: number, speedX: number, speedY: number, speedZ: number, collision: boolean): boolean { return SlideObject(object, toX, toY, toZ, speedX, speedY, speedZ, collision); }
  setTargettable(object: number, targettable: boolean): void { SetObjectTargettable(object, targettable); }
  hasBeenBroken(object: number): boolean { return HasObjectBeenBroken(object); }
  setStateOfClosestDoorOfType(type: number, x: number, y: number, z: number, locked: boolean, heading: number, p6: boolean): void { SetStateOfClosestDoorOfType(type, x, y, z, locked, heading, p6); }
  getStateOfClosestDoorOfType(type: number, x: number, y: number, z: number): { locked: boolean; heading: number } { const r = GetStateOfClosestDoorOfType(type, x, y, z); return { locked: !!r[0], heading: r[1] }; }
  addDoorToSystem(doorHash: number, modelHash: number, x: number, y: number, z: number, p5: boolean, scriptDoor: boolean, isLocal: boolean): void { AddDoorToSystem(doorHash, modelHash, x, y, z, p5, scriptDoor, isLocal); }
  removeDoorFromSystem(doorHash: number): void { RemoveDoorFromSystem(doorHash); }
  doorSystemSetDoorState(doorHash: number, state: number, requestDoor: boolean, forceUpdate: boolean): void { DoorSystemSetDoorState(doorHash, state, requestDoor, forceUpdate); }
  doorSystemGetDoorState(doorHash: number): number { return DoorSystemGetDoorState(doorHash); }
  doorSystemGetDoorPendingState(doorHash: number): number { return DoorSystemGetDoorPendingState(doorHash); }
  doorSystemSetAutomaticRate(doorHash: number, rate: number, requestDoor: boolean, forceUpdate: boolean): void { DoorSystemSetAutomaticRate(doorHash, rate, requestDoor, forceUpdate); }
  doorSystemSetAutomaticDistance(doorHash: number, distance: number, requestDoor: boolean, forceUpdate: boolean): void { DoorSystemSetAutomaticDistance(doorHash, distance, requestDoor, forceUpdate); }
  doorSystemSetOpenRatio(doorHash: number, ajar: number, requestDoor: boolean, forceUpdate: boolean): void { DoorSystemSetOpenRatio(doorHash, ajar, requestDoor, forceUpdate); }
  doorSystemGetOpenRatio(doorHash: number): number { return DoorSystemGetOpenRatio(doorHash); }
  doorSystemSetSpringRemoved(doorHash: number, removed: boolean, requestDoor: boolean, forceUpdate: boolean): void { DoorSystemSetSpringRemoved(doorHash, removed, requestDoor, forceUpdate); }
  doorSystemSetHoldOpen(doorHash: number, toggle: boolean): void { DoorSystemSetHoldOpen(doorHash, toggle); }
  isDoorRegisteredWithSystem(doorHash: number): boolean { return IsDoorRegisteredWithSystem(doorHash); }
  isDoorClosed(doorHash: number): boolean { return IsDoorClosed(doorHash); }
  doorSystemGetIsPhysicsLoaded(p0: number): boolean { return DoorSystemGetIsPhysicsLoaded(p0); }
  doorSystemFindExistingDoor(x: number, y: number, z: number, modelHash: number): number { const [, hash] = DoorSystemFindExistingDoor(x, y, z, modelHash); return hash; }
  doorSystemGetAutomaticDistance(doorHash: number): number { return DoorSystemGetAutomaticDistance(doorHash); }
  isGarageEmpty(garageHash: number, p1: boolean, p2: number): boolean { return IsGarageEmpty(garageHash, p1, p2); }
  isPlayerEntirelyInsideGarage(garageHash: number, player: number, p2: number, p3: number): boolean { return IsPlayerEntirelyInsideGarage(garageHash, player, p2, p3); }
  isPlayerPartiallyInsideGarage(garageHash: number, player: number, p2: number): boolean { return IsPlayerPartiallyInsideGarage(garageHash, player, p2); }
  areEntitiesEntirelyInsideGarage(garageHash: number, p1: boolean, p2: boolean, p3: boolean, p4: number): boolean { return AreEntitiesEntirelyInsideGarage(garageHash, p1, p2, p3, p4); }
  isAnyEntityEntirelyInsideGarage(garageHash: number, p1: boolean, p2: boolean, p3: boolean, p4: number): boolean { return IsAnyEntityEntirelyInsideGarage(garageHash, p1, p2, p3, p4); }
  isEntirelyInsideGarage(garageHash: number, entity: number, p2: number, p3: number): boolean { return IsObjectEntirelyInsideGarage(garageHash, entity, p2, p3); }
  isPartiallyInsideGarage(garageHash: number, entity: number, p2: number): boolean { return IsObjectPartiallyInsideGarage(garageHash, entity, p2); }
  enableSavingInGarage(garageHash: number, toggle: boolean): void { EnableSavingInGarage(garageHash, toggle); }
  clearObjectsInsideGarage(garage: number, vehicles: boolean, peds: boolean, objects: boolean, broadcast?: boolean): void { ClearObjectsInsideGarage(garage, vehicles, peds, objects, broadcast ?? false); }
  doesOfTypeExistAtCoords(x: number, y: number, z: number, radius: number, hash: number, p5: boolean): boolean { return DoesObjectOfTypeExistAtCoords(x, y, z, radius, hash, p5); }
  setAllowLowLodBuoyancy(object: number, toggle: boolean): void { SetObjectAllowLowLodBuoyancy(object, toggle); }
  getFragmentDamageHealth(p0: number, p1: boolean): number { return GetObjectFragmentDamageHealth(p0, p1); }
  isNearPoint(objectHash: number, x: number, y: number, z: number, range: number): boolean { return IsObjectNearPoint(objectHash, x, y, z, range); }
  removeHighDetailModel(object: number): void { RemoveObjectHighDetailModel(object); }
  breakFragmentChild(p0: number, p1: number, p2: boolean): void { BreakObjectFragmentChild(p0, p1, p2); }
  trackVisibility(object: number): void { TrackObjectVisibility(object); }
  isVisible(object: number): boolean { return IsEntityVisible(object); }
  getRayfireMap(x: number, y: number, z: number, radius: number, name: string): number { return GetRayfireMapObject(x, y, z, radius, name); }
  setStateOfRayfireMap(object: number, state: number): void { SetStateOfRayfireMapObject(object, state); }
  getStateOfRayfireMap(object: number): number { return GetStateOfRayfireMapObject(object); }
  setForceVehiclesToAvoid(object: number, enable: boolean): void { SetObjectForceVehiclesToAvoid(object, enable); }

  createPickup(pickupHash: number, posX: number, posY: number, posZ: number, p4: number, value: number, p6: boolean, modelHash: number): number { return CreatePickup(pickupHash, posX, posY, posZ, p4, value, p6, modelHash); }
  createPortablePickup(pickupHash: number, x: number, y: number, z: number, placeOnGround: boolean, modelHash: number): number { return CreatePortablePickup(pickupHash, x, y, z, placeOnGround, modelHash); }
  createNonNetworkedAmbientPickup(type: number, x: number, y: number, z: number, flags?: number, amount?: number, customModel?: number, scriptedObject?: boolean, hostObject?: boolean): number {
    return CreateNonNetworkedAmbientPickup(type, x, y, z, flags ?? 0, amount ?? 0, customModel ?? 0, scriptedObject ?? false, hostObject ?? false);
  }
  createNonNetworkedPortablePickup(type: number, x: number, y: number, z: number, snaptoGround?: boolean, customModel?: number): number {
    return CreateNonNetworkedPortablePickup(type, x, y, z, snaptoGround ?? false, customModel ?? 0);
  }
  attachPortablePickupToPed(pickupObject: number, ped: number): void { AttachPortablePickupToPed(pickupObject, ped); }
  detachPortablePickupFromPed(pickupObject: number): void { DetachPortablePickupFromPed(pickupObject); }
  setMaxNumPortablePickupsCarriedByPlayer(modelHash: number, p1: number): void { SetMaxNumPortablePickupsCarriedByPlayer(modelHash, p1); }
  setLocalPlayerCanCollectPortablePickups(p0: boolean): void { SetLocalPlayerCanCollectPortablePickups(p0); }
  getSafePickupCoords(x: number, y: number, z: number, p3: number, p4: number): Vector3 { return toVec3(GetSafePickupCoords(x, y, z, p3, p4)); }
  getPickupCoords(pickup: number): Vector3 { return toVec3(GetPickupCoords(pickup)); }
  removeAllPickupsOfType(pickupHash: number): void { RemoveAllPickupsOfType(pickupHash); }
  hasPickupBeenCollected(pickup: number): boolean { return HasPickupBeenCollected(pickup); }
  removePickup(pickup: number): void { RemovePickup(pickup); }
  createMoneyPickups(x: number, y: number, z: number, value: number, amount: number, model: number): void { CreateMoneyPickups(x, y, z, value, amount, model); }
  doesPickupExist(pickup: number): boolean { return DoesPickupExist(pickup); }
  getPickup(pickup: number): number { return GetPickupObject(pickup); }
  isAPortablePickup(object: number): boolean { return IsObjectAPortablePickup(object); }
  isAPickup(object: number): boolean { return IsObjectAPickup(object); }
  doesPickupOfTypeExistInArea(pickupHash: number, x: number, y: number, z: number, radius: number): boolean { return DoesPickupOfTypeExistInArea(pickupHash, x, y, z, radius); }
  setPickupRegenerationTime(pickup: number, duration: number): void { SetPickupRegenerationTime(pickup, duration); }
  forcePickupRegenerate(p0: number): void { ForcePickupRegenerate(p0); }
  setTeamPickup(object: number, p1: number, p2: boolean): void { SetTeamPickupObject(object, p1, p2); }
  preventCollectionOfPortablePickup(object: number, p1: boolean, p2: boolean): void { PreventCollectionOfPortablePickup(object, p1, p2); }
  setPickupGenerationRangeMultiplier(multiplier: number): void { SetPickupGenerationRangeMultiplier(multiplier); }
  getPickupGenerationRangeMultiplier(): number { return GetPickupGenerationRangeMultiplier(); }
  setPickupUncollectable(p0: number, p1: number): void { SetPickupUncollectable(p0, p1); }
  setPickupHiddenWhenUncollectable(p0: number, p1: number): void { SetPickupHiddenWhenUncollectable(p0, p1); }
  renderFakePickupGlow(x: number, y: number, z: number, colorIndex: number): void { RenderFakePickupGlow(x, y, z, colorIndex); }
  getWeaponTypeFromPickupType(pickupHash: number): number { return GetWeaponTypeFromPickupType(pickupHash); }

  createObject(modelHash: number, x: number, y: number, z: number, isNetwork: boolean, bScriptHostObj: boolean, dynamic: boolean): number { return CreateObject(modelHash, x, y, z, isNetwork, bScriptHostObj, dynamic); }
  createObjectNoOffset(modelHash: number, x: number, y: number, z: number, isNetwork: boolean, bScriptHostObj: boolean, dynamic: boolean): number { return CreateObjectNoOffset(modelHash, x, y, z, isNetwork, bScriptHostObj, dynamic); }
  deleteObject(object: number): void { DeleteObject(object); }
  getClosestOfType(x: number, y: number, z: number, radius: number, modelHash: number, isMission: boolean, p6: boolean, p7: boolean): number { return GetClosestObjectOfType(x, y, z, radius, modelHash, isMission, p6, p7); }
  hasClosestOfTypeBeenBroken(p0: number, p1: number, p2: number, p3: number, modelHash: number, p5: number): boolean { return HasClosestObjectOfTypeBeenBroken(p0, p1, p2, p3, modelHash, p5); }
  hasClosestOfTypeBeenCompletelyDestroyed(x: number, y: number, z: number, radius: number, modelHash: number, p5: boolean): boolean { return HasClosestObjectOfTypeBeenCompletelyDestroyed(x, y, z, radius, modelHash, p5); }
  getObjectOffsetFromCoords(xPos: number, yPos: number, zPos: number, heading: number, xOffset: number, yOffset: number, zOffset: number): Vector3 { return toVec3(GetObjectOffsetFromCoords(xPos, yPos, zPos, heading, xOffset, yOffset, zOffset)); } // unverified
  getOffsetFromCoords(xPos: number, yPos: number, zPos: number, heading: number, xOffset: number, yOffset: number, zOffset: number): Vector3 { return toVec3(GetObjectOffsetFromCoords(xPos, yPos, zPos, heading, xOffset, yOffset, zOffset)); } // unverified
  getCoordsAndRotationOfClosestOfType(x: number, y: number, z: number, radius: number, modelHash: number, rotationOrder: number): { result: number; outPosition: Vector3; outRotation: Vector3 } {
    const r = GetCoordsAndRotationOfClosestObjectOfType(x, y, z, radius, modelHash, rotationOrder);
    return { result: r[0], outPosition: toVec3(r[1]), outRotation: toVec3(r[2]) };
  }
  placeOnGroundProperly2(object: number): boolean { return PlaceObjectOnGroundOrObjectProperly(object); }
  doesDoorExist(doorHash: number): boolean { return DoesDoorExist(doorHash); } // unverified
  setDoorAccelerationLimit(doorHash: number, state: number, requestDoor: boolean, forceUpdate: boolean): void { SetDoorAccelerationLimit(doorHash, state, requestDoor, forceUpdate); } // unverified
  setDoorAjarAngle(doorHash: number, ajar: number, requestDoor: boolean, forceUpdate: boolean): void { SetDoorAjarAngle(doorHash, ajar, requestDoor, forceUpdate); } // unverified
  highlightPlacementCoords(x: number, y: number, z: number, colorIndex: number): void { HighlightPlacementCoords(x, y, z, colorIndex); } // unverified
  clearGarageArea(garageHash: number, isNetwork: boolean): void { ClearGarageArea(garageHash, isNetwork); } // unverified
  isPointInAngledArea(xPos: number, yPos: number, zPos: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, width: number, debug: boolean, includeZ: boolean): boolean { return IsPointInAngledArea(xPos, yPos, zPos, x1, y1, z1, x2, y2, z2, width, !!debug, !!includeZ); }
  setPhysicsParams(object: number, weight: number, p2: number, p3: number, p4: number, p5: number, gravity: number, p7: number, p8: number, p9: number, p10: number, buoyancy: number): void { SetObjectPhysicsParams(object, weight, p2, p3, p4, p5, gravity, p7, p8, p9, p10, buoyancy); }
  setActivatePhysicsAsSoonAsItIsUnfrozen(object: number, toggle: boolean): void { SetActivateObjectPhysicsAsSoonAsItIsUnfrozen(object, toggle); }
  isAnyNearPoint(x: number, y: number, z: number, range: number, p4: boolean): boolean { return IsAnyObjectNearPoint(x, y, z, range, p4); }
  setUnkGlobalBoolRelatedToDamage(value: boolean): void { SetUnkGlobalBoolRelatedToDamage(value); } // unverified
  setCreateWeaponLightSource(object: number, toggle: boolean): void { SetCreateWeaponLightSource(object, toggle); } // unverified
  setSomething(object: number, p1: boolean): void { SetObjectSomething(object, p1); } // unverified
  doesRayfireMapExist(object: number): boolean { return DoesRayfireMapObjectExist(object); }
  getRayfireMapAnimPhase(object: number): number { return GetRayfireMapObjectAnimPhase(object); }
  createPickupRotate(pickupHash: number, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, flag: number, amount: number, p9: number, p10: boolean, modelHash: number): number { return CreatePickupRotate(pickupHash, posX, posY, posZ, rotX, rotY, rotZ, flag, amount, p9, p10, modelHash); }
  createAmbientPickup(pickupHash: number, posX: number, posY: number, posZ: number, flags: number, value: number, modelHash: number, p7: boolean, p8: boolean): number { return CreateAmbientPickup(pickupHash, posX, posY, posZ, flags, value, modelHash, p7, p8); }
  createPortablePickup2(pickupHash: number, x: number, y: number, z: number, placeOnGround: boolean, modelHash: number): number { return CreatePortablePickup2(pickupHash, x, y, z, placeOnGround, modelHash); } // unverified
  hidePickup(pickupObject: number, toggle: boolean): void { HidePickup(pickupObject, toggle); } // unverified
  getPickupHash(pickupHash: number): number { return GetPickupHash(pickupHash); } // unverified
  getPickupHashFromWeapon(weaponHash: number): number { return GetPickupHashFromWeapon(weaponHash); } // unverified
  isPickupWeaponValid(object: number): boolean { return IsPickupWeaponObjectValid(object); }
  isPickupWithinRadius(pickupHash: number, x: number, y: number, z: number, radius: number): boolean { return IsPickupWithinRadius(pickupHash, x, y, z, radius); } // unverified
  toggleUsePickupsForPlayer(player: number, pickupHash: number, toggle: boolean): void { ToggleUsePickupsForPlayer(player, pickupHash, toggle); } // unverified
  setLocalPlayerCanUsePickupsWithThisModel(modelHash: number, toggle: boolean): void { SetLocalPlayerCanUsePickupsWithThisModel(modelHash, toggle); } // unverified
  getTextureVariation(object: number): number { return GetObjectTintIndex(object); }
  setTextureVariation(object: number, textureVariation: number): void { SetObjectTintIndex(object, textureVariation); }
  setTextureVariationOfClosestOfType(x: number, y: number, z: number, radius: number, modelHash: number, textureVariation: number): boolean { return SetObjectTextureVariationOfClosestObjectOfType(x, y, z, radius, modelHash, textureVariation); } // unverified
  setLightColor(object: number, p1: boolean, r: number, g: number, b: number): number { return SetPropLightColor(object, !!p1, r, g, b); }
  setStuntPropSpeedup(object: number, p1: number): void { SetObjectStuntPropSpeedup(object, p1); } // unverified
  setStuntPropDuration(object: number, duration: number): void { SetObjectStuntPropDuration(object, duration); } // unverified
  setForceThisFrame(x: number, y: number, z: number, p3: number): void { SetForceObjectThisFrame(x, y, z, p3); }
  markForDeletion(object: number): void { MarkObjectForDeletion(object); } // unverified
  setEnableArenaPropPhysics(object: number, toggle: boolean, p2: number): void { SetEnableArenaPropPhysics(object, toggle, p2); } // unverified
  setEnableArenaPropPhysicsOnPed(object: number, toggle: boolean, p2: number, ped: number): void { SetEnableArenaPropPhysicsOnPed(object, toggle, p2, ped); } // unverified
  getIsArenaPropPhysicsDisabled(object: number, p1: number): boolean { return GetIsArenaPropPhysicsDisabled(object, p1); } // unverified
  getAllInRange(position: Vector3, range?: number, includeDistance?: boolean, sortByDistance?: boolean): [number, Vector3, Vector3, number?][] | undefined { return GetObjectAllInRange(position, range, includeDistance, sortByDistance); } // unverified
  getAllByHash(hash: number): Vector3[] { return GetObjectAllByHash(hash); } // unverified
  createGlowStyle(freq: number, minIntensity: number, maxIntensity: number): number { return CreateGlowStyle(freq, minIntensity, maxIntensity); } // unverified
  releaseGlowStyle(glowStyle: number): void { ReleaseGlowStyle(glowStyle); } // unverified
  modifyGlowStyle(glowStyle: number, freq: number, minIntensity: number, maxIntensity: number): void { ModifyGlowStyle(glowStyle, freq, minIntensity, maxIntensity); } // unverified
  enableGlow(handle: number, glowStyle: number): void { EnableGlow(handle, glowStyle); } // unverified
  disableGlow(handle: number): void { DisableGlow(handle); } // unverified

  ["_0xAFE24E4D29249E4A"](...args: any[]): any { return Citizen.invokeNative("0xAFE24E4D29249E4A", ...args); }
  ["_0x2542269291C6AC84"](...args: any[]): any { return Citizen.invokeNative("0x2542269291C6AC84", ...args); }
  ["_0x006E4B040ED37EC3"](...args: any[]): any { return Citizen.invokeNative("0x006E4B040ED37EC3", ...args); }
  ["_0xE851471AEFC3374F"](...args: any[]): any { return Citizen.invokeNative("0xE851471AEFC3374F", ...args); }
  ["_0xA85A21582451E951"](...args: any[]): any { return Citizen.invokeNative("0xA85A21582451E951", ...args); }
  ["_0xC7F29CA00F46350E"](...args: any[]): any { return Citizen.invokeNative("0xC7F29CA00F46350E", ...args); }
  ["_0x701FDA1E82076BA4"](...args: any[]): any { return Citizen.invokeNative("0x701FDA1E82076BA4", ...args); }
  ["_0x190428512B240692"](...args: any[]): any { return Citizen.invokeNative("0x190428512B240692", ...args); }
  ["_0x659F9D71F52843F8"](...args: any[]): any { return Citizen.invokeNative("0x659F9D71F52843F8", ...args); }
  ["_0x66A49D021870FE88"](...args: any[]): any { return Citizen.invokeNative("0x66A49D021870FE88", ...args); }
  ["_0xE05F6AEEFEB0BB02"](...args: any[]): any { return Citizen.invokeNative("0xE05F6AEEFEB0BB02", ...args); }
  ["_0xF9C1681347C8BD15"](...args: any[]): any { return Citizen.invokeNative("0xF9C1681347C8BD15", ...args); }
  ["_0xC6033D32241F6FB5"](...args: any[]): any { return Citizen.invokeNative("0xC6033D32241F6FB5", ...args); }
  ["_0xEB6F1A9B5510A5D2"](...args: any[]): any { return Citizen.invokeNative("0xEB6F1A9B5510A5D2", ...args); }
  ["_0x394CD08E31313C28"](...args: any[]): any { return Citizen.invokeNative("0x394CD08E31313C28", ...args); }
  ["_0x826D1EE4D1CAFC78"](...args: any[]): any { return Citizen.invokeNative("0x826D1EE4D1CAFC78", ...args); }
  ["_0x1E3F1B1B891A2AAA"](...args: any[]): any { return Citizen.invokeNative("0x1E3F1B1B891A2AAA", ...args); }
  ["_0xD4A7A435B3710D05"](...args: any[]): any { return Citizen.invokeNative("0xD4A7A435B3710D05", ...args); }
  ["_0xB7C6D80FB371659A"](...args: any[]): any { return Citizen.invokeNative("0xB7C6D80FB371659A", ...args); }
  ["_0x8DCA505A5C196F05"](...args: any[]): any { return Citizen.invokeNative("0x8DCA505A5C196F05", ...args); }
  ["_0xFDC07C58E8AAB715"](...args: any[]): any { return Citizen.invokeNative("0xFDC07C58E8AAB715", ...args); }
  ["_0x0596843B34B95CE5"](...args: any[]): any { return Citizen.invokeNative("0x0596843B34B95CE5", ...args); }
  ["_0xA08FE5E49BDC39DD"](...args: any[]): any { return Citizen.invokeNative("0xA08FE5E49BDC39DD", ...args); }
  ["_0x62454A641B41F3C5"](...args: any[]): any { return Citizen.invokeNative("0x62454A641B41F3C5", ...args); }
  ["_0x39A5FB7EAF150840"](...args: any[]): any { return Citizen.invokeNative("0x39A5FB7EAF150840", ...args); }
  ["_0xDB41D07A45A6D4B7"](...args: any[]): any { return Citizen.invokeNative("0xDB41D07A45A6D4B7", ...args); }
  ["_0x31F924B53EADDF65"](...args: any[]): any { return Citizen.invokeNative("0x31F924B53EADDF65", ...args); }
  ["_0x858EC9FD25DE04AA"](...args: any[]): any { return Citizen.invokeNative("0x858EC9FD25DE04AA", ...args); }
  ["_0x8881C98A31117998"](...args: any[]): any { return Citizen.invokeNative("0x8881C98A31117998", ...args); }
  ["_0x8CFF648FBD7330F1"](...args: any[]): any { return Citizen.invokeNative("0x8CFF648FBD7330F1", ...args); }
  ["_0x46F3ADD1E2D5BAF2"](...args: any[]): any { return Citizen.invokeNative("0x46F3ADD1E2D5BAF2", ...args); }
  ["_0x641F272B52E2F0F8"](...args: any[]): any { return Citizen.invokeNative("0x641F272B52E2F0F8", ...args); }
  ["_0x4C134B4DF76025D0"](...args: any[]): any { return Citizen.invokeNative("0x4C134B4DF76025D0", ...args); }
  ["_0xAA059C615DE9DD03"](...args: any[]): any { return Citizen.invokeNative("0xAA059C615DE9DD03", ...args); }
  ["_0xF92099527DB8E2A7"](...args: any[]): any { return Citizen.invokeNative("0xF92099527DB8E2A7", ...args); }
  ["_0xA2C1F5E92AFE49ED"](...args: any[]): any { return Citizen.invokeNative("0xA2C1F5E92AFE49ED", ...args); }
  ["_0x762DB2D380B48D04"](...args: any[]): any { return Citizen.invokeNative("0x762DB2D380B48D04", ...args); }
  ["_0x7813E8B8C4AE4799"](...args: any[]): any { return Citizen.invokeNative("0x7813E8B8C4AE4799", ...args); }
  ["_0xBFFE53AE7E67FCDC"](...args: any[]): any { return Citizen.invokeNative("0xBFFE53AE7E67FCDC", ...args); }
  ["_0xD05A3241B9A86F19"](...args: any[]): any { return Citizen.invokeNative("0xD05A3241B9A86F19", ...args); }
  ["_0xB2D0BDE54F0E8E5A"](...args: any[]): any { return Citizen.invokeNative("0xB2D0BDE54F0E8E5A", ...args); }
  ["_0x31574B1B41268673"](...args: any[]): any { return Citizen.invokeNative("0x31574B1B41268673", ...args); }
  ["_0xADF084FB8F075D06"](...args: any[]): any { return Citizen.invokeNative("0xADF084FB8F075D06", ...args); }
  ["_0x3B2FD68DB5F8331C"](...args: any[]): any { return Citizen.invokeNative("0x3B2FD68DB5F8331C", ...args); }
  ["_0x8CAAB2BD3EA58BD4"](...args: any[]): any { return Citizen.invokeNative("0x8CAAB2BD3EA58BD4", ...args); }
  ["_0x63ECF581BC70E363"](...args: any[]): any { return Citizen.invokeNative("0x63ECF581BC70E363", ...args); }
  ["_0x734E1714D077DA9A"](...args: any[]): any { return Citizen.invokeNative("0x734E1714D077DA9A", ...args); }
  ["_0x1A6CBB06E2D0D79D"](...args: any[]): any { return Citizen.invokeNative("0x1A6CBB06E2D0D79D", ...args); }
  ["_0x3BD770D281982DB5"](...args: any[]): any { return Citizen.invokeNative("0x3BD770D281982DB5", ...args); }
  ["_0x1C57C94A6446492A"](...args: any[]): any { return Citizen.invokeNative("0x1C57C94A6446492A", ...args); }
  ["_0xB5B7742424BD4445"](...args: any[]): any { return Citizen.invokeNative("0xB5B7742424BD4445", ...args); }
}
