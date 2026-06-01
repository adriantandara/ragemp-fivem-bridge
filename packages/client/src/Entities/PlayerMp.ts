import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { PedMpBase } from "./PedMpBase";
import { toVec3 } from "../utils/vec";
import { getLocalDimension } from "../utils/dimension";

// Voice FX parameter shapes (from ragemp d.ts)
interface VoiceFxChorus { fWetDryMix: number; fDepth: number; fFeedback: number; fFrequency: number; lWaveform: number; fDelay: number; lPhase: number; }
interface VoiceFxCompressor { fGain: number; fAttack: number; fRelease: number; fThreshold: number; fRatio: number; fPredelay: number; }
interface VoiceFxDistortion { fGain: number; fEdge: number; fPostEQCenterFrequency: number; fPostEQBandwidth: number; fPreLowpassCutoff: number; }
interface VoiceFxEcho { fWetDryMix: number; fFeedback: number; fLeftDelay: number; fRightDelay: number; lPanDelay: number; }
interface VoiceFxFlanger { fWetDryMix: number; fDepth: number; fFeedback: number; fFrequency: number; lWaveform: number; fDelay: number; lPhase: number; }
interface VoiceFxGargle { dwRateHz: number; dwWaveShape: number; }
interface VoiceFxParamEq { fCenter: number; fBandwidth: number; fGain: number; }
interface VoiceFxReverb { fInGain: number; fReverbMix: number; fReverbTime: number; fHighFreqRTRatio: number; }
interface VoiceFxVolume { fTarget: number; fCurrent: number; fTime: number; lCurve: number; }
interface VoiceFxPeakEq { lBand: number; fBandwidth: number; fQ: number; fCenter: number; fGain: number; lChannel: number; }
interface VoiceFxBQF { lFilter: number; fCenter: number; fGain: number; fBandwidth: number; fQ: number; fS: number; lChannel: number; }

export class PlayerMp extends PedMpBase {
  _playerIndex: number;
  _dimension: number | undefined;
  _voiceFX: any;

  constructor(id: number, playerIndex: number) {
    super(id, "player");
    this._playerIndex = playerIndex;
  }

  _stateBag(): any {
    return globalThis.Player(this.id).state;
  }

  get ped(): number {
    return GetPlayerPed(this._playerIndex);
  }
  get handle(): number {
    return GetPlayerPed(this._playerIndex);
  }

  get name(): string {
    return GetPlayerName(this._playerIndex);
  }

  get dimension(): number {
    if ((globalThis as any).mp?.players?.local === this) return getLocalDimension();
    return this._dimension ?? 0;
  }
  set dimension(value: number) {
    this._dimension = value;
  }

  get vehicle(): any {
    const veh = GetVehiclePedIsIn(this.ped, false);
    if (!veh || veh === 0) return null;
    return (globalThis as any).mp?.vehicles?.atHandle?.(veh) ?? null;
  }

  get aimTarget(): any {
    const [found, entity] = GetPlayerTargetEntity(this._playerIndex);
    return found ? entity : null;
  }

  get isTypingInTextChat(): boolean {
    return false;
  }

  get isVoiceActive(): boolean {
    return NetworkIsPlayerTalking(this._playerIndex);
  }

  get ping(): number {
    return GetPlayerPing(this._playerIndex);
  }

  get eyeColour(): number { return GetPedEyeColor(this.ped); }
  get hairColour(): number { return GetPedHairColor(this.ped); }
  get hairHighlightColour(): number { return GetPedHairHighlightColor(this.ped); }

