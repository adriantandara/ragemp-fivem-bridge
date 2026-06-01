import { createUnkProxy, toVec3 } from "./_helpers.js";

export class GameHudNs {
  unk = createUnkProxy();

  beginTextCommandPrint(GxtEntry: string): void { BeginTextCommandPrint(GxtEntry); }
  endTextCommandPrint(duration: number, drawImmediately: boolean): void { EndTextCommandPrint(duration, drawImmediately ?? true); }
  addTextComponentSubstringPlayerName(text: string): void { AddTextComponentSubstringPlayerName(text); }
  addTextComponentFloat(value: number, decimalPlaces: number): void { AddTextComponentFloat(value, decimalPlaces ?? 2); }
  addTextComponentFormattedInteger(value: number, commaSeparated: boolean): void { AddTextComponentFormattedInteger(value, commaSeparated ?? false); }
  setTextEntry(text: string): void { SetTextEntry(text); }
  setTextFont(fontType: number): void { SetTextFont(fontType); }
  setTextScale(scale: number, scale2: number): void { SetTextScale(scale, scale2); }
  setTextColour(red: number, green: number, blue: number, alpha: number): void { SetTextColour(red, green, blue, alpha); }
  setTextProportional(p0: boolean): void { SetTextProportional(p0); }
  setTextCentre(align: boolean): void { SetTextCentre(align); }
  setTextRightJustify(p0: boolean): void { SetTextRightJustify(p0); }
  setTextWrap(start: number, end: number): void { SetTextWrap(start, end); }
  setTextDropShadow(): void { SetTextDropShadow(); }
  setTextOutline(): void { SetTextOutline(); }
  setTextEdge(p0: number, r: number, g: number, b: number, a: number): void { SetTextEdge(p0, r, g, b, a); }
  drawText(x: number, y: number): void { DrawText(x, y); }

  setNotificationTextEntry(text: string): void { SetNotificationTextEntry(text); }
  drawNotification(blink: boolean, p1: boolean): number { return DrawNotification(blink ?? false, p1 ?? true); }

  hideHudComponentThisFrame(id: number): void { HideHudComponentThisFrame(id); }
  showHudComponentThisFrame(id: number): void { ShowHudComponentThisFrame(id); }
  setRadarAsInteriorThisFrame(interior: number, x: number, y: number, z: number, heading: number): void { SetRadarAsInteriorThisFrame(interior, x, y, z, heading); }
  setRadarAsExteriorThisFrame(): void { if (typeof SetRadarAsExteriorThisFrame === "function") SetRadarAsExteriorThisFrame(); }
  isHudComponentActive(id: number): boolean { return IsHudComponentActive(id); }
  isRadarHidden(): boolean { return IsRadarHidden(); }

  addBlipForCoord(x: number, y: number, z: number): number { return AddBlipForCoord(x, y, z); }
  addBlipForEntity(entity: number): number { return AddBlipForEntity(entity); }
  addBlipForRadius(x: number, y: number, z: number, radius: number): number { return AddBlipForRadius(x, y, z, radius); }
  removeBlip(blip: number): void { RemoveBlip(blip); }
  setBlipSprite(blip: number, spriteId: number): void { SetBlipSprite(blip, spriteId); }
  setBlipColour(blip: number, color: number): void { SetBlipColour(blip, color); }
  setBlipRoute(blip: number, enabled: boolean): void { SetBlipRoute(blip, enabled); }
  setBlipScale(blip: number, scale: number): void { SetBlipScale(blip, scale); }
  setBlipFlashes(blip: number, toggle: boolean): void { SetBlipFlashes(blip, toggle); }
  setBlipAlpha(blip: number, alpha: number): void { SetBlipAlpha(blip, alpha); }
  setBlipDisplay(blip: number, display: number): void { SetBlipDisplay(blip, display); }
  setBlipCategory(blip: number, index: number): void { SetBlipCategory(blip, index); }
  setBlipAsFriendly(blip: number, toggle: boolean): void { SetBlipAsFriendly(blip, toggle); }
  setBlipHighDetail(blip: number, toggle: boolean): void { SetBlipHighDetail(blip, toggle); }
  setBlipRotation(blip: number, rotation: number): void { SetBlipRotation(blip, rotation); }
  isBlipOnMinimap(blip: number): boolean { return IsBlipOnMinimap(blip); }
  getBlipAlpha(blip: number): number { return GetBlipAlpha(blip); }
  getBlipColour(blip: number): number { return GetBlipColour(blip); }
  getBlipSprite(blip: number): number { return GetBlipSprite(blip); }
  getFirstBlipInfoId(blipType: number): number { return GetFirstBlipInfoId(blipType); }
  getNextBlipInfoId(blipType: number): number { return GetNextBlipInfoId(blipType); }

  setRadarZoom(zoomLevel: number): void { SetRadarZoom(zoomLevel); }
  setMinimapVisible(toggle: boolean): void { SetMinimapVisible(toggle); }
  displayAreaName(toggle: boolean): void { DisplayAreaName(toggle); }
  displayCash(toggle: boolean): void { DisplayCash(toggle); }
  displayHud(toggle: boolean): void { DisplayHud(toggle); }
  displayRadar(toggle: boolean): void { DisplayRadar(toggle); }
  lockMinimapPosition(x: number, y: number): void { LockMinimapPosition(x, y); }
  unlockMinimapPosition(): void { UnlockMinimapPosition(); }

  isPauseMenuActive(): boolean { return IsPauseMenuActive(); }

  getScreenPositionFromWorldPosition(worldX: number, worldY: number, worldZ: number): { x: number; y: number } | null {
    const [ok, screenX, screenY] = GetScreenCoordFromWorldCoord(worldX, worldY, worldZ);
    return ok ? { x: screenX, y: screenY } : null;
  }

  getHudColour(hudColorIndex: number): { r: number; g: number; b: number; a: number } {
    const [r, g, b, a] = GetHudColour(hudColorIndex);
    return { r, g, b, a };
  }
  setHudColour(hudColorIndex: number, r: number, g: number, b: number, a: number): void { SetHudColour(hudColorIndex, r, g, b, a); }

  setMultiplayerHudCash(cash: number, forever: boolean): void { (SetMultiplayerHudCash as any)(cash, forever); }
  isScriptedHudComponentActive(id: number): boolean { return IsScriptedHudComponentActive(id); }
  hideScriptedHudComponentThisFrame(id: number): void { HideScriptedHudComponentThisFrame(id); }
  resetHudComponentValues(id: number): void { ResetHudComponentValues(id); }
  setHudComponentPosition(id: number, x: number, y: number): void { SetHudComponentPosition(id, x, y); }
  getHudComponentPosition(id: number): import('@ragemp-fivem-bridge/shared').Vector3 { return toVec3(GetHudComponentPosition(id)); }

  beginTextCommandBusyspinnerOn(string: string): void { BeginTextCommandBusyspinnerOn(string); }
  endTextCommandBusyspinnerOn(busySpinnerType: number): void { EndTextCommandBusyspinnerOn(busySpinnerType); }
  busyspinnerOff(): void { BusyspinnerOff(); }
  preloadBusyspinner(): void { PreloadBusyspinner(); }
  busyspinnerIsOn(): boolean { return BusyspinnerIsOn(); }
  busyspinnerIsDisplaying(): boolean { return BusyspinnerIsDisplaying(); }

  thefeedOnlyShowTooltips(toggle: boolean): void { ThefeedOnlyShowTooltips(toggle); }
  thefeedSetScriptedMenuHeight(pos: number): void { ThefeedSetScriptedMenuHeight(pos); }
  thefeedHideThisFrame(): void { ThefeedHideThisFrame(); }
  thefeedFlushQueue(): void { ThefeedFlushQueue(); }
  thefeedRemoveItem(notificationId: number): void { ThefeedRemoveItem(notificationId); }
  thefeedForceRenderOn(): void { ThefeedForceRenderOn(); }
  thefeedForceRenderOff(): void { ThefeedForceRenderOff(); }
  thefeedPause(): void { ThefeedPause(); }
  thefeedResume(): void { ThefeedResume(); }
  thefeedIsPaused(): boolean { return ThefeedIsPaused(); }
  thefeedResetAllParameters(): void { ThefeedResetAllParameters(); }
  thefeedFreezeNextPost(): void { ThefeedFreezeNextPost(); }
  thefeedClearFrozenPost(): void { ThefeedClearFrozenPost(); }

  beginTextCommandThefeedPost(text: string): void { BeginTextCommandThefeedPost(text); }
  endTextCommandThefeedPostTicker(isImportant: boolean, cacheMessage: boolean): number { return EndTextCommandThefeedPostTicker(isImportant, cacheMessage); }
  endTextCommandThefeedPostTickerForced(isImportant: boolean, cacheMessage: boolean): number { return EndTextCommandThefeedPostTickerForced(isImportant, cacheMessage); }
  endTextCommandThefeedPostTickerWithTokens(isImportant: boolean, cacheMessage: boolean): number { return EndTextCommandThefeedPostTickerWithTokens(isImportant, cacheMessage); }
  endTextCommandThefeedPostAward(textureDict: string, textureName: string, rpBonus: number, colorOverlay: number, titleLabel: string): number { return EndTextCommandThefeedPostAward(textureDict, textureName, rpBonus, colorOverlay, titleLabel); }
  endTextCommandThefeedPostUnlock(p0: string, p1: number, p2: string): number { return EndTextCommandThefeedPostUnlock(p0, p1, p2); }
  endTextCommandThefeedPostUnlockTu(p0: string, p1: number, p2: number, p3: string): number { return (EndTextCommandThefeedPostUnlockTu as any)(p0, p1, p2, p3); }
  endTextCommandThefeedPostUnlockTuWithColor(p0: string, p1: number, p2: number, p3: string, p4: number, p5: number): number { return (EndTextCommandThefeedPostUnlockTuWithColor as any)(p0, p1, p2, p3, p4, p5); }
  endTextCommandThefeedPostMpticker(blink: boolean, p1: boolean): number { return EndTextCommandThefeedPostMpticker(blink, p1); }
  endTextCommandThefeedPostVersusTu(ch1TXD: string, ch1TXN: string, val1: number, ch2TXD: string, ch2TXN: string, val2: number): number { return EndTextCommandThefeedPostVersusTu(ch1TXD, ch1TXN, val1, ch2TXD, ch2TXN, val2); }
  endTextCommandThefeedPostReplayInput(type: number, button: string, text: string): number { return EndTextCommandThefeedPostReplayInput(type, button, text); }

