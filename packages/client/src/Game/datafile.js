import { createUnkProxy } from "./_helpers.js";

export class GameDatafileNs {
  unk = createUnkProxy();

  isHigherModel(modelHash) { return IsHigherModel(modelHash); }
}