  get action(): string {
    const ped = this.ped;
    if (!ped) return "unknown";
    if (IsEntityDead(ped)) return "dead";
    if (IsPedInAnyVehicle(ped, false)) return "in_vehicle";
    if (IsPedRagdoll(ped)) return "ragdoll";
    if (IsPedSwimming(ped)) return "swimming";
    if (IsPedFalling(ped)) return "falling";
    if (IsPedJumping(ped)) return "jumping";
    if (IsPedClimbing(ped)) return "climbing";
    if (IsPedInCover(ped, false)) return "in_cover";
    if (IsPedReloading(ped)) return "reloading";
    if (IsPedShooting(ped)) return "shooting";
    if (IsPedRunning(ped)) return "running";
    if (IsPedSprinting(ped)) return "sprinting";
    if (IsPedWalking(ped)) return "walking";
    return "idle";
  }

  get ip(): string { return ""; }
  get rgscId(): string { return ""; }
  get serial(): string { return ""; }
  get socialClub(): string { return ""; }
  get p2pEnabled(): boolean { return false; }
  set p2pEnabled(_v: boolean) {}
  get p2pConnected(): boolean { return false; }

  getId(): number {
    return GetPlayerServerId(this._playerIndex);
  }

  getIndex(): number {
    return this._playerIndex;
  }

  call(eventName: string, ...args: any[]): void {
    (globalThis as any).mp?.events?._fire(eventName, this, ...args);
  }

