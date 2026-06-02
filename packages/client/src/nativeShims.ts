// AUTO-GENERATED. Natives referenced by the bridge but absent from the pinned
// @citizenfx/client typings (build 2.0.25839-1) — i.e. not exposed by this FiveM
// runtime. We install a throwing fallback for any that are genuinely missing so
// calls fail loudly with NotImplementedError instead of "undefined is not a
// function", and declare them for the type-checker. If the runtime DOES provide
// one, the real native is used untouched.
import { NotImplementedError } from "@ragemp-fivem-bridge/shared";

const MAYBE_MISSING_NATIVES = [
  "AddEntityToOverlayBatch",
  "AddTextComponentSubstringCash",
  "AddTextComponentSubstringLocalized",
  "ClearVehicleCrashTask",
  "ClearWeatherTypeOvertimePersist",
  "ConnectToServer",
  "ContinueTransition",
  "CopyAudioCategoryVariables",
  "CreateEntityOverlayBatch",
  "CreateGlowStyle",
  "CreateSynchronizedSceneAtMapObject",
  "CreateVehicleDriveForceCurve",
  "CustomMinimapClearBlips",
  "CustomMinimapCreateBlip",
  "CustomMinimapSetActive",
  "CustomMinimapSetBlipObject",
  "DeleteVehicleDriveForceCurve",
  "DestroyEntityOverlayBatch",
  "DisableCinematicVehicleIdleModeThisUpdate",
  "DisableGameplayCamAltitudeFovScalingThisUpdate",
  "DisableGlow",
  "EnableGlow",
  "ForceStreamingUpdate",
  "GetAllModelHashes",
  "GetAllWeaponNames",
  "GetAudioCategoryVariable",
  "GetBlipFadeDirection",
  "GetCamDofParam",
  "GetCloudsAlpha",
  "GetCurrentAreaNameHash",
  "GetCurrentAreaNameLabel",
  "GetCurrentAreaNameString",
  "GetCurrentStreetNameHash",
  "GetCurrentStreetNameString",
  "GetEntityCurrentAnimDict",
  "GetGravityLevel",
  "GetHydraulicSuspensionRaiseFactor",
  "GetLightsState",
  "GetMenuItem",
  "GetMinimapComponentValues",
  "GetObjectAllByHash",
  "GetObjectAllInRange",
  "GetPlayerPing",
  "GetVehicleBodyHealth2",
  "GetVehicleBombAmmo",
  "GetVehicleCountermeasureAmmo",
  "GetVehicleDriveForceCurveValue",
  "GetVehicleWheelGroundSurfaceMaterial",
  "HasHeadDisplayLoaded",
  "HasMpDataLoaded",
  "HasMpDataUnloaded",
  "HasParticleFxAssetLoaded",
  "HudGetWeaponWheelTopSlot",
  "IsAirDefenceSphereInArea",
  "IsEditorAvailable",
  "IsMobilePhoneToPedEar",
  "IsStreamedScriptRunning",
  "IsTargetPedInPerceptionArea",
  "IsWindowFocused",
  "Leaderboards2ReadByPlaform",
  "ModifyGlowStyle",
  "NetworkCanCommunicateWithGamer2",
  "NetworkSetBalanceAddMachines",
  "OverrideVehicleOverheatHealth",
  "PlayPoliceCrimeReport",
  "PlaySoundHash",
  "ReleaseGlowStyle",
  "ReleaseRuntimeAsset",
  "RemoteCheaterPlayerDetected",
  "RemoveEntityFromOverlayBatch",
  "RemoveExtraCalmingQuad",
  "RemoveParticleFxAsset",
  "RequestParticleFxAsset",
  "RequestRuntimeAssetFromUrl",
  "RequestVehicleAssetAsync",
  "ReserveEntityExplodesOnHighExplosionCombo",
  "ResetGameplayCamFullAttachParentTransformTimer",
  "ResetLightsState",
  "ResetMinimapComponentPosition",
  "RestoreAudioCategoryVariables",
  "SetAudioCategoryVariable",
  "SetBlipAsMinimalOnEdge",
  "SetBlipCategoryGrouped",
  "SetBlipCategoryPriority",
  "SetBoatSinks",
  "SetCalmedWaveHeightScaler",
  "SetCamDofParam",
  "SetConnectableServers",
  "SetEntityOverlayPassEnabled",
  "SetFirstPersonAimCamPitchRange",
  "SetGameplayCamAltitudeFovScalingState",
  "SetGameplayCamEntityToLimitFocusOverBoundingSphereThisUpdate",
  "SetGameplayCamIgnoreEntityCollisionThisUpdate",
  "SetGameplayCamMaxMotionBlurStrengthThisUpdate",
  "SetGameplayCamMotionBlurScalingThisUpdate",
  "SetHeadDisplayFlag",
  "SetHydraulicVehicleState",
  "SetLightsState",
  "SetMenuItemColor",
  "SetMenuItemEnabled",
  "SetMenuItemList",
  "SetMenuItemRange",
  "SetMenuItemText",
  "SetMenuItemTicksVisible",
  "SetMenuItemValue",
  "SetMinimapVisible",
  "SetNumberPlateTexture",
  "SetPauseMenuHeaderText",
  "SetPedCanPlayInCarIdles",
  "SetPedClothPinFrames",
  "SetPedDisableFallDamage",
  "SetPedFloodInvincibility",
  "SetPedResetFlagPreferRearSeats",
  "SetPlanePropellerHealth",
  "SetPlayerSwitchLocation",
  "SetScriptRocketBoostRechargeTime",
  "SetSpecialFlightModeWingRatio",
  "SetUnkCameraSettings",
  "SetVehicleBombAmmo",
  "SetVehicleCountermeasureAmmo",
  "SetVehicleExperimentalAttachmentSyncEnabled",
  "SetVehicleExperimentalHornSyncEnabled",
  "SetVehicleGearRatios",
  "SetVehicleModelDriveForceCurve",
  "SetVehicleModelGearRatios",
  "SetVehicleResetUnoccupiedSteerAngle",
  "SetVehicleXenonLightColorIndex",
  "StartShapeTestMouseCursorLosProbe",
  "StatGetSaveMigrationConsumeContentStatus",
  "TaskGoToCoordsWhilstAimingAtCoords",
  "TaskPedDieInVehicle",
  "TaskRappelDownWallUsingClipsetOverride",
  "ThefeedSetRgbaParameterForNextMessage",
  "TogglePlayerDamageOverlay",
  "UpdateEntityOverlayBatch",
];

