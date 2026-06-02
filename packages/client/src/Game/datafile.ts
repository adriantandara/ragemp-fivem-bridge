import { createUnkProxy } from "./_helpers.js";

export class GameDatafileNs {
  unk = createUnkProxy();


  loadUgcFile(filename: string): boolean { return DatafileLoadOfflineUgc(filename); }
  objectValueAddBoolean(key: string, value: boolean): number { return DatadictSetBool(key, value); }
  objectValueAddInteger(key: string, value: number): number { return DatadictSetInt(key, value); }
  objectValueAddFloat(key: string, value: number): number { return DatadictSetFloat(key, value); }
  objectValueAddString(key: string, value: string): number { return DatadictSetString(key, value); }
  objectValueAddVector3(key: string, valueX: number, valueY: number, valueZ: number): number { return DatadictSetVector(key, valueX, valueY, valueZ); }
  objectValueAddObject(key: string): any { return DatadictCreateDict(key); }
  objectValueAddArray(key: string): any { return DatadictCreateArray(key); }
  objectValueGetBoolean(key: string): [boolean, number] { return DatadictGetBool(key); }
  objectValueGetInteger(key: string): any { return DatadictGetInt(key); }
  objectValueGetFloat(key: string): any { return DatadictGetFloat(key); }
  objectValueGetString(key: string): any { return DatadictGetString(key); }
  objectValueGetVector3(key: string): any { return DatadictGetVector(key); }
  objectValueGetObject(key: string): any { return DatadictGetDict(key); }
  objectValueGetArray(key: string): any { return DatadictGetArray(key); }
  objectValueGetType(key: string): any { return DatadictGetType(key); }
  arrayValueAddBoolean(value: boolean): number { return DataarrayAddBool(value); }
  arrayValueAddInteger(value: number): number { return DataarrayAddInt(value); }
  arrayValueAddFloat(value: number): number { return DataarrayAddFloat(value); }
  arrayValueAddString(value: string): number { return DataarrayAddString(value); }
  arrayValueAddVector3(valueX: number, valueY: number, valueZ: number): number { return DataarrayAddVector(valueX, valueY, valueZ); }
  arrayValueAddObject(arrayData: any): any { return DataarrayAddDict(arrayData); }
  arrayValueGetBoolean(arrayIndex: number): number { return (DataarrayGetBool as any)(arrayIndex); }
  arrayValueGetInteger(arrayIndex: number): any { return DataarrayGetInt(arrayIndex); }
  arrayValueGetFloat(arrayIndex: number): any { return DataarrayGetFloat(arrayIndex); }
  arrayValueGetString(arrayIndex: number): any { return DataarrayGetString(arrayIndex); }
  arrayValueGetVector3(arrayIndex: number): any { return DataarrayGetVector(arrayIndex); }
  arrayValueGetObject(arrayIndex: number): any { return DataarrayGetDict(arrayIndex); }
  arrayValueGetSize(arrayData: any): any { return DataarrayGetCount(arrayData); }
  arrayValueGetType(arrayIndex: number): [number, number] { return DataarrayGetType(arrayIndex); }

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

  datadictSetBool(key: string, value: boolean): number { return DatadictSetBool(key, value); }
  datadictSetInt(key: string, value: number): number { return DatadictSetInt(key, value); }
  datadictSetFloat(key: string, value: number): number { return DatadictSetFloat(key, value); }
  datadictSetString(key: string, value: string): number { return DatadictSetString(key, value); }
  datadictSetVector(key: string, valueX: number, valueY: number, valueZ: number): number { return DatadictSetVector(key, valueX, valueY, valueZ); }
  datadictCreateDict(key: string): any { return DatadictCreateDict(key); }
  datadictCreateArray(key: string): any { return DatadictCreateArray(key); }
  datadictGetBool(key: string): number { return (DatadictGetBool as any)(key); }
  datadictGetInt(key: string): any { return DatadictGetInt(key); }
  datadictGetFloat(key: string): any { return DatadictGetFloat(key); }
  datadictGetString(key: string): any { return DatadictGetString(key); }
  datadictGetVector(key: string): any { return DatadictGetVector(key); }
  datadictGetDict(key: string): any { return DatadictGetDict(key); }
  datadictGetArray(key: string): any { return DatadictGetArray(key); }
  datadictGetType(key: string): any { return DatadictGetType(key); }

  dataarrayAddBool(value: boolean): number { return DataarrayAddBool(value); }
  dataarrayAddInt(value: number): number { return DataarrayAddInt(value); }
  dataarrayAddFloat(value: number): number { return DataarrayAddFloat(value); }
  dataarrayAddString(value: string): number { return DataarrayAddString(value); }
  dataarrayAddVector(valueX: number, valueY: number, valueZ: number): number { return DataarrayAddVector(valueX, valueY, valueZ); }
  dataarrayAddDict(arrayData: any): any { return DataarrayAddDict(arrayData); }
  dataarrayGetBool(arrayIndex: number): number { return (DataarrayGetBool as any)(arrayIndex); }
  dataarrayGetInt(arrayIndex: number): any { return DataarrayGetInt(arrayIndex); }
  dataarrayGetFloat(arrayIndex: number): any { return DataarrayGetFloat(arrayIndex); }
  dataarrayGetString(arrayIndex: number): any { return DataarrayGetString(arrayIndex); }
  dataarrayGetVector(arrayIndex: number): any { return DataarrayGetVector(arrayIndex); }
  dataarrayGetDict(arrayIndex: number): any { return DataarrayGetDict(arrayIndex); }
  dataarrayGetCount(arrayData: any): any { return DataarrayGetCount(arrayData); }
  dataarrayGetType(arrayIndex: number): any { return DataarrayGetType(arrayIndex); }

  ["_0xA6EEF01087181EDD"](...args: any[]): any { return Citizen.invokeNative("0xA6EEF01087181EDD", ...args); }
  ["_0x6AD0BD5E087866CB"](...args: any[]): any { return Citizen.invokeNative("0x6AD0BD5E087866CB", ...args); }
  ["_0xDBF860CF1DB8E599"](...args: any[]): any { return Citizen.invokeNative("0xDBF860CF1DB8E599", ...args); }
}