  beginTextCommandIsMessageDisplayed(text: string): void { BeginTextCommandIsMessageDisplayed(text); }
  endTextCommandIsMessageDisplayed(): boolean { return EndTextCommandIsMessageDisplayed(); }
  beginTextCommandDisplayText(text: string): void { BeginTextCommandDisplayText(text); }
  endTextCommandDisplayText(x: number, y: number): void { EndTextCommandDisplayText(x, y); }
  beginTextCommandDisplayHelp(inputType: string): void { BeginTextCommandDisplayHelp(inputType); }
  endTextCommandDisplayHelp(helpid: number, loop: boolean, beep: boolean, shape: number): void { EndTextCommandDisplayHelp(helpid, loop, beep, shape); }
  beginTextCommandIsThisHelpMessageBeingDisplayed(labelName: string): void { BeginTextCommandIsThisHelpMessageBeingDisplayed(labelName); }
  endTextCommandIsThisHelpMessageBeingDisplayed(p0: number): boolean { return EndTextCommandIsThisHelpMessageBeingDisplayed(p0); }
  beginTextCommandSetBlipName(textLabel: string): void { BeginTextCommandSetBlipName(textLabel); }
  endTextCommandSetBlipName(blip: number): void { EndTextCommandSetBlipName(blip); }
  beginTextCommandClearPrint(text: string): void { BeginTextCommandClearPrint(text); }
  endTextCommandClearPrint(): void { EndTextCommandClearPrint(); }
  beginTextCommandOverrideButtonText(gxtEntry: string): void { BeginTextCommandOverrideButtonText(gxtEntry); }
  endTextCommandOverrideButtonText(p0: number): void { EndTextCommandOverrideButtonText(p0); }

  addTextComponentInteger(value: number): void { AddTextComponentInteger(value); }
  addTextComponentSubstringTextLabel(labelName: string): void { AddTextComponentSubstringTextLabel(labelName); }
  addTextComponentSubstringTextLabelHashKey(gxtEntryHash: number): void { AddTextComponentSubstringTextLabelHashKey(gxtEntryHash); }
  addTextComponentSubstringBlipName(blip: number): void { AddTextComponentSubstringBlipName(blip); }
  addTextComponentSubstringTime(timestamp: number, flags: number): void { AddTextComponentSubstringTime(timestamp, flags); }
  addTextComponentSubstringPhoneNumber(p0: string, p1: number): void { AddTextComponentSubstringPhoneNumber(p0, p1); }
  addTextComponentSubstringWebsite(website: string): void { AddTextComponentSubstringWebsite(website); }
  addTextComponentSubstringKeyboardDisplay(string: string): void { AddTextComponentSubstringKeyboardDisplay(string); }
  setColourOfNextTextComponent(hudColor: number): void { SetColourOfNextTextComponent(hudColor); }

  clearPrints(): void { ClearPrints(); }
  clearBrief(): void { ClearBrief(); }
  clearAllHelpMessages(): void { ClearAllHelpMessages(); }
  clearThisPrint(p0: string): void { ClearThisPrint(p0); }
  clearSmallPrints(): void { ClearSmallPrints(); }
  doesTextBlockExist(gxt: string): boolean { return DoesTextBlockExist(gxt); }
  requestAdditionalText(gxt: string, slot: number): void { RequestAdditionalText(gxt, slot); }
  requestAdditionalTextForDlc(gxt: string, slot: number): void { RequestAdditionalTextForDlc(gxt, slot); }
  hasAdditionalTextLoaded(slot: number): boolean { return HasAdditionalTextLoaded(slot); }
  clearAdditionalText(slotNumber: number, clearPrevious: boolean): void { ClearAdditionalText(slotNumber, clearPrevious); }
  isStreamingAdditionalText(slotNumber: number): boolean { return IsStreamingAdditionalText(slotNumber); }
  hasThisAdditionalTextLoaded(gxt: string, slot: number): boolean { return HasThisAdditionalTextLoaded(gxt, slot); }
  isMessageBeingDisplayed(): boolean { return IsMessageBeingDisplayed(); }
  doesTextLabelExist(gxt: string): boolean { return DoesTextLabelExist(gxt); }
  getLengthOfStringWithThisTextLabel(gxt: string): number { return GetLengthOfStringWithThisTextLabel(gxt); }
  getLengthOfLiteralString(string: string): number { return GetLengthOfLiteralString(string); }
  getLengthOfLiteralStringInBytes(string: string): number { return GetLengthOfLiteralStringInBytes(string); }
  getStreetNameFromHashKey(hash: number): string { return GetStreetNameFromHashKey(hash); }

  isPreferenceSwitchedOn(): boolean { return IsHudPreferenceSwitchedOn(); }
  isRadarPreferenceSwitchedOn(): boolean { return IsRadarPreferenceSwitchedOn(); }
  isSubtitlePreferenceSwitchedOn(): boolean { return IsSubtitlePreferenceSwitchedOn(); }
  display(toggle: boolean): void { DisplayHud(toggle); }
  displayWhenPausedThisFrame(): void { DisplayHudWhenPausedThisFrame(); }
  isHidden(): boolean { return IsHudHidden(); }
  isMinimapRendering(): boolean { return IsMinimapRendering(); }

  clearAllBlipRoutes(): void { ClearAllBlipRoutes(); }
  setBlipRouteColour(blip: number, colour: number): void { SetBlipRouteColour(blip, colour); }
  addNextMessageToPreviousBriefs(p0: boolean): void { AddNextMessageToPreviousBriefs(p0); }
  setRadarZoomPrecise(zoom: number): void { SetRadarZoomPrecise(zoom); }
  setRadarZoomToBlip(blip: number, zoom: number): void { SetRadarZoomToBlip(blip, zoom); }
  setRadarZoomToDistance(zoom: number): void { SetRadarZoomToDistance(zoom); }

  getColour(hudColorIndex: number): { r: number; g: number; b: number; a: number } {
    const [r, g, b, a] = GetHudColour(hudColorIndex);
    return { r, g, b, a };
  }
  replaceColour(hudColorIndex: number, hudColorIndex2: number): void { ReplaceHudColour(hudColorIndex, hudColorIndex2); }
  replaceColourWithRgba(hudColorIndex: number, r: number, g: number, b: number, a: number): void { ReplaceHudColourWithRgba(hudColorIndex, r, g, b, a); }

  flashAbilityBar(millisecondsToFlash: number): void { FlashAbilityBar(millisecondsToFlash); }
  setAbilityBarValue(percentage: number, maxPercentage: number): void { SetAbilityBarValue(percentage, maxPercentage); }
  flashWantedDisplay(flashing: boolean): void { FlashWantedDisplay(flashing); }
  getRenderedCharacterHeight(size: number, font: number): number { return GetRenderedCharacterHeight(size, font); }

  setTextJustification(justifyType: number): void { SetTextJustification(justifyType); }
  setTextLeading(p0: boolean): void { (SetTextLeading as any)(p0); }
  setTextDropshadow(distance: number, r: number, g: number, b: number, a: number): void { SetTextDropshadow(distance, r, g, b, a); }
  setTextRenderId(renderId: number): void { SetTextRenderId(renderId); }
  getDefaultScriptRendertargetRenderId(): number { return GetDefaultScriptRendertargetRenderId(); }
  registerNamedRendertarget(name: string, delay: boolean): boolean { return RegisterNamedRendertarget(name, delay); }
  isNamedRendertargetRegistered(name: string): boolean { return IsNamedRendertargetRegistered(name); }
  releaseNamedRendertarget(name: string): boolean { return ReleaseNamedRendertarget(name); }
  linkNamedRendertarget(modelHash: number): void { LinkNamedRendertarget(modelHash); }
  getNamedRendertargetRenderId(name: string): number { return GetNamedRendertargetRenderId(name); }
  isNamedRendertargetLinked(modelHash: number): boolean { return IsNamedRendertargetLinked(modelHash); }

  clearHelp(toggle: boolean): void { ClearHelp(toggle); }
  isHelpMessageOnScreen(): boolean { return IsHelpMessageOnScreen(); }
  isHelpMessageBeingDisplayed(): boolean { return IsHelpMessageBeingDisplayed(); }
  isHelpMessageFadingOut(): boolean { return IsHelpMessageFadingOut(); }

