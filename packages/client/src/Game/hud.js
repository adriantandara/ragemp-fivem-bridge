import { createUnkProxy, toVec3 } from "./_helpers.js";

export class GameHudNs {
  unk = createUnkProxy();

  beginTextCommandPrint(GxtEntry) { BeginTextCommandPrint(GxtEntry); }
  endTextCommandPrint(duration, drawImmediately) { EndTextCommandPrint(duration, drawImmediately ?? true); }
  addTextComponentSubstringPlayerName(text) { AddTextComponentSubstringPlayerName(text); }
  addTextComponentFloat(value, decimalPlaces) { AddTextComponentFloat(value, decimalPlaces ?? 2); }
  addTextComponentFormattedInteger(value, commaSeparated) { AddTextComponentFormattedInteger(value, commaSeparated ?? false); }
  setTextEntry(text) { SetTextEntry(text); }
  addTextEntry(entryKey, entryText) { AddTextEntry(entryKey, entryText); }
  setTextFont(fontType) { SetTextFont(fontType); }
  setTextScale(scale, scale2) { SetTextScale(scale, scale2); }
  setTextColour(red, green, blue, alpha) { SetTextColour(red, green, blue, alpha); }
  setTextProportional(p0) { SetTextProportional(p0); }
  setTextCentre(align) { SetTextCentre(align); }
  setTextRightJustify(p0) { SetTextRightJustify(p0); }
  setTextWrap(start, end) { SetTextWrap(start, end); }
  setTextDropShadow() { SetTextDropShadow(); }
  setTextOutline() { SetTextOutline(); }
  setTextEdge(p0, r, g, b, a) { SetTextEdge(p0, r, g, b, a); }
  drawText(x, y) { DrawText(x, y); }

  setNotificationTextEntry(text) { SetNotificationTextEntry(text); }
  drawNotification(blink, p1) { return DrawNotification(blink ?? false, p1 ?? true); }
  thefeedNextPostBackgroundColor(r, g, b, a) { ThefeedNextPostBackgroundColor(r, g, b, a); }

  hideHudComponentThisFrame(id) { HideHudComponentThisFrame(id); }
  showHudComponentThisFrame(id) { ShowHudComponentThisFrame(id); }
  setRadarAsInteriorThisFrame(interior, x, y, z, heading) { SetRadarAsInteriorThisFrame(interior, x, y, z, heading); }
  setRadarAsExteriorThisFrame() { if (typeof SetRadarAsExteriorThisFrame === "function") SetRadarAsExteriorThisFrame(); }
  isHudComponentActive(id) { return IsHudComponentActive(id); }
  hideHudAndRadarThisFrame() { HideHudAndRadarThisFrame(); }
  isHudHidden() { return IsHudHidden(); }
  isRadarHidden() { return IsRadarHidden(); }

  addBlipForCoord(x, y, z) { return AddBlipForCoord(x, y, z); }
  addBlipForEntity(entity) { return AddBlipForEntity(entity); }
  addBlipForRadius(x, y, z, radius) { return AddBlipForRadius(x, y, z, radius); }
  removeBlip(blip) { RemoveBlip(blip); }
  setBlipSprite(blip, spriteId) { SetBlipSprite(blip, spriteId); }
  setBlipColour(blip, color) { SetBlipColour(blip, color); }
  setBlipRoute(blip, enabled) { SetBlipRoute(blip, enabled); }
  setBlipScale(blip, scale) { SetBlipScale(blip, scale); }
  setBlipName(blip, name) { BeginTextCommandSetBlipName("STRING"); AddTextComponentSubstringPlayerName(name); EndTextCommandSetBlipName(blip); }
  setBlipFlashes(blip, toggle) { SetBlipFlashes(blip, toggle); }
  setBlipAlpha(blip, alpha) { SetBlipAlpha(blip, alpha); }
  setBlipDisplay(blip, display) { SetBlipDisplay(blip, display); }
  setBlipCategory(blip, index) { SetBlipCategory(blip, index); }
  setBlipAsFriendly(blip, toggle) { SetBlipAsFriendly(blip, toggle); }
  setBlipHighDetail(blip, toggle) { SetBlipHighDetail(blip, toggle); }
  setBlipRotation(blip, rotation) { SetBlipRotation(blip, rotation); }
  isBlipOnMinimap(blip) { return IsBlipOnMinimap(blip); }
  getBlipAlpha(blip) { return GetBlipAlpha(blip); }
  getBlipColour(blip) { return GetBlipColour(blip); }
  getBlipSprite(blip) { return GetBlipSprite(blip); }
  getFirstBlipInfoId(blipType) { return GetFirstBlipInfoId(blipType); }
  getNextBlipInfoId(blipType) { return GetNextBlipInfoId(blipType); }

  setRadarZoom(zoomLevel) { SetRadarZoom(zoomLevel); }
  setMinimapVisible(toggle) { SetMinimapVisible(toggle); }
  displayAreaName(toggle) { DisplayAreaName(toggle); }
  displayCash(toggle) { DisplayCash(toggle); }
  displayHud(toggle) { DisplayHud(toggle); }
  displayRadar(toggle) { DisplayRadar(toggle); }
  lockMinimapPosition(x, y) { LockMinimapPosition(x, y); }
  unlockMinimapPosition() { UnlockMinimapPosition(); }
  setMinimapComponentPosition(name, alignX, alignY, posX, posY, sizeX, sizeY) {
    SetMinimapComponentPosition(name, alignX, alignY, posX, posY, sizeX, sizeY);
  }

  isPauseMenuActive() { return IsPauseMenuActive(); }
  isThisHelpMessageBeingDisplayed(labelName) { return IsThisHelpMessageBeingDisplayed(labelName); }

  getScreenPositionFromWorldPosition(worldX, worldY, worldZ) {
    const [ok, screenX, screenY] = GetScreenCoordFromWorldCoord(worldX, worldY, worldZ);
    return ok ? { x: screenX, y: screenY } : null;
  }
  drawRect(x, y, width, height, r, g, b, a) { DrawRect(x, y, width, height, r, g, b, a); }
  drawSprite(textureDict, textureName, screenX, screenY, width, height, heading, r, g, b, a) {
    DrawSprite(textureDict, textureName, screenX, screenY, width, height, heading, r, g, b, a);
  }
  drawLine(x1, y1, z1, x2, y2, z2, r, g, b, a) { DrawLine(x1, y1, z1, x2, y2, z2, r, g, b, a); }
  draw3DText(x, y, z, text) { DrawText3d(x, y, z, text); }

  getHudColour(hudColorIndex) {
    const [r, g, b, a] = GetHudColour(hudColorIndex);
    return { r, g, b, a };
  }
  setHudColour(hudColorIndex, r, g, b, a) { SetHudColour(hudColorIndex, r, g, b, a); }
}