  canPedHear(ped: number): boolean { return CanPedHearPlayer(this._playerIndex, ped); }
  changePed(ped: number, b2: boolean, b3: boolean): void { ChangePlayerPed(this._playerIndex, ped, !!b2, !!b3); }
  clearHasDamagedAtLeastOneNonAnimalPed(): void { ClearPlayerHasDamagedAtLeastOneNonAnimalPed(this._playerIndex); }
  clearHasDamagedAtLeastOnePed(): void { ClearPlayerHasDamagedAtLeastOnePed(this._playerIndex); }
  clearParachuteModelOverride(): void { ClearPlayerParachuteModelOverride(this._playerIndex); }
  clearParachutePackModelOverride(): void { ClearPlayerParachutePackModelOverride(this._playerIndex); }
  clearParachuteVariationOverride(): void { ClearPlayerParachuteVariationOverride(this._playerIndex); }
  clearWantedLevel(): void { ClearPlayerWantedLevel(this._playerIndex); }
  getCurrentStealthNoise(): number { return GetPlayerCurrentStealthNoise(this._playerIndex); }
  getGroup(): number { return GetPlayerGroup(this._playerIndex); }
  getHasReserveParachute(): boolean { return GetPlayerHasReserveParachute(this._playerIndex); }
  getInvincible(): boolean { return GetPlayerInvincible(this._playerIndex); }
  getMaxArmour(): number { return GetPlayerMaxArmour(this._playerIndex); }
  getName(): string { return GetPlayerName(this._playerIndex); }
  getParachutePackTintIndex(tintIndex?: number): number { return GetPlayerParachutePackTintIndex(this._playerIndex); }
  getPed(): number { return GetPlayerPed(this._playerIndex); }
  getPedScriptIndex(): number { return GetPlayerPedScriptIndex(this._playerIndex); }
  getReserveParachuteTintIndex(tintIndex?: number): number { return GetPlayerReserveParachuteTintIndex(this._playerIndex); }
  getSprintStaminaRemaining(): number { return GetPlayerSprintStaminaRemaining(this._playerIndex); }
  getSprintTimeRemaining(): number { return GetPlayerSprintTimeRemaining(this._playerIndex); }
  getTeam(): number { return GetPlayerTeam(this._playerIndex); }
  getUnderwaterTimeRemaining(): number { return GetPlayerUnderwaterTimeRemaining(this._playerIndex); }
  getWantedCentrePosition(): Vector3 { return toVec3(GetPlayerWantedCentrePosition(this._playerIndex) as any); }
  getWantedLevel(): number { return GetPlayerWantedLevel(this._playerIndex); }
  giveRagdollControl(toggle: boolean): void { GivePlayerRagdollControl(this._playerIndex, !!toggle); }
  hasBeenSpottedInStolenVehicle(): boolean { return HasPlayerBeenSpottedInStolenVehicle(this._playerIndex); }
  hasDamagedAtLeastOneNonAnimalPed(): boolean { return HasPlayerDamagedAtLeastOneNonAnimalPed(this._playerIndex); }
  hasDamagedAtLeastOnePed(): boolean { return HasPlayerDamagedAtLeastOnePed(this._playerIndex); }
  hasLeftTheWorld(): boolean { return HasPlayerLeftTheWorld(this._playerIndex); }
  isControlOn(): boolean { return IsPlayerControlOn(this._playerIndex); }
  isFreeForAmbientTask(): boolean { return IsPlayerFreeForAmbientTask(this._playerIndex); }
  isPlaying(): boolean { return IsPlayerPlaying(this._playerIndex); }
  isPressingHorn(): boolean { return IsPlayerPressingHorn(this._playerIndex); }
  isReadyForCutscene(): boolean { return IsPlayerReadyForCutscene(this._playerIndex); }
  isRidingTrain(): boolean { return IsPlayerRidingTrain(this._playerIndex); }
  isScriptControlOn(): boolean { return IsPlayerScriptControlOn(this._playerIndex); }
  isTargettingAnything(): boolean { return IsPlayerTargettingAnything(this._playerIndex); }
  isWantedLevelGreater(wantedLevel: number): boolean { return IsPlayerWantedLevelGreater(this._playerIndex, wantedLevel); }
  resetArrestState(): void { ResetPlayerArrestState(this._playerIndex); }
  resetInputGait(): void { ResetPlayerInputGait(this._playerIndex); }
  resetStamina(): void { ResetPlayerStamina(this._playerIndex); }
  setCanBeHassledByGangs(toggle: boolean): void { SetPlayerCanBeHassledByGangs(this._playerIndex, !!toggle); }
  setCanDoDriveBy(toggle: boolean): void { SetPlayerCanDoDriveBy(this._playerIndex, !!toggle); }
  setCanLeaveParachuteSmokeTrail(enabled: boolean): void { SetPlayerCanLeaveParachuteSmokeTrail(this._playerIndex, !!enabled); }
  setCanUseCover(toggle: boolean): void { SetPlayerCanUseCover(this._playerIndex, !!toggle); }
  setControl(toggle: boolean, possiblyFlags: number): void { SetPlayerControl(this._playerIndex, !!toggle, possiblyFlags ?? 0); }
  setEveryoneIgnore(toggle: boolean): void { SetEveryoneIgnorePlayer(this._playerIndex, !!toggle); }
  setForcedAim(toggle: boolean): void { SetPlayerForcedAim(this._playerIndex, !!toggle); }
  setForcedZoom(toggle: boolean): void { SetPlayerForcedZoom(this._playerIndex, !!toggle); }
  setForceSkipAimIntro(toggle: boolean): void { SetPlayerForceSkipAimIntro(this._playerIndex, !!toggle); }
  setHasReserveParachute(): void { SetPlayerHasReserveParachute(this._playerIndex); }
  setLockon(toggle: boolean): void { SetPlayerLockon(this._playerIndex, !!toggle); }
  setLockonRangeOverride(range: number): void { SetPlayerLockonRangeOverride(this._playerIndex, range); }
  setMaxArmour(value: number): void { SetPlayerMaxArmour(this._playerIndex, value); }
  setMayNotEnterAnyVehicle(): void { SetPlayerMayNotEnterAnyVehicle(this._playerIndex); }
  setMayOnlyEnterThisVehicle(vehicle: any): void { SetPlayerMayOnlyEnterThisVehicle(this._playerIndex, vehicle?._handle ?? vehicle); }
  setMeleeWeaponDamageModifier(modifier: number): void { (SetPlayerMeleeWeaponDamageModifier as any)(this._playerIndex, modifier, false); }
  setModel(model: number | string): void {
    const hash = typeof model === "string" ? GetHashKey(model) : model;
    SetPlayerModel(this._playerIndex, hash);
  }
  setNoiseMultiplier(multiplier: number): void { SetPlayerNoiseMultiplier(this._playerIndex, multiplier); }
  setParachuteModelOverride(model: number): void { SetPlayerParachuteModelOverride(this._playerIndex, model); }
  setParachutePackModelOverride(model: number): void { SetPlayerParachutePackModelOverride(this._playerIndex, model); }
  setParachutePackTintIndex(tintIndex: number): void { SetPlayerParachutePackTintIndex(this._playerIndex, tintIndex); }
  setParachuteSmokeTrailColor(r: number, g: number, b: number): void { SetPlayerParachuteSmokeTrailColor(this._playerIndex, r, g, b); }
  setParachuteVariationOverride(component: number, drawable: number, texture: number, p4: boolean): void { SetPlayerParachuteVariationOverride(this._playerIndex, component, drawable, texture, !!p4); }
  setPoliceIgnore(toggle: boolean): void { SetPoliceIgnorePlayer(this._playerIndex, !!toggle); }
  setReserveParachuteTintIndex(tintIndex: number): void { SetPedReserveParachuteTintIndex(this.ped, tintIndex); }
  setSimulateAiming(toggle: boolean): void { SetPlayerSimulateAiming(this._playerIndex, !!toggle); }
  setSneakingNoiseMultiplier(multiplier: number): void { SetPlayerSneakingNoiseMultiplier(this._playerIndex, multiplier); }
  setSprint(toggle: boolean): void { SetPlayerSprint(this._playerIndex, !!toggle); }
  setStealthPerceptionModifier(value: number): void { SetPlayerStealthPerceptionModifier(this._playerIndex, value); }
  setTeam(team: number): void { SetPlayerTeam(this._playerIndex, team); }
  setVehicleDamageModifier(damageAmount: number): void { SetPlayerVehicleDamageModifier(this._playerIndex, damageAmount); }
  setVehicleDefenseModifier(modifier: number): void { SetPlayerVehicleDefenseModifier(this._playerIndex, modifier); }
  setWantedCentrePosition(x: number, y: number, z: number): void { (SetPlayerWantedCentrePosition as any)(this._playerIndex, x, y, z, false, false); }
  setWantedLevel(wantedLevel: number, disableNoMission: boolean): void { SetPlayerWantedLevel(this._playerIndex, wantedLevel, disableNoMission ?? false); }
  setWantedLevelNoDrop(wantedLevel: number, p2: boolean): void { SetPlayerWantedLevelNoDrop(this._playerIndex, wantedLevel, !!p2); }
  setWantedLevelNow(delayLawResponse: boolean): void { SetPlayerWantedLevel(this._playerIndex, arguments.length ? this.getWantedLevel() : 0, false); SetPlayerWantedLevelNow(this._playerIndex, !!delayLawResponse); }
  setWeaponDamageModifier(damageAmount: number): void { SetPlayerWeaponDamageModifier(this._playerIndex, damageAmount); }
  setWeaponDefenseModifier(modifier: number): void { SetPlayerWeaponDefenseModifier(this._playerIndex, modifier); }

