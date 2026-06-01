import { createUnkProxy } from "./_helpers.js";

export class GameStatsNs {
  unk = createUnkProxy();

  statSetInt(statName: number, value: number, save: boolean): void { StatSetInt(statName, value, save ?? true); }
  statSetFloat(statName: number, value: number, save: boolean): void { StatSetFloat(statName, value, save ?? true); }
  statSetBool(statName: number, value: boolean, save: boolean): void { StatSetBool(statName, value, save ?? true); }
  statSetString(statName: number, value: string, save: boolean): void { StatSetString(statName, value, save ?? true); }
  statGetInt(statName: number): number {
    const [, out] = StatGetInt(statName, 0);
    return out;
  }
  statGetFloat(statName: number): number {
    const [, out] = StatGetFloat(statName, 0);
    return out;
  }
  statGetBool(statName: number): boolean {
    const [, out] = StatGetBool(statName, 0 as any);
    return out;
  }
  statGetString(statName: number): string {
    return StatGetString(statName, -1);
  }

  playstatsNpcInvite(): number { return (PlaystatsNpcInvite as any)(); }
  playstatsAwardXp(amount: number, type: number, category: number): void { PlaystatsAwardXp(amount, type, category); }
  playstatsRankUp(rank: number): void { PlaystatsRankUp(rank); }
  playstatsMissionStarted(p0: number, p1: number, p2: number, p3: boolean): number { return PlaystatsMissionStarted(p0, p1, p2, p3); }
  playstatsMissionOver(p0: number, p1: number, p2: number, p3: boolean, p4: boolean, p5: boolean): number { return PlaystatsMissionOver(p0, p1, p2, p3, p4, p5); }
  playstatsMissionCheckpoint(p0: number, p1: number, p2: number, p3: number): number { return PlaystatsMissionCheckpoint(p0, p1, p2, p3); }
  playstatsRaceCheckpoint(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsRaceCheckpoint(p0, p1, p2, p3, p4); }
  playstatsMatchStarted(p0: number, p1: number, p2: number): void { PlaystatsMatchStarted(p0, p1, p2); }
  playstatsShopItem(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsShopItem(p0, p1, p2, p3, p4); }
  playstatsWebsiteVisited(scaleformHash: number, p1: number): void { PlaystatsWebsiteVisited(scaleformHash, p1); }
  playstatsFriendActivity(p0: number, p1: number): void { PlaystatsFriendActivity(p0, p1); }
  playstatsOddjobDone(totalTimeMs: number, p1: number, p2: number): void { PlaystatsOddjobDone(totalTimeMs, p1, p2); }
  playstatsPropChange(p0: number, p1: number, p2: number, p3: number): void { PlaystatsPropChange(p0, p1, p2, p3); }
  playstatsClothChange(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsClothChange(p0, p1, p2, p3, p4); }
  playstatsCheatApplied(cheat: string): void { PlaystatsCheatApplied(cheat); }

  statClearSlotForReload(statSlot: number): number { return StatClearSlotForReload(statSlot); }
  statLoad(statSlot: number): boolean { return StatLoad(statSlot); }
  statSave(p0: number, p1: boolean, p2: number, p3: number): boolean { return StatSave(p0, p1, p2, p3); }
  statLoadPending(statSlot: number): boolean { return StatLoadPending(statSlot); }
  statSavePending(): boolean { return StatSavePending(); }
  statSavePendingOrRequested(): boolean { return StatSavePendingOrRequested(); }
  statDeleteSlot(p0: number): number { return StatDeleteSlot(p0); }
  statSlotIsLoaded(statSlot: number): boolean { return StatSlotIsLoaded(statSlot); }
  statSetBlockSaves(toggle: boolean): void { StatSetBlockSaves(toggle); }

  statSetGxtLabel(statName: number, value: string, save: boolean): boolean { return StatSetGxtLabel(statName, value, save); }
  statSetDate(statName: number, value: number, numFields: number, save: boolean): number { return (StatSetDate as any)(statName, value, numFields, save); } // NOTE: native returns [boolean,number] per typings
  statSetPos(statName: number, x: number, y: number, z: number, save: boolean): boolean { return StatSetPos(statName, x, y, z, save); }
  statSetMaskedInt(statName: number, p1: number, p2: number, p3: number, save: boolean): boolean { return StatSetMaskedInt(statName, p1, p2, p3, save); }
  statSetUserId(statName: number, value: string, save: boolean): boolean { return StatSetUserId(statName, value, save); }
  statSetCurrentPosixTime(statName: number, p1: boolean): boolean { return StatSetCurrentPosixTime(statName, p1); }

