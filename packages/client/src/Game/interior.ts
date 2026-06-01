import { createUnkProxy, toVec3 } from "./_helpers.js";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GameInteriorNs {
  unk = createUnkProxy();

  getInteriorAtCoords(x: number, y: number, z: number): number { return GetInteriorAtCoords(x, y, z); }
  getInteriorAtCoordsWithType(x: number, y: number, z: number, interiorType: string): number { return GetInteriorAtCoordsWithType(x, y, z, interiorType); }
  enableInteriorProp(interiorId: number, propName: string): void { EnableInteriorProp(interiorId, propName); }
  disableInteriorProp(interiorId: number, propName: string): void { DisableInteriorProp(interiorId, propName); }
  isInteriorPropEnabled(interiorId: number, propName: string): boolean { return IsInteriorPropEnabled(interiorId, propName); }
  refreshInterior(interiorId: number): void { RefreshInterior(interiorId); }
  isValidInterior(interiorId: number): boolean { return IsValidInterior(interiorId); }

  getInteriorGroupId(interior: number): number { return GetInteriorGroupId(interior); }
  getOffsetFromInteriorInWorldCoords(interior: number, x: number, y: number, z: number): Vector3 { return toVec3(GetOffsetFromInteriorInWorldCoords(interior, x, y, z)); }
  addPickupToInteriorRoomByName(pickup: number, roomName: string): void { AddPickupToInteriorRoomByName(pickup, roomName); }
  unpinInterior(interior: number): void { UnpinInterior(interior); }
  isInteriorReady(interior: number): boolean { return IsInteriorReady(interior); }
  getInteriorFromCollision(x: number, y: number, z: number): number { return GetInteriorFromCollision(x, y, z); }
  disableInterior(interior: number, toggle: boolean): void { DisableInterior(interior, toggle); }
  isInteriorDisabled(interior: number): boolean { return IsInteriorDisabled(interior); }
  capInterior(interior: number, toggle: boolean): void { CapInterior(interior, toggle); }
  isInteriorCapped(interior: number): boolean { return IsInteriorCapped(interior); }
  getHeading(interior: number): number { return GetInteriorHeading(interior); }
  getGroupId(interior: number): number { return GetInteriorGroupId(interior); }
  isScene(): boolean { return IsInteriorScene(); }
  isValid(interior: number): boolean { return IsValidInterior(interior); }
  clearRoomForEntity(entity: number): void { ClearRoomForEntity(entity); }
  forceRoomForEntity(entity: number, interior: number, roomHashKey: number): void { ForceRoomForEntity(entity, interior, roomHashKey); }
  getRoomKeyFromEntity(entity: number): number { return GetRoomKeyFromEntity(entity); }
  getKeyForEntityInRoom(entity: number): number { return GetKeyForEntityInRoom(entity); }
  getFromEntity(entity: number): number { return GetInteriorFromEntity(entity); }
  forceRoomForGameViewport(interiorID: number, roomHashKey: number): void { ForceRoomForGameViewport(interiorID, roomHashKey); }
  getRoomKeyForGameViewport(): number { return GetRoomKeyForGameViewport(); }
  clearRoomForGameViewport(): void { ClearRoomForGameViewport(); }
  getAtCoords(x: number, y: number, z: number): number { return GetInteriorAtCoords(x, y, z); }
  pinInMemory(interior: number): void { PinInteriorInMemory(interior); }
  unpin(interior: number): void { UnpinInterior(interior); }
  isReady(interior: number): boolean { return IsInteriorReady(interior); }
  getAtCoordsWithType(x: number, y: number, z: number, interiorType: string): number { return GetInteriorAtCoordsWithType(x, y, z, interiorType); }
  getAtCoordsWithTypehash(x: number, y: number, z: number, typeHash: number): number { return GetInteriorAtCoordsWithTypehash(x, y, z, typeHash); }
  isCollisionMarkedOutside(x: number, y: number, z: number): boolean { return IsCollisionMarkedOutside(x, y, z); }
  getFromCollision(x: number, y: number, z: number): number { return GetInteriorFromCollision(x, y, z); }
  activateEntitySet(interior: number, entitySetName: string): void { ActivateInteriorEntitySet(interior, entitySetName); }
  deactivateEntitySet(interior: number, entitySetName: string): void { DeactivateInteriorEntitySet(interior, entitySetName); }
  isEntitySetActive(interior: number, entitySetName: string): boolean { return IsInteriorEntitySetActive(interior, entitySetName); }
  refresh(interior: number): void { RefreshInterior(interior); }
  enableExteriorCullModelThisFrame(mapObjectHash: number): void { EnableExteriorCullModelThisFrame(mapObjectHash); }
  disable(interior: number, toggle: boolean): void { DisableInterior(interior, toggle); }
  isDisabled(interior: number): boolean { return IsInteriorDisabled(interior); }
  cap(interior: number, toggle: boolean): void { CapInterior(interior, toggle); }
  isCapped(interior: number): boolean { return IsInteriorCapped(interior); }

  unkGetInteriorAtCoords(x: number, y: number, z: number, typeHash: number): number { return GetInteriorAtCoordsWithTypehash(x, y, z, typeHash); }
  areCoordsCollidingWithExterior(x: number, y: number, z: number): boolean { return IsCollisionMarkedOutside(x, y, z); }
  hideMapObjectThisFrame(mapObjectHash: number): void { EnableExteriorCullModelThisFrame(mapObjectHash); }
  getInfo(interior: number): { position: Vector3; nameHash: number } { const r: any = GetInteriorLocationAndNamehash(interior); return { position: toVec3(Array.isArray(r) && Array.isArray(r[0]) ? r[0] : r), nameHash: Array.isArray(r) ? r[r.length - 1] : 0 }; }
  getOffsetFromInWorldCoords(interior: number, x: number, y: number, z: number): Vector3 { return toVec3(GetOffsetFromInteriorInWorldCoords(interior, x, y, z)); }
  clearForEntity(entity: number): void { ClearRoomForEntity(entity); }
  getFromGameplayCam(): number { return GetInteriorFromPrimaryView(); }
  addPickupToRoomByName(pickup: number, roomName: string): void { AddPickupToInteriorRoomByName(pickup, roomName); }
  setEntitySetColor(interior: number, entitySetName: string, color: number): void { SetInteriorEntitySetColor(interior, entitySetName, color); } // unverified
  enableScriptCullModelThisFrame(mapObjectHash: number): void { EnableScriptCullModelThisFrame(mapObjectHash); } // unverified

  ["_0x82EBB79E258FA2B7"](...args: any[]): any { return Citizen.invokeNative("0x82EBB79E258FA2B7", ...args); }
  ["_0x38C1CB1CB119A016"](...args: any[]): any { return Citizen.invokeNative("0x38C1CB1CB119A016", ...args); }
  ["_0xAF348AFCB575A441"](...args: any[]): any { return Citizen.invokeNative("0xAF348AFCB575A441", ...args); }
  ["_0x405DC2AEF6AF95B9"](...args: any[]): any { return Citizen.invokeNative("0x405DC2AEF6AF95B9", ...args); }
  ["_0x4C2330E61D3DEB56"](...args: any[]): any { return Citizen.invokeNative("0x4C2330E61D3DEB56", ...args); }
  ["_0x483ACA1176CA93F1"](...args: any[]): any { return Citizen.invokeNative("0x483ACA1176CA93F1", ...args); }
  ["_0x7ECDF98587E92DEC"](...args: any[]): any { return Citizen.invokeNative("0x7ECDF98587E92DEC", ...args); }
  ["_0x9E6542F0CE8E70A3"](...args: any[]): any { return Citizen.invokeNative("0x9E6542F0CE8E70A3", ...args); }
  ["_0x7241CCB7D020DB69"](...args: any[]): any { return Citizen.invokeNative("0x7241CCB7D020DB69", ...args); }
}