  addVehicleSubtaskAttack(ped2: number): void { AddVehicleSubtaskAttackPed(this.ped, ped2); }
  addVehicleSubtaskAttackCoord(x: number, y: number, z: number): void { AddVehicleSubtaskAttackCoord(this.ped, x, y, z); }
  clearSecondaryTask(): void { ClearPedSecondaryTask(this.ped); }
  explodeHead(weaponHash: number): void { ExplodePedHead(this.ped, weaponHash); }
  hideBloodDamageByZone(p1: any, p2: boolean): void { HidePedBloodDamageByZone(this.ped, p1, !!p2); }
  isClimbing(): boolean { return IsPedClimbing(this.ped); }
  isJumping(): boolean { return IsPedJumping(this.ped); }
  isInCover(exceptUseWeapon: boolean): boolean { return IsPedInCover(this.ped, !!exceptUseWeapon); }
  setClothPinFrames(toggle: boolean): void { SetPedClothPinFrames(this.ped, toggle); }
  taskVehicleShootAt(target: number, p2: number): void { TaskVehicleShootAtPed(this.ped, target, p2 ?? 1.0); }
  updateTaskSweepAim(entity: number): void { UpdateTaskSweepAimEntity(this.ped, entity); }

  getCurrentScriptedAnim(): string { return GetEntityCurrentAnimDict(this.ped); }
  getCurrentScenarioId(): number { return GetScriptTaskStatus(this.ped, 0x6E0B9A8F); }
  taskBleedingDeath(): void { TaskPedDieInVehicle(this.ped, 0); }
  taskRevive(): void { (NetworkResurrectLocalPlayer as any)(0, 0, 0, 0, true, false); }
  taskCrawl(isOnBack?: boolean): void { (TaskGoToCoordsWhilstAimingAtCoords as any)(this.ped, 0, 0, 0, 0, 0, 0, 0, 0, true, 0, 0, false, false, 0); }
  taskCrawlToCoords(position: Vector3, _isOnBack: boolean, _timeout: number): void { TaskGoToCoordAnyMeans(this.ped, position.x, position.y, position.z, 1.0, 0, false, 786603, 0.0); }

