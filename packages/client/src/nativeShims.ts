// AUTO-GENERATED. Natives referenced by the bridge but absent from the pinned
// @citizenfx/client typings (build 2.0.25839-1) — i.e. not exposed by this FiveM
// runtime. We install a throwing fallback for any that are genuinely missing so
// calls fail loudly with NotImplementedError instead of "undefined is not a
// function", and declare them for the type-checker. If the runtime DOES provide
// one, the real native is used untouched.
import { NotImplementedError } from "@ragemp-fivem-bridge/shared";

const MAYBE_MISSING_NATIVES = [
  "AddEntityToOverlayBatch",
  "AddPedAmmoByType",
  "AddTextComponentSubstringCash",
  "AddTextComponentSubstringLocalized",
  "BeginScaleformHudMovieMethod",
  "BeginTextCommandGetNumberOfLinesForString",
  "BeginTextCommandGetScreenWidthOfDisplayText",
  "CancelReplayRecording",
  "ClearPedMotionInCoverClipsetOverride",
  "ClearVehicleCrashTask",
  "ClearWeatherTypeOvertimePersist",
  "CloseMpTextChat",
  "ConnectToServer",
  "ContinueTransition",
  "CopyAudioCategoryVariables",
  "CreateEntityOverlayBatch",
  "CreateGlowStyle",
  "CreatePedGroup",
  "CreatePortablePickup2",
  "CreateSynchronizedScene2",
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
  "DisplayLoadingScreenTips",
  "DoesAirDefenceSphereExist",
  "DoesScenarioBlockingAreaExists",
  "DrawDebugText2d",
  "DrawMarker2",
  "DrawScaleformMovie3d",
  "DrawScaleformMovie3dNonAdditive",
  "DrawScaleformMovie3dSolid",
  "DrawSpritePoly2",
  "EnableGlow",
  "EndTextCommandGetNumberOfLinesForString",
  "EndTextCommandGetScreenWidthOfDisplayText",
  "FacebookPostCompletedHeist",
  "FacebookPostCompletedMilestone",
  "FacebookPostCreateCharacter",
  "FireAirDefenceSphereWeaponAtPosition",
  "ForceStreamingUpdate",
  "GetAiBlipForEntity",
  "GetAllModelHashes",
  "GetAllWeaponNames",
  "GetAudioCategoryVariable",
  "GetBlipFadeDirection",
  "GetBoatBoomPositionRatio2",
  "GetBoatBoomPositionRatio3",
  "GetCamDofParam",
  "GetClosestBlipInfoId",
  "GetCloudsAlpha",
  "GetCurrentAreaNameHash",
  "GetCurrentAreaNameLabel",
  "GetCurrentAreaNameString",
  "GetCurrentStreetNameHash",
  "GetCurrentStreetNameString",
  "GetDoesVehicleHaveLandingGear",
  "GetDriftTyresSet",
  "GetEntityBoneObjectRotation",
  "GetEntityCurrentAnimDict",
  "GetFinalRenderedInWhenFriendlyCamFov",
  "GetFinalRenderedInWhenFriendlyCamRot",
  "GetGravityLevel",
  "GetHeadBlendEyeColor",
  "GetHydraulicSuspensionRaiseFactor",
  "GetIsVehicleDisabledByEmp",
  "GetIsVehicleShunting",
  "GetLightsState",
  "GetLoadFreemode",
  "GetLoadFreemodeWithEventName",
  "GetMenuItem",
  "GetMinimapComponentValues",
  "GetNumberOfVehicleBrokenBones",
  "GetNumberOfVehicleBrokenOffBones",
  "GetObjectAllByHash",
  "GetObjectAllInRange",
  "GetObjectTintIndex",
  "GetOwnerOfExplosionInAngledArea",
  "GetOwnerOfExplosionInSphere",
  "GetPedAmmoTypeFromWeapon2",
  "GetPlayerPing",
  "GetPlayerTargetingMode",
  "GetVehicleBodyHealth2",
  "GetVehicleBombAmmo",
  "GetVehicleCountermeasureAmmo",
  "GetVehicleDriveForceCurveValue",
  "GetVehicleModColor1Name",
  "GetVehicleModColor2Name",
  "GetVehicleWheelGroundSurfaceMaterial",
  "GetVehicleXenonLightColorIndex",
  "GetWeaponComponentVariantExtraCount",
  "GetWeaponComponentVariantExtraModel",
  "GetWeaponHashFromWeaponWheel",
  "HasEntityClearLosToEntityAdjustForCover",
  "HasHeadDisplayLoaded",
  "HasMpDataLoaded",
  "HasMpDataUnloaded",
  "HasParticleFxAssetLoaded",
  "HasVehiclePopulationBeenFilled",
  "HideTombstone",
  "HudGetWeaponWheelTopSlot",
  "HudSuppressWeaponWheelResultsThisFrame",
  "InvalidateCinematicVehicleIdleMode",
  "IsAValidBlushColor",
  "IsAValidHairColor",
  "IsAValidLipstickColor",
  "IsAirDefenceSphereInArea",
  "IsCopVehicleInArea3d",
  "IsEditorAvailable",
  "IsEntityCollisionDisabled",
  "IsLoadingFreemode",
  "IsMobilePhoneToPedEar",
  "IsMpTextChatTyping",
  "IsPedBlushColorValid2",
  "IsPedHairColorValid2",
  "IsPedLipstickColorValid2",
  "IsReplayRecording",
  "IsRocketBoostActive",
  "IsScriptedMusicPlaying",
  "IsStreamedScriptRunning",
  "IsTargetPedInPerceptionArea",
  "IsUsingKeyboardAndMouse",
  "IsVehicleBeingBroughtToHalt",
  "IsVehicleHornActive",
  "IsWarningMessageActive2",
  "IsWindowFocused",
  "Leaderboards2ReadByPlaform",
  "LocalizationGetSystemDateType",
  "ModifyGlowStyle",
  "NetworkCanCommunicateWithGamer2",
  "NetworkClearLaunchParams",
  "NetworkGetHighestReliableResendCount",
  "NetworkGetNumUnackedReliables",
  "NetworkGetNumberBodyTrackerHits",
  "NetworkGetPlatformPartyMemberCount",
  "NetworkGetRosPrivilege24",
  "NetworkGetRosPrivilege25",
  "NetworkGetRosPrivilege9",
  "NetworkGetUnreliableResendCount",
  "NetworkHaveOnlinePrivilege2",
  "NetworkIsEntityGhostedToLocalPlayer",
  "NetworkResetGhostedEntityAlpha",
  "NetworkSessionDoActivityQuickmatch",
  "NetworkSessionDoCrewMatchmaking",
  "NetworkSessionDoFriendMatchmaking",
  "NetworkSetBalanceAddMachine",
  "NetworkSetBalanceAddMachines",
  "NetworkSetGhostedEntityAlpha",
  "NetworkSetRelationshipToPlayer",
  "NetworkShouldShowStrictNatWarning",
  "NetworkTextChatIsTyping",
  "NetworkTriggerScriptCrcCheckOnPlayer",
  "OverrideMpTextChatColor",
  "OverrideMpTextChatTeamString",
  "OverrideVehicleOverheatHealth",
  "PlayPoliceCrimeReport",
  "PlaySoundHash",
  "RegisterNetworkEntityAsNetworked",
  "RegisterTextFontId",
  "ReleaseGlowStyle",
  "ReleaseRuntimeAsset",
  "RemoteCheaterPlayerDetected",
  "RemoveAirDefenceSphere",
  "RemoveAllAirDefenceSpheres",
  "RemoveEntityFromOverlayBatch",
  "RemoveExtraCalmingQuad",
  "RemoveParticleFxAsset",
  "ReplayDisableCameraMovementThisFrame",
  "ReplayPreventRecordingThisFrame",
  "RequestAdditionalText2",
  "RequestParticleFxAsset",
  "RequestRuntimeAssetFromUrl",
  "RequestVehicleAssetAsync",
  "ReserveEntityExplodesOnHighExplosionCombo",
  "ReserveLocalNetworkMissionObjects",
  "ReserveLocalNetworkMissionPeds",
  "ReserveLocalNetworkMissionVehicles",
  "ResetGameplayCamFullAttachParentTransformTimer",
  "ResetLightsState",
  "ResetMinimapComponentPosition",
  "RestoreAudioCategoryVariables",
  "SaveReplayRecording",
  "Set2dLayer",
  "SetActivatePhysicsAsSoonAsItIsUnfrozen",
  "SetAudioCategoryVariable",
  "SetBinkMovieUnk2",
  "SetBlipAsMinimalOnEdge",
  "SetBlipAsMissionCreator",
  "SetBlipCategoryGrouped",
  "SetBlipCategoryPriority",
  "SetBoatSinks",
  "SetCalmedWaveHeightScaler",
  "SetCamDofParam",
  "SetConnectableServers",
  "SetControlShake",
  "SetCreateWeaponLightSource",
  "SetCutsceneOverride",
  "SetDriftTyres",
  "SetEntityGhostedForGhostPlayers",
  "SetEntityOverlayPassEnabled",
  "SetFacialClipset",
  "SetFirstPersonAimCamPitchRange",
  "SetFlyCamVerticalResponse",
  "SetGameplayCamAltitudeFovScalingState",
  "SetGameplayCamEntityToLimitFocusOverBoundingSphereThisUpdate",
  "SetGameplayCamIgnoreEntityCollisionThisUpdate",
  "SetGameplayCamMaxMotionBlurStrengthThisUpdate",
  "SetGameplayCamMotionBlurScalingThisUpdate",
  "SetGameplayHintAnimOffsetX",
  "SetGameplayHintAnimOffsetY",
  "SetHeadDisplayFlag",
  "SetHeadDisplayString",
  "SetHeadDisplayWanted",
  "SetHealthDisplayValues",
  "SetHelpMessageStyle",
  "SetHornPermanentlyOnTime",
  "SetHydraulicSuspensionRaiseFactor",
  "SetHydraulicVehicleState",
  "SetIsLoadingFreemode",
  "SetLightsState",
  "SetLoadFreemode",
  "SetLoadFreemodeWithEventName",
  "SetMaxArmourDisplay",
  "SetMaxHealthDisplay",
  "SetMenuItemColor",
  "SetMenuItemEnabled",
  "SetMenuItemList",
  "SetMenuItemRange",
  "SetMenuItemText",
  "SetMenuItemTicksVisible",
  "SetMenuItemValue",
  "SetMinimapVisible",
  "SetMissionName2",
  "SetNetworkIdDynamic",
  "SetNumberPlateTexture",
  "SetObjectTextureVariationOfClosestObjectOfType",
  "SetObjectTintIndex",
  "SetPauseMenuHeaderText",
  "SetPedCanPlayInCarIdles",
  "SetPedClothPinFrames",
  "SetPedDisableFallDamage",
  "SetPedFloodInvincibility",
  "SetPedFootstepLoud",
  "SetPedFootstepQuiet",
  "SetPedGender",
  "SetPedHeadOverlayTint",
  "SetPedMotionInCoverClipsetOverride",
  "SetPedResetFlagPreferRearSeats",
  "SetPedTimeExclusiveDisplayTexture",
  "SetPlanePropellerHealth",
  "SetPlayerAreasGeneratorOrientation",
  "SetPlayerHudAnimStopLevel",
  "SetPlayerSwitchLocation",
  "SetPlayerTargettableForAirDefenceSphere",
  "SetPlayerWantedLevelHiddenEvasionTime",
  "SetPlayerWeaponDefenseModifier2",
  "SetPropLightColor",
  "SetPtfxAssetOldToNew",
  "SetRandomBoatsMp",
  "SetRocketBoostActive",
  "SetRocketBoostFill",
  "SetScriptRocketBoostRechargeTime",
  "SetScriptVariable2HudColour",
  "SetSpecialFlightModeWingRatio",
  "SetTaskGotoVehiclePlaneMinHeightAboveTerrain",
  "SetTaskMoveNetworkSignalFloatLerpRate",
  "SetThisThreadPriority",
  "SetUnkBool0x102ForVehicleSubmarineTask",
  "SetUnkCameraSettings",
  "SetUnkFloat0x104ForVehicleSubmarineTask",
  "SetVariableOnCutscene",
  "SetVehicleAllowHomingMissleLockon",
  "SetVehicleBombAmmo",
  "SetVehicleCountermeasureAmmo",
  "SetVehicleDisableEngineFires",
  "SetVehicleDisablePetrolTankDamage",
  "SetVehicleDisablePetrolTankFires",
  "SetVehicleDisableSuperdummyMode",
  "SetVehicleDisableUnk",
  "SetVehicleDisableUnk2",
  "SetVehicleExperimentalAttachmentSyncEnabled",
  "SetVehicleExperimentalHornSyncEnabled",
  "SetVehicleGearRatios",
  "SetVehicleHydraulicRaised",
  "SetVehicleLightsCutoffDistanceTweak",
  "SetVehicleModColor1",
  "SetVehicleModColor2",
  "SetVehicleModelDriveForceCurve",
  "SetVehicleModelGearRatios",
  "SetVehicleNeonLightsDisabled",
  "SetVehicleResetUnoccupiedSteerAngle",
  "SetVehicleXenonLightColorIndex",
  "StartReplayRecording",
  "StartShapeTestMouseCursorLosProbe",
  "StatGetSaveMigrationConsumeContentStatus",
  "StatSaveMigrationCancelPendingOperation",
  "StatSaveMigrationConsumeContent",
  "StopBringingVehicleToHalt",
  "StopControlShake",
  "StopReplayRecording",
  "SwitchToInputMappingScheme2",
  "TaskAgitatedActionConfrontResponse",
  "TaskClearLookAtEntity",
  "TaskGoToCoordsWhilstAimingAtCoords",
  "TaskPedDieInVehicle",
  "TaskRappelDownWallUsingClipsetOverride",
  "ThefeedSetRgbaParameterForNextMessage",
  "TogglePlayerDamageOverlay",
  "TriggerSirenAudio",
  "UgcQueryMostRecentlyCreatedContent",
  "UnregisterNetworkEntityAsNetworked",
  "UpdateEntityOverlayBatch",
  "VehicleSetParachuteModelOverride",
  "VehicleSetParachuteModelTintIndex",
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
  function AddPedAmmoByType(...args: any[]): any;
  function AddTextComponentSubstringCash(...args: any[]): any;
  function AddTextComponentSubstringLocalized(...args: any[]): any;
  function BeginScaleformHudMovieMethod(...args: any[]): any;
  function BeginTextCommandGetNumberOfLinesForString(...args: any[]): any;
  function BeginTextCommandGetScreenWidthOfDisplayText(...args: any[]): any;
  function CancelReplayRecording(...args: any[]): any;
  function ClearPedMotionInCoverClipsetOverride(...args: any[]): any;
  function ClearVehicleCrashTask(...args: any[]): any;
  function ClearWeatherTypeOvertimePersist(...args: any[]): any;
  function CloseMpTextChat(...args: any[]): any;
  function ConnectToServer(...args: any[]): any;
  function ContinueTransition(...args: any[]): any;
  function CopyAudioCategoryVariables(...args: any[]): any;
  function CreateEntityOverlayBatch(...args: any[]): any;
  function CreateGlowStyle(...args: any[]): any;
  function CreatePedGroup(...args: any[]): any;
  function CreatePortablePickup2(...args: any[]): any;
  function CreateSynchronizedScene2(...args: any[]): any;
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
  function DisplayLoadingScreenTips(...args: any[]): any;
  function DoesAirDefenceSphereExist(...args: any[]): any;
  function DoesScenarioBlockingAreaExists(...args: any[]): any;
  function DrawDebugText2d(...args: any[]): any;
  function DrawMarker2(...args: any[]): any;
  function DrawScaleformMovie3d(...args: any[]): any;
  function DrawScaleformMovie3dNonAdditive(...args: any[]): any;
  function DrawScaleformMovie3dSolid(...args: any[]): any;
  function DrawSpritePoly2(...args: any[]): any;
  function EnableGlow(...args: any[]): any;
  function EndTextCommandGetNumberOfLinesForString(...args: any[]): any;
  function EndTextCommandGetScreenWidthOfDisplayText(...args: any[]): any;
  function FacebookPostCompletedHeist(...args: any[]): any;
  function FacebookPostCompletedMilestone(...args: any[]): any;
  function FacebookPostCreateCharacter(...args: any[]): any;
  function FireAirDefenceSphereWeaponAtPosition(...args: any[]): any;
  function ForceStreamingUpdate(...args: any[]): any;
  function GetAiBlipForEntity(...args: any[]): any;
  function GetAllModelHashes(...args: any[]): any;
  function GetAllWeaponNames(...args: any[]): any;
  function GetAudioCategoryVariable(...args: any[]): any;
  function GetBlipFadeDirection(...args: any[]): any;
  function GetBoatBoomPositionRatio2(...args: any[]): any;
  function GetBoatBoomPositionRatio3(...args: any[]): any;
  function GetCamDofParam(...args: any[]): any;
  function GetClosestBlipInfoId(...args: any[]): any;
  function GetCloudsAlpha(...args: any[]): any;
  function GetCurrentAreaNameHash(...args: any[]): any;
  function GetCurrentAreaNameLabel(...args: any[]): any;
  function GetCurrentAreaNameString(...args: any[]): any;
  function GetCurrentStreetNameHash(...args: any[]): any;
  function GetCurrentStreetNameString(...args: any[]): any;
  function GetDoesVehicleHaveLandingGear(...args: any[]): any;
  function GetDriftTyresSet(...args: any[]): any;
  function GetEntityBoneObjectRotation(...args: any[]): any;
  function GetEntityCurrentAnimDict(...args: any[]): any;
  function GetFinalRenderedInWhenFriendlyCamFov(...args: any[]): any;
  function GetFinalRenderedInWhenFriendlyCamRot(...args: any[]): any;
  function GetGravityLevel(...args: any[]): any;
  function GetHeadBlendEyeColor(...args: any[]): any;
  function GetHydraulicSuspensionRaiseFactor(...args: any[]): any;
  function GetIsVehicleDisabledByEmp(...args: any[]): any;
  function GetIsVehicleShunting(...args: any[]): any;
  function GetLightsState(...args: any[]): any;
  function GetLoadFreemode(...args: any[]): any;
  function GetLoadFreemodeWithEventName(...args: any[]): any;
  function GetMenuItem(...args: any[]): any;
  function GetMinimapComponentValues(...args: any[]): any;
  function GetNumberOfVehicleBrokenBones(...args: any[]): any;
  function GetNumberOfVehicleBrokenOffBones(...args: any[]): any;
  function GetObjectAllByHash(...args: any[]): any;
  function GetObjectAllInRange(...args: any[]): any;
  function GetObjectTintIndex(...args: any[]): any;
  function GetOwnerOfExplosionInAngledArea(...args: any[]): any;
  function GetOwnerOfExplosionInSphere(...args: any[]): any;
  function GetPedAmmoTypeFromWeapon2(...args: any[]): any;
  function GetPlayerPing(...args: any[]): any;
  function GetPlayerTargetingMode(...args: any[]): any;
  function GetVehicleBodyHealth2(...args: any[]): any;
  function GetVehicleBombAmmo(...args: any[]): any;
  function GetVehicleCountermeasureAmmo(...args: any[]): any;
  function GetVehicleDriveForceCurveValue(...args: any[]): any;
  function GetVehicleModColor1Name(...args: any[]): any;
  function GetVehicleModColor2Name(...args: any[]): any;
  function GetVehicleWheelGroundSurfaceMaterial(...args: any[]): any;
  function GetVehicleXenonLightColorIndex(...args: any[]): any;
  function GetWeaponComponentVariantExtraCount(...args: any[]): any;
  function GetWeaponComponentVariantExtraModel(...args: any[]): any;
  function GetWeaponHashFromWeaponWheel(...args: any[]): any;
  function HasEntityClearLosToEntityAdjustForCover(...args: any[]): any;
  function HasHeadDisplayLoaded(...args: any[]): any;
  function HasMpDataLoaded(...args: any[]): any;
  function HasMpDataUnloaded(...args: any[]): any;
  function HasParticleFxAssetLoaded(...args: any[]): any;
  function HasVehiclePopulationBeenFilled(...args: any[]): any;
  function HideTombstone(...args: any[]): any;
  function HudGetWeaponWheelTopSlot(...args: any[]): any;
  function HudSuppressWeaponWheelResultsThisFrame(...args: any[]): any;
  function InvalidateCinematicVehicleIdleMode(...args: any[]): any;
  function IsAValidBlushColor(...args: any[]): any;
  function IsAValidHairColor(...args: any[]): any;
  function IsAValidLipstickColor(...args: any[]): any;
  function IsAirDefenceSphereInArea(...args: any[]): any;
  function IsCopVehicleInArea3d(...args: any[]): any;
  function IsEditorAvailable(...args: any[]): any;
  function IsEntityCollisionDisabled(...args: any[]): any;
  function IsLoadingFreemode(...args: any[]): any;
  function IsMobilePhoneToPedEar(...args: any[]): any;
  function IsMpTextChatTyping(...args: any[]): any;
  function IsPedBlushColorValid2(...args: any[]): any;
  function IsPedHairColorValid2(...args: any[]): any;
  function IsPedLipstickColorValid2(...args: any[]): any;
  function IsReplayRecording(...args: any[]): any;
  function IsRocketBoostActive(...args: any[]): any;
  function IsScriptedMusicPlaying(...args: any[]): any;
  function IsStreamedScriptRunning(...args: any[]): any;
  function IsTargetPedInPerceptionArea(...args: any[]): any;
  function IsUsingKeyboardAndMouse(...args: any[]): any;
  function IsVehicleBeingBroughtToHalt(...args: any[]): any;
  function IsVehicleHornActive(...args: any[]): any;
  function IsWarningMessageActive2(...args: any[]): any;
  function IsWindowFocused(...args: any[]): any;
  function Leaderboards2ReadByPlaform(...args: any[]): any;
  function LocalizationGetSystemDateType(...args: any[]): any;
  function ModifyGlowStyle(...args: any[]): any;
  function NetworkCanCommunicateWithGamer2(...args: any[]): any;
  function NetworkClearLaunchParams(...args: any[]): any;
  function NetworkGetHighestReliableResendCount(...args: any[]): any;
  function NetworkGetNumUnackedReliables(...args: any[]): any;
  function NetworkGetNumberBodyTrackerHits(...args: any[]): any;
  function NetworkGetPlatformPartyMemberCount(...args: any[]): any;
  function NetworkGetRosPrivilege24(...args: any[]): any;
  function NetworkGetRosPrivilege25(...args: any[]): any;
  function NetworkGetRosPrivilege9(...args: any[]): any;
  function NetworkGetUnreliableResendCount(...args: any[]): any;
  function NetworkHaveOnlinePrivilege2(...args: any[]): any;
  function NetworkIsEntityGhostedToLocalPlayer(...args: any[]): any;
  function NetworkResetGhostedEntityAlpha(...args: any[]): any;
  function NetworkSessionDoActivityQuickmatch(...args: any[]): any;
  function NetworkSessionDoCrewMatchmaking(...args: any[]): any;
  function NetworkSessionDoFriendMatchmaking(...args: any[]): any;
  function NetworkSetBalanceAddMachine(...args: any[]): any;
  function NetworkSetBalanceAddMachines(...args: any[]): any;
  function NetworkSetGhostedEntityAlpha(...args: any[]): any;
  function NetworkSetRelationshipToPlayer(...args: any[]): any;
  function NetworkShouldShowStrictNatWarning(...args: any[]): any;
  function NetworkTextChatIsTyping(...args: any[]): any;
  function NetworkTriggerScriptCrcCheckOnPlayer(...args: any[]): any;
  function OverrideMpTextChatColor(...args: any[]): any;
  function OverrideMpTextChatTeamString(...args: any[]): any;
  function OverrideVehicleOverheatHealth(...args: any[]): any;
  function PlayPoliceCrimeReport(...args: any[]): any;
  function PlaySoundHash(...args: any[]): any;
  function RegisterNetworkEntityAsNetworked(...args: any[]): any;
  function RegisterTextFontId(...args: any[]): any;
  function ReleaseGlowStyle(...args: any[]): any;
  function ReleaseRuntimeAsset(...args: any[]): any;
  function RemoteCheaterPlayerDetected(...args: any[]): any;
  function RemoveAirDefenceSphere(...args: any[]): any;
  function RemoveAllAirDefenceSpheres(...args: any[]): any;
  function RemoveEntityFromOverlayBatch(...args: any[]): any;
  function RemoveExtraCalmingQuad(...args: any[]): any;
  function RemoveParticleFxAsset(...args: any[]): any;
  function ReplayDisableCameraMovementThisFrame(...args: any[]): any;
  function ReplayPreventRecordingThisFrame(...args: any[]): any;
  function RequestAdditionalText2(...args: any[]): any;
  function RequestParticleFxAsset(...args: any[]): any;
  function RequestRuntimeAssetFromUrl(...args: any[]): any;
  function RequestVehicleAssetAsync(...args: any[]): any;
  function ReserveEntityExplodesOnHighExplosionCombo(...args: any[]): any;
  function ReserveLocalNetworkMissionObjects(...args: any[]): any;
  function ReserveLocalNetworkMissionPeds(...args: any[]): any;
  function ReserveLocalNetworkMissionVehicles(...args: any[]): any;
  function ResetGameplayCamFullAttachParentTransformTimer(...args: any[]): any;
  function ResetLightsState(...args: any[]): any;
  function ResetMinimapComponentPosition(...args: any[]): any;
  function RestoreAudioCategoryVariables(...args: any[]): any;
  function SaveReplayRecording(...args: any[]): any;
  function Set2dLayer(...args: any[]): any;
  function SetActivatePhysicsAsSoonAsItIsUnfrozen(...args: any[]): any;
  function SetAudioCategoryVariable(...args: any[]): any;
  function SetBinkMovieUnk2(...args: any[]): any;
  function SetBlipAsMinimalOnEdge(...args: any[]): any;
  function SetBlipAsMissionCreator(...args: any[]): any;
  function SetBlipCategoryGrouped(...args: any[]): any;
  function SetBlipCategoryPriority(...args: any[]): any;
  function SetBoatSinks(...args: any[]): any;
  function SetCalmedWaveHeightScaler(...args: any[]): any;
  function SetCamDofParam(...args: any[]): any;
  function SetConnectableServers(...args: any[]): any;
  function SetControlShake(...args: any[]): any;
  function SetCreateWeaponLightSource(...args: any[]): any;
  function SetCutsceneOverride(...args: any[]): any;
  function SetDriftTyres(...args: any[]): any;
  function SetEntityGhostedForGhostPlayers(...args: any[]): any;
  function SetEntityOverlayPassEnabled(...args: any[]): any;
  function SetFacialClipset(...args: any[]): any;
  function SetFirstPersonAimCamPitchRange(...args: any[]): any;
  function SetFlyCamVerticalResponse(...args: any[]): any;
  function SetGameplayCamAltitudeFovScalingState(...args: any[]): any;
  function SetGameplayCamEntityToLimitFocusOverBoundingSphereThisUpdate(...args: any[]): any;
  function SetGameplayCamIgnoreEntityCollisionThisUpdate(...args: any[]): any;
  function SetGameplayCamMaxMotionBlurStrengthThisUpdate(...args: any[]): any;
  function SetGameplayCamMotionBlurScalingThisUpdate(...args: any[]): any;
  function SetGameplayHintAnimOffsetX(...args: any[]): any;
  function SetGameplayHintAnimOffsetY(...args: any[]): any;
  function SetHeadDisplayFlag(...args: any[]): any;
  function SetHeadDisplayString(...args: any[]): any;
  function SetHeadDisplayWanted(...args: any[]): any;
  function SetHealthDisplayValues(...args: any[]): any;
  function SetHelpMessageStyle(...args: any[]): any;
  function SetHornPermanentlyOnTime(...args: any[]): any;
  function SetHydraulicSuspensionRaiseFactor(...args: any[]): any;
  function SetHydraulicVehicleState(...args: any[]): any;
  function SetIsLoadingFreemode(...args: any[]): any;
  function SetLightsState(...args: any[]): any;
  function SetLoadFreemode(...args: any[]): any;
  function SetLoadFreemodeWithEventName(...args: any[]): any;
  function SetMaxArmourDisplay(...args: any[]): any;
  function SetMaxHealthDisplay(...args: any[]): any;
  function SetMenuItemColor(...args: any[]): any;
  function SetMenuItemEnabled(...args: any[]): any;
  function SetMenuItemList(...args: any[]): any;
  function SetMenuItemRange(...args: any[]): any;
  function SetMenuItemText(...args: any[]): any;
  function SetMenuItemTicksVisible(...args: any[]): any;
  function SetMenuItemValue(...args: any[]): any;
  function SetMinimapVisible(...args: any[]): any;
  function SetMissionName2(...args: any[]): any;
  function SetNetworkIdDynamic(...args: any[]): any;
  function SetNumberPlateTexture(...args: any[]): any;
  function SetObjectTextureVariationOfClosestObjectOfType(...args: any[]): any;
  function SetObjectTintIndex(...args: any[]): any;
  function SetPauseMenuHeaderText(...args: any[]): any;
  function SetPedCanPlayInCarIdles(...args: any[]): any;
  function SetPedClothPinFrames(...args: any[]): any;
  function SetPedDisableFallDamage(...args: any[]): any;
  function SetPedFloodInvincibility(...args: any[]): any;
  function SetPedFootstepLoud(...args: any[]): any;
  function SetPedFootstepQuiet(...args: any[]): any;
  function SetPedGender(...args: any[]): any;
  function SetPedHeadOverlayTint(...args: any[]): any;
  function SetPedMotionInCoverClipsetOverride(...args: any[]): any;
  function SetPedResetFlagPreferRearSeats(...args: any[]): any;
  function SetPedTimeExclusiveDisplayTexture(...args: any[]): any;
  function SetPlanePropellerHealth(...args: any[]): any;
  function SetPlayerAreasGeneratorOrientation(...args: any[]): any;
  function SetPlayerHudAnimStopLevel(...args: any[]): any;
  function SetPlayerSwitchLocation(...args: any[]): any;
  function SetPlayerTargettableForAirDefenceSphere(...args: any[]): any;
  function SetPlayerWantedLevelHiddenEvasionTime(...args: any[]): any;
  function SetPlayerWeaponDefenseModifier2(...args: any[]): any;
  function SetPropLightColor(...args: any[]): any;
  function SetPtfxAssetOldToNew(...args: any[]): any;
  function SetRandomBoatsMp(...args: any[]): any;
  function SetRocketBoostActive(...args: any[]): any;
  function SetRocketBoostFill(...args: any[]): any;
  function SetScriptRocketBoostRechargeTime(...args: any[]): any;
  function SetScriptVariable2HudColour(...args: any[]): any;
  function SetSpecialFlightModeWingRatio(...args: any[]): any;
  function SetTaskGotoVehiclePlaneMinHeightAboveTerrain(...args: any[]): any;
  function SetTaskMoveNetworkSignalFloatLerpRate(...args: any[]): any;
  function SetThisThreadPriority(...args: any[]): any;
  function SetUnkBool0x102ForVehicleSubmarineTask(...args: any[]): any;
  function SetUnkCameraSettings(...args: any[]): any;
  function SetUnkFloat0x104ForVehicleSubmarineTask(...args: any[]): any;
  function SetVariableOnCutscene(...args: any[]): any;
  function SetVehicleAllowHomingMissleLockon(...args: any[]): any;
  function SetVehicleBombAmmo(...args: any[]): any;
  function SetVehicleCountermeasureAmmo(...args: any[]): any;
  function SetVehicleDisableEngineFires(...args: any[]): any;
  function SetVehicleDisablePetrolTankDamage(...args: any[]): any;
  function SetVehicleDisablePetrolTankFires(...args: any[]): any;
  function SetVehicleDisableSuperdummyMode(...args: any[]): any;
  function SetVehicleDisableUnk(...args: any[]): any;
  function SetVehicleDisableUnk2(...args: any[]): any;
  function SetVehicleExperimentalAttachmentSyncEnabled(...args: any[]): any;
  function SetVehicleExperimentalHornSyncEnabled(...args: any[]): any;
  function SetVehicleGearRatios(...args: any[]): any;
  function SetVehicleHydraulicRaised(...args: any[]): any;
  function SetVehicleLightsCutoffDistanceTweak(...args: any[]): any;
  function SetVehicleModColor1(...args: any[]): any;
  function SetVehicleModColor2(...args: any[]): any;
  function SetVehicleModelDriveForceCurve(...args: any[]): any;
  function SetVehicleModelGearRatios(...args: any[]): any;
  function SetVehicleNeonLightsDisabled(...args: any[]): any;
  function SetVehicleResetUnoccupiedSteerAngle(...args: any[]): any;
  function SetVehicleXenonLightColorIndex(...args: any[]): any;
  function StartReplayRecording(...args: any[]): any;
  function StartShapeTestMouseCursorLosProbe(...args: any[]): any;
  function StatGetSaveMigrationConsumeContentStatus(...args: any[]): any;
  function StatSaveMigrationCancelPendingOperation(...args: any[]): any;
  function StatSaveMigrationConsumeContent(...args: any[]): any;
  function StopBringingVehicleToHalt(...args: any[]): any;
  function StopControlShake(...args: any[]): any;
  function StopReplayRecording(...args: any[]): any;
  function SwitchToInputMappingScheme2(...args: any[]): any;
  function TaskAgitatedActionConfrontResponse(...args: any[]): any;
  function TaskClearLookAtEntity(...args: any[]): any;
  function TaskGoToCoordsWhilstAimingAtCoords(...args: any[]): any;
  function TaskPedDieInVehicle(...args: any[]): any;
  function TaskRappelDownWallUsingClipsetOverride(...args: any[]): any;
  function ThefeedSetRgbaParameterForNextMessage(...args: any[]): any;
  function TogglePlayerDamageOverlay(...args: any[]): any;
  function TriggerSirenAudio(...args: any[]): any;
  function UgcQueryMostRecentlyCreatedContent(...args: any[]): any;
  function UnregisterNetworkEntityAsNetworked(...args: any[]): any;
  function UpdateEntityOverlayBatch(...args: any[]): any;
  function VehicleSetParachuteModelOverride(...args: any[]): any;
  function VehicleSetParachuteModelTintIndex(...args: any[]): any;
}