  statGetDate(statHash: number, p2: number, p3: number): number { const [, out] = (StatGetDate as any)(statHash, 0, p2, p3); return out; } // NOTE: native returns [boolean,number] per typings
  statGetPos(statName: number, p4: number): { p1: number; p2: number; p3: number; result: boolean } {
    const r = StatGetPos(statName, 0, 0, 0, p4);
    return { p1: r[1], p2: r[2], p3: r[3], result: !!r[0] };
  }
  statGetMaskedInt(statHash: number, p2: number, p3: number, p4: number): number { const [, out] = StatGetMaskedInt(statHash, 0, p2, p3, p4); return out; }
  statGetUserId(statHash: number): string { return StatGetUserId(statHash); }
  statGetLicensePlate(statName: number): string { return StatGetLicensePlate(statName); }
  statSetLicensePlate(statName: number, str: string): boolean { return StatSetLicensePlate(statName, str); }
  statIncrement(statName: number, value: number): void { StatIncrement(statName, value); }
  statGetNumberOfDays(statName: number): number { return StatGetNumberOfDays(statName); }
  statGetNumberOfHours(statName: number): number { return StatGetNumberOfHours(statName); }
  statGetNumberOfMinutes(statName: number): number { return StatGetNumberOfMinutes(statName); }
  statGetNumberOfSeconds(statName: number): number { return StatGetNumberOfSeconds(statName); }
  statSetProfileSettingValue(profileSetting: number, value: number): void { StatSetProfileSettingValue(profileSetting, value); }

  getPackedIntStatKey(index: number, spStat: boolean, charStat: boolean, character: number): number { return GetPackedIntStatKey(index, spStat, charStat, character); }
  getPackedTuIntStatKey(index: number, spStat: boolean, charStat: boolean, character: number): number { return GetPackedTuIntStatKey(index, spStat, charStat, character); }

  leaderboardsGetNumberOfColumns(p0: number, p1: number): number { return LeaderboardsGetNumberOfColumns(p0, p1); }
  leaderboardsGetColumnId(p0: number, p1: number, p2: number): number { return LeaderboardsGetColumnId(p0, p1, p2); }
  leaderboardsGetColumnType(p0: number, p1: number, p2: number): number { return LeaderboardsGetColumnType(p0, p1, p2); }
  leaderboardsReadClearAll(): number { return LeaderboardsReadClearAll(); }
  leaderboardsReadClear(p0: number, p1: number, p2: number): number { return LeaderboardsReadClear(p0, p1, p2); }
  leaderboardsReadPending(p0: number, p1: number, p2: number): boolean { return LeaderboardsReadPending(p0, p1, p2); }
  leaderboardsReadAnyPending(): boolean { return LeaderboardsReadAnyPending(); }
  leaderboardsReadSuccessful(p0: number, p1: number, p2: number): boolean { return LeaderboardsReadSuccessful(p0, p1, p2); }
  leaderboards2ReadByRank(p0: number, p1: number, p2: number): number { const [, out] = Leaderboards2ReadByRank(p0, p1, p2); return out; }
  leaderboards2ReadByScoreInt(p0: number, p1: number, p2: number): number { const [, out] = Leaderboards2ReadByScoreInt(p0, p1, p2); return out; }
  leaderboards2ReadByScoreFloat(p0: number, p1: number, p2: number): number { const [, out] = Leaderboards2ReadByScoreFloat(p0, p1, p2); return out; }
  leaderboards2WriteData(p0: number): number { const [, out] = Leaderboards2WriteData(p0); return out; }
  leaderboardsWriteAddColumn(p0: number, p1: number, p2: number): void { LeaderboardsWriteAddColumn(p0, p1, p2); }
  leaderboardsWriteAddColumnLong(p0: number, p1: number, p2: number): void { LeaderboardsWriteAddColumnLong(p0, p1, p2); }
  leaderboardsCacheDataRow(p0: number): number { const [, out] = LeaderboardsCacheDataRow(p0); return out; }
  leaderboardsClearCacheData(): void { LeaderboardsClearCacheData(); }
  leaderboardsGetCacheExists(p0: number): boolean { return LeaderboardsGetCacheExists(p0); }
  leaderboardsGetCacheTime(p0: number): number { return LeaderboardsGetCacheTime(p0); }
  leaderboardsGetCacheNumberOfRows(p0: number): number { return LeaderboardsGetCacheNumberOfRows(p0); }
  leaderboardsGetCacheDataRow(p0: number, p1: number): number { const [, out] = LeaderboardsGetCacheDataRow(p0, p1, 0); return out; }