  hasTeleportFinished(): boolean { return true; }
  hasUseScenarioTask(): boolean { return IsPedUsingAnyScenario(this.ped); }
  getVoiceAttribute(_attribute: any): any { return undefined; }
  setVoiceAttribute(_attribute: any, _value: any): void {}
  closeVoiceStream(): void {}
  get voiceAutoVolume(): number { return 1.0; }
  set voiceAutoVolume(_v: number) {}
  get voiceVolume(): number { return 1.0; }
  set voiceVolume(v: number) { MumbleSetAudioInputDistance(v * 20); }
  get voice3d(): any { return false; }
  set voice3d(_v: any) {}
  setVoiceFx(_fxType: number, _priority: number): void {}
  removeVoiceFx(_fxHandle: number): void {}
  resetVoiceFx(_fxHandle: number): void {}
  setVoiceFxChorus(_fxHandle: number, _opts: VoiceFxChorus): void {}
  setVoiceFxCompressor(_fxHandle: number, _opts: VoiceFxCompressor): void {}
  setVoiceFxDistortion(_fxHandle: number, _opts: VoiceFxDistortion): void {}
  setVoiceFxEcho(_fxHandle: number, _opts: VoiceFxEcho): void {}
  setVoiceFxFlanger(_fxHandle: number, _opts: VoiceFxFlanger): void {}
  setVoiceFxGargle(_fxHandle: number, _opts: VoiceFxGargle): void {}
  setVoiceFxParamEq(_fxHandle: number, _opts: VoiceFxParamEq): void {}
  setVoiceFxReverb(_fxHandle: number, _opts: VoiceFxReverb): void {}
  setVoiceFxVolume(_fxHandle: number, _opts: VoiceFxVolume): void {}
  setVoiceFxPeakEq(_fxHandle: number, _opts: VoiceFxPeakEq): void {}
  setVoiceFxBQF(_fxHandle: number, _opts: VoiceFxBQF): void {}

  get isPositionFrozen(): boolean {
    return IsEntityPositionFrozen(this.ped);
  }
  set isPositionFrozen(value: boolean) {
    FreezeEntityPosition(this.ped, !!value);
  }

  get voiceFX(): any {
    if (!this._voiceFX) {
      this._voiceFX = {
        setFX() {}, removeFX() {}, resetFX() {}, getFXType() { return 0; },
        setFXChorus() {}, setFXCompressor() {}, setFXDistortion() {}, setFXEcho() {},
        setFXFlanger() {}, setFXGargle() {}, setFXI3DL2Reverb() {}, setFXParamEQ() {}, setFXReverb() {},
      };
    }
    return this._voiceFX;
  }
}
