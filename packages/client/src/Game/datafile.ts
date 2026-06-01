import { createUnkProxy } from "./_helpers.js";

export class GameDatafileNs {
  unk = createUnkProxy();


  loadUgcFile(filename: string): boolean { return DatafileLoadOfflineUgc(filename); }
  objectValueAddBoolean(objectData: any, key: string, value: boolean): number { return DatadictSetBool(objectData, key, value); }
  objectValueAddInteger(objectData: any, key: string, value: number): number { return DatadictSetInt(objectData, key, value); }
  objectValueAddFloat(objectData: any, key: string, value: number): number { return DatadictSetFloat(objectData, key, value); }
  objectValueAddString(objectData: any, key: string, value: string): number { return DatadictSetString(objectData, key, value); }
  objectValueAddVector3(objectData: any, key: string, valueX: number, valueY: number, valueZ: number): number { return DatadictSetVector(objectData, key, valueX, valueY, valueZ); }
  objectValueAddObject(objectData: any, key: string): any { return DatadictCreateDict(objectData, key); }
  objectValueAddArray(objectData: any, key: string): any { return DatadictCreateArray(objectData, key); }
  objectValueGetBoolean(objectData: any, key: string): number { return (DatadictGetBool as any)(objectData, key); }
  objectValueGetInteger(objectData: any, key: string): any { return DatadictGetInt(objectData, key); }
  objectValueGetFloat(objectData: any, key: string): any { return DatadictGetFloat(objectData, key); }
  objectValueGetString(objectData: any, key: string): any { return DatadictGetString(objectData, key); }
  objectValueGetVector3(objectData: any, key: string): any { return DatadictGetVector(objectData, key); }
  objectValueGetObject(objectData: any, key: string): any { return DatadictGetDict(objectData, key); }
  objectValueGetArray(objectData: any, key: string): any { return DatadictGetArray(objectData, key); }
  objectValueGetType(objectData: any, key: string): any { return DatadictGetType(objectData, key); }
  arrayValueAddBoolean(arrayData: any, value: boolean): number { return DataarrayAddBool(arrayData, value); }
  arrayValueAddInteger(arrayData: any, value: number): number { return DataarrayAddInt(arrayData, value); }
  arrayValueAddFloat(arrayData: any, value: number): number { return DataarrayAddFloat(arrayData, value); }
  arrayValueAddString(arrayData: any, value: string): number { return DataarrayAddString(arrayData, value); }
  arrayValueAddVector3(arrayData: any, valueX: number, valueY: number, valueZ: number): number { return DataarrayAddVector(arrayData, valueX, valueY, valueZ); }
  arrayValueAddObject(arrayData: any): any { return DataarrayAddDict(arrayData); }
  arrayValueGetBoolean(arrayData: any, arrayIndex: number): number { return (DataarrayGetBool as any)(arrayData, arrayIndex); }
  arrayValueGetInteger(arrayData: any, arrayIndex: number): any { return DataarrayGetInt(arrayData, arrayIndex); }
  arrayValueGetFloat(arrayData: any, arrayIndex: number): any { return DataarrayGetFloat(arrayData, arrayIndex); }
  arrayValueGetString(arrayData: any, arrayIndex: number): any { return DataarrayGetString(arrayData, arrayIndex); }
  arrayValueGetVector3(arrayData: any, arrayIndex: number): any { return DataarrayGetVector(arrayData, arrayIndex); }
  arrayValueGetObject(arrayData: any, arrayIndex: number): any { return DataarrayGetDict(arrayData, arrayIndex); }
  arrayValueGetSize(arrayData: any): any { return DataarrayGetCount(arrayData); }
  arrayValueGetType(arrayData: any, arrayIndex: number): any { return DataarrayGetType(arrayData, arrayIndex); }

  watchRequestId(id: number): void { DatafileWatchRequestId(id); }
  clearWatchList(): void { DatafileClearWatchList(); }
  isValidRequestId(index: number): boolean { return DatafileIsValidRequestId(index); }
  hasLoadedFileData(p0: number): boolean { return DatafileHasLoadedFileData(p0); }
  hasValidFileData(p0: number): boolean { return DatafileHasValidFileData(p0); }
  selectActiveFile(p0: number): boolean { return DatafileSelectActiveFile(p0); }
  deleteRequestedFile(p0: number): boolean { return DatafileDeleteRequestedFile(p0); }

  ugcCreateContent(dataCount: number, contentName: string, description: string, tagsCsv: string, contentTypeName: string, publish: boolean): number { return (UgcCreateContent as any)(dataCount, contentName, description, tagsCsv, contentTypeName, publish); }
  ugcCreateMission(contentName: string, description: string, tagsCsv: string, contentTypeName: string, publish: boolean): boolean { return UgcCreateMission(contentName, description, tagsCsv, contentTypeName, publish); }
  ugcUpdateContent(contentId: string, dataCount: number, contentName: string, description: string, tagsCsv: string, contentTypeName: string): number { return (UgcUpdateContent as any)(contentId, dataCount, contentName, description, tagsCsv, contentTypeName); }
  ugcUpdateMission(contentId: string, contentName: string, description: string, tagsCsv: string, contentTypeName: string): boolean { return UgcUpdateMission(contentId, contentName, description, tagsCsv, contentTypeName); }
  ugcSetPlayerData(contentId: string, rating: number, contentTypeName: string): boolean { return UgcSetPlayerData(contentId, rating, contentTypeName); }
  selectUgcData(p0: number): boolean { return DatafileSelectUgcData(p0); }
  selectUgcStats(p0: number, p1: boolean): boolean { return DatafileSelectUgcStats(p0, p1); }
  selectUgcPlayerData(p0: number): boolean { return DatafileSelectUgcPlayerData(p0); }
  selectCreatorStats(p0: number): boolean { return DatafileSelectCreatorStats(p0); }
  loadOfflineUgc(filename: string): boolean { return DatafileLoadOfflineUgc(filename); }

