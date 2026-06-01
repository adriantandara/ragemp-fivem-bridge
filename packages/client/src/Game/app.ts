import { createUnkProxy } from "./_helpers.js";

export class GameAppNs {
  unk = createUnkProxy();


  appGetInt(property: string): number { return AppGetInt(property); }
  appGetFloat(property: string): number { return AppGetFloat(property); }
  appGetString(property: string): string { return AppGetString(property); }
  appSetInt(property: string, value: number): void { AppSetInt(property, value); }
  appSetFloat(property: string, value: number): void { AppSetFloat(property, value); }
  appSetString(property: string, value: string): void { AppSetString(property, value); }
  appSetApp(appName: string): void { AppSetApp(appName); }
  appSetBlock(blockName: string): void { AppSetBlock(blockName); }
  appHasSyncedData(appName: string): boolean { return AppHasSyncedData(appName); }
  appDeleteAppData(appName: string): boolean { return AppDeleteAppData(appName); }

  dataValid(): boolean { return AppDataValid(); }
  getInt(property: string): number { return AppGetInt(property); }
  getFloat(property: string): number { return AppGetFloat(property); }
  getString(property: string): string { return AppGetString(property); }
  setInt(property: string, value: number): void { AppSetInt(property, value); }
  setFloat(property: string, value: number): void { AppSetFloat(property, value); }
  setString(property: string, value: string): void { AppSetString(property, value); }
  setApp(appName: string): void { AppSetApp(appName); }
  setBlock(blockName: string): void { AppSetBlock(blockName); }
  clearBlock(): void { AppClearBlock(); }
  closeApp(): void { AppCloseApp(); }
  closeBlock(): void { AppCloseBlock(); }
  hasLinkedSocialClubAccount(): boolean { return AppHasLinkedSocialClubAccount(); }
  hasSyncedData(appName: string): boolean { return AppHasSyncedData(appName); }
  saveData(): void { AppSaveData(); }
  getDeletedFileStatus(): number { return AppGetDeletedFileStatus(); }
  deleteAppData(appName: string): boolean { return AppDeleteAppData(appName); }
}
