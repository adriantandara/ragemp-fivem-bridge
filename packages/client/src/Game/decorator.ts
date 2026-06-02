import { createUnkProxy } from "./_helpers.js";

export class GameDecoratorNs {
  unk = createUnkProxy();

  decorSetTime(entity: number, propertyName: string, timestamp: number): boolean { return DecorSetTime(entity, propertyName, timestamp); }
  decorSetBool(entity: number, propertyName: string, value: boolean): boolean { return DecorSetBool(entity, propertyName, value); }
  decorSetFloat(entity: number, propertyName: string, value: number): boolean { return DecorSetFloat(entity, propertyName, value); }
  decorSetInt(entity: number, propertyName: string, value: number): boolean { return DecorSetInt(entity, propertyName, value); }
  decorGetBool(entity: number, propertyName: string): boolean { return DecorGetBool(entity, propertyName); }
  decorGetFloat(entity: number, propertyName: string): number { return DecorGetFloat(entity, propertyName); }
  decorGetInt(entity: number, propertyName: string): number { return DecorGetInt(entity, propertyName); }
  decorExistOn(entity: number, propertyName: string): boolean { return DecorExistOn(entity, propertyName); }
  decorRemove(entity: number, propertyName: string): boolean { return DecorRemove(entity, propertyName); }
  decorRegister(propertyName: string, type: number): void { DecorRegister(propertyName, type); }
  decorIsRegisteredAsType(propertyName: string, type: number): boolean { return DecorIsRegisteredAsType(propertyName, type); }
  decorRegisterLock(): void { DecorRegisterLock(); }
}
