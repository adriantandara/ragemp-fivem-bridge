import { createUnkProxy } from "./_helpers.js";

export class GameFilesNs {
  unk = createUnkProxy();

  getNumTattooShopDlcItems(character: number): number { return GetNumTattooShopDlcItems(character); }
  getTattooShopDlcItemData(characterType: number, decorationIndex: number): number { return (GetTattooShopDlcItemData as any)(characterType, decorationIndex); }
  initShopPedComponent(): number { return (InitShopPedComponent as any)(); }
  initShopPedProp(): number { return (InitShopPedProp as any)(); }
  setupShopPedApparelQuery(p0: number, p1: number, p2: number, p3: number): number { return SetupShopPedApparelQuery(p0, p1, p2, p3); }
  setupShopPedApparelQueryTu(character: number, p1: number, p2: number, p3: boolean, p4: number, componentId: number): number { return SetupShopPedApparelQueryTu(character, p1, p2, !!p3, p4, componentId); }
  getShopPedQueryComponent(componentId: number): number { return GetShopPedQueryComponent(componentId); }
  getShopPedComponent(componentHash: number): number { return GetShopPedComponent(componentHash); }
  getShopPedQueryProp(componentId: number): number { return GetShopPedQueryProp(componentId); }
  getShopPedProp(componentHash: number): number { return GetShopPedProp(componentHash); }
  getHashNameForComponent(entity: number, componentId: number, drawableVariant: number, textureVariant: number): number { return GetHashNameForComponent(entity, componentId, drawableVariant, textureVariant); }
  getHashNameForProp(entity: number, componentId: number, propIndex: number, propTextureIndex: number): number { return GetHashNameForProp(entity, componentId, propIndex, propTextureIndex); }
  getShopPedApparelVariantComponentCount(componentHash: number): number { return GetShopPedApparelVariantComponentCount(componentHash); }
  getShopPedApparelVariantPropCount(propHash: number): number { return GetShopPedApparelVariantPropCount(propHash); }
  getVariantComponent(componentHash: number, variantComponentIndex: number): { nameHash: number; enumValue: number; componentType: number } {
    const r = GetVariantComponent(componentHash, variantComponentIndex);
    return { nameHash: r[0], enumValue: r[1], componentType: r[2] };
  }
  getVariantProp(componentHash: number, variantPropIndex: number): { nameHash: number; enumValue: number; anchorPoint: number } {
    const r = GetVariantProp(componentHash, variantPropIndex);
    return { nameHash: r[0], enumValue: r[1], anchorPoint: r[2] };
  }
  getShopPedApparelForcedComponentCount(componentHash: number): number { return GetShopPedApparelForcedComponentCount(componentHash); }
  getShopPedApparelForcedPropCount(componentHash: number): number { return GetShopPedApparelForcedPropCount(componentHash); }
  getForcedComponent(componentHash: number, forcedComponentIndex: number): { nameHash: number; enumValue: number; componentType: number } {
    const r = GetForcedComponent(componentHash, forcedComponentIndex);
    return { nameHash: r[0], enumValue: r[1], componentType: r[2] };
  }
  getForcedProp(componentHash: number, forcedPropIndex: number): { nameHash: number; enumValue: number; anchorPoint: number } {
    const r = GetForcedProp(componentHash, forcedPropIndex);
    return { nameHash: r[0], enumValue: r[1], anchorPoint: r[2] };
  }
  doesShopPedApparelHaveRestrictionTag(componentHash: number, restrictionTagHash: number, componentId: number): boolean { return DoesShopPedApparelHaveRestrictionTag(componentHash, restrictionTagHash, componentId); }
  setupShopPedOutfitQuery(character: number, p1: boolean): number { return SetupShopPedOutfitQuery(character, !!p1); }
  getShopPedQueryOutfit(outfitIndex: number): number { return GetShopPedQueryOutfit(outfitIndex); }
  getShopPedOutfit(p0: number): number { return GetShopPedOutfit(p0); }
  getShopPedOutfitLocate(p0: number): number { return GetShopPedOutfitLocate(p0); }
  getShopPedOutfitPropVariant(outfitHash: number, variantIndex: number): number { return (GetShopPedOutfitPropVariant as any)(outfitHash, variantIndex); }
  getShopPedOutfitComponentVariant(outfitHash: number, variantIndex: number): number { return (GetShopPedOutfitComponentVariant as any)(outfitHash, variantIndex); }
  getNumDlcVehicles(): number { return GetNumDlcVehicles(); }
  getDlcVehicleModel(dlcVehicleIndex: number): number { return GetDlcVehicleModel(dlcVehicleIndex); }
  getDlcVehicleData(dlcVehicleIndex: number): number { return (GetDlcVehicleData as any)(dlcVehicleIndex); }
  getDlcVehicleFlags(dlcVehicleIndex: number): number { return (GetDlcVehicleFlags as any)(dlcVehicleIndex); }
  getNumDlcWeapons(): number { return GetNumDlcWeapons(); }
  getNumDlcWeaponsSp(): number { return GetNumDlcWeaponsSp(); }
  getDlcWeaponData(dlcWeaponIndex: number): number { return (GetDlcWeaponData as any)(dlcWeaponIndex); }
  getDlcWeaponDataSp(dlcWeaponIndex: number): number { return (GetDlcWeaponDataSp as any)(dlcWeaponIndex); }
  getNumDlcWeaponComponents(dlcWeaponIndex: number): number { return (GetNumDlcWeaponComponents as any)(dlcWeaponIndex); }
  getNumDlcWeaponComponentsSp(dlcWeaponIndex: number): number { return (GetNumDlcWeaponComponentsSp as any)(dlcWeaponIndex); }
  getDlcWeaponComponentData(dlcWeaponIndex: number, dlcWeapCompIndex: number): number { return (GetDlcWeaponComponentData as any)(dlcWeaponIndex, dlcWeapCompIndex); }
  getDlcWeaponComponentDataSp(dlcWeaponIndex: number, dlcWeapCompIndex: number): number { return (GetDlcWeaponComponentDataSp as any)(dlcWeaponIndex, dlcWeapCompIndex); }
  isContentItemLocked(itemHash: number): boolean { return IsContentItemLocked(itemHash); }
  isDlcVehicleMod(hash: number): boolean { return IsDlcVehicleMod(hash); }
  getDlcVehicleModLockHash(hash: number): number { return GetDlcVehicleModLockHash(hash); }

  getNumPropsFromOutfit(character: number, p1: number, p2: number, p3: boolean, p4: number, componentId: number): number { return GetNumPropsFromOutfit(character, p1, p2, !!p3, p4, componentId); } // unverified
  getNumForcedComponents(componentHash: number): number { return GetNumForcedComponents(componentHash); } // unverified
  getPropFromOutfit(outfitHash: number, variantIndex: number): number { return (GetPropFromOutfit as any)(outfitHash, variantIndex); } // unverified
  isDlcDataEmpty(itemHash: number): boolean { return IsDlcDataEmpty(itemHash); } // unverified
  loadContentChangeSetGroup(hash: number): void { LoadContentChangeSetGroup(hash); } // unverified
  unloadContentChangeSetGroup(hash: number): void { UnloadContentChangeSetGroup(hash); } // unverified

  ["_0x10144267DD22866C"](...args: any[]): any { return Citizen.invokeNative("0x10144267DD22866C", ...args); }
  ["_0x96E2929292A4DB77"](...args: any[]): any { return Citizen.invokeNative("0x96E2929292A4DB77", ...args); }
  ["_0x6CEBE002E58DEE97"](...args: any[]): any { return Citizen.invokeNative("0x6CEBE002E58DEE97", ...args); }
}
