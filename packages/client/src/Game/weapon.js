import { createUnkProxy } from "./_helpers.js";

export class GameWeaponNs {
  unk = createUnkProxy();

  unequipEmptyWeapons = true;

  giveToPed(ped, weaponHash, ammoCount, isHidden, bForceInHand) {
    GiveWeaponToPed(ped, weaponHash, ammoCount, isHidden ?? false, bForceInHand ?? true);
  }
  removeFromPed(ped, weaponHash) { RemoveWeaponFromPed(ped, weaponHash); }
  getAmmoInClip(ped, weaponHash) {
    const [, ammo] = GetAmmoInClip(ped, weaponHash);
    return ammo;
  }
  setAmmoInClip(ped, weaponHash, ammo) { return SetAmmoInClip(ped, weaponHash, ammo); }
  removeAllWeapons(ped, p1) { RemoveAllPedWeapons(ped, p1 ?? true); }
  hasWeapon(ped, weaponHash) { return HasPedGotWeapon(ped, weaponHash, false); }
  getCurrentWeapon(ped) {
    const [, hash] = GetCurrentPedWeapon(ped, true);
    return hash;
  }
  setCurrentWeapon(ped, weaponHash, equip) { SetCurrentPedWeapon(ped, weaponHash, equip ?? true); }
  getWeaponTintIndex(ped, weaponHash) { return GetPedWeaponTintIndex(ped, weaponHash); }
  setWeaponTintIndex(ped, weaponHash, tintIndex) { SetPedWeaponTintIndex(ped, weaponHash, tintIndex); }
  giveComponent(ped, weaponHash, componentHash) { GiveWeaponComponentToPed(ped, weaponHash, componentHash); }
  removeComponent(ped, weaponHash, componentHash) { RemoveWeaponComponentFromPed(ped, weaponHash, componentHash); }
  hasComponent(ped, weaponHash, componentHash) { return HasPedGotWeaponComponent(ped, weaponHash, componentHash); }

  createObject(weaponHash, ammoCount, x, y, z, showWorldModel, scale) {
    return CreateWeaponObject(weaponHash, ammoCount, x, y, z, showWorldModel ?? true, scale ?? 1.0, 0);
  }
  enableLaserSightRendering(toggle) { EnableLaserSightRendering(toggle); }
  getAmmoTypeFromWeapon(ped, weaponHash) { return GetPedAmmoTypeFromWeapon(ped, weaponHash); }
}
