import { createUnkProxy } from "./_helpers.js";

export class GameFireNs {
  unk = createUnkProxy();

  addExplosion(x, y, z, explosionType, damageScale, isAudible, isInvisible, cameraShake) {
    AddExplosion(x, y, z, explosionType, damageScale ?? 1.0, isAudible ?? true, isInvisible ?? false, cameraShake ?? 1.0);
  }
  addExplosionWithUserVfx(x, y, z, explosionType, explosionFx, damageScale, isAudible, isInvisible, cameraShake) {
    AddExplosionWithUserVfx(x, y, z, explosionType, explosionFx, damageScale ?? 1.0, isAudible ?? true, isInvisible ?? false, cameraShake ?? 1.0);
  }
  startEntityFire(entity) { return StartEntityFire(entity); }
  stopEntityFire(entity) { StopEntityFire(entity); }
  startScriptedFire(x, y, z, radius, strength) { return StartScriptedFire(x, y, z, radius ?? 1.0, strength ?? 1); }
  stopScriptedFire(handle) { StopScriptedFire(handle); }
  isEntityOnFire(entity) { return IsEntityOnFire(entity); }
  getNumberOfFiresInRange(x, y, z, radius) { return GetNumberOfFiresInRange(x, y, z, radius); }
  stopAllFiresInRange(x, y, z, radius) { StopFireInRange(x, y, z, radius); }
}