  getStandardBlipEnumId(): number { return GetStandardBlipEnumId(); }
  getWaypointBlipEnumId(): number { return GetWaypointBlipEnumId(); }
  getNumberOfActiveBlips(): number { return GetNumberOfActiveBlips(); }
  getBlipInfoIdCoord(blip: number): import('@ragemp-fivem-bridge/shared').Vector3 { return toVec3(GetBlipInfoIdCoord(blip)); }
  getBlipInfoIdDisplay(blip: number): number { return GetBlipInfoIdDisplay(blip); }
  getBlipInfoIdType(blip: number): number { return GetBlipInfoIdType(blip); }
  getBlipInfoIdEntityIndex(blip: number): number { return GetBlipInfoIdEntityIndex(blip); }
  getBlipInfoIdPickupIndex(blip: number): number { return GetBlipInfoIdPickupIndex(blip); }
  getBlipFromEntity(entity: number): number { return GetBlipFromEntity(entity); }
  addBlipForArea(x: number, y: number, z: number, width: number, height: number): number { return AddBlipForArea(x, y, z, width, height); }
  addBlipForPickup(pickup: number): number { return AddBlipForPickup(pickup); }
  triggerSonarBlip(posX: number, posY: number, posZ: number, radius: number, p4: boolean): void { (TriggerSonarBlip as any)(posX, posY, posZ, radius, p4); }
  allowSonarBlips(toggle: boolean): void { AllowSonarBlips(toggle); }
  setBlipCoords(blip: number, posX: number, posY: number, posZ: number): void { SetBlipCoords(blip, posX, posY, posZ); }
  getBlipCoords(blip: number): import('@ragemp-fivem-bridge/shared').Vector3 { return toVec3(GetBlipCoords(blip)); }
  setBlipNameFromTextFile(blip: number, gxtEntry: string): void { SetBlipNameFromTextFile(blip, gxtEntry); }
  setBlipNameToPlayerName(blip: number, player: number): void { SetBlipNameToPlayerName(blip, player); }
  setBlipFade(blip: number, opacity: number, duration: number): void { SetBlipFade(blip, opacity, duration); }
  setBlipFlashTimer(blip: number, duration: number): void { SetBlipFlashTimer(blip, duration); }
  setBlipFlashInterval(blip: number, ms: number): void { SetBlipFlashInterval(blip, ms); }
  setBlipSecondaryColour(blip: number, r: number, g: number, b: number): void { SetBlipSecondaryColour(blip, r, g, b); }
  isBlipShortRange(blip: number): boolean { return IsBlipShortRange(blip); }
  doesBlipHaveGpsRoute(blip: number): boolean { return DoesBlipHaveGpsRoute(blip); }
  setBlipHiddenOnLegend(blip: number, toggle: boolean): void { SetBlipHiddenOnLegend(blip, toggle); }
  setBlipAsMissionCreatorBlip(blip: number, toggle: boolean): void { SetBlipAsMissionCreatorBlip(blip, toggle); }
  isMissionCreatorBlip(blip: number): boolean { return IsMissionCreatorBlip(blip); }
  getNewSelectedMissionCreatorBlip(): number { return GetNewSelectedMissionCreatorBlip(); }
  isHoveringOverMissionCreatorBlip(): boolean { return IsHoveringOverMissionCreatorBlip(); }
  showStartMissionInstructionalButton(p0: boolean): void { ShowStartMissionInstructionalButton(p0); }
  setBlipFlashesAlternate(blip: number, toggle: boolean): void { SetBlipFlashesAlternate(blip, toggle); }
  isBlipFlashing(blip: number): boolean { return IsBlipFlashing(blip); }
  setBlipAsShortRange(blip: number, toggle: boolean): void { SetBlipAsShortRange(blip, toggle); }
  setBlipPriority(blip: number, priority: number): void { SetBlipPriority(blip, priority); }
  pulseBlip(blip: number): void { PulseBlip(blip); }
  showNumberOnBlip(blip: number, number: number): void { ShowNumberOnBlip(blip, number); }
  hideNumberOnBlip(blip: number): void { HideNumberOnBlip(blip); }
  showHeightOnBlip(blip: number, toggle: boolean): void { ShowHeightOnBlip(blip, toggle); }
  showTickOnBlip(blip: number, toggle: boolean): void { ShowTickOnBlip(blip, toggle); }
  showHeadingIndicatorOnBlip(blip: number, toggle: boolean): void { ShowHeadingIndicatorOnBlip(blip, toggle); }
  showOutlineIndicatorOnBlip(blip: number, toggle: boolean): void { ShowOutlineIndicatorOnBlip(blip, toggle); }
  showFriendIndicatorOnBlip(blip: number, toggle: boolean): void { ShowFriendIndicatorOnBlip(blip, toggle); }
  showCrewIndicatorOnBlip(blip: number, toggle: boolean): void { ShowCrewIndicatorOnBlip(blip, toggle); }
  setRadiusBlipEdge(blip: number, toggle: boolean): void { SetRadiusBlipEdge(blip, toggle); }
  doesBlipExist(blip: number): boolean { return DoesBlipExist(blip); }
  setWaypointOff(): void { SetWaypointOff(); }
  refreshWaypoint(): void { RefreshWaypoint(); }
  isWaypointActive(): boolean { return IsWaypointActive(); }
  setNewWaypoint(x: number, y: number): void { SetNewWaypoint(x, y); }
  setBlipBright(blip: number, toggle: boolean): void { SetBlipBright(blip, toggle); }
  setBlipShowCone(blip: number, toggle: boolean): void { SetBlipShowCone(blip, toggle); }
  setMinimapComponent(componentId: number, toggle: boolean, overrideColor: number): boolean { return (SetMinimapComponent as any)(componentId, toggle, overrideColor); }
  getMainPlayerBlipId(): number { return GetMainPlayerBlipId(); }
  getBlipRotation(blip: number): number { return GetBlipRotation(blip); }
  setBlipAsMinimalOnEdge(blip: number, p1: boolean): void { SetBlipAsMinimalOnEdge(blip, p1); }

  hideLoadingOnFadeThisFrame(): void { HideLoadingOnFadeThisFrame(); }
  hideMinimapExteriorMapThisFrame(): void { HideMinimapExteriorMapThisFrame(); }
  hideMinimapInteriorMapThisFrame(): void { HideMinimapInteriorMapThisFrame(); }
  dontTiltMinimapThisFrame(): void { DontTiltMinimapThisFrame(); }
  setWidescreenFormat(p0: number): void { SetWidescreenFormat(p0); }
  displayAmmoThisFrame(display: boolean): void { DisplayAmmoThisFrame(display); }
  displaySniperScopeThisFrame(): void { DisplaySniperScopeThisFrame(); }
  hideAndRadarThisFrame(): void { HideHudAndRadarThisFrame(); }
  setMultiplayerWalletCash(): void { SetMultiplayerWalletCash(); }
  removeMultiplayerWalletCash(): void { RemoveMultiplayerWalletCash(); }
  setMultiplayerBankCash(): void { SetMultiplayerBankCash(); }
  removeMultiplayerBankCash(): void { RemoveMultiplayerBankCash(); }
  hideHelpTextThisFrame(): void { HideHelpTextThisFrame(); }
  displayHelpTextThisFrame(message: string, curvedWindow: boolean): void { DisplayHelpTextThisFrame(message, curvedWindow); }

  setGpsFlags(flag: number, blippedRouteDistance: boolean): void { (SetGpsFlags as any)(flag, blippedRouteDistance); }
  clearGpsFlags(): void { ClearGpsFlags(); }
  setRaceTrackRender(toggle: boolean): void { SetRaceTrackRender(toggle); }
  clearGpsRaceTrack(): void { ClearGpsRaceTrack(); }
  startGpsCustomRoute(hudColor: number, displayOnFoot: boolean, followPlayer: boolean): void { StartGpsCustomRoute(hudColor, displayOnFoot, followPlayer); }
  addPointToGpsCustomRoute(x: number, y: number, z: number): void { AddPointToGpsCustomRoute(x, y, z); }
  setGpsCustomRouteRender(toggle: boolean, radarThickness: number, mapThickness: number): void { SetGpsCustomRouteRender(toggle, radarThickness, mapThickness); }
  clearGpsCustomRoute(): void { ClearGpsCustomRoute(); }
  startGpsMultiRoute(hudColor: number, routeFromPlayer: boolean, displayOnFoot: boolean): void { StartGpsMultiRoute(hudColor, routeFromPlayer, displayOnFoot); }
  addPointToGpsMultiRoute(x: number, y: number, z: number): void { AddPointToGpsMultiRoute(x, y, z); }
  setGpsMultiRouteRender(toggle: boolean): void { SetGpsMultiRouteRender(toggle); }
  clearGpsMultiRoute(): void { ClearGpsMultiRoute(); }
  clearGpsPlayerWaypoint(): void { ClearGpsPlayerWaypoint(); }
  setGpsFlashes(toggle: boolean): void { SetGpsFlashes(toggle); }
  flashMinimapDisplay(): void { FlashMinimapDisplay(); }
  flashMinimapDisplayWithColor(hudColorIndex: number): void { FlashMinimapDisplayWithColor(hudColorIndex); }
  toggleStealthRadar(toggle: boolean): void { ToggleStealthRadar(toggle); }
  setMinimapInSpectatorMode(toggle: boolean, ped: number): void { SetMinimapInSpectatorMode(toggle, ped); }
  setMissionName(p0: boolean, name: string): void { SetMissionName(p0, name); }
  setMinimapBlockWaypoint(toggle: boolean): void { SetMinimapBlockWaypoint(toggle); }
  setMinimapInPrologue(toggle: boolean): void { SetMinimapInPrologue(toggle); }
  setMinimapHideFow(toggle: boolean): void { SetMinimapHideFow(toggle); }
  getMinimapFowDiscoveryRatio(): number { return GetMinimapFowDiscoveryRatio(); }
  getMinimapFowCoordinateIsRevealed(x: number, y: number, z: number): boolean { return GetMinimapFowCoordinateIsRevealed(x, y, z); }
  setMinimapFowRevealCoordinate(x: number, y: number, z: number): void { SetMinimapFowRevealCoordinate(x, y, z); }
  setMinimapGolfCourse(hole: number): void { SetMinimapGolfCourse(hole); }
  setMinimapGolfCourseOff(): void { SetMinimapGolfCourseOff(); }
  lockMinimapAngle(angle: number): void { LockMinimapAngle(angle); }
  unlockMinimapAngle(): void { UnlockMinimapAngle(); }
  setBigmapActive(toggleBigMap: boolean, showFullMap: boolean): void { SetBigmapActive(toggleBigMap, showFullMap); }

