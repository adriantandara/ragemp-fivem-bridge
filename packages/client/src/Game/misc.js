import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { createUnkProxy, toVec3 } from "./_helpers.js";

export class GameMiscNs {
  unk = createUnkProxy();

  setWeatherTypePersist(weatherType) { SetWeatherTypePersist(weatherType); }
  setWeatherTypeNow(weatherType) { SetWeatherTypeNow(weatherType); }
  setWeatherTypeNowPersist(weatherType) { SetWeatherTypeNowPersist(weatherType); }
  getWeatherTypeTransition() {
    const [w1, w2, p] = GetWeatherTypeTransition();
    return { weatherType1: w1, weatherType2: w2, percent: p };
  }
  setWindSpeed(speed) { SetWindSpeed(speed); }
  setRainLevel(intensity) { SetRainLevel(intensity); }
  setSnowLevel(level) { SetSnowLevel(level); }

  getGroundZFor3DCoord(x, y, z, ignoreWater) {
    const [, z2] = GetGroundZFor_3dCoord(x, y, z, ignoreWater ?? false);
    return z2;
  }
  getDistanceBetweenCoords(x1, y1, z1, x2, y2, z2, useZ) {
    return GetDistanceBetweenCoords(x1, y1, z1, x2, y2, z2, useZ ?? true);
  }
  getHeadingFromVector2D(dx, dy) { return GetHeadingFromVector_2d(dx, dy); }
  getAngleBetween2dVectors(x1, y1, x2, y2) { return GetAngleBetween_2dVectors(x1, y1, x2, y2); }

  setTimeScale(timeScale) { SetTimeScale(timeScale); }
  setMissionFlag(toggle) { SetMissionFlag(toggle); }
  getMissionFlag() { return GetMissionFlag(); }
  setGamePaused(toggle) { SetGamePaused(toggle); }
  setFadeOutAfterDeath(toggle) { SetFadeOutAfterDeath(toggle); }
  setFadeOutAfterArrest(toggle) { SetFadeOutAfterArrest(toggle); }
  disableAutomaticRespawn(disableRespawn) { DisableAutomaticRespawn(disableRespawn); }
  ignoreNextRestart(toggle) { IgnoreNextRestart(toggle); }
  pauseDeathArrestRestart(toggle) { PauseDeathArrestRestart(toggle); }
  forceGameStatePlaying() { ForceGameStatePlaying(); }

  shootSingleBulletBetweenCoords(fromX, fromY, fromZ, toX, toY, toZ, damage, pureAccuracy, weaponHash, ownerPed, isAudible, isInvisible, speed) {
    ShootSingleBulletBetweenCoords(fromX, fromY, fromZ, toX, toY, toZ, damage, pureAccuracy ?? true, weaponHash, ownerPed, isAudible ?? true, isInvisible ?? false, speed ?? 1.0);
  }
  isProjectileTypeInArea(x1, y1, z1, x2, y2, z2, type, ownedByPlayer) {
    return IsProjectileTypeInArea(x1, y1, z1, x2, y2, z2, type, ownedByPlayer ?? false);
  }

  getModelDimensions(modelHash) {
    const [min, max] = GetModelDimensions(modelHash);
    return {
      min: toVec3(min) ?? new Vector3(min[0], min[1], min[2]),
      max: toVec3(max) ?? new Vector3(max[0], max[1], max[2]),
    };
  }

  getHashKey(string) { return GetHashKey(string); }
  getRandomIntInRange(startRange, endRange) { return GetRandomIntInRange(startRange, endRange); }
  getRandomFloatInRange(startRange, endRange) { return GetRandomFloatInRange(startRange, endRange); }
  areStringsEqual(string1, string2) { return string1 === string2; }

  clearArea(x, y, z, radius, p4, p5, p6, p7) {
    ClearAreaOfEverything(x, y, z, radius, p4 ?? false, p5 ?? false, p6 ?? false, p7 ?? false);
  }
  clearAreaOfVehicles(x, y, z, radius, p4, p5, p6, p7, p8) {
    ClearAreaOfVehicles(x, y, z, radius, p4 ?? false, p5 ?? false, p6 ?? false, p7 ?? false, p8 ?? false);
  }
  clearAreaOfPeds(x, y, z, radius, p4) {
    ClearAreaOfPeds(x, y, z, radius, p4 ?? false);
  }
  clearAreaOfObjects(x, y, z, radius, p4) {
    ClearAreaOfObjects(x, y, z, radius, p4 ?? 0);
  }
  clearAreaOfCops(x, y, z, radius) { ClearAreaOfCops(x, y, z, radius, false); }

  setGravityLevel(level) { SetGravityLevel(level); }
  resetGravityLevel() { SetGravityLevel(0); }

  getGameTimer() { return GetGameTimer(); }
  getFrameTime() { return GetFrameTime(); }
  getFrameCount() { return GetFrameCount(); }

  isInteriorScene() { return IsInteriorScene(); }
  getInteriorFromEntityOrCoords(entity, x, y, z) { return GetInteriorFromEntityOrCoords(entity, x, y, z); }
  getActiveInteriorForEntity(entity) { return GetInteriorFromEntity(entity); }
}