  create(): void { DatafileCreate(); }
  delete(): void { DatafileDelete(); }
  storeMissionHeader(): void { DatafileStoreMissionHeader(); }
  flushMissionHeader(): void { DatafileFlushMissionHeader(); }
  getFileDict(): string { return DatafileGetFileDict(); }
  startSaveToCloud(filename: string): boolean { return DatafileStartSaveToCloud(filename); }
  updateSaveToCloud(): boolean { return (DatafileUpdateSaveToCloud as any)(); }
  isSavePending(): boolean { return DatafileIsSavePending(); }

  datadictSetBool(objectData: any, key: string, value: boolean): number { return DatadictSetBool(objectData, key, value); }
  datadictSetInt(objectData: any, key: string, value: number): number { return DatadictSetInt(objectData, key, value); }
  datadictSetFloat(objectData: any, key: string, value: number): number { return DatadictSetFloat(objectData, key, value); }
  datadictSetString(objectData: any, key: string, value: string): number { return DatadictSetString(objectData, key, value); }
  datadictSetVector(objectData: any, key: string, valueX: number, valueY: number, valueZ: number): number { return DatadictSetVector(objectData, key, valueX, valueY, valueZ); }
  datadictCreateDict(objectData: any, key: string): any { return DatadictCreateDict(objectData, key); }
  datadictCreateArray(objectData: any, key: string): any { return DatadictCreateArray(objectData, key); }
  datadictGetBool(objectData: any, key: string): number { return (DatadictGetBool as any)(objectData, key); }
  datadictGetInt(objectData: any, key: string): any { return DatadictGetInt(objectData, key); }
  datadictGetFloat(objectData: any, key: string): any { return DatadictGetFloat(objectData, key); }
  datadictGetString(objectData: any, key: string): any { return DatadictGetString(objectData, key); }
  datadictGetVector(objectData: any, key: string): any { return DatadictGetVector(objectData, key); }
  datadictGetDict(objectData: any, key: string): any { return DatadictGetDict(objectData, key); }
  datadictGetArray(objectData: any, key: string): any { return DatadictGetArray(objectData, key); }
  datadictGetType(objectData: any, key: string): any { return DatadictGetType(objectData, key); }

  dataarrayAddBool(arrayData: any, value: boolean): number { return DataarrayAddBool(arrayData, value); }
  dataarrayAddInt(arrayData: any, value: number): number { return DataarrayAddInt(arrayData, value); }
  dataarrayAddFloat(arrayData: any, value: number): number { return DataarrayAddFloat(arrayData, value); }
  dataarrayAddString(arrayData: any, value: string): number { return DataarrayAddString(arrayData, value); }
  dataarrayAddVector(arrayData: any, valueX: number, valueY: number, valueZ: number): number { return DataarrayAddVector(arrayData, valueX, valueY, valueZ); }
  dataarrayAddDict(arrayData: any): any { return DataarrayAddDict(arrayData); }
  dataarrayGetBool(arrayData: any, arrayIndex: number): number { return (DataarrayGetBool as any)(arrayData, arrayIndex); }
  dataarrayGetInt(arrayData: any, arrayIndex: number): any { return DataarrayGetInt(arrayData, arrayIndex); }
  dataarrayGetFloat(arrayData: any, arrayIndex: number): any { return DataarrayGetFloat(arrayData, arrayIndex); }
  dataarrayGetString(arrayData: any, arrayIndex: number): any { return DataarrayGetString(arrayData, arrayIndex); }
  dataarrayGetVector(arrayData: any, arrayIndex: number): any { return DataarrayGetVector(arrayData, arrayIndex); }
  dataarrayGetDict(arrayData: any, arrayIndex: number): any { return DataarrayGetDict(arrayData, arrayIndex); }
  dataarrayGetCount(arrayData: any): any { return DataarrayGetCount(arrayData); }
  dataarrayGetType(arrayData: any, arrayIndex: number): any { return DataarrayGetType(arrayData, arrayIndex); }

  ["_0xA6EEF01087181EDD"](...args: any[]): any { return Citizen.invokeNative("0xA6EEF01087181EDD", ...args); }
  ["_0x6AD0BD5E087866CB"](...args: any[]): any { return Citizen.invokeNative("0x6AD0BD5E087866CB", ...args); }
  ["_0xDBF860CF1DB8E599"](...args: any[]): any { return Citizen.invokeNative("0xDBF860CF1DB8E599", ...args); }
}
