import { createUnkProxy, _pollUntilLoaded } from "./_helpers.js";

export class GameStreamingNs {
  unk = createUnkProxy();

  requestModel(model) { RequestModel(model); }
  hasModelLoaded(model) { return HasModelLoaded(model); }
  setModelAsNoLongerNeeded(model) { SetModelAsNoLongerNeeded(model); }
  isModelValid(model) { return IsModelValid(model); }
  isModelAPed(model) { return IsModelAPed(model); }
  isModelAVehicle(model) { return IsModelAVehicle(model); }
  isModelAnObject(model) { return IsModelAnObject(model); }
  isModelInCdimage(model) { return IsModelInCdimage(model); }

  requestAnimDict(animDict) { RequestAnimDict(animDict); }
  hasAnimDictLoaded(animDict) { return HasAnimDictLoaded(animDict); }
  removeAnimDict(animDict) { RemoveAnimDict(animDict); }
  requestAnimSet(animSet) { RequestAnimSet(animSet); }
  hasAnimSetLoaded(animSet) { return HasAnimSetLoaded(animSet); }
  removeAnimSet(animSet) { RemoveAnimSet(animSet); }
  requestClipSet(clipSet) { RequestClipSet(clipSet); }
  hasClipSetLoaded(clipSet) { return HasClipSetLoaded(clipSet); }
  removeClipSet(clipSet) { RemoveClipSet(clipSet); }

  requestPtfxAsset(ptfxAsset) { RequestParticleFxAsset(ptfxAsset); }
  hasPtfxAssetLoaded(ptfxAsset) { return HasParticleFxAssetLoaded(ptfxAsset); }
  removePtfxAsset(ptfxAsset) { RemoveParticleFxAsset(ptfxAsset); }
  requestNamedPtfxAsset(fxName) { RequestNamedPtfxAsset(fxName); }
  hasNamedPtfxAssetLoaded(fxName) { return HasNamedPtfxAssetLoaded(fxName); }

  requestCollisionForModel(modelHash) { RequestCollisionForModel(modelHash); }
  hasCollisionForModelLoaded(modelHash) { return HasCollisionForModelLoaded(modelHash); }

  requestIpl(iplName) { RequestIpl(iplName); }
  removeIpl(iplName) { RemoveIpl(iplName); }
  isIplActive(iplName) { return IsIplActive(iplName); }

  requestStreamedTextureDict(textureDict, p1) { RequestStreamedTextureDict(textureDict, p1 ?? false); }
  hasStreamedTextureDictLoaded(textureDict) { return HasStreamedTextureDictLoaded(textureDict); }
  releaseStreamedTextureDict(textureDict) { SetStreamedTextureDictAsNoLongerNeeded(textureDict); }

  loadScene(x, y, z) { LoadScene(x, y, z); }
  startPlayerSwitch(from, to, flags, switchType) { StartPlayerSwitch(from, to, flags ?? 0, switchType ?? 0); }
  stopPlayerSwitch() { StopPlayerSwitch(); }
  isPlayerSwitchInProgress() { return IsPlayerSwitchInProgress(); }

  requestModelAsync(model, timeout = 5000) {
    return _pollUntilLoaded(RequestModel, HasModelLoaded, model, timeout);
  }
  requestAnimDictAsync(name, timeout = 5000) {
    return _pollUntilLoaded(RequestAnimDict, HasAnimDictLoaded, name, timeout);
  }
  requestAnimSetAsync(name, timeout = 5000) {
    return _pollUntilLoaded(RequestAnimSet, HasAnimSetLoaded, name, timeout);
  }
  requestClipSetAsync(name, timeout = 5000) {
    return _pollUntilLoaded(RequestClipSet, HasClipSetLoaded, name, timeout);
  }
  requestNamedPtfxAssetAsync(name, timeout = 5000) {
    return _pollUntilLoaded(RequestNamedPtfxAsset, HasNamedPtfxAssetLoaded, name, timeout);
  }
  requestCollisionForModelAsync(modelHash, timeout = 5000) {
    return _pollUntilLoaded(RequestCollisionForModel, HasCollisionForModelLoaded, modelHash, timeout);
  }
}
