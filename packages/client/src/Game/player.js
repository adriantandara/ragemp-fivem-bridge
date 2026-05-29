import { createUnkProxy } from "./_helpers.js";

export class GamePlayerNs {
  unk = createUnkProxy();

  getPed(player) { return GetPlayerPed(player); }
  getPedScriptIndex(player) { return GetPlayerPed(player); }
  setModel(player, model) { SetPlayerModel(player, model); }
  getId(player) { return GetPlayerServerId(player); }
  getIndex(player) { return player; }
  getName(player) { return GetPlayerName(player); }

  getEntityIsFreeAimingAt(player) {
    const [hit, entity] = GetEntityPlayerIsFreeAimingAt(player);
    return hit ? entity : 0;
  }

  getTeam(player) { return GetPlayerTeam(player); }
  setTeam(player, team) { SetPlayerTeam(player, team); }
  getNumberOfPlayersInTeam(team) {
    let count = 0;
    for (let i = 0; i < 32; i++) if (NetworkIsPlayerActive(i) && GetPlayerTeam(i) === team) count++;
    return count;
  }

  getWantedLevel(player) { return GetPlayerWantedLevel(player); }
  setWantedLevel(player, wantedLevel, disableNoMission) {
    SetPlayerWantedLevel(player, wantedLevel, disableNoMission ?? false);
    SetPlayerWantedLevelNow(player, false);
  }
  clearWantedLevel(player) { ClearPlayerWantedLevel(player); }
  isWantedLevelGreater(player, wantedLevel) { return GetPlayerWantedLevel(player) > wantedLevel; }

  setWeaponDamageModifier(player, modifier) { SetPlayerWeaponDamageModifier(player, modifier); }
  setMeleeWeaponDamageModifier(player, modifier, p2) { SetPlayerMeleeWeaponDamageModifier(player, modifier, p2 ?? false); }
  disableFiring(player, toggle) { DisablePlayerFiring(player, toggle); }

  specialAbilityActivate(player, p0, p1) { SpecialAbilityActivate(player, p0, p1); }
  specialAbilityDeactivate(player, p1) { SpecialAbilityDeactivate(player, p1); }
  isSpecialAbilityActive(player, p1) { return IsSpecialAbilityActive(player, p1); }

  setParachuteTintIndex(player, tintIndex) { SetPlayerParachuteTintIndex(player, tintIndex); }
  setParachuteSmokeTrailColor(player, r, g, b) { SetPlayerParachuteSmokeTrailColor(player, r, g, b); }

  startTeleport(player, x, y, z, heading, tpVehicle, setToGround, fadeOut) {
    StartPlayerTeleport(player, x, y, z, heading, tpVehicle ?? false, setToGround ?? false, fadeOut ?? true);
  }
  isTeleportActive(player) { return IsPlayerTeleportActive(player); }
  stopTeleport() { StopPlayerTeleport(); }

  isActive(player) { return NetworkIsPlayerActive(player); }
  getNumActiveCharacters() { return NetworkGetNumConnectedPlayers(); }
  isPlayingBackRecording(player) { return IsPlayerPlayingBackRecording(player); }
  hasControlOfEntity(entity) { return NetworkHasControlOfEntity(entity); }

  setHealthRechargeMultiplier(player, rechargeRate) { SetPlayerHealthRechargeMultiplier(player, rechargeRate); }
  setMaxArmour(player, value) { SetPlayerMaxArmour(player, value); }
  setSwimMultiplier(player, multiplier) { SetPlayerSwimMultiplier(player, multiplier); }
  setRunSpeedMultiplier(player, multiplier) { SetRunSpeedMultiplierForPlayer(player, multiplier); }
  setFallDistance(player, fallDistance) { SetPlayerFallDistance(player, fallDistance); }
  restoreStamina(player, p1) { RestorePlayerStamina(player ?? PlayerId(), p1 ?? 1.0); }
  resetStamina(player) { ResetPlayerStamina(player ?? PlayerId()); }
  getStamina(player) { return GetPlayerSprintStaminaRemaining(player ?? PlayerId()); }
}
