import { createUnkProxy, toVec3 } from "./_helpers.js";

export class GameGraphicsNs {
  unk = createUnkProxy();

  screen2dToWorld3d(screenX, screenY) {
    let sx = screenX;
    let sy = screenY;
    if (sx != null && typeof sx === "object") {
      sy = sx.y ?? sx[1] ?? 0;
      sx = sx.x ?? sx[0] ?? 0;
    }
    const [coords] = GetWorldCoordFromScreenCoord(+sx || 0, +sy || 0);
    return coords ? toVec3(coords) : null;
  }

  drawLight(x, y, z, r, g, b, intensity, radius) { DrawLightWithRangeAndShadow(x, y, z, r, g, b, radius ?? 20.0, intensity ?? 1.0, 0); }
  drawSpotLight(x, y, z, dirX, dirY, dirZ, r, g, b, distance, brightness, roundness, radius, falloff) {
    DrawSpotLight(x, y, z, dirX, dirY, dirZ, r, g, b, distance, brightness, roundness, radius, falloff);
  }
  drawSpotLightWithShadow(x, y, z, dirX, dirY, dirZ, r, g, b, distance, brightness, roundness, radius, falloff, shadowId) {
    DrawSpotLightWithShadow(x, y, z, dirX, dirY, dirZ, r, g, b, distance, brightness, roundness, radius, falloff, shadowId);
  }

  useParticleFxAssetNextCall(name) { UseParticleFxAssetNextCall(name); }
  startParticleFxLoopedAtCoord(fxName, x, y, z, xRot, yRot, zRot, scale, p7, p8, p9, p10) {
    return StartParticleFxLoopedAtCoord(fxName, x, y, z, xRot ?? 0, yRot ?? 0, zRot ?? 0, scale ?? 1.0, p7 ?? false, p8 ?? false, p9 ?? false, p10 ?? false);
  }
  startParticleFxLoopedOnEntity(fxName, entity, xOff, yOff, zOff, xRot, yRot, zRot, scale) {
    return StartParticleFxLoopedOnEntity(fxName, entity, xOff ?? 0, yOff ?? 0, zOff ?? 0, xRot ?? 0, yRot ?? 0, zRot ?? 0, scale ?? 1.0);
  }
  stopParticleFxLooped(ptFxHandle, killImmediate) { StopParticleFxLooped(ptFxHandle, killImmediate ?? false); }
  startParticleFxNonLoopedAtCoord(fxName, x, y, z, xRot, yRot, zRot, scale, p7, p8, p9) {
    return StartParticleFxNonLoopedAtCoord(fxName, x, y, z, xRot ?? 0, yRot ?? 0, zRot ?? 0, scale ?? 1.0, p7 ?? false, p8 ?? false, p9 ?? false);
  }
  startParticleFxNonLoopedOnEntity(fxName, entity, xOff, yOff, zOff, xRot, yRot, zRot, scale) {
    return StartParticleFxNonLoopedOnEntity(fxName, entity, xOff ?? 0, yOff ?? 0, zOff ?? 0, xRot ?? 0, yRot ?? 0, zRot ?? 0, scale ?? 1.0);
  }
  removeParticleFx(ptFxHandle, killImmediate) { RemoveParticleFx(ptFxHandle, killImmediate ?? false); }
  doesParticleFxLoopedExist(ptFxHandle) { return DoesParticleFxLoopedExist(ptFxHandle); }
  setParticleFxLoopedEvolution(ptFxHandle, propertyName, amount, noMult) {
    SetParticleFxLoopedEvolution(ptFxHandle, propertyName, amount, noMult ?? false);
  }
  setParticleFxNonLoopedColour(r, g, b) { SetParticleFxNonLoopedColour(r, g, b); }
  setParticleFxLoopedColour(ptFxHandle, r, g, b, noMult) { SetParticleFxLoopedColour(ptFxHandle, r, g, b, noMult ?? false); }
  setParticleFxLoopedAlpha(ptFxHandle, alpha) { SetParticleFxLoopedAlpha(ptFxHandle, alpha); }
  setParticleFxLoopedScale(ptFxHandle, scale) { SetParticleFxLoopedScale(ptFxHandle, scale); }

  setArtificialLightsState(toggle) { SetArtificialLightsState(toggle); }
  setArtificialLightsStateAffectsVehicles(toggle) { SetArtificialLightsStateAffectsVehicles(toggle); }

  requestStreamedTextureDict(textureDict, p1) { RequestStreamedTextureDict(textureDict, p1 ?? false); }
  hasStreamedTextureDictLoaded(textureDict) { return HasStreamedTextureDictLoaded(textureDict); }
  releaseStreamedTextureDict(textureDict) { SetStreamedTextureDictAsNoLongerNeeded(textureDict); }
  drawSprite(textureDict, textureName, screenX, screenY, width, height, heading, r, g, b, alpha, unk) {
    DrawSprite(textureDict, textureName, screenX, screenY, width, height, heading ?? 0, r, g, b, alpha ?? 255, unk ?? false);
  }
}