  isComponentActive(id: number): boolean { return IsHudComponentActive(id); }
  hideComponentThisFrame(id: number): void { HideHudComponentThisFrame(id); }
  showComponentThisFrame(id: number): void { ShowHudComponentThisFrame(id); }
  resetReticuleValues(): void { ResetReticuleValues(); }
  resetComponentValues(id: number): void { ResetHudComponentValues(id); }
  setComponentPosition(id: number, x: number, y: number): void { SetHudComponentPosition(id, x, y); }
  getComponentPosition(id: number): import('@ragemp-fivem-bridge/shared').Vector3 { return toVec3(GetHudComponentPosition(id)); }
  clearReminderMessage(): void { ClearReminderMessage(); }

  openReportugcMenu(): void { OpenReportugcMenu(); }
  forceCloseReportugcMenu(): void { ForceCloseReportugcMenu(); }
  isReportugcMenuOpen(): boolean { return IsReportugcMenuOpen(); }
  isFloatingHelpTextOnScreen(hudIndex: number): boolean { return IsFloatingHelpTextOnScreen(hudIndex); }
  setFloatingHelpTextScreenPosition(hudIndex: number, x: number, y: number): void { SetFloatingHelpTextScreenPosition(hudIndex, x, y); }
  setFloatingHelpTextWorldPosition(hudIndex: number, x: number, y: number, z: number): void { SetFloatingHelpTextWorldPosition(hudIndex, x, y, z); }
  setFloatingHelpTextToEntity(hudIndex: number, entity: number, offsetX: number, offsetY: number): void { SetFloatingHelpTextToEntity(hudIndex, entity, offsetX, offsetY); }
  setFloatingHelpTextStyle(helpIndex: number, style: number, color: number, alpha: number, direction: number, offset: number): void { SetFloatingHelpTextStyle(helpIndex, style, color, alpha, direction, offset); }
  clearFloatingHelp(helpIndex: number, clearNow: boolean): void { ClearFloatingHelp(helpIndex, clearNow); }

  isMpGamerTagMovieActive(): boolean { return IsMpGamerTagMovieActive(); }
  createFakeMpGamerTag(ped: number, username: string, pointedClanTag: boolean, isRockstarClan: boolean, clanTag: string, clanFlag: number): number { return CreateFakeMpGamerTag(ped, username, pointedClanTag, isRockstarClan, clanTag, clanFlag); }
  removeMpGamerTag(gamerTagId: number): void { RemoveMpGamerTag(gamerTagId); }
  isMpGamerTagActive(gamerTagId: number): boolean { return IsMpGamerTagActive(gamerTagId); }
  isMpGamerTagFree(gamerTagId: number): boolean { return IsMpGamerTagFree(gamerTagId); }
  setMpGamerTagVisibility(gamerTagId: number, component: number, toggle: boolean): void { SetMpGamerTagVisibility(gamerTagId, component, toggle); }
  setMpGamerTagColour(gamerTagId: number, component: number, hudColorIndex: number): void { SetMpGamerTagColour(gamerTagId, component, hudColorIndex); }
  setMpGamerTagHealthBarColour(gamerTagId: number, hudColorIndex: number): void { SetMpGamerTagHealthBarColour(gamerTagId, hudColorIndex); }
  setMpGamerTagAlpha(gamerTagId: number, component: number, alpha: number): void { SetMpGamerTagAlpha(gamerTagId, component, alpha); }
  setMpGamerTagWantedLevel(gamerTagId: number, wantedlvl: number): void { SetMpGamerTagWantedLevel(gamerTagId, wantedlvl); }
  setMpGamerTagName(gamerTagId: number, string: string): void { SetMpGamerTagName(gamerTagId, string); }
  setMpGamerTagBigText(gamerTagId: number, string: string): void { SetMpGamerTagBigText(gamerTagId, string); }

  getCurrentWebpageId(): number { return GetCurrentWebpageId(); }
  getCurrentWebsiteId(): number { return GetCurrentWebsiteId(); }
  getGlobalActionscriptFlag(flagIndex: number): number { return GetGlobalActionscriptFlag(flagIndex); }
  resetGlobalActionscriptFlag(flagIndex: number): void { ResetGlobalActionscriptFlag(flagIndex); }
  isWarningMessageActive(): boolean { return IsWarningMessageActive(); }
  clearDynamicPauseMenuErrorMessage(): void { ClearDynamicPauseMenuErrorMessage(); }
  forceSonarBlipsThisFrame(): boolean { return (ForceSonarBlipsThisFrame as any)(); }
  displayPlayerNameTagsOnBlips(toggle: boolean): void { DisplayPlayerNameTagsOnBlips(toggle); }

  activateFrontendMenu(menuhash: number, togglePause: boolean, component: number): void { ActivateFrontendMenu(menuhash, togglePause, component); }
  restartFrontendMenu(menuHash: number, highlightTab: number): void { RestartFrontendMenu(menuHash, highlightTab); }
  getCurrentFrontendMenuVersion(): number { return GetCurrentFrontendMenuVersion(); }
  setPauseMenuActive(toggle: boolean): void { SetPauseMenuActive(toggle); }
  disableFrontendThisFrame(): void { DisableFrontendThisFrame(); }
  suppressFrontendRenderingThisFrame(): void { SuppressFrontendRenderingThisFrame(); }
  setFrontendActive(active: boolean): void { SetFrontendActive(active); }
  getPauseMenuState(): number { return GetPauseMenuState(); }
  isPauseMenuRestarting(): boolean { return IsPauseMenuRestarting(); }
  pauseMenuActivateContext(contextHash: number): void { PauseMenuActivateContext(contextHash); }
  pauseMenuDeactivateContext(contextHash: number): void { PauseMenuDeactivateContext(contextHash); }
  pauseMenuIsContextActive(contextHash: number): boolean { return PauseMenuIsContextActive(contextHash); }
  pauseMenuIsContextMenuActive(): boolean { return (PauseMenuIsContextMenuActive as any)(); }
  pauseMenuSetBusySpinner(p0: boolean, p1: number, p2: number): void { PauseMenuSetBusySpinner(p0, p1, p2); }
  isFrontendReadyForControl(): boolean { return IsFrontendReadyForControl(); }
  takeControlOfFrontend(): void { TakeControlOfFrontend(); }
  releaseControlOfFrontend(): void { ReleaseControlOfFrontend(); }
  isNavigatingMenuContent(): boolean { return (IsNavigatingMenuContent as any)(); }
  getMenuPedIntStat(p0: number): number { return (GetMenuPedIntStat as any)(p0); }
  getMenuPedMaskedIntStat(p0: number, p2: number, p3: number): number { return (GetMenuPedMaskedIntStat as any)(p0, p2, p3); }
  getMenuPedFloatStat(p0: number): number { return (GetMenuPedFloatStat as any)(p0); }
  getMenuPedBoolStat(p0: number): boolean { return (GetMenuPedBoolStat as any)(p0); }
  clearPedInPauseMenu(): void { ClearPedInPauseMenu(); }
  givePedToPauseMenu(ped: number, position: number): void { GivePedToPauseMenu(ped, position); }
  setPauseMenuPedLighting(state: boolean): void { SetPauseMenuPedLighting(state); }
  setPauseMenuPedSleepState(state: boolean): void { SetPauseMenuPedSleepState(state); }

  openOnlinePoliciesMenu(): void { OpenOnlinePoliciesMenu(); }
  isOnlinePoliciesMenuActive(): boolean { return IsOnlinePoliciesMenuActive(); }
  openSocialClubMenu(): void { OpenSocialClubMenu(); }
  closeSocialClubMenu(): void { CloseSocialClubMenu(); }
  setSocialClubTour(name: string): void { SetSocialClubTour(name); }
  isSocialClubActive(): boolean { return IsSocialClubActive(); }
  forceCloseTextInputBox(): void { ForceCloseTextInputBox(); }
  flagPlayerContextInTournament(toggle: boolean): void { FlagPlayerContextInTournament(toggle); }

  setPedHasAiBlip(ped: number, hasCone: boolean): void { SetPedHasAiBlip(ped, hasCone); }
  doesPedHaveAiBlip(ped: number): boolean { return DoesPedHaveAiBlip(ped); }
  setPedAiBlipGangId(ped: number, gangId: number): void { SetPedAiBlipGangId(ped, gangId); }
  setPedAiBlipHasCone(ped: number, toggle: boolean): void { SetPedAiBlipHasCone(ped, toggle); }
  setPedAiBlipForcedOn(ped: number, toggle: boolean): void { SetPedAiBlipForcedOn(ped, toggle); }
  setPedAiBlipNoticeRange(ped: number, range: number): void { SetPedAiBlipNoticeRange(ped, range); }
  setPedAiBlipSprite(ped: number, spriteId: number): void { SetPedAiBlipSprite(ped, spriteId); }
  setPlayerIsInDirectorMode(toggle: boolean): void { SetPlayerIsInDirectorMode(toggle); }

