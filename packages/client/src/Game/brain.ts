import { createUnkProxy } from "./_helpers.js";

export class GameBrainNs {
  unk = createUnkProxy();

  registerObjectScriptBrain(scriptName: string, modelHash: number, p2: number, activationRange: number, p4: number, p5: number): void { RegisterObjectScriptBrain(scriptName, modelHash, p2, activationRange, p4, p5); }
  isObjectWithinBrainActivationRange(object: number): boolean { return IsObjectWithinBrainActivationRange(object); }
  registerWorldPointScriptBrain(scriptName: string, activationRange: number, p2: number): void { RegisterWorldPointScriptBrain(scriptName, activationRange, p2); }
  enableScriptBrainSet(brainSet: number): void { EnableScriptBrainSet(brainSet); }
  disableScriptBrainSet(brainSet: number): void { DisableScriptBrainSet(brainSet); }
  ["_0x0B40ED49D7D6FF84"](...args: any[]): any { return Citizen.invokeNative("0x0B40ED49D7D6FF84", ...args); }
  ["_0x4D953DF78EBF8158"](...args: any[]): any { return Citizen.invokeNative("0x4D953DF78EBF8158", ...args); }
  ["_0x6D6840CEE8845831"](...args: any[]): any { return Citizen.invokeNative("0x6D6840CEE8845831", ...args); }
  ["_0x6E91B04E08773030"](...args: any[]): any { return Citizen.invokeNative("0x6E91B04E08773030", ...args); }
  addScriptToRandomPed(name: string, model: number, p2: number, p3: number): void { AddScriptToRandomPed(name, model, p2, p3); }
  registerObjectScript(scriptName: string, modelHash: number, p2: number, activationRange: number, p4: number, p5: number): void { RegisterObjectScriptBrain(scriptName, modelHash, p2, activationRange, p4, p5); }
  isObjectWithinActivationRange(object: number): boolean { return IsObjectWithinBrainActivationRange(object); }
  registerWorldPointScript(scriptName: string, activationRange: number, p2: number): void { RegisterWorldPointScriptBrain(scriptName, activationRange, p2); }
  isWorldPointWithinActivationRange(): boolean { return IsWorldPointWithinBrainActivationRange(); }
  enableScriptSet(brainSet: number): void { EnableScriptBrainSet(brainSet); }
  disableScriptSet(brainSet: number): void { DisableScriptBrainSet(brainSet); }
}
