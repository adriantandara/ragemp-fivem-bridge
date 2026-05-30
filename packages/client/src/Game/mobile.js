import { createUnkProxy } from "./_helpers.js";

export class GameMobileNs {
  unk = createUnkProxy();

  createMobilePhone(phoneType) { return CreateMobilePhone(phoneType ?? 0); }
  destroyMobilePhone() { DestroyMobilePhone(); }
  setMobilePhoneScale(scale) { SetMobilePhoneScale(scale); }
  setMobilePhoneRotation(rotX, rotY, rotZ, p3) { SetMobilePhoneRotation(rotX, rotY, rotZ, p3 ?? false); }
  setMobilePhonePosition(offsetX, offsetY, offsetZ) { SetMobilePhonePosition(offsetX, offsetY, offsetZ); }
}
