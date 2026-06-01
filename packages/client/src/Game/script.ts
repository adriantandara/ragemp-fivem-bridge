import { createUnkProxy } from "./_helpers.js";

export class GameScriptNs {
  unk = createUnkProxy();

  isThreadActive(threadId: number): boolean { return IsThreadActive(threadId); }
  terminateThread(threadId: number): void { TerminateThread(threadId); }
  getIdOfThisThread(): number { return GetIdOfThisThread(); }
  getNameOfThread(threadId: number): string { return GetNameOfThread(threadId); }
  triggerScriptEvent(eventGroup: number, eventDataSize: number, playerBits: number): number { return TriggerScriptEvent(eventGroup, eventDataSize, playerBits); }

  requestScript(scriptName: string): void { RequestScript(scriptName); }
  setScriptAsNoLongerNeeded(scriptName: string): void { SetScriptAsNoLongerNeeded(scriptName); }
  hasScriptLoaded(scriptName: string): boolean { return HasScriptLoaded(scriptName); }
  doesScriptExist(scriptName: string): boolean { return DoesScriptExist(scriptName); }
  request(scriptName: string): void { RequestScript(scriptName); }
  setAsNoLongerNeeded(scriptName: string): void { SetScriptAsNoLongerNeeded(scriptName); }
  hasLoaded(scriptName: string): boolean { return HasScriptLoaded(scriptName); }
  doesExist(scriptName: string): boolean { return DoesScriptExist(scriptName); }
  requestWithNameHash(scriptHash: number): void { RequestScriptWithNameHash(scriptHash); }
  setWithNameHashAsNoLongerNeeded(scriptHash: number): void { SetScriptWithNameHashAsNoLongerNeeded(scriptHash); }
  hasWithNameHashLoaded(scriptHash: number): boolean { return HasScriptWithNameHashLoaded(scriptHash); }
  doesWithNameHashExist(scriptHash: number): boolean { return DoesScriptWithNameHashExist(scriptHash); }
  terminateThisThread(): void { TerminateThisThread(); }

  getNumberOfEvents(eventGroup: number): number { return GetNumberOfEvents(eventGroup); }
  getEventExists(eventGroup: number, eventIndex: number): boolean { return GetEventExists(eventGroup, eventIndex); }
  getEventAtIndex(eventGroup: number, eventIndex: number): number { return GetEventAtIndex(eventGroup, eventIndex); }
  getEventData(eventGroup: number, eventIndex: number, eventDataSize: number): number { return (GetEventData as any)(eventGroup, eventIndex, eventDataSize); } // NOTE: native returns [boolean,number] per typings
  triggerEvent(eventGroup: number, eventDataSize: number, playerBits: number): number { return TriggerScriptEvent(eventGroup, eventDataSize, playerBits); }

  shutdownLoadingScreen(): void { ShutdownLoadingScreen(); }
  setNoLoadingScreen(toggle: boolean): void { SetNoLoadingScreen(!!toggle); }
  getNoLoadingScreen(): boolean { return GetNoLoadingScreen(); }

  bgStartContextHash(contextHash: number): void { BgStartContextHash(contextHash); }
  bgEndContextHash(contextHash: number): void { BgEndContextHash(contextHash); }
  bgStartContext(contextName: string): void { BgStartContext(contextName); }
  bgEndContext(contextName: string): void { BgEndContext(contextName); }

  requestStreamedScript(scriptHash: number): void { RequestScriptWithNameHash(scriptHash); }
  setStreamedScriptAsNoLongerNeeded(scriptHash: number): void { SetScriptWithNameHashAsNoLongerNeeded(scriptHash); }
  hasStreamedScriptLoaded(scriptHash: number): boolean { return HasScriptWithNameHashLoaded(scriptHash); }
  isStreamedScriptRunning(scriptHash: number): boolean { return IsStreamedScriptRunning(scriptHash); } // unverified
  getThreadName(threadId: number): string { return GetNameOfThread(threadId); }
  getNumberOfInstancesOfStreamedScript(scriptHash: number): number { return GetNumberOfInstancesOfStreamedScript(scriptHash); } // unverified
  threadIteratorReset(): void { ScriptThreadIteratorReset(); }
  threadIteratorGetNextThreadId(): number { return ScriptThreadIteratorGetNextThreadId(); }
  getNumberOfReferencesOfWithNameHash(scriptHash: number): number { return GetNumberOfReferencesOfScriptWithNameHash(scriptHash); } // unverified
  getThisName(): string { return GetThisScriptName(); }
  getHashOfThisName(): number { return GetHashOfThisScriptName(); }
  triggerEvent2(eventGroup: number, eventDataSize: number, playerBits: number): number { return TriggerScriptEvent(eventGroup, eventDataSize, playerBits); }

  ["_0xB1577667C3708F9B"](...args: any[]): any { return Citizen.invokeNative("0xB1577667C3708F9B", ...args); }
  ["_0x836B62713E0534CA"](...args: any[]): any { return Citizen.invokeNative("0x836B62713E0534CA", ...args); }
  ["_0x760910B49D2B98EA"](...args: any[]): any { return Citizen.invokeNative("0x760910B49D2B98EA", ...args); }
  ["_0x0F6F1EBBC4E1D5E6"](...args: any[]): any { return Citizen.invokeNative("0x0F6F1EBBC4E1D5E6", ...args); }
  ["_0x22E21FBCFC88C149"](...args: any[]): any { return Citizen.invokeNative("0x22E21FBCFC88C149", ...args); }
  ["_0x829CD22E043A2577"](...args: any[]): any { return Citizen.invokeNative("0x829CD22E043A2577", ...args); }
}
