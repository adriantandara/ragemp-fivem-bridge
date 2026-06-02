import { createUnkProxy } from "./_helpers.js";

export class GameLocalizationNs {
  unk = createUnkProxy();

  getSystemLanguage(): number { return LocalizationGetSystemLanguage(); }
  getCurrentLanguage(): number { return GetCurrentLanguage(); }
  getSystemDateFormat(): number { return Citizen.invokeNative("0xA8AE43AEC1A61314", Citizen.resultAsInteger()); }
}
