import { createUnkProxy } from "./_helpers.js";

export class GameDecoratorNs {
  unk = createUnkProxy();

  decorate(entity, propertyName, value) { DecorSetFloat(entity, propertyName, value); }
  decorSetBool(entity, propertyName, value) { DecorSetBool(entity, propertyName, value); }
  decorSetFloat(entity, propertyName, value) { DecorSetFloat(entity, propertyName, value); }
  decorSetInt(entity, propertyName, value) { DecorSetInt(entity, propertyName, value); }
  decorGetBool(entity, propertyName) { return DecorGetBool(entity, propertyName); }
  decorGetFloat(entity, propertyName) { return DecorGetFloat(entity, propertyName); }
  decorGetInt(entity, propertyName) { return DecorGetInt(entity, propertyName); }
  decorExistOn(entity, propertyName) { return DecorExistOn(entity, propertyName); }
  decorRemove(entity, propertyName) { DecorRemove(entity, propertyName); }
  decorRegister(propertyName, type) { DecorRegister(propertyName, type); }
}
