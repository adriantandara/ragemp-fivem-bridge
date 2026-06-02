import { createUnkProxy } from "./_helpers.js";

export class GameLoadingscreenNs {
  unk = createUnkProxy();

  ["_0xF2CA003F167E21D2"](...args: any[]): any { return Citizen.invokeNative("0xF2CA003F167E21D2", ...args); }
  ["_0xFA1E0E893D915215"](...args: any[]): any { return Citizen.invokeNative("0xFA1E0E893D915215", ...args); }
  getBroadcastFinshedLosSound(toggle: boolean): void { GetBroadcastFinshedLosSound(!!toggle); } // unverified
  getLoadFreemode(): boolean { return LoadingscreenGetLoadFreemode(); } // unverified
  setLoadFreemode(toggle: boolean): void { LoadingscreenSetLoadFreemode(!!toggle); } // unverified
  getLoadFreemodeWithEventName(): boolean { return LoadingscreenGetLoadFreemodeWithEventName(); } // unverified
  setLoadFreemodeWithEventName(toggle: boolean): void { LoadingscreenSetLoadFreemodeWithEventName(!!toggle); } // unverified
  isLoadingFreemode(): boolean { return LoadingscreenIsLoadingFreemode(); } // unverified
  setIsLoadingFreemode(toggle: boolean): void { LoadingscreenSetIsLoadingFreemode(!!toggle); } // unverified
}
