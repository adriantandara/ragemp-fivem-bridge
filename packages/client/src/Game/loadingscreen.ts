import { createUnkProxy } from "./_helpers.js";

export class GameLoadingscreenNs {
  unk = createUnkProxy();

  ["_0xF2CA003F167E21D2"](...args: any[]): any { return Citizen.invokeNative("0xF2CA003F167E21D2", ...args); }
  ["_0xFA1E0E893D915215"](...args: any[]): any { return Citizen.invokeNative("0xFA1E0E893D915215", ...args); }
  getBroadcastFinshedLosSound(toggle: boolean): void { GetBroadcastFinshedLosSound(!!toggle); } // unverified
  getLoadFreemode(): boolean { return GetLoadFreemode(); } // unverified
  setLoadFreemode(toggle: boolean): void { SetLoadFreemode(!!toggle); } // unverified
  getLoadFreemodeWithEventName(): boolean { return GetLoadFreemodeWithEventName(); } // unverified
  setLoadFreemodeWithEventName(toggle: boolean): void { SetLoadFreemodeWithEventName(!!toggle); } // unverified
  isLoadingFreemode(): boolean { return IsLoadingFreemode(); } // unverified
  setIsLoadingFreemode(toggle: boolean): void { SetIsLoadingFreemode(!!toggle); } // unverified
}
