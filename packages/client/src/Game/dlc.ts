import { createUnkProxy } from "./_helpers.js";

export class GameDlcNs {
  unk = createUnkProxy();

  isDlcPresent(dlcHash: number): boolean { return IsDlcPresent(dlcHash); }
  nullify(unused: number): boolean {
    const [, result] = Nullify(unused);
    return result;
  }
  ["_0x241FCA5B1AA14F75"](...args: any[]): any { return Citizen.invokeNative("0x241FCA5B1AA14F75", ...args); }
  ["_0xF2E07819EF1A5289"](...args: any[]): any { return Citizen.invokeNative("0xF2E07819EF1A5289", ...args); }
  ["_0x9489659372A81585"](...args: any[]): any { return Citizen.invokeNative("0x9489659372A81585", ...args); }
  ["_0xA213B11DFF526300"](...args: any[]): any { return Citizen.invokeNative("0xA213B11DFF526300", ...args); }
  ["_0xC4637A6D03C24CC3"](...args: any[]): any { return Citizen.invokeNative("0xC4637A6D03C24CC3", ...args); }
  isPresent(dlcHash: number): boolean { return IsDlcPresent(dlcHash); }
  getExtraContentPackHasBeenInstalled(): boolean { return GetExtraContentPackHasBeenInstalled(); }
  getIsLoadingScreenActive(): boolean { return GetIsLoadingScreenActive(); }
  hasCloudRequestsFinished(unused: number): boolean {
    const [, result] = HasCloudRequestsFinished(unused);
    return result;
  }
  onEnterSp(): void { OnEnterSp(); }
  onEnterMp(): void { OnEnterMp(); }
}