  customMinimapSetActive(lock: boolean): void { CustomMinimapSetActive(lock); }
  customMinimapSetBlipObject(spriteId: number): void { CustomMinimapSetBlipObject(spriteId); }
  customMinimapCreateBlip(x: number, y: number, z: number): number { return CustomMinimapCreateBlip(x, y, z); }
  customMinimapClearBlips(): void { CustomMinimapClearBlips(); }

  setLoadingPromptTextEntry(string: string): void { BeginTextCommandBusyspinnerOn(string); }
  showLoadingPrompt(busySpinnerType: number): void { EndTextCommandBusyspinnerOn(busySpinnerType); }
  setCursorSprite(spriteId: number): void { SetMouseCursorSprite(spriteId); } // unverified
  removeNotification(notificationId: number): void { ThefeedRemoveItem(notificationId); }
  setNotificationFlashColor(red: number, green: number, blue: number, alpha: number): void { ThefeedSetRgbaParameterForNextMessage(red, green, blue, alpha); }
  setNotificationMessage(txdName: string, textureName: string, flash: boolean, iconType: number, sender: string, subject: string): number { return EndTextCommandThefeedPostMessagetext(txdName, textureName, flash, iconType, sender, subject); }
  setNotificationMessageClanTag(txdName: string, textureName: string, flash: boolean, iconType: number, sender: string, subject: string, duration: number, clanTag: string): number { return EndTextCommandThefeedPostMessagetextWithCrewTag(txdName, textureName, flash, iconType, sender, subject, duration, clanTag); }
  setNotificationMessageClanTag2(txdName: string, textureName: string, flash: boolean, iconType1: number, sender: string, subject: string, duration: number, clanTag: string, iconType2: number, p9: number): number { return EndTextCommandThefeedPostMessagetextWithCrewTagAndAdditionalIcon(txdName, textureName, flash, iconType1, sender, subject, duration, clanTag, iconType2, p9); }
  drawNotification2(blink: boolean, p1: boolean): number { return EndTextCommandThefeedPostTickerForced(blink, p1); }
  drawNotification3(blink: boolean, p1: boolean): number { return EndTextCommandThefeedPostTickerWithTokens(blink, p1); }
  drawNotification4(blink: boolean, p1: boolean): number { return EndTextCommandThefeedPostTicker(blink, p1); }
  setTextEntry2(GxtEntry: string): void { SetTextEntry(GxtEntry); } // unverified
  drawSubtitleTimed(duration: number, drawImmediately: boolean): void { EndTextCommandPrint(duration, drawImmediately); }
  setTextEntryForWidth(text: string): void { BeginTextCommandGetScreenWidthOfDisplayText(text); }
  getTextScreenWidth(p0: boolean): number { return EndTextCommandGetScreenWidthOfDisplayText(p0); }
  setTextGxtEntry(entry: string): void { BeginTextCommandDisplayText(entry); }
  setTextComponentFormat(inputType: string): void { BeginTextCommandDisplayHelp(inputType); }
  displayHelpTextFromStringLabel(p0: number, loop: boolean, beep: boolean, shape: number): void { EndTextCommandDisplayHelp(p0, loop, beep, shape); }
  addTextComponentItemString(labelName: string): void { AddTextComponentItemString(labelName); } // unverified
  addTextComponentSubstringLocalized(gxtEntryHash: number): void { AddTextComponentSubstringLocalized(gxtEntryHash); } // unverified
  addTextComponentSubstringCash(value: number, commaSeparated: boolean): void { AddTextComponentSubstringCash(value, commaSeparated); } // unverified
  requestAdditionalText2(gxt: string, slot: number): void { RequestAdditionalText2(gxt, slot); } // unverified
  respondingAsTemp(zoom: number): void { RespondingAsTemp(zoom); } // unverified
  setRadarZoomLevelThisFrame(zoom: number): void { SetRadarZoomLevelThisFrame(zoom); } // unverified
  getTextScaleHeight(size: number, font: number): number { return GetTextScaleHeight(size, font); } // unverified
  showWeaponWheel(show: boolean): void { HudForceWeaponWheel(show); }
  keyHudColour(toggle: boolean, ped: number): void { KeyHudColour(toggle, ped); } // unverified
  setMinimapRevealed(toggle: boolean): void { SetMinimapRevealed(toggle); } // unverified
  isMinimapAreaRevealed(x: number, y: number, z: number): boolean { return IsMinimapAreaRevealed(x, y, z); } // unverified
  setMinimapAttitudeIndicatorLevel(altitude: number, p1: boolean): void { SetMinimapAttitudeIndicatorLevel(altitude, p1); } // unverified
  setRadarBigmapEnabled(toggleBigMap: boolean, showFullMap: boolean): void { SetBigmapActive(toggleBigMap, showFullMap); }
  hasHeadDisplayLoaded(gamerTagId: number): boolean { return HasHeadDisplayLoaded(gamerTagId); } // unverified
  addTrevorRandomModifier(gamerTagId: number): number { return (AddTrevorRandomModifier as any)(gamerTagId); } // unverified
  setHeadDisplayFlag(gamerTagId: number, component: number, toggle: boolean, p3: boolean): void { SetHeadDisplayFlag(gamerTagId, component, toggle, p3); } // unverified
  setHeadDisplayWanted(gamerTagId: number, wantedlvl: number): void { SetHeadDisplayWanted(gamerTagId, wantedlvl); } // unverified
  setHeadDisplayString(gamerTagId: number, string: string): void { SetHeadDisplayString(gamerTagId, string); } // unverified
  objectDecalToggle(contextHash: number): void { ObjectDecalToggle(contextHash); } // unverified
  setUseridsUihidden(p0: boolean): boolean { return (SetUseridsUihidden as any)(p0); } // unverified
  hideSpecialAbilityLockonOperation(ped: number, toggle: boolean): void { HideSpecialAbilityLockonOperation(ped, toggle); } // unverified
  setWarningMessage2(entryHeader: string, entryLine1: string, instructionalKey: number, entryLine2: string, p4: boolean, p5: number, p8: number, p9: number): { showBackground: number; p7: number } { const r: any = (SetWarningMessageWithHeader as any)(entryHeader, entryLine1, instructionalKey, entryLine2, p4, p5, p8, p9); return { showBackground: r[1], p7: r[2] }; } // unverified
  setWarningMessage3(entryHeader: string, entryLine1: string, instructionalKey: number, entryLine2: string, p4: boolean, p5: number, p6: number, p9: number, p10: number): { p7: number; p8: number } { const r: any = (SetWarningMessageWithHeaderAndSubstringFlags as any)(entryHeader, entryLine1, instructionalKey, entryLine2, p4, p5, p6, p9, p10); return { p7: r[1], p8: r[2] }; } // unverified
  setMouseCursorActiveThisFrame(): void { SetMouseCursorThisFrame(); }
  setMouseCursorSprite(spriteId: number): void { SetMouseCursorSprite(spriteId); } // unverified
  setMouseCursorVisibleInMenus(toggle: boolean): void { SetMouseCursorVisibleInMenus(toggle); } // unverified
  thefeedDisableLoadingScreenTips(): void { ThefeedDisableLoadingScreenTips(); } // unverified
  thefeedDisplayLoadingScreenTips(): void { ThefeedDisplayLoadingScreenTips(); } // unverified
  thefeedSpsExtendWidescreenOn(): void { ThefeedSpsExtendWidescreenOn(); } // unverified
  thefeedSpsExtendWidescreenOff(): void { ThefeedSpsExtendWidescreenOff(); } // unverified
  thefeedGetFirstVisibleDeleteRemaining(): number { return ThefeedGetFirstVisibleDeleteRemaining(); } // unverified
  thefeedCommentTeleportPoolOn(): void { ThefeedCommentTeleportPoolOn(); } // unverified
  thefeedCommentTeleportPoolOff(): void { ThefeedCommentTeleportPoolOff(); } // unverified
  thefeedSetNextPostBackgroundColor(hudColorIndex: number): void { ThefeedSetNextPostBackgroundColor(hudColorIndex); } // unverified
  thefeedSetAnimpostfxColor(red: number, green: number, blue: number, alpha: number): void { ThefeedSetAnimpostfxColor(red, green, blue, alpha); } // unverified
  thefeedSetAnimpostfxCount(count: number): void { ThefeedSetAnimpostfxCount(count); } // unverified
  thefeedSetAnimpostfxSound(toggle: boolean): void { ThefeedSetAnimpostfxSound(toggle); } // unverified
  thefeedSetFlushAnimpostfx(p0: number): void { (ThefeedSetFlushAnimpostfx as any)(p0); } // unverified
  thefeedAddTxdRef(...args: any[]): any { const r = (ThefeedAddTxdRef as any)(...args); return Array.isArray(r) ? { p0: r[0], p1: r[1], p2: r[2], p3: r[3] } : r; } // unverified
  endTextCommandThefeedPostStats(statTitle: string, iconEnum: number, stepVal: number, barValue: number, isImportant: boolean, pictureTextureDict: string, pictureTextureName: string): number { return (EndTextCommandThefeedPostStats as any)(statTitle, iconEnum, stepVal, barValue, isImportant, pictureTextureDict, pictureTextureName); }
  endTextCommandThefeedPostMessagetext(txdName: string, textureName: string, flash: boolean, iconType: number, sender: string, subject: string): number { return EndTextCommandThefeedPostMessagetext(txdName, textureName, flash, iconType, sender, subject); }
  endTextCommandThefeedPostMessagetextGxtEntry(txdName: string, textureName: string, flash: boolean, iconType: number, sender: string, subject: string): number { return EndTextCommandThefeedPostMessagetextGxtEntry(txdName, textureName, flash, iconType, sender, subject); } // unverified
  endTextCommandThefeedPostMessagetextTu(txdName: string, textureName: string, flash: boolean, iconType: number, sender: string, subject: string, duration: number): number { return EndTextCommandThefeedPostMessagetextTu(txdName, textureName, flash, iconType, sender, subject, duration); }
  endTextCommandThefeedPostMessagetextWithCrewTag(txdName: string, textureName: string, flash: boolean, iconType: number, sender: string, subject: string, duration: number, clanTag: string): number { return EndTextCommandThefeedPostMessagetextWithCrewTag(txdName, textureName, flash, iconType, sender, subject, duration, clanTag); }
  endTextCommandThefeedPostMessagetextWithCrewTagAndAdditionalIcon(txdName: string, textureName: string, flash: boolean, iconType1: number, sender: string, subject: string, duration: number, clanTag: string, iconType2: number, p9: number): number { return EndTextCommandThefeedPostMessagetextWithCrewTagAndAdditionalIcon(txdName, textureName, flash, iconType1, sender, subject, duration, clanTag, iconType2, p9); }
  endTextCommandThefeedPostCrewtag(p0: boolean, p1: string, p3: boolean, isLeader: boolean, unk0: number, clanDesc: string, R: number, G: number, B: number): { p2: number; result: number } { const r: any = (EndTextCommandThefeedPostCrewtag as any)(p0, p1, p3, isLeader, unk0, clanDesc, R, G, B); return Array.isArray(r) ? { p2: r[1], result: r[0] } : r; } // unverified
  endTextCommandThefeedPostCrewtagWithGameName(p0: boolean, p1: string, p3: boolean, isLeader: boolean, unk0: number, clanDesc: string, playerName: string, R: number, G: number, B: number): { p2: number; result: number } { const r: any = (EndTextCommandThefeedPostCrewtagWithGameName as any)(p0, p1, p3, isLeader, unk0, clanDesc, playerName, R, G, B); return Array.isArray(r) ? { p2: r[1], result: r[0] } : r; } // unverified
  endTextCommandThefeedPostCrewRankup(p0: boolean, p1: string, p2: number, p3: number, p4: number): number { return (EndTextCommandThefeedPostCrewRankup as any)(p0, p1, p2, p3, p4); } // unverified
  endTextCommandThefeedPostReplayIcon(type: number, image: string, text: string): number { return (EndTextCommandThefeedPostReplayIcon as any)(type, image, text); } // unverified
  beginTextCommandGetWidth(text: string): void { BeginTextCommandGetScreenWidthOfDisplayText(text); }
  endTextCommandGetWidth(p0: boolean): number { return EndTextCommandGetScreenWidthOfDisplayText(p0); }
  beginTextCommandLineCount(entry: string): void { BeginTextCommandGetNumberOfLinesForString(entry); }
  endTextCommandLineCount(x: number, y: number): number { return EndTextCommandGetNumberOfLinesForString(x, y); }
  beginTextCommandObjective(p0: string): void { BeginTextCommandObjective(p0); } // unverified
  endTextCommandObjective(p0: number): void { (EndTextCommandObjective as any)(p0); } // unverified
  endTextComponent(): void { EndTextComponent(); } // unverified
  getTextSubstring(text: string, position: number, length: number): string { return GetTextSubstring(text, position, length); } // unverified
  getTextSubstringSafe(text: string, position: number, length: number, maxLength: number): string { return GetTextSubstringSafe(text, position, length, maxLength); } // unverified
  getTextSubstringSlice(text: string, startPosition: number, endPosition: number): string { return GetTextSubstringSlice(text, startPosition, endPosition); } // unverified
  getLabelText(labelName: string): string { return GetLabelText(labelName); } // unverified
  displayWhenDeadThisFrame(): void { DisplayHudWhenDeadThisFrame(); } // unverified
  displayLoadingScreenTips(): void { DisplayLoadingScreenTips(); } // unverified
  setHelpMessageTextStyle(style: number, hudColor: number, alpha: number, direction: number, offset: number): void { SetHelpMessageStyle(style, hudColor, alpha, direction, offset); }
  setScriptVariableColour(r: number, g: number, b: number, a: number): void { SetScriptVariableHudColour(r, g, b, a); }
  setScriptVariable2Colour(r: number, g: number, b: number, a: number): void { SetScriptVariable2HudColour(r, g, b, a); } // unverified
  setAbilityBarVisibilityInMultiplayer(visible: boolean): void { SetAbilityBarVisibilityInMultiplayer(visible); } // unverified
  setAllowAbilityBarInMultiplayer(toggle: boolean): void { SetAllowAbilityBarInMultiplayer(toggle); } // unverified
  getClosestBlipOfType(blipSprite: number): number { return GetClosestBlipInfoId(blipSprite); }
  setBlipSquaredRotation(blip: number, heading: number): void { SetBlipSquaredRotation(blip, heading); } // unverified
  setBlipScaleTransformation(blip: number, xScale: number, yScale: number): void { SetBlipScaleTransformation(blip, xScale, yScale); } // unverified
  setBlipDisplayIndicatorOnBlip(blip: number, toggle: boolean): void { SetBlipDisplayIndicatorOnBlip(blip, toggle); } // unverified
  setBlipShrink(blip: number, toggle: boolean): void { SetBlipShrink(blip, toggle); } // unverified
  getBlipFadeStatus(blip: number): number { return GetBlipFadeDirection(blip); }
  setBlipCategoryPriority(category: number, priority: number): void { SetBlipCategoryPriority(category, priority); } // unverified
  setBlipCategoryGrouped(category: number, priority: number): void { SetBlipCategoryGrouped(category, priority); } // unverified
  deleteWaypoint(): void { DeleteWaypoint(); } // unverified
  setMinimapSonarEnabled(toggle: boolean): void { SetMinimapSonarEnabled(toggle); } // unverified
  showSigninUi(): void { ShowSigninUi(); } // unverified
  getNorthRadarBlip(): number { return GetNorthRadarBlip(); } // unverified
  setPlayerBlipPositionThisFrame(x: number, y: number): void { SetPlayerBlipPositionThisFrame(x, y); } // unverified
  isMinimapInInterior(): boolean { return IsMinimapInInterior(); } // unverified
  setToggleMinimapHeistIsland(toggle: boolean): void { SetToggleMinimapHeistIsland(toggle); } // unverified
  setPlayerCashChange(cash: number, bank: number): void { SetPlayerCashChange(cash, bank); } // unverified
  setMultiplayerCash(p0: number, p1: boolean): void { (SetMultiplayerHudCash as any)(p0, p1); }
  removeMultiplayerCash(): void { RemoveMultiplayerHudCash(); }
  forceWeaponWheel(show: boolean): void { HudForceWeaponWheel(show); }
  weaponWheelIgnoreSelection(): void { HudSuppressWeaponWheelResultsThisFrame(); }
  weaponWheelGetSelectedHash(): number { return GetWeaponHashFromWeaponWheel(); } // unverified
  setWeaponWheelTopSlot(weaponHash: number): void { HudSetWeaponWheelTopSlot(weaponHash); }
  weaponWheelGetSlotHash(weaponTypeIndex: number): number { return HudGetWeaponWheelTopSlot(weaponTypeIndex); }
  weaponWheelIgnoreControlInput(toggle: boolean): void { HudWeaponWheelIgnoreControlInput(toggle); } // unverified
  setMinimapAltitudeIndicatorLevel(altitude: number, p1: boolean): void { SetMinimapAltitudeIndicatorLevel(altitude, p1); } // unverified
  setHealthDisplayValues(health: number, capacity: number, wasAdded: boolean): void { SetHealthDisplayValues(health, capacity, wasAdded); } // unverified
  setMaxHealthDisplay(maximumValue: number): void { SetMaxHealthDisplay(maximumValue); } // unverified
  setMaxArmourDisplay(maximumValue: number): void { SetMaxArmourDisplay(maximumValue); } // unverified
  isScriptedComponentActive(id: number): boolean { return IsScriptedHudComponentActive(id); }
  hideScriptedComponentThisFrame(id: number): void { HideScriptedHudComponentThisFrame(id); }
  showScriptedComponentThisFrame(id: number): void { ShowScriptedHudComponentThisFrame(id); }
  isScriptedComponentHiddenThisFrame(id: number): boolean { return IsScriptedHudComponentHiddenThisFrame(id); }
  hideAreaAndVehicleNameThisFrame(): void { HideAreaAndVehicleNameThisFrame(); } // unverified
  createMpGamerTagWithCrewColor(player: number, username: string, pointedClanTag: boolean, isRockstarClan: boolean, clanTag: string, clanFlag: number, r: number, g: number, b: number): void { CreateMpGamerTagWithCrewColor(player, username, pointedClanTag, isRockstarClan, clanTag, clanFlag, r, g, b); } // unverified
  setMpGamerTagEnabled(gamerTagId: number, toggle: boolean): void { SetMpGamerTagEnabled(gamerTagId, toggle); } // unverified
  setMpGamerTagIcons(gamerTagId: number, toggle: boolean): void { SetMpGamerTagIcons(gamerTagId, toggle); } // unverified
  setMpGamerHealthBarDisplay(gamerTagId: number, toggle: boolean): void { SetMpGamerHealthBarDisplay(gamerTagId, toggle); } // unverified
  setMpGamerHealthBarMax(gamerTagId: number, value: number, maximumValue: number): void { SetMpGamerHealthBarMax(gamerTagId, value, maximumValue); } // unverified
  setMpGamerTagUnk(gamerTagId: number, p1: number): void { SetMpGamerTagUnk(gamerTagId, p1); } // unverified
  isValidMpGamerTagMovie(gamerTagId: number): boolean { return IsValidMpGamerTagMovie(gamerTagId); } // unverified
  isWarningMessageActive2(): boolean { return IsWarningMessageActive2(); } // unverified
  setWarningMessage(titleMsg: string, flags: number, promptMsg: string, p3: boolean, p4: number, p5: boolean, p6: boolean, showBackground: boolean, p8: string): void { (SetWarningMessage as any)(titleMsg, flags, promptMsg, p3, p4, p5, p6, showBackground, p8); }
  setWarningMessageWithHeader(entryHeader: string, entryLine1: string, instructionalKey: number, entryLine2: string, p4: boolean, p5: number, p8: number, p9: number): { showBackground: number; p7: number } { const r: any = (SetWarningMessageWithHeader as any)(entryHeader, entryLine1, instructionalKey, entryLine2, p4, p5, p8, p9); return Array.isArray(r) ? { showBackground: r[1], p7: r[2] } : r; }
  setWarningMessageWithHeaderAndSubstringFlags(entryHeader: string, entryLine1: string, instructionalKey: number, entryLine2: string, p4: boolean, p5: number, p6: number, p9: number, p10: number): { p7: number; p8: number } { const r: any = (SetWarningMessageWithHeaderAndSubstringFlags as any)(entryHeader, entryLine1, instructionalKey, entryLine2, p4, p5, p6, p9, p10); return Array.isArray(r) ? { p7: r[1], p8: r[2] } : r; }
  setWarningMessageWithHeaderUnk(entryHeader: string, entryLine1: string, flags: number, entryLine2: string, p4: boolean, p5: number, showBg: boolean, p9: number, p10: number): { p6: number; p7: number } { const r: any = (SetWarningMessageWithHeaderUnk as any)(entryHeader, entryLine1, flags, entryLine2, p4, p5, showBg, p9, p10); return Array.isArray(r) ? { p6: r[1], p7: r[2] } : r; } // unverified
  setWarningMessageWithAlert(labelTitle: string, labelMessage: string, p2: number, p3: boolean, labelMessage2: string, p5: number, p6: boolean, p7: boolean, p8: number, p9: boolean, background: boolean, errorCode: number): void { (SetWarningMessageWithAlert as any)(labelTitle, labelMessage, p2, p3, labelMessage2, p5, p6, p7, p8, p9, background, errorCode); } // unverified
  getWarningMessageTitleHash(): number { return GetWarningMessageTitleHash(); } // unverified
  setWarningMessageListRow(index: number, name: string, cash: number, rp: number, lvl: number, colour: number): number { return (SetWarningMessageListRow as any)(index, name, cash, rp, lvl, colour); } // unverified
  removeWarningMessageListItems(): void { RemoveWarningMessageListItems(); } // unverified
  raceGalleryFullscreen(toggle: boolean): void { RaceGalleryFullscreen(toggle); } // unverified
  raceGalleryNextBlipSprite(spriteId: number): void { RaceGalleryNextBlipSprite(spriteId); } // unverified
  raceGalleryAddBlip(x: number, y: number, z: number): number { return RaceGalleryAddBlip(x, y, z); } // unverified
  clearRaceGalleryBlips(): void { ClearRaceGalleryBlips(); } // unverified
  allowPauseMenuWhenDeadThisFrame(): void { AllowPauseMenuWhenDeadThisFrame(); } // unverified
  logDebugInfo(p0: number): void { (LogDebugInfo as any)(p0); } // unverified
  getPauseMenuSelection(): { lastItemMenuId: number; selectedItemUniqueId: number } { const r = GetPauseMenuSelection(); return Array.isArray(r) ? { lastItemMenuId: r[0], selectedItemUniqueId: r[1] } : r; } // unverified
  getPauseMenuSelectionData(): { lastItemMenuId: number; selectedItemMenuId: number; selectedItemUniqueId: number } { const r = GetPauseMenuSelectionData(); return Array.isArray(r) ? { lastItemMenuId: r[0], selectedItemMenuId: r[1], selectedItemUniqueId: r[2] } : r; } // unverified
  overrideMultiplayerChatPrefix(gxtEntryHash: number): void { OverrideMpTextChatTeamString(gxtEntryHash); }
  isMultiplayerChatActive(): boolean { return IsMpTextChatTyping(); }
  closeMultiplayerChat(): void { CloseMpTextChat(); }
  overrideMultiplayerChatColour(p0: number, hudColor: number): void { OverrideMpTextChatColor(p0, hudColor); }
  setTextChatUnk(p0: number): void { (SetTextChatUnk as any)(p0); } // unverified
  setPedHasAiBlipWithColor(ped: number, hasCone: boolean, color: number): void { SetPedHasAiBlipWithColor(ped, hasCone, color); } // unverified
  getAiBlip2(ped: number): number { return GetAiBlip(ped); } // unverified
  getAiBlip(ped: number): number { return GetAiBlipForEntity(ped); } // unverified
  hasDirectorModeBeenTriggered(): boolean { return HasDirectorModeBeenTriggered(); } // unverified
  setDirectorModeClearTriggeredFlag(): void { SetDirectorModeClearTriggeredFlag(); } // unverified
  setMinimapComponentValues(name: string, alignX: string, alignY: string, posX: number, posY: number, sizeX: number, sizeY: number): void { SetMinimapComponentPosition(name, alignX, alignY, posX, posY, sizeX, sizeY); } // unverified
  resetMinimapComponentValues(names: string): void { ResetMinimapComponentPosition(names); } // unverified
  getMinimapComponentValues(componentName: string): any { return GetMinimapComponentValues(componentName); } // unverified
  getCurrentAreaNameString(): string { return GetCurrentAreaNameString(); } // unverified
  getCurrentAreaNameHash(): number { return GetCurrentAreaNameHash(); } // unverified
  getCurrentAreaNameLabel(): string { return GetCurrentAreaNameLabel(); } // unverified
  getCurrentStreetNameString(): string { return GetCurrentStreetNameString(); } // unverified
  getCurrentStreetNameHash(): number { return GetCurrentStreetNameHash(); } // unverified
  setShowHudComponentsThisFrameBatch(show: boolean, hudComponents: number[]): void { for (const id of hudComponents) { if (show) ShowHudComponentThisFrame(id); else HideHudComponentThisFrame(id); } } // unverified
  applyShowHudComponentsThisFrameBatch(): void {} // unverified
  setInteriorZoomLevelIncreased(toggle: boolean): void { SetInteriorZoomLevelIncreased(toggle); } // unverified
  setInteriorZoomLevelDecreased(toggle: boolean): void { SetInteriorZoomLevelDecreased(toggle); } // unverified
  setMainPlayerBlipColour(color: number): void { SetMainPlayerBlipColour(color); } // unverified
  enableDeathbloodSeethrough(p1: boolean): void { (EnableDeathbloodSeethrough as any)(p1); } // unverified
  setMissionName2(p0: boolean, name: string): void { SetMissionName2(p0, name); } // unverified
  setScreenHeader(screenHash: number, header: string): void { SetPauseMenuHeaderText(screenHash, header); } // unverified
  getItem(itemNameOrHash: number | string): any { return GetMenuItem(itemNameOrHash); } // unverified
  tryGetItem(itemNameOrHash: number | string): any { try { return GetMenuItem(itemNameOrHash); } catch { return undefined; } } // unverified
  getItems(itemHashes: (number | string)[]): any[] { return itemHashes.map((h) => GetMenuItem(h)); } // unverified
  tryGetItems(itemHashes: (number | string)[]): any[] { return itemHashes.map((h) => { try { return GetMenuItem(h); } catch { return undefined; } }); } // unverified
  setItemText(itemHash: number, text: string): void { SetMenuItemText(itemHash, text); } // unverified
  setItemRange(itemHash: number, rangeFrom: number, rangeTo: number): void { SetMenuItemRange(itemHash, rangeFrom, rangeTo); } // unverified
  setItemList(itemHash: number, values: string[]): void { SetMenuItemList(itemHash, values); } // unverified
  setItemTicksVisible(itemHash: number, isVisible: boolean): void { SetMenuItemTicksVisible(itemHash, isVisible); } // unverified
  setItemColor(itemHash: number, colorIndex: number): void { SetMenuItemColor(itemHash, colorIndex); } // unverified
  setItemValue(itemHash: number, value: number): void { SetMenuItemValue(itemHash, value); } // unverified
  setItemEnabled(itemHash: number, isEnabled: boolean): void { SetMenuItemEnabled(itemHash, isEnabled); } // unverified

