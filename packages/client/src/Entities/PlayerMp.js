import { Entity } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class PlayerMp extends Entity {
  _playerIndex;

  constructor(id, playerIndex) {
    super(id, "player");
    this._playerIndex = playerIndex;
  }

  _stateBag() {
    return globalThis.Player(this.id).state;
  }

  get ped() {
    return GetPlayerPed(this._playerIndex);
  }

  get name() {
    return GetPlayerName(this._playerIndex);
  }

  get health() {
    return GetEntityHealth(this.ped);
  }

  set health(value) {
    SetEntityHealth(this.ped, value);
  }

  get armour() {
    return GetPedArmour(this.ped);
  }

  set armour(value) {
    SetPedArmour(this.ped, value);
  }

  get position() {
    const coords = GetEntityCoords(this.ped, true);
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set position(value) {
    SetEntityCoords(this.ped, value.x, value.y, value.z, false, false, false, false);
  }

  get heading() {
    return GetEntityHeading(this.ped);
  }

  set heading(value) {
    SetEntityHeading(this.ped, value);
  }

  get vehicle() {
    const veh = GetVehiclePedIsIn(this.ped, false);
    return veh !== 0 ? veh : null;
  }

  get weapon() {
    return GetSelectedPedWeapon(this.ped);
  }

  get model() {
    return GetEntityModel(this.ped);
  }

  get action() {
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

  get aimTarget() {
    const [found, entity] = GetPlayerTargetEntity(this._playerIndex);
    return found ? entity : null;
  }

  get isTypingInTextChat() {
    return false;
  }

  get eyeColour() {
    return GetPedEyeColor(this.ped);
  }

  get hairColour() {
    return GetPedHairColor(this.ped);
  }

  get hairHighlightColour() {
    return GetPedHairHighlightColor(this.ped);
  }

  get isPositionFrozen() {
    return IsEntityPositionFrozen(this.ped);
  }

  setModel(model) {
    const hash = typeof model === "string" ? GetHashKey(model) : model;
    SetPlayerModel(this._playerIndex, hash);
  }

  setControl(state) {
    SetPlayerControl(this._playerIndex, state, 0);
  }

  freezePosition(toggle) {
    FreezeEntityPosition(this.ped, !!toggle);
  }

  setEveryoneIgnore(state) {
    SetEveryoneIgnorePlayer(this._playerIndex, state);
  }

  clearWantedLevel() {
    ClearPlayerWantedLevel(this._playerIndex);
  }

  getWantedLevel() {
    return GetPlayerWantedLevel(this._playerIndex);
  }

  setWantedLevel(level) {
    SetPlayerWantedLevel(this._playerIndex, level, false);
  }

  call(eventName, ...args) {
    globalThis.mp?.events?._fire(eventName, this, ...args);
  }

  getTeam() {
    return GetPlayerTeam(this._playerIndex);
  }

  setTeam(team) {
    SetPlayerTeam(this._playerIndex, team);
  }

  setPoliceIgnore(toggle) {
    SetPoliceIgnorePlayer(this._playerIndex, !!toggle);
  }

  setWantedLevelNow(level) {
    SetPlayerWantedLevel(this._playerIndex, level, false);
    SetPlayerWantedLevelNow(this._playerIndex, false);
  }

  setWantedLevelNoDrop(level) {
    SetPlayerWantedLevelNoDrop(this._playerIndex, level, false);
  }

  setMaxArmour(value) {
    SetPlayerMaxArmour(this._playerIndex, value);
  }

  setSprint(toggle) {
    SetPlayerSprint(this._playerIndex, !!toggle);
  }

  setMayNotEnterAnyVehicle() {
    SetPlayerMayNotEnterAnyVehicle(this._playerIndex);
  }

  setMayOnlyEnterThisVehicle(vehicle) {
    SetPlayerMayOnlyEnterThisVehicle(this._playerIndex, vehicle._handle ?? vehicle);
  }

  setMeleeWeaponDamageModifier(modifier) {
    SetPlayerMeleeWeaponDamageModifier(this._playerIndex, modifier);
  }

  setVehicleDamageModifier(modifier) {
    SetPlayerVehicleDamageModifier(this._playerIndex, modifier);
  }

  setVehicleDefenseModifier(modifier) {
    SetPlayerVehicleDefenseModifier(this._playerIndex, modifier);
  }

  setWeaponDamageModifier(modifier) {
    SetPlayerWeaponDamageModifier(this._playerIndex, modifier);
  }

  setWeaponDefenseModifier(modifier) {
    SetPlayerWeaponDefenseModifier(this._playerIndex, modifier);
  }

  setSimulateAiming(toggle) {
    SetPlayerSimulateAiming(this._playerIndex, !!toggle);
  }

  setLockon(toggle) {
    SetPlayerLockon(this._playerIndex, !!toggle);
  }

  setLockonRangeOverride(range) {
    SetPlayerLockonRangeOverride(this._playerIndex, range);
  }

  setForcedAim(toggle) {
    SetPlayerForcedAim(this._playerIndex, !!toggle);
  }

  setForcedZoom(toggle) {
    SetPlayerForcedZoom(this._playerIndex, !!toggle);
  }

  setCanDoDriveBy(toggle) {
    SetPlayerCanDoDriveBy(this._playerIndex, !!toggle);
  }

  setCanBeTargetted(toggle) {
    SetPlayerCanBeTargetted(this._playerIndex, !!toggle);
  }

  setCanUseCover(toggle) {
    SetPlayerCanUseCover(this._playerIndex, !!toggle);
  }

  isClimbing() {
    return IsPedClimbing(this.ped);
  }

  isJumping() {
    return IsPedJumping(this.ped);
  }

  isInCover() {
    return IsPedInCover(this.ped, false);
  }

  isPressingHorn() {
    return IsPlayerPressingHorn(this._playerIndex);
  }

  getSprintStaminaRemaining() {
    return GetPlayerSprintStaminaRemaining(this._playerIndex);
  }

  getSprintTimeRemaining() {
    return GetPlayerSprintTimeRemaining(this._playerIndex);
  }

  getUnderwaterTimeRemaining() {
    return GetPlayerUnderwaterTimeRemaining(this._playerIndex);
  }

  isRidingTrain() {
    return IsPlayerRidingTrain(this._playerIndex);
  }

  isTargettingAnything() {
    return IsPlayerTargettingAnything(this._playerIndex);
  }

  isControlOn() {
    return IsPlayerControlOn(this._playerIndex);
  }

  getGroup() {
    return GetPedGroupIndex(this.ped);
  }

  giveRagdollControl(toggle) {
    GivePlayerRagdollControl(this._playerIndex, !!toggle);
  }

  explodeHead(weaponHash) {
    ExplodePedHead(this.ped, weaponHash);
  }

  clearSecondaryTask() {
    ClearPedSecondaryTask(this.ped);
  }

  resetStamina() {
    ResetPlayerStamina(this._playerIndex);
  }

  setNoiseMultiplier(multiplier) {
    SetPlayerNoiseMultiplier(this._playerIndex, multiplier);
  }

  setSneakingNoiseMultiplier(multiplier) {
    SetPlayerSneakingNoiseMultiplier(this._playerIndex, multiplier);
  }

  setStealthPerceptionModifier(value) {
    SetStealthPerceptionModifier(this._playerIndex, value);
  }

  setCanBeHassledByGangs(toggle) {
    SetPlayerCanBeHassledByGangs(this._playerIndex, !!toggle);
  }

  isWantedLevelGreater(level) {
    return IsPlayerWantedLevelGreater(this._playerIndex, level);
  }

  getCurrentScriptedAnim() {
    return GetEntityCurrentAnimDict(this.ped);
  }

  getCurrentScenarioId() {
    return GetScriptTaskStatus(this.ped, 0x6E0B9A8F);
  }

  taskBleedingDeath() {
    TaskPedDieInVehicle(this.ped, 0);
  }

  taskRevive() {
    NetworkResurrectLocalPlayer(0, 0, 0, 0, true, false);
  }

  taskCrawl() {
    TaskGoToCoordsWhilstAimingAtCoords(this.ped, 0, 0, 0, 0, 0, 0, 0, 0, true, 0, 0, false, false, 0);
  }

  get isVoiceActive() {
    return NetworkIsPlayerTalking(this._playerIndex);
  }

  get ip() {
    return "";
  }

  get ping() {
    return GetPlayerPing(this._playerIndex);
  }

  get rgscId() { return ""; }
  get serial() { return ""; }
  get socialClub() { return ""; }
  get p2pEnabled() { return false; }
  set p2pEnabled(_v) {}
  get p2pConnected() { return false; }
  get voiceAutoVolume() { return 1.0; }
  set voiceAutoVolume(_v) {}
  get voiceVolume() { return 1.0; }
  set voiceVolume(v) { MumbleSetAudioInputDistance(v * 20); }
  get voice3d() { return false; }
  set voice3d(_v) {}

  get voiceFX() {
    if (!this._voiceFX) {
      this._voiceFX = {
        setFX(_channel, _type, ..._params) {},
        removeFX(_channel) {},
        resetFX(_channel) {},
        getFXType(_channel) { return 0; },
        setFXChorus(_channel, ..._args) {},
        setFXCompressor(_channel, ..._args) {},
        setFXDistortion(_channel, ..._args) {},
        setFXEcho(_channel, ..._args) {},
        setFXFlanger(_channel, ..._args) {},
        setFXGargle(_channel, ..._args) {},
        setFXI3DL2Reverb(_channel, ..._args) {},
        setFXParamEQ(_channel, ..._args) {},
        setFXReverb(_channel, ..._args) {},
      };
    }
    return this._voiceFX;
  }
}
