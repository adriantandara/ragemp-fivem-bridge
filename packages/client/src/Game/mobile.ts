import { createUnkProxy, toVec3 } from "./_helpers.js";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GameMobileNs {
  unk = createUnkProxy();

  createMobilePhone(phoneType: number): void { return CreateMobilePhone(phoneType ?? 0); }
  setMobilePhoneScale(scale: number): void { SetMobilePhoneScale(scale); }
  setMobilePhoneRotation(rotX: number, rotY: number, rotZ: number, p3: number): void { SetMobilePhoneRotation(rotX, rotY, rotZ, (p3 ?? false) as number); }
  setMobilePhonePosition(offsetX: number, offsetY: number, offsetZ: number): void { SetMobilePhonePosition(offsetX, offsetY, offsetZ); }

  getMobilePhoneRotation(p1: number): Vector3 { return toVec3(GetMobilePhoneRotation(p1)); }
  getMobilePhonePosition(): Vector3 { return toVec3(GetMobilePhonePosition()); }
  scriptIsMovingMobilePhoneOffscreen(toggle: boolean): void { ScriptIsMovingMobilePhoneOffscreen(!!toggle); }
  getMobilePhoneRenderId(): number { return (GetMobilePhoneRenderId as any)(); }
  createPhone(phoneType: number): void { CreateMobilePhone(phoneType); }
  destroyPhone(): void { DestroyMobilePhone(); }
  setPhoneScale(scale: number): void { SetMobilePhoneScale(scale); }
  setPhoneRotation(rotX: number, rotY: number, rotZ: number, p3: number): void { SetMobilePhoneRotation(rotX, rotY, rotZ, p3); }
  getPhoneRotation(p1: number): Vector3 { return toVec3(GetMobilePhoneRotation(p1)); }
  setPhonePosition(posX: number, posY: number, posZ: number): void { SetMobilePhonePosition(posX, posY, posZ); }
  getPhonePosition(): Vector3 { return toVec3(GetMobilePhonePosition()); }
  canPhoneBeSeenOnScreen(): boolean { return CanPhoneBeSeenOnScreen(); }
  cellCamActivate(p0: boolean, p1: boolean): void { CellCamActivate(!!p0, !!p1); }
  cellCamIsCharVisibleNoFaceCheck(entity: number): boolean { return CellCamIsCharVisibleNoFaceCheck(entity); }
  getPhoneRenderId(): number { return (GetMobilePhoneRenderId as any)(); }

  moveFinger(direction: number): void { MoveFinger(direction); } // unverified
  setPhoneLean(toggle: boolean): void { SetPhoneLean(!!toggle); } // unverified
  scriptIsMovingPhoneOffscreen(toggle: boolean): void { ScriptIsMovingMobilePhoneOffscreen(!!toggle); }
  setPhoneUnk(toggle: boolean): void { SetMobilePhoneUnk(!!toggle); } // unverified
  cellCamMoveFinger(direction: number): void { CellCamMoveFinger(direction); } // unverified
  cellCamSetLean(toggle: boolean): void { CellCamSetLean(!!toggle); } // unverified
  cellCamDisableThisFrame(toggle: boolean): void { CellCamDisableThisFrame(!!toggle); } // unverified

  ["_0xA2CCBE62CD4C91A4"](...args: any[]): any { return Citizen.invokeNative("0xA2CCBE62CD4C91A4", ...args); }
  ["_0x1B0B4AEED5B9B41C"](...args: any[]): any { return Citizen.invokeNative("0x1B0B4AEED5B9B41C", ...args); }
  ["_0x53F4892D18EC90A4"](...args: any[]): any { return Citizen.invokeNative("0x53F4892D18EC90A4", ...args); }
  ["_0x3117D84EFA60F77B"](...args: any[]): any { return Citizen.invokeNative("0x3117D84EFA60F77B", ...args); }
  ["_0x15E69E2802C24B8D"](...args: any[]): any { return Citizen.invokeNative("0x15E69E2802C24B8D", ...args); }
  ["_0xAC2890471901861C"](...args: any[]): any { return Citizen.invokeNative("0xAC2890471901861C", ...args); }
  ["_0xD6ADE981781FCA09"](...args: any[]): any { return Citizen.invokeNative("0xD6ADE981781FCA09", ...args); }
  ["_0xF1E22DC13F5EEBAD"](...args: any[]): any { return Citizen.invokeNative("0xF1E22DC13F5EEBAD", ...args); }
  ["_0x466DA42C89865553"](...args: any[]): any { return Citizen.invokeNative("0x466DA42C89865553", ...args); }
}
