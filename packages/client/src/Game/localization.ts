import { createUnkProxy } from "./_helpers.js";

export class GameLocalizationNs {
  unk = createUnkProxy();

  getSystemLanguage(): number { return LocalizationGetSystemLanguage(); }
  getCurrentLanguage(): number { return GetCurrentLanguage(); }
  getSystemDateFormat(): number { return LocalizationGetSystemDateType(); }
}
