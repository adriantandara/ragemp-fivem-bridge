import { createUnkProxy } from "./_helpers.js";

export class GameScriptNs {
  unk = createUnkProxy();

  isThreadActive(threadId) { return IsThreadActive(threadId); }
  terminateThread(threadId) { TerminateThread(threadId); }
  doesThreadExist(threadId) { return !!GetNameOfThread(threadId); }
  getIdOfThisThread() { return GetIdOfThisThread(); }
  getNameOfThread(threadId) { return GetNameOfThread(threadId); }
  requestScriptWithNameHash(scriptHash) { RequestScriptWithNameHash(scriptHash); }
  hasScriptWithNameHashLoaded(scriptHash) { return HasScriptWithNameHashLoaded(scriptHash); }
  triggerScriptEvent(eventGroup, eventDataSize, playerBits) { return TriggerScriptEvent(eventGroup, eventDataSize, playerBits); }
}