  setProfileSettingPrologueComplete(): void { SetProfileSettingPrologueComplete(); }
  statSetCheatIsActive(): void { StatSetCheatIsActive(); }
  statGetCancelSaveMigrationStatus(): number { return StatGetCancelSaveMigrationStatus(); }
  hiredLimo(p0: number, p1: number): void { HiredLimo(p0, p1); }

  statSetProfileSetting(profileSetting: number, value: number): void { StatSetProfileSetting(profileSetting, value); } // unverified
  statGetPackedBoolMask(p0: number): number { return StatGetPackedBoolMask(p0); } // unverified
  statGetPackedIntMask(p0: number): number { return StatGetPackedIntMask(p0); } // unverified
  getPackedBoolStatKey(index: number, spStat: boolean, charStat: boolean, character: number): number { return GetPackedBoolStatKey(index, spStat, charStat, character); } // unverified
  getPackedTuBoolStatKey(index: number, spStat: boolean, charStat: boolean, character: number): number { return GetPackedTuBoolStatKey(index, spStat, charStat, character); } // unverified
  getNgstatBoolHash(index: number, spStat: boolean, charStat: boolean, character: number, section: string): number { return GetNgstatBoolHash(index, spStat, charStat, character, section); } // unverified
  getNgstatIntHash(index: number, spStat: boolean, charStat: boolean, character: number, section: string): number { return GetNgstatIntHash(index, spStat, charStat, character, section); } // unverified
  statGetBoolMasked(statName: number, mask: number, p2: number): boolean { const [, out] = (StatGetBoolMasked as any)(statName, mask, p2); return out; } // unverified, NOTE: native may return boolean not tuple
  statSetBoolMasked(statName: number, value: boolean, mask: number, save: boolean): boolean { return StatSetBoolMasked(statName, value, mask, save); } // unverified
  playBackgroundScriptAction(action: string, value: number): void { PlaystatsBackgroundScriptAction(action, value); }
  playNpcInvite(): number { return (PlaystatsNpcInvite as any)(); }
  playAwardXp(amount: number, type: number, category: number): void { PlaystatsAwardXp(amount, type, category); }
  playRankUp(rank: number): void { PlaystatsRankUp(rank); }
  playStartOfflineMode(): void { PlaystatsStartOfflineMode(); } // unverified
  playActivityDone(p0: number, p1: number): void { PlaystatsActivityDone(p0, p1); }
  playLeaveJobChain(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsLeaveJobChain(p0, p1, p2, p3, p4); }
  playMissionStarted(p1: number, p2: number, p3: boolean): number { return PlaystatsMissionStarted(p1, p2, p3); }
  playMissionOver(p1: number, p2: number, p3: boolean, p4: boolean, p5: boolean): number { return PlaystatsMissionOver(p1, p2, p3, p4, p5); }
  playMissionCheckpoint(p1: number, p2: number, p3: number): number { return PlaystatsMissionCheckpoint(p1, p2, p3); }
  playRandomMissionDone(name: string, p1: number, p2: number, p3: number): void { PlaystatsRandomMissionDone(name, p1, p2, p3); }
  playRosBet(amount: number, act: number, player: number, cm: number): void { PlaystatsRosBet(amount, act, player, cm); }
  playRaceCheckpoint(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsRaceCheckpoint(p0, p1, p2, p3, p4); }
  playMatchStarted(p0: number, p1: number, p2: number): void { PlaystatsMatchStarted(p0, p1, p2); }
  playShopItem(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsShopItem(p0, p1, p2, p3, p4); }
  playCrateDropMissionDone(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number): void { PlaystatsCrateDropMissionDone(p0, p1, p2, p3, p4, p5, p6, p7); }
  playCrateCreatedMissionDone(p0: number, p1: number, p2: number): void { PlaystatsCrateCreatedMissionDone(p0, p1, p2); } // unverified
  playHoldUpMissionDone(p0: number, p1: number, p2: number, p3: number): void { PlaystatsHoldUpMissionDone(p0, p1, p2, p3); }
  playImportExportMissionDone(p0: number, p1: number, p2: number, p3: number): void { PlaystatsImportExportMissionDone(p0, p1, p2, p3); }
  playRaceToPointMissionDone(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number): void { PlaystatsRaceToPointMissionDone(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9); }
  playAcquiredHiddenPackage(p0: number): void { PlaystatsAcquiredHiddenPackage(p0); }
  playWebsiteVisited(scaleformHash: number, p1: number): void { PlaystatsWebsiteVisited(scaleformHash, p1); }
  playFriendActivity(p0: number, p1: number): void { PlaystatsFriendActivity(p0, p1); }
  playOddjobDone(p0: number, p1: number, p2: number): void { PlaystatsOddjobDone(p0, p1, p2); }
  playPropChange(p0: number, p1: number, p2: number, p3: number): void { PlaystatsPropChange(p0, p1, p2, p3); }
  playClothChange(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsClothChange(p0, p1, p2, p3, p4); }
  playWeaponModeChange(weaponHash: number, componentHashTo: number, componentHashFrom: number): void { PlaystatsWeaponModeChange(weaponHash, componentHashTo, componentHashFrom); }
  playCheatApplied(cheat: string): void { PlaystatsCheatApplied(cheat); }
  playQuickfixTool(element: number, item: string): void { PlaystatsQuickfixTool(element, item); }
  playIdleKick(time: number): void { PlaystatsIdleKick(time); }
  playHeistSaveCheat(hash: number, p1: number): void { PlaystatsHeistSaveCheat(hash, p1); }
  playDirectorMode(): number { return (PlaystatsDirectorMode as any)(); } // unverified
  playAwardBadsport(id: number): void { PlaystatsAwardBadsport(id); } // unverified
  playPegasaircraft(modelHash: number): void { PlaystatsPegasaircraft(modelHash); } // unverified
  playPiMenuHideSettings(): number { return (PlaystatsPiMenuHideSettings as any)(); } // unverified
  updateStatInt(statHash: number, value: number, p2: number): void { UpdateStatInt(statHash, value, p2); } // unverified
  updateStatFloat(statHash: number, value: number, p2: number): void { UpdateStatFloat(statHash, value, p2); } // unverified
  leaderboards2WriteDataForEventType(): any { return Leaderboards2WriteDataForEventType(); }
  statMigrateSave(platformName: string): boolean { return StatMigrateSave(platformName); } // unverified
  statSaveMigrationStatusStart(): boolean { return StatSaveMigrationStatusStart(); } // unverified
  statGetSaveMigrationStatus(): any { return StatGetSaveMigrationStatus(); }
  statSaveMigrationCancel(): boolean { return StatSaveMigrationCancelPendingOperation(); } // unverified
  statSaveMigrationConsumeContentUnlock(contentId: number, srcPlatform: string, srcGamerHandle: string): boolean { return StatSaveMigrationConsumeContent(contentId, srcPlatform, srcGamerHandle); } // unverified
  statGetSaveMigrationConsumeContentUnlockStatus(): any { return StatGetSaveMigrationConsumeContentStatus(); } // unverified
  setHasContentUnlocksFlags(value: number): void { SetHasContentUnlocksFlags(value); } // unverified
  setSaveMigrationTransactionId(transactionId: number): void { SetSaveMigrationTransactionId(transactionId); } // unverified
  playSpentPiCustomLoadout(amount: number): void { PlaystatsSpentPiCustomLoadout(amount); }
  playBuyContraband(): number { return (PlaystatsBuyContraband as any)(); } // unverified
  playSellContraband(): number { return (PlaystatsSellContraband as any)(); } // unverified
  playDefendContraband(): number { return (PlaystatsDefendContraband as any)(); } // unverified
  playRecoverContraband(): number { return (PlaystatsRecoverContraband as any)(); } // unverified
  orderedBossVehicle(p0: number, p1: number, vehicleHash: number): void { OrderedBossVehicle(p0, p1, vehicleHash); } // unverified
  playStuntPerformedEventAllowTrigger(): void { PlaystatsStuntPerformedEventAllowTrigger(); } // unverified
  playStuntPerformedEventDisallowTrigger(): void { PlaystatsStuntPerformedEventDisallowTrigger(); } // unverified
  playChangeMcEmblem(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsChangeMcEmblem(p0, p1, p2, p3, p4); } // unverified
  playEarnedMcPoints(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): void { PlaystatsEarnedMcPoints(p0, p1, p2, p3, p4, p5); }
  playCopyRankIntoNewSlot(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): void { PlaystatsCopyRankIntoNewSlot(p0, p1, p2, p3, p4, p5, p6); }
  playDupeDetection(): number { return (PlaystatsDupeDetection as any)(); } // unverified
  playBanAlert(p0: number): void { PlaystatsBanAlert(p0); }
  playGunrunMissionEnded(): number { return (PlaystatsGunrunMissionEnded as any)(); } // unverified
  playStoneHatchetEnd(): number { return (PlaystatsStoneHatchetEnd as any)(); } // unverified
  playSmugMissionEnded(): number { return (PlaystatsSmugMissionEnded as any)(); } // unverified
  playH2FmprepEnd(): number { return (PlaystatsH2FmprepEnd as any)(); } // unverified
  playH2InstanceEnd(p1: number, p2: number, p3: number): number { return PlaystatsH2InstanceEnd(p1, p2, p3); } // unverified
  playDarMissionEnd(): number { return (PlaystatsDarMissionEnd as any)(); } // unverified
  playEnterSessionPack(): number { return (PlaystatsEnterSessionPack as any)(); }
  playDroneUsage(p0: number, p1: number, p2: number): void { PlaystatsDroneUsage(p0, p1, p2); }
  playSpectatorWheelSpin(p0: number, p1: number, p2: number, p3: number): void { PlaystatsSpectatorWheelSpin(p0, p1, p2, p3); } // unverified
  playArenaWarSpectator(p0: number, p1: number, p2: number, p3: number, p4: number): void { PlaystatsArenaWarSpectator(p0, p1, p2, p3, p4); } // unverified
  playArenaWarsEnded(): number { return (PlaystatsArenaWarsEnded as any)(); }
  playPassiveMode(p0: boolean, p1: number, p2: number, p3: number): void { PlaystatsPassiveMode(p0, p1, p2, p3); } // unverified
  playCollectible(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number): void { PlaystatsCollectible(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9); } // unverified
  playCasinoStoryMissionEnded(p0: number, p1: number): void { PlaystatsCasinoStoryMissionEnded(p0, p1); }
  playCasinoChip(p0: number): void { PlaystatsCasinoChip(p0); }
  playCasinoRoulette(p0: number): void { PlaystatsCasinoRoulette(p0); }
  playCasinoBlackjack(p0: number): void { PlaystatsCasinoBlackjack(p0); }
  playCasinoThreecardpoker(p0: number): void { PlaystatsCasinoThreecardpoker(p0); } // unverified
  playCasinoSlotmachine(p0: number): void { PlaystatsCasinoSlotmachine(p0); } // unverified
  playCasinoInsidetrack(p0: number): void { PlaystatsCasinoInsidetrack(p0); } // unverified
  playCasinoLuckyseven(p0: number): void { PlaystatsCasinoLuckyseven(p0); } // unverified
  playCasinoRouletteLight(p0: number): void { PlaystatsCasinoRouletteLight(p0); }
  playCasinoBlackjackLight(p0: number): void { PlaystatsCasinoBlackjackLight(p0); }
  playCasinoThreecardpokerLight(p0: number): void { PlaystatsCasinoThreecardpokerLight(p0); } // unverified
  playCasinoSlotmachineLight(p0: number): void { PlaystatsCasinoSlotmachineLight(p0); } // unverified
  playCasinoInsidetrackLight(p0: number): void { PlaystatsCasinoInsidetrackLight(p0); } // unverified
  playArcadegame(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): void { PlaystatsArcadegame(p0, p1, p2, p3, p4, p5); } // unverified
  playCasinoMissionEnded(): number { return (PlaystatsCasinoMissionEnded as any)(); } // unverified
  leaderboards2ReadFriendsByRow(p2: number, p3: boolean, p4: number, p5: number): any { return Leaderboards2ReadFriendsByRow(p2, p3, p4, p5); }
  leaderboards2ReadByHandle(): any { return Leaderboards2ReadByHandle(); }
  leaderboards2ReadByRow(p2: number, p4: number, p6: number): any { return Leaderboards2ReadByRow(p2, p4, p6); } // unverified
  leaderboards2ReadByRadius(p1: number): any { return Leaderboards2ReadByRadius(p1); }
  leaderboards2ReadRankPrediction(): any { return Leaderboards2ReadRankPrediction(); }
  leaderboards2ReadByPlatform(gamerHandleCsv: string, platformName: string): number { return Leaderboards2ReadByPlaform(gamerHandleCsv, platformName); }
}