for (const name of MAYBE_MISSING_NATIVES) {
  if (typeof (globalThis as any)[name] !== "function") {
    (globalThis as any)[name] = () => {
      throw new NotImplementedError(name);
    };
  }
}

declare global {
  function AddEntityToOverlayBatch(...args: any[]): any;
  function AddTextComponentSubstringCash(...args: any[]): any;
  function AddTextComponentSubstringLocalized(...args: any[]): any;
  function ClearVehicleCrashTask(...args: any[]): any;
  function ClearWeatherTypeOvertimePersist(...args: any[]): any;
  function ConnectToServer(...args: any[]): any;
  function ContinueTransition(...args: any[]): any;
  function CopyAudioCategoryVariables(...args: any[]): any;
  function CreateEntityOverlayBatch(...args: any[]): any;
  function CreateGlowStyle(...args: any[]): any;
  function CreateSynchronizedSceneAtMapObject(...args: any[]): any;
  function CreateVehicleDriveForceCurve(...args: any[]): any;
  function CustomMinimapClearBlips(...args: any[]): any;
  function CustomMinimapCreateBlip(...args: any[]): any;
  function CustomMinimapSetActive(...args: any[]): any;
  function CustomMinimapSetBlipObject(...args: any[]): any;
  function DeleteVehicleDriveForceCurve(...args: any[]): any;
  function DestroyEntityOverlayBatch(...args: any[]): any;
  function DisableCinematicVehicleIdleModeThisUpdate(...args: any[]): any;
  function DisableGameplayCamAltitudeFovScalingThisUpdate(...args: any[]): any;
  function DisableGlow(...args: any[]): any;
  function EnableGlow(...args: any[]): any;
  function ForceStreamingUpdate(...args: any[]): any;
  function GetAllModelHashes(...args: any[]): any;
  function GetAllWeaponNames(...args: any[]): any;
  function GetAudioCategoryVariable(...args: any[]): any;
  function GetBlipFadeDirection(...args: any[]): any;
  function GetCamDofParam(...args: any[]): any;
  function GetCloudsAlpha(...args: any[]): any;
  function GetCurrentAreaNameHash(...args: any[]): any;
  function GetCurrentAreaNameLabel(...args: any[]): any;
  function GetCurrentAreaNameString(...args: any[]): any;
  function GetCurrentStreetNameHash(...args: any[]): any;
  function GetCurrentStreetNameString(...args: any[]): any;
  function GetEntityCurrentAnimDict(...args: any[]): any;
  function GetGravityLevel(...args: any[]): any;
  function GetHydraulicSuspensionRaiseFactor(...args: any[]): any;
  function GetLightsState(...args: any[]): any;
  function GetMenuItem(...args: any[]): any;
  function GetMinimapComponentValues(...args: any[]): any;
  function GetObjectAllByHash(...args: any[]): any;
  function GetObjectAllInRange(...args: any[]): any;
  function GetPlayerPing(...args: any[]): any;
  function GetVehicleBodyHealth2(...args: any[]): any;
  function GetVehicleBombAmmo(...args: any[]): any;
  function GetVehicleCountermeasureAmmo(...args: any[]): any;
  function GetVehicleDriveForceCurveValue(...args: any[]): any;
  function GetVehicleWheelGroundSurfaceMaterial(...args: any[]): any;
  function HasHeadDisplayLoaded(...args: any[]): any;
  function HasMpDataLoaded(...args: any[]): any;
  function HasMpDataUnloaded(...args: any[]): any;
  function HasParticleFxAssetLoaded(...args: any[]): any;
  function HudGetWeaponWheelTopSlot(...args: any[]): any;
  function IsAirDefenceSphereInArea(...args: any[]): any;
  function IsEditorAvailable(...args: any[]): any;
  function IsMobilePhoneToPedEar(...args: any[]): any;
  function IsStreamedScriptRunning(...args: any[]): any;
  function IsTargetPedInPerceptionArea(...args: any[]): any;
  function IsWindowFocused(...args: any[]): any;
  function Leaderboards2ReadByPlaform(...args: any[]): any;
  function ModifyGlowStyle(...args: any[]): any;
  function NetworkCanCommunicateWithGamer2(...args: any[]): any;
  function NetworkSetBalanceAddMachines(...args: any[]): any;
  function OverrideVehicleOverheatHealth(...args: any[]): any;
  function PlayPoliceCrimeReport(...args: any[]): any;
  function PlaySoundHash(...args: any[]): any;
  function ReleaseGlowStyle(...args: any[]): any;
  function ReleaseRuntimeAsset(...args: any[]): any;
  function RemoteCheaterPlayerDetected(...args: any[]): any;
  function RemoveEntityFromOverlayBatch(...args: any[]): any;
  function RemoveExtraCalmingQuad(...args: any[]): any;
  function RemoveParticleFxAsset(...args: any[]): any;
  function RequestParticleFxAsset(...args: any[]): any;
  function RequestRuntimeAssetFromUrl(...args: any[]): any;
  function RequestVehicleAssetAsync(...args: any[]): any;
  function ReserveEntityExplodesOnHighExplosionCombo(...args: any[]): any;
  function ResetGameplayCamFullAttachParentTransformTimer(...args: any[]): any;
  function ResetLightsState(...args: any[]): any;
  function ResetMinimapComponentPosition(...args: any[]): any;
  function RestoreAudioCategoryVariables(...args: any[]): any;
  function SetAudioCategoryVariable(...args: any[]): any;
  function SetBlipAsMinimalOnEdge(...args: any[]): any;
  function SetBlipCategoryGrouped(...args: any[]): any;
  function SetBlipCategoryPriority(...args: any[]): any;
  function SetBoatSinks(...args: any[]): any;
  function SetCalmedWaveHeightScaler(...args: any[]): any;
  function SetCamDofParam(...args: any[]): any;
  function SetConnectableServers(...args: any[]): any;
  function SetEntityOverlayPassEnabled(...args: any[]): any;
  function SetFirstPersonAimCamPitchRange(...args: any[]): any;
  function SetGameplayCamAltitudeFovScalingState(...args: any[]): any;
  function SetGameplayCamEntityToLimitFocusOverBoundingSphereThisUpdate(...args: any[]): any;
  function SetGameplayCamIgnoreEntityCollisionThisUpdate(...args: any[]): any;
  function SetGameplayCamMaxMotionBlurStrengthThisUpdate(...args: any[]): any;
  function SetGameplayCamMotionBlurScalingThisUpdate(...args: any[]): any;
  function SetHeadDisplayFlag(...args: any[]): any;
  function SetHydraulicVehicleState(...args: any[]): any;
  function SetLightsState(...args: any[]): any;
  function SetMenuItemColor(...args: any[]): any;
  function SetMenuItemEnabled(...args: any[]): any;
  function SetMenuItemList(...args: any[]): any;
  function SetMenuItemRange(...args: any[]): any;
  function SetMenuItemText(...args: any[]): any;
  function SetMenuItemTicksVisible(...args: any[]): any;
  function SetMenuItemValue(...args: any[]): any;
  function SetMinimapVisible(...args: any[]): any;
  function SetNumberPlateTexture(...args: any[]): any;
  function SetPauseMenuHeaderText(...args: any[]): any;
  function SetPedCanPlayInCarIdles(...args: any[]): any;
  function SetPedClothPinFrames(...args: any[]): any;
  function SetPedDisableFallDamage(...args: any[]): any;
  function SetPedFloodInvincibility(...args: any[]): any;
  function SetPedResetFlagPreferRearSeats(...args: any[]): any;
  function SetPlanePropellerHealth(...args: any[]): any;
  function SetPlayerSwitchLocation(...args: any[]): any;
  function SetScriptRocketBoostRechargeTime(...args: any[]): any;
  function SetSpecialFlightModeWingRatio(...args: any[]): any;
  function SetUnkCameraSettings(...args: any[]): any;
  function SetVehicleBombAmmo(...args: any[]): any;
  function SetVehicleCountermeasureAmmo(...args: any[]): any;
  function SetVehicleExperimentalAttachmentSyncEnabled(...args: any[]): any;
  function SetVehicleExperimentalHornSyncEnabled(...args: any[]): any;
  function SetVehicleGearRatios(...args: any[]): any;
  function SetVehicleModelDriveForceCurve(...args: any[]): any;
  function SetVehicleModelGearRatios(...args: any[]): any;
  function SetVehicleResetUnoccupiedSteerAngle(...args: any[]): any;
  function SetVehicleXenonLightColorIndex(...args: any[]): any;
  function StartShapeTestMouseCursorLosProbe(...args: any[]): any;
  function StatGetSaveMigrationConsumeContentStatus(...args: any[]): any;
  function TaskGoToCoordsWhilstAimingAtCoords(...args: any[]): any;
  function TaskPedDieInVehicle(...args: any[]): any;
  function TaskRappelDownWallUsingClipsetOverride(...args: any[]): any;
  function ThefeedSetRgbaParameterForNextMessage(...args: any[]): any;
  function TogglePlayerDamageOverlay(...args: any[]): any;
  function UpdateEntityOverlayBatch(...args: any[]): any;
}