  ["_0x9245E81072704B8A"](...args: any[]): any { return Citizen.invokeNative("0x9245E81072704B8A", ...args); }
  ["_0x3D9ACB1EB139E702"](...args: any[]): any { return Citizen.invokeNative("0x3D9ACB1EB139E702", ...args); }
  ["_0x632B2940C67F4EA9"](...args: any[]): any { const r = Citizen.invokeNative("0x632B2940C67F4EA9", ...args); return Array.isArray(r) ? { p1: r[0], p2: r[1], p3: r[2], result: r[3] } : r; }
  ["_0x98C3CF913D895111"](...args: any[]): any { return Citizen.invokeNative("0x98C3CF913D895111", ...args); }
  ["_0xCD74233600C4EA6B"](...args: any[]): any { return Citizen.invokeNative("0xCD74233600C4EA6B", ...args); }
  ["_0xC2D2AD9EAAE265B8"](...args: any[]): any { return Citizen.invokeNative("0xC2D2AD9EAAE265B8", ...args); }
  ["_0x0C698D8F099174C7"](...args: any[]): any { return Citizen.invokeNative("0x0C698D8F099174C7", ...args); }
  ["_0xE4C3B169876D33D7"](...args: any[]): any { return Citizen.invokeNative("0xE4C3B169876D33D7", ...args); }
  ["_0xEB81A3DADD503187"](...args: any[]): any { return Citizen.invokeNative("0xEB81A3DADD503187", ...args); }
  ["_0x2790F4B17D098E26"](...args: any[]): any { return Citizen.invokeNative("0x2790F4B17D098E26", ...args); }
  ["_0x6CDD58146A436083"](...args: any[]): any { return Citizen.invokeNative("0x6CDD58146A436083", ...args); }
  ["_0xD1942374085C8469"](...args: any[]): any { return Citizen.invokeNative("0xD1942374085C8469", ...args); }
  ["_0x57D760D55F54E071"](...args: any[]): any { return Citizen.invokeNative("0x57D760D55F54E071", ...args); }
  ["_0xD2049635DEB9C375"](...args: any[]): any { return Citizen.invokeNative("0xD2049635DEB9C375", ...args); }
  ["_0xBA8D65C1C65702E5"](...args: any[]): any { return Citizen.invokeNative("0xBA8D65C1C65702E5", ...args); }
  ["_0x214CD562A939246A"](...args: any[]): any { return Citizen.invokeNative("0x214CD562A939246A", ...args); }
  ["_0x9FCB3CBFB3EAD69A"](...args: any[]): any { return Citizen.invokeNative("0x9FCB3CBFB3EAD69A", ...args); }
  ["_0xB7B873520C84C118"](...args: any[]): any { return Citizen.invokeNative("0xB7B873520C84C118", ...args); }
  ["_0x2C173AE2BDB9385E"](...args: any[]): any { return Citizen.invokeNative("0x2C173AE2BDB9385E", ...args); }
  ["_0x003E92BA477F9D7F"](...args: any[]): any { return Citizen.invokeNative("0x003E92BA477F9D7F", ...args); }
  ["_0x2916A928514C9827"](...args: any[]): any { return Citizen.invokeNative("0x2916A928514C9827", ...args); }
  ["_0xB552929B85FC27EC"](...args: any[]): any { return Citizen.invokeNative("0xB552929B85FC27EC", ...args); }
  ["_0x4B5B620C9B59ED34"](...args: any[]): any { return Citizen.invokeNative("0x4B5B620C9B59ED34", ...args); }
  ["_0x2C9F302398E13141"](...args: any[]): any { return Citizen.invokeNative("0x2C9F302398E13141", ...args); }
  ["_0xC594B315EDF2D4AF"](...args: any[]): any { return Citizen.invokeNative("0xC594B315EDF2D4AF", ...args); }
  ["_0xF83D0FEBE75E62C9"](...args: any[]): any { return Citizen.invokeNative("0xF83D0FEBE75E62C9", ...args); }
  ["_0x35A3CD97B2C0A6D2"](...args: any[]): any { return Citizen.invokeNative("0x35A3CD97B2C0A6D2", ...args); }
  ["_0x8410C5E0CD847B9D"](...args: any[]): any { return Citizen.invokeNative("0x8410C5E0CD847B9D", ...args); }
  ["_0x41350B4FC28E3941"](...args: any[]): any { return Citizen.invokeNative("0x41350B4FC28E3941", ...args); }
  ["_0x504DFE62A1692296"](...args: any[]): any { return Citizen.invokeNative("0x504DFE62A1692296", ...args); }
  ["_0xA17784FCA9548D15"](...args: any[]): any { return Citizen.invokeNative("0xA17784FCA9548D15", ...args); }
  ["_0x55F5A5F07134DE60"](...args: any[]): any { return Citizen.invokeNative("0x55F5A5F07134DE60", ...args); }
  ["_0x170F541E1CADD1DE"](...args: any[]): any { return Citizen.invokeNative("0x170F541E1CADD1DE", ...args); }
  ["_0xE67C6DFD386EA5E7"](...args: any[]): any { return Citizen.invokeNative("0xE67C6DFD386EA5E7", ...args); }
  ["_0x801879A9B4F4B2FB"](...args: any[]): any { return Citizen.invokeNative("0x801879A9B4F4B2FB", ...args); }
  ["_0x7B21E0BB01E8224A"](...args: any[]): any { return Citizen.invokeNative("0x7B21E0BB01E8224A", ...args); }
  ["_0x817B86108EB94E51"](...args: any[]): any { const r = Citizen.invokeNative("0x817B86108EB94E51", ...args); return Array.isArray(r) ? { p1: r[0], p2: r[1], p3: r[2], p4: r[3], p5: r[4], p6: r[5], p7: r[6], p8: r[7] } : r; }
  ["_0x62E849B7EB28E770"](...args: any[]): any { return Citizen.invokeNative("0x62E849B7EB28E770", ...args); }
  ["_0xDAF87174BE7454FF"](...args: any[]): any { return Citizen.invokeNative("0xDAF87174BE7454FF", ...args); }
  ["_0x211C4EF450086857"](...args: any[]): any { return Citizen.invokeNative("0x211C4EF450086857", ...args); }
  ["_0xBF4F34A85CA2970C"](...args: any[]): any { return Citizen.invokeNative("0xBF4F34A85CA2970C", ...args); }
  ["_0x2F057596F2BD0061"](...args: any[]): any { return Citizen.invokeNative("0x2F057596F2BD0061", ...args); }
  ["_0x5BFF36D6ED83E0AE"](...args: any[]): any { return toVec3(Citizen.invokeNative("0x5BFF36D6ED83E0AE", ...args)); }
  ["_0x77F16B447824DA6C"](...args: any[]): any { return Citizen.invokeNative("0x77F16B447824DA6C", ...args); }
  ["_0xCDCA26E80FAECB8F"](...args: any[]): any { return Citizen.invokeNative("0xCDCA26E80FAECB8F", ...args); }
  ["_0x2DE6C5E2E996F178"](...args: any[]): any { return Citizen.invokeNative("0x2DE6C5E2E996F178", ...args); }
  ["_0xDE03620F8703A9DF"](...args: any[]): any { return Citizen.invokeNative("0xDE03620F8703A9DF", ...args); }
  ["_0x359AF31A4B52F5ED"](...args: any[]): any { return Citizen.invokeNative("0x359AF31A4B52F5ED", ...args); }
  ["_0x13C4B962653A5280"](...args: any[]): any { return Citizen.invokeNative("0x13C4B962653A5280", ...args); }
  ["_0xC8E1071177A23BE5"](...args: any[]): any { const r = Citizen.invokeNative("0xC8E1071177A23BE5", ...args); return Array.isArray(r) ? { p0: r[0], p1: r[1], p2: r[2], result: r[3] } : r; }
  ["_0x4895BDEA16E7C080"](...args: any[]): any { return Citizen.invokeNative("0x4895BDEA16E7C080", ...args); }
  ["_0xF06EBB91A81E09E3"](...args: any[]): any { return Citizen.invokeNative("0xF06EBB91A81E09E3", ...args); }
  ["_0x66E7CB63C97B7D20"](...args: any[]): any { return Citizen.invokeNative("0x66E7CB63C97B7D20", ...args); }
  ["_0x593FEAE1F73392D4"](...args: any[]): any { return Citizen.invokeNative("0x593FEAE1F73392D4", ...args); }
  ["_0xF284AC67940C6812"](...args: any[]): any { return Citizen.invokeNative("0xF284AC67940C6812", ...args); }
  ["_0x2E22FEFA0100275E"](...args: any[]): any { return Citizen.invokeNative("0x2E22FEFA0100275E", ...args); }
  ["_0x0CF54F20DE43879C"](...args: any[]): any { return Citizen.invokeNative("0x0CF54F20DE43879C", ...args); }
  ["_0xA238192F33110615"](...args: any[]): any { const r = Citizen.invokeNative("0xA238192F33110615", ...args); return Array.isArray(r) ? { p0: r[0], p1: r[1], p2: r[2], result: r[3] } : r; }
  ["_0xCA6B2F7CE32AB653"](...args: any[]): any { return Citizen.invokeNative("0xCA6B2F7CE32AB653", ...args); }
  ["_0x24A49BEAF468DC90"](...args: any[]): any { return Citizen.invokeNative("0x24A49BEAF468DC90", ...args); }
  ["_0x8F08017F9D7C47BD"](...args: any[]): any { return Citizen.invokeNative("0x8F08017F9D7C47BD", ...args); }
  ["_0xF13FE2A80C05C561"](...args: any[]): any { return Citizen.invokeNative("0xF13FE2A80C05C561", ...args); }
  ["_0x1185A8087587322C"](...args: any[]): any { return Citizen.invokeNative("0x1185A8087587322C", ...args); }
  ["_0x577599CCED639CA2"](...args: any[]): any { return Citizen.invokeNative("0x577599CCED639CA2", ...args); }
  ["_0x7C226D5346D4D10A"](...args: any[]): any { return Citizen.invokeNative("0x7C226D5346D4D10A", ...args); }
  ["_0x04655F9D075D0AE5"](...args: any[]): any { return Citizen.invokeNative("0x04655F9D075D0AE5", ...args); }
  ["_0x243296A510B562B6"](...args: any[]): any { return Citizen.invokeNative("0x243296A510B562B6", ...args); }
}
