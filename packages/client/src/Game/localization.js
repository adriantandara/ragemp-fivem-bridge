import { createUnkProxy } from "./_helpers.js";

export class GameLocalizationNs {
  unk = createUnkProxy();

  getLanguage() { return GetCurrentLanguage(); }
  getLabelText(labelName) { return GetLabelText(labelName); }
}
