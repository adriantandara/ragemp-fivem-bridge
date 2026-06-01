import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { createUnkProxy, toVec3 } from "./_helpers.js";

export class GameTaskNs {
  unk = createUnkProxy();

  goStraightToCoord(ped: number, x: number, y: number, z: number, speed: number, timeout: number): void {
    TaskGoStraightToCoord(ped, x, y, z, speed ?? 1.0, timeout ?? -1, 0, 0);
  }
  goToCoordAnyMeans(ped: number, x: number, y: number, z: number, fMoveBlendRatio: number, vehicle: number, bUseLongRangeVehiclePathing: boolean, drivingFlags: number, fMaxRangeToShootTargets: number): void {
    TaskGoToCoordAnyMeans(ped, x, y, z, fMoveBlendRatio, vehicle, bUseLongRangeVehiclePathing, drivingFlags, fMaxRangeToShootTargets);
  }
  followNavMeshToCoord(ped: number, x: number, y: number, z: number, speed: number, p5: number, p6: number, p7: boolean, p8: number): void {
    TaskFollowNavMeshToCoord(ped, x, y, z, speed ?? 1.0, p5 ?? -1, p6 ?? 0.1, (p7 ?? 0) as number, p8 ?? 0);
  }
  vehicleDriveToCoord(ped: number, vehicle: number, x: number, y: number, z: number, speed: number, p6: number, vehicleModel: number, drivingStyle: number, stopRange: number, p10: number): void {
    TaskVehicleDriveToCoord(ped, vehicle, x, y, z, speed ?? 10.0, p6 ?? 0, vehicleModel ?? 0, drivingStyle ?? 786603, stopRange ?? 4.0, p10 ?? -1);
  }
  vehicleDriveToCoordLongrange(ped: number, vehicle: number, x: number, y: number, z: number, speed: number, drivingStyle: number, stopRange: number): void {
    TaskVehicleDriveToCoordLongrange(ped, vehicle, x, y, z, speed ?? 10.0, drivingStyle ?? 786603, stopRange ?? 4.0);
  }
  vehicleDriveWander(ped: number, vehicle: number, speed: number, drivingStyle: number): void {
    TaskVehicleDriveWander(ped, vehicle, speed ?? 10.0, drivingStyle ?? 786603);
  }
  vehicleChase(ped: number, targetPed: number): void { TaskVehicleChase(ped, targetPed); }
  vehicleFollow(ped: number, vehicle: number, targetVehicle: number, speed: number, drivingStyle: number, maxDistance: number): void {
    TaskVehicleFollow(ped, vehicle, targetVehicle, speed ?? 10.0, drivingStyle ?? 786603, maxDistance ?? 10);
  }

  playAnim(ped: number, animDict: string, animName: string, speed: number, speedMultiplier: number, duration: number, flag: number, playbackRate: number, lockX: boolean, lockY: boolean, lockZ: boolean): void {
    TaskPlayAnim(ped, animDict, animName, speed ?? 8.0, speedMultiplier ?? -8.0, duration ?? -1, flag ?? 0, playbackRate ?? 0, lockX ?? false, lockY ?? false, lockZ ?? false);
  }
  playAnimAdvanced(ped: number, animDict: string, animName: string, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, speed: number, speedMultiplier: number, duration: number, flag: number, playbackRate: number, p14: number, p15: number): void {
    TaskPlayAnimAdvanced(ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed ?? 8.0, speedMultiplier ?? -8.0, duration ?? -1, flag ?? 0, playbackRate ?? 0, p14 ?? 0, p15 ?? 0);
  }
  stopAnim(ped: number): void { ClearPedTasks(ped); }

  aimGunAtCoord(ped: number, x: number, y: number, z: number, duration: number, p5: boolean, p6: boolean): void {
    TaskAimGunAtCoord(ped, x, y, z, duration ?? -1, p5 ?? false, p6 ?? false);
  }
  aimGunAtEntity(ped: number, entity: number, duration: number, p4: boolean): void {
    TaskAimGunAtEntity(ped, entity, duration ?? -1, p4 ?? false);
  }
  shootAtCoord(ped: number, x: number, y: number, z: number, duration: number, weaponHash: number): void {
    TaskShootAtCoord(ped, x, y, z, duration ?? -1, weaponHash);
  }
  shootAtEntity(ped: number, entity: number, duration: number, weaponHash: number): void {
    TaskShootAtEntity(ped, entity, duration ?? -1, weaponHash);
  }
  combatPed(ped: number, targetPed: number, combatType: number, p4: number): void {
    TaskCombatPed(ped, targetPed, combatType ?? 0, p4 ?? 16);
  }
  combatHatedTargetsInArea(ped: number, x: number, y: number, z: number, radius: number, p5: number): void {
    TaskCombatHatedTargetsInArea(ped, x, y, z, radius, p5 ?? 0);
  }
  combatHatedTargetsAroundPed(ped: number, radius: number, p2: number): void {
    TaskCombatHatedTargetsAroundPed(ped, radius, p2 ?? 0);
  }

  enterVehicle(ped: number, vehicle: number, timeout: number, seatIndex: number, speed: number, flag: number, p6: number): void {
    TaskEnterVehicle(ped, vehicle, timeout ?? -1, seatIndex ?? -1, speed ?? 1.0, flag ?? 1, p6 ?? 0);
  }
  leaveVehicle(ped: number, vehicle: number, flags: number): void { TaskLeaveVehicle(ped, vehicle, flags ?? 0); }
  openVehicleDoor(ped: number, vehicle: number, timeOut: number, doorIndex: number, speed: number): void {
    TaskOpenVehicleDoor(ped, vehicle, timeOut ?? 1000, doorIndex, speed ?? 1.0);
  }
  vehicleGotoNavmesh(ped: number, vehicle: number, x: number, y: number, z: number, speed: number, behaviour: number, stopRange: number): void {
    TaskVehicleGotoNavmesh(ped, vehicle, x, y, z, speed ?? 10.0, behaviour ?? 786603, stopRange ?? 4.0);
  }
  driveBy(ped: number, targetPed: number, targetVehicle: number, x: number, y: number, z: number, distanceToLeadVehicle: number, speed: number, drivingStyle: boolean): void {
    TaskDriveBy(ped, targetPed ?? 0, targetVehicle ?? 0, x ?? 0, y ?? 0, z ?? 0, distanceToLeadVehicle ?? 0, speed ?? 10.0, drivingStyle, 1);
  }

  startScenarioInPlace(ped: number, scenario: string, p2: number, p3: boolean): void {
    TaskStartScenarioInPlace(ped, scenario, p2 ?? 0, p3 ?? true);
  }
  startScenarioAtPosition(ped: number, scenario: string, x: number, y: number, z: number, heading: number, duration: number, isStanding: boolean, canWarpIntoScenario: boolean): void {
    TaskStartScenarioAtPosition(ped, scenario, x, y, z, heading ?? 0, duration ?? -1, isStanding ?? true, canWarpIntoScenario ?? true);
  }
  useNearestScenarioToCoord(ped: number, x: number, y: number, z: number, radius: number, p5: number): void {
    TaskUseNearestScenarioToCoord(ped, x, y, z, radius, p5 ?? -1);
  }
  wanderInArea(ped: number, x: number, y: number, z: number, radius: number, p5: number, p6: number): void {
    TaskWanderInArea(ped, x, y, z, radius, p5 ?? 1, p6 ?? 10);
  }
  wanderStandard(ped: number, heading: number, radius: number): void { TaskWanderStandard(ped, heading ?? 0, radius ?? 0); }
  patrol(ped: number, p1: number, p2: number): void { TaskPatrol(ped, p1 ?? 0 as any, p2 ?? 0, true, false); }

  seekCoverFromPos(ped: number, x: number, y: number, z: number, p4: number, p5: boolean): void { TaskSeekCoverFromPos(ped, x, y, z, p4 ?? -1, p5 ?? true); }
  guardCurrentPosition(ped: number, x: number, y: number, z: number, p4: boolean): void { TaskGuardCurrentPosition(ped, x ?? 0, y ?? 0, p4 ?? true); }
  stayInCover(ped: number): void { TaskStayInCover(ped); }

  followWaypointRecording(ped: number, recording: number, clipSet: string, speed: number, p4: number): void {
    (TaskFollowWaypointRecording as any)(ped, recording, p4 ?? 0, clipSet ?? "", speed ?? 1.0);
  }

  pause(ped: number, time: number): void { TaskPause(ped, time ?? 0); }
  handsUp(ped: number, time: number, target: number, p3: number, anyMeansFlag: boolean): void {
    TaskHandsUp(ped, time ?? -1, target ?? 0, p3 ?? -1, anyMeansFlag ?? false);
  }
  lookAtEntity(ped: number, entity: number, duration: number, boneIndex: number, priority: number): void {
    TaskLookAtEntity(ped, entity, duration ?? -1, boneIndex ?? 0, priority ?? 2);
  }
  clearLookAt(ped: number): void { TaskClearLookAtEntity(ped); }

  taskPause(ped: number, ms: number): void { TaskPause(ped, ms); }
  taskStandStill(ped: number, time: number): void { TaskStandStill(ped, time); }
  taskJump(ped: number, unused: boolean): void { TaskJump(ped, unused); }
  taskCower(ped: number, duration: number): void { TaskCower(ped, duration); }
  taskHandsUp(ped: number, duration: number, facingPed: number, p3: number, p4: boolean): void { TaskHandsUp(ped, duration, facingPed, p3, p4); }
  updateTaskHandsUpDuration(ped: number, duration: number): void { UpdateTaskHandsUpDuration(ped, duration); }
  taskOpenVehicleDoor(ped: number, vehicle: number, timeOut: number, seat: number, speed: number): void { TaskOpenVehicleDoor(ped, vehicle, timeOut, seat, speed); }
  taskEnterVehicle(ped: number, vehicle: number, timeout: number, seat: number, speed: number, flag: number, p6: number): void { TaskEnterVehicle(ped, vehicle, timeout, seat, speed, flag, p6); }
  taskLeaveVehicle(ped: number, vehicle: number, flags: number): void { TaskLeaveVehicle(ped, vehicle, flags); }
  taskGetOffBoat(ped: number, boat: number): void { TaskGetOffBoat(ped, boat); }
  taskSkyDive(ped: number): void { TaskSkyDive(ped); }
  taskParachute(ped: number, p1: boolean): void { TaskParachute(ped, p1); }
  taskParachuteToTarget(ped: number, x: number, y: number, z: number): void { TaskParachuteToTarget(ped, x, y, z); }
  setParachuteTaskTarget(ped: number, x: number, y: number, z: number): void { SetParachuteTaskTarget(ped, x, y, z); }
  setParachuteTaskThrust(ped: number, thrust: number): void { SetParachuteTaskThrust(ped, thrust); }
  taskRappelFromHeli(ped: number, p1: number): void { TaskRappelFromHeli(ped, p1); }
  taskVehicleDriveWander(ped: number, vehicle: number, speed: number, drivingStyle: number): void { TaskVehicleDriveWander(ped, vehicle, speed, drivingStyle); }
  taskAchieveHeading(ped: number, heading: number, timeout: number): void { TaskAchieveHeading(ped, heading, timeout); }
  taskFollowPointRoute(ped: number, speed: number, unknown: number): void { TaskFollowPointRoute(ped, speed, unknown); }
  taskSmartFleeCoord(ped: number, x: number, y: number, z: number, distance: number, time: number, p6: boolean, p7: boolean): void { TaskSmartFleeCoord(ped, x, y, z, distance, time, p6, p7); }
  taskShockingEventReact(ped: number, eventHandle: number): void { TaskShockingEventReact(ped, eventHandle); }
  taskWanderInArea(ped: number, x: number, y: number, z: number, radius: number, minimalLength: number, timeBetweenWalks: number): void { TaskWanderInArea(ped, x, y, z, radius, minimalLength, timeBetweenWalks); }
  taskWanderStandard(ped: number, p1: number, p2: number): void { TaskWanderStandard(ped, p1, p2); }
  taskStealthKill(killer: number, target: number, actionType: number, p3: number, p4: number): void { TaskStealthKill(killer, target, actionType, p3, p4); }
  taskPlantBomb(ped: number, x: number, y: number, z: number, heading: number): void { TaskPlantBomb(ped, x, y, z, heading); }
  taskStopPhoneGestureAnimation(ped: number): void { TaskStopPhoneGestureAnimation(ped); }
  taskClearLookAt(ped: number): void { TaskClearLookAt(ped); }
  taskPerformSequence(ped: number, taskSequenceId: number): void { TaskPerformSequence(ped, taskSequenceId); }
  getIsTaskActive(ped: number, taskIndex: number): boolean { return GetIsTaskActive(ped, taskIndex); }
  getScriptTaskStatus(ped: number, taskHash: number): number { return GetScriptTaskStatus(ped, taskHash); }
  taskLeaveAnyVehicle(ped: number, p1: number, flags: number): void { TaskLeaveAnyVehicle(ped, p1, flags); }
  taskAimGunScripted(ped: number, scriptTask: number, p2: boolean, p3: boolean): void { TaskAimGunScripted(ped, scriptTask, p2, p3); }
  updateTaskAimGunScriptedTarget(p0: number, p1: number, p2: number, p3: number, p4: number, p5: boolean): void { UpdateTaskAimGunScriptedTarget(p0, p1, p2, p3, p4, p5); }
  taskAimGunAtCoord(ped: number, x: number, y: number, z: number, time: number, p5: boolean, p6: boolean): void { TaskAimGunAtCoord(ped, x, y, z, time, p5, p6); }
  taskShootAtCoord(ped: number, x: number, y: number, z: number, duration: number, firingPattern: number): void { TaskShootAtCoord(ped, x, y, z, duration, firingPattern); }
  taskShuffleToNextVehicleSeat(ped: number, vehicle: number): void { TaskShuffleToNextVehicleSeat(ped, vehicle); }
  clearPedSecondaryTask(ped: number): void { ClearPedSecondaryTask(ped); }
  taskGotoEntityOffset(ped: number, p1: number, p2: number, x: number, y: number, z: number, duration: number): void { TaskGotoEntityOffset(ped, p1, p2, x, y, z, duration); }
  taskVehicleTempAction(driver: number, vehicle: number, action: number, time: number): void { TaskVehicleTempAction(driver, vehicle, action, time); }
  taskVehicleFollow(driver: number, vehicle: number, targetEntity: number, speed: number, drivingStyle: number, minDistance: number): void { TaskVehicleFollow(driver, vehicle, targetEntity, speed, drivingStyle, minDistance); }
  taskVehicleChase(driver: number, targetEnt: number): void { TaskVehicleChase(driver, targetEnt); }
  setTaskVehicleChaseBehaviorFlag(ped: number, flag: number, set: boolean): void { SetTaskVehicleChaseBehaviorFlag(ped, flag, set); }
  setTaskVehicleChaseIdealPursuitDistance(ped: number, distance: number): void { SetTaskVehicleChaseIdealPursuitDistance(ped, distance); }
  taskHeliChase(pilot: number, entityToFollow: number, x: number, y: number, z: number): void { TaskHeliChase(pilot, entityToFollow, x, y, z); }
  taskPlaneChase(pilot: number, entityToFollow: number, x: number, y: number, z: number): void { TaskPlaneChase(pilot, entityToFollow, x, y, z); }
  clearDrivebyTaskUnderneathDrivingTask(ped: number): void { ClearDrivebyTaskUnderneathDrivingTask(ped); }
  isDrivebyTaskUnderneathDrivingTask(ped: number): boolean { return IsDrivebyTaskUnderneathDrivingTask(ped); }
  isMountedWeaponTaskUnderneathDrivingTask(ped: number): boolean { return IsMountedWeaponTaskUnderneathDrivingTask(ped); }
  taskUseMobilePhone(ped: number, p1: number): void { TaskUseMobilePhone(ped, p1); }
  taskUseMobilePhoneTimed(ped: number, duration: number): void { TaskUseMobilePhoneTimed(ped, duration); }
  taskClimb(ped: number, unused: boolean): void { TaskClimb(ped, unused); }
  taskClimbLadder(ped: number, p1: number): void { TaskClimbLadder(ped, p1); }
  taskSetDecisionMaker(ped: number, p1: number): void { TaskSetDecisionMaker(ped, p1); }
  taskSeekCoverToCoords(ped: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p7: number, p8: boolean): void { TaskSeekCoverToCoords(ped, x1, y1, z1, x2, y2, z2, p7, p8); }
  taskGuardCurrentPosition(p0: number, p1: number, p2: number, p3: boolean): void { TaskGuardCurrentPosition(p0, p1, p2, p3); }
  taskStandGuard(ped: number, x: number, y: number, z: number, heading: number, scenarioName: string): void { TaskStandGuard(ped, x, y, z, heading, scenarioName); }
  setDriveTaskCruiseSpeed(driver: number, cruiseSpeed: number): void { SetDriveTaskCruiseSpeed(driver, cruiseSpeed); }
  setDriveTaskDrivingStyle(ped: number, drivingStyle: number): void { SetDriveTaskDrivingStyle(ped, drivingStyle); }
  taskStartScenarioInPlace(ped: number, scenarioName: string, unkDelay: number, playEnterAnim: boolean): void { TaskStartScenarioInPlace(ped, scenarioName, unkDelay, playEnterAnim); }
  taskUseNearestScenarioToCoord(ped: number, x: number, y: number, z: number, distance: number, duration: number): void { TaskUseNearestScenarioToCoord(ped, x, y, z, distance, duration); }
  taskUseNearestScenarioToCoordWarp(ped: number, x: number, y: number, z: number, radius: number, p5: number): void { TaskUseNearestScenarioToCoordWarp(ped, x, y, z, radius, p5); }
  pedHasUseScenarioTask(ped: number): boolean { return PedHasUseScenarioTask(ped); }
  taskCombatHatedTargetsInArea(ped: number, x: number, y: number, z: number, radius: number, p5: number): void { TaskCombatHatedTargetsInArea(ped, x, y, z, radius, p5); }
  taskSwapWeapon(ped: number, p1: boolean): void { TaskSwapWeapon(ped, p1); }
  taskReloadWeapon(ped: number, unused: boolean): void { TaskReloadWeapon(ped, unused); }
  taskWrithe(ped: number, target: number, time: number, p3: number): void { TaskWrithe(ped, target, time, p3); }
  taskPatrol(ped: number, p1: string, p2: number, p3: boolean, p4: boolean): void { TaskPatrol(ped, p1, p2, p3, p4); }
  taskStayInCover(ped: number): void { TaskStayInCover(ped); }
  taskVehicleShootAtPed(ped: number, target: number, p2: number): void { TaskVehicleShootAtPed(ped, target, p2); }
  setHighFallTask(ped: number, p1: number, p2: number, p3: number): void { SetHighFallTask(ped, p1, p2, p3); }
  taskSetBlockingOfNonTemporaryEvents(ped: number, toggle: boolean): void { TaskSetBlockingOfNonTemporaryEvents(ped, toggle); }
  taskForceMotionState(ped: number, state: number, p2: boolean): void { TaskForceMotionState(ped, state, p2); }
  updateTaskSweepAimEntity(ped: number, entity: number): void { UpdateTaskSweepAimEntity(ped, entity); }
  updateHandsUpDuration(ped: number, duration: number): void { UpdateTaskHandsUpDuration(ped, duration); }
  setPedPathCanUseClimbovers(ped: number, Toggle: boolean): void { SetPedPathCanUseClimbovers(ped, Toggle); }
  setPedPathCanUseLadders(ped: number, Toggle: boolean): void { SetPedPathCanUseLadders(ped, Toggle); }
  setPedPathCanDropFromHeight(ped: number, Toggle: boolean): void { SetPedPathCanDropFromHeight(ped, Toggle); }
  setPedPathClimbCostModifier(ped: number, modifier: number): void { SetPedPathClimbCostModifier(ped, modifier); }
  setPedPathMayEnterWater(ped: number, mayEnterWater: boolean): void { SetPedPathMayEnterWater(ped, mayEnterWater); }
  setPedPathPreferToAvoidWater(ped: number, avoidWater: boolean): void { SetPedPathPreferToAvoidWater(ped, avoidWater); }
  setPedPathAvoidFire(ped: number, avoidFire: boolean): void { SetPedPathAvoidFire(ped, avoidFire); }
  setGlobalMinBirdFlightHeight(height: number): void { SetGlobalMinBirdFlightHeight(height); }
  getNavmeshRouteDistanceRemaining(ped: number): { result: number; distanceRemaining: number; isPathReady: boolean } {
    const r = GetNavmeshRouteDistanceRemaining(ped);
    return { result: r[0], distanceRemaining: r[1], isPathReady: !!r[2] };
  }
  getNavmeshRouteResult(ped: number): number { return GetNavmeshRouteResult(ped); }
  stopAnimPlayback(ped: number, p1: number, p2: boolean): void { StopAnimPlayback(ped, p1, p2); }
  setAnimWeight(p0: number, p1: number, p2: number, p3: number, p4: boolean): void { SetAnimWeight(p0, p1, p2, p3, p4); }
  setAnimRate(p0: number, p1: number, p2: number, p3: boolean): void { SetAnimRate(p0, p1, p2, p3); }
  setAnimLooped(p0: number, p1: boolean, p2: number, p3: boolean): void { SetAnimLooped(p0, p1, p2, p3); }
  isPlayingPhoneGestureAnim(ped: number): boolean { return IsPlayingPhoneGestureAnim(ped); }
  getPhoneGestureAnimCurrentTime(ped: number): number { return GetPhoneGestureAnimCurrentTime(ped); }
  getPhoneGestureAnimTotalTime(ped: number): number { return GetPhoneGestureAnimTotalTime(ped); }
  openSequence(): number { const r = (OpenSequenceTask as any)(); return Array.isArray(r) ? r[0] : r; } // NOTE: native returns void per typings
  closeSequence(taskSequenceId: number): void { CloseSequenceTask(taskSequenceId); }
  clearSequence(taskSequenceId: number): number { const r = (ClearSequenceTask as any)(taskSequenceId); return Array.isArray(r) ? r[0] : r; } // NOTE: native returns void per typings
  setSequenceToRepeat(taskSequenceId: number, repeat: boolean): void { SetSequenceToRepeat(taskSequenceId, repeat); }
  getSequenceProgress(ped: number): number { return GetSequenceProgress(ped); }
  getActiveVehicleMissionType(vehicle: number): number { return GetActiveVehicleMissionType(vehicle); }
  updateAimGunScriptedTarget(p0: number, p1: number, p2: number, p3: number, p4: number, p5: boolean): void { UpdateTaskAimGunScriptedTarget(p0, p1, p2, p3, p4, p5); }
  getClipSetForScriptedGun(p0: number): string { return GetClipSetForScriptedGunTask(p0); }
  clearPedSecondary(ped: number): void { ClearPedSecondaryTask(ped); }
  setVehicleChaseBehaviorFlag(ped: number, flag: number, set: boolean): void { SetTaskVehicleChaseBehaviorFlag(ped, flag, set); }
  setVehicleChaseIdealPursuitDistance(ped: number, distance: number): void { SetTaskVehicleChaseIdealPursuitDistance(ped, distance); }
  controlMountedWeapon(ped: number): boolean { return ControlMountedWeapon(ped); }
  clearPedTasksImmediately(ped: number): void { ClearPedTasksImmediately(ped); }
  setNextDesiredMoveState(p0: number): void { SetNextDesiredMoveState(p0); }
  setPedDesiredMoveBlendRatio(ped: number, p1: number): void { SetPedDesiredMoveBlendRatio(ped, p1); }
  getPedDesiredMoveBlendRatio(ped: number): number { return GetPedDesiredMoveBlendRatio(ped); }
  setDecisionMaker(ped: number, p1: number): void { SetDecisionMaker(ped, p1); }
  setSphereDefensiveArea(ped: number, x: number, y: number, z: number, radius: number, p5: boolean, p6: boolean): void { SetPedSphereDefensiveArea(ped, x, y, z, radius, p5, p6); }
  addCoverPoint(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: boolean): number { return AddCoverPoint(p0, p1, p2, p3, p4, p5, p6, p7); }
  removeCoverPoint(coverpoint: number): void { RemoveCoverPoint(coverpoint); }
  doesScriptedCoverPointExistAtCoords(x: number, y: number, z: number): boolean { return DoesScriptedCoverPointExistAtCoords(x, y, z); }
  getScriptedCoverPointCoords(coverpoint: number): Vector3 { return toVec3(GetScriptedCoverPointCoords(coverpoint)); }
  removeAllCoverBlockingAreas(): void { RemoveAllCoverBlockingAreas(); }
  doesScenarioExistInArea(x: number, y: number, z: number, radius: number, b: boolean): boolean { return DoesScenarioExistInArea(x, y, z, radius, b); }
  doesScenarioOfTypeExistInArea(p0: number, p1: number, p2: number, p3: string, p4: number, p5: boolean): number { return DoesScenarioOfTypeExistInArea(p0, p1, p2, p3, p4, p5) as any; } // NOTE: native returns boolean per typings
  isScenarioOccupied(p0: number, p1: number, p2: number, p3: number, p4: boolean): boolean { return IsScenarioOccupied(p0, p1, p2, p3, p4); }
  pedHasUseScenario(ped: number): boolean { return PedHasUseScenarioTask(ped); }
  playAnimOnRunningScenario(ped: number, animDict: string, animName: string): void { PlayAnimOnRunningScenario(ped, animDict, animName); }
  doesScenarioGroupExist(scenarioGroup: string): boolean { return DoesScenarioGroupExist(scenarioGroup); }
  isScenarioGroupEnabled(scenarioGroup: string): boolean { return IsScenarioGroupEnabled(scenarioGroup); }
  setScenarioGroupEnabled(scenarioGroup: string, p1: boolean): void { SetScenarioGroupEnabled(scenarioGroup, p1); }
  resetScenarioGroupsEnabled(): void { ResetScenarioGroupsEnabled(); }
  setExclusiveScenarioGroup(scenarioGroup: string): void { SetExclusiveScenarioGroup(scenarioGroup); }
  resetExclusiveScenarioGroup(): void { ResetExclusiveScenarioGroup(); }
  isScenarioTypeEnabled(scenarioType: string): boolean { return IsScenarioTypeEnabled(scenarioType); }
  setScenarioTypeEnabled(scenarioType: string, toggle: boolean): void { SetScenarioTypeEnabled(scenarioType, toggle); }
  resetScenarioTypesEnabled(): void { ResetScenarioTypesEnabled(); }
  isPedActiveInScenario(ped: number): boolean { return IsPedActiveInScenario(ped); }
  isPedPlayingBaseClipInScenario(ped: number): boolean { return IsPedPlayingBaseClipInScenario(ped); }
  setPedCanPlayAmbientIdles(ped: number, p1: boolean, p2: boolean): void { SetPedCanPlayAmbientIdles(ped, p1, p2); }
  isPedGettingUp(ped: number): boolean { return IsPedGettingUp(ped); }
  isPedInWrithe(ped: number): boolean { return IsPedInWrithe(ped); }
  openPatrolRoute(patrolRoute: string): void { OpenPatrolRoute(patrolRoute); }
  closePatrolRoute(): void { ClosePatrolRoute(); }
  addPatrolRouteNode(p0: number, p1: string, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p8: number): void { AddPatrolRouteNode(p0, p1, x1, y1, z1, x2, y2, z2, p8); }
  addPatrolRouteLink(p0: number, p1: number): void { AddPatrolRouteLink(p0, p1); }
  createPatrolRoute(): void { CreatePatrolRoute(); }
  deletePatrolRoute(patrolRoute: string): void { DeletePatrolRoute(patrolRoute); }
  setHighFall(ped: number, p1: number, p2: number, p3: number): void { SetHighFallTask(ped, p1, p2, p3); }
  requestWaypointRecording(name: string): void { RequestWaypointRecording(name); }
  getIsWaypointRecordingLoaded(name: string): boolean { return GetIsWaypointRecordingLoaded(name); }
  removeWaypointRecording(name: string): void { RemoveWaypointRecording(name); }
  waypointRecordingGetNumPoints(name: string): number { const r = WaypointRecordingGetNumPoints(name); return Array.isArray(r) ? r[1] : r; }
  waypointRecordingGetCoord(name: string, point: number): Vector3 | null { const r = WaypointRecordingGetCoord(name, point); return r ? toVec3(r[1]) : null; }
  waypointRecordingGetSpeedAtPoint(name: string, point: number): number { return WaypointRecordingGetSpeedAtPoint(name, point); }
  waypointRecordingGetClosestWaypoint(name: string, x: number, y: number, z: number): number { const r = WaypointRecordingGetClosestWaypoint(name, x, y, z); return Array.isArray(r) ? r[1] : r; }
  isWaypointPlaybackGoingOnForPed(p0: number): boolean { return IsWaypointPlaybackGoingOnForPed(p0); }
  getPedWaypointProgress(ped: number): number { return GetPedWaypointProgress(ped); }
  getPedWaypointDistance(p0: number): number { return GetPedWaypointDistance(p0); }
  setPedWaypointRouteOffset(p0: number, p1: number, p2: number, p3: number): number { return SetPedWaypointRouteOffset(p0, p1, p2, p3); }
  getWaypointDistanceAlongRoute(p0: string, p1: number): number { return GetWaypointDistanceAlongRoute(p0, p1); }
  waypointPlaybackGetIsPaused(p0: number): boolean { return WaypointPlaybackGetIsPaused(p0); }
  waypointPlaybackPause(p0: number, p1: boolean, p2: boolean): void { WaypointPlaybackPause(p0, p1, p2); }
  waypointPlaybackResume(p0: number, p1: boolean, p2: number, p3: number): void { WaypointPlaybackResume(p0, p1, p2, p3); }
  waypointPlaybackOverrideSpeed(p0: number, p1: number, p2: boolean): void { WaypointPlaybackOverrideSpeed(p0, p1, p2); }
  waypointPlaybackUseDefaultSpeed(p0: number): void { WaypointPlaybackUseDefaultSpeed(p0); }
  useWaypointRecordingAsAssistedMovementRoute(name: string, p1: boolean, p2: number, p3: number): void { UseWaypointRecordingAsAssistedMovementRoute(name, p1, p2, p3); }
  waypointPlaybackStartAimingAtPed(p0: number, p1: number, p2: boolean): void { WaypointPlaybackStartAimingAtPed(p0, p1, p2); }
  waypointPlaybackStartAimingAtCoord(p0: number, p1: number, p2: number, p3: number, p4: boolean): void { WaypointPlaybackStartAimingAtCoord(p0, p1, p2, p3, p4); }
  waypointPlaybackStartShootingAtPed(p0: number, p1: number, p2: boolean, p3: number): void { WaypointPlaybackStartShootingAtPed(p0, p1, p2, p3); }
  waypointPlaybackStartShootingAtCoord(p0: number, p1: number, p2: number, p3: number, p4: boolean, p5: number): void { WaypointPlaybackStartShootingAtCoord(p0, p1, p2, p3, p4, p5); }
  waypointPlaybackStopAimingOrShooting(p0: number): void { WaypointPlaybackStopAimingOrShooting(p0); }
  assistedMovementRequestRoute(route: string): void { AssistedMovementRequestRoute(route); }
  assistedMovementRemoveRoute(route: string): void { AssistedMovementRemoveRoute(route); }
  assistedMovementIsRouteLoaded(route: string): boolean { return AssistedMovementIsRouteLoaded(route); }
  assistedMovementSetRouteProperties(route: string, props: number): void { AssistedMovementSetRouteProperties(route, props); }
  assistedMovementOverrideLoadDistanceThisFrame(dist: number): void { AssistedMovementOverrideLoadDistanceThisFrame(dist); }
  isWaypointPlaybackGoingOnForVehicle(vehicle: number): boolean { return IsWaypointPlaybackGoingOnForVehicle(vehicle); }
  getVehicleWaypointProgress(vehicle: number): number { return GetVehicleWaypointProgress(vehicle); }
  getVehicleWaypointTargetPoint(vehicle: number): number { return GetVehicleWaypointTargetPoint(vehicle); }
  vehicleWaypointPlaybackPause(vehicle: number): void { VehicleWaypointPlaybackPause(vehicle); }
  vehicleWaypointPlaybackResume(vehicle: number): void { VehicleWaypointPlaybackResume(vehicle); }
  vehicleWaypointPlaybackUseDefaultSpeed(vehicle: number): void { VehicleWaypointPlaybackUseDefaultSpeed(vehicle); }
  vehicleWaypointPlaybackOverrideSpeed(vehicle: number, speed: number): void { VehicleWaypointPlaybackOverrideSpeed(vehicle, speed); }
  setBlockingOfNonTemporaryEvents(ped: number, toggle: boolean): void { SetBlockingOfNonTemporaryEvents(ped, toggle); }
  forceMotionState(ped: number, state: number, p2: boolean): boolean { return ForcePedMotionState(ped, state, p2, 0, false); }
  isMoveNetworkActive(ped: number): boolean { return IsTaskMoveNetworkActive(ped); }
  isMoveNetworkReadyForTransition(ped: number): boolean { return IsTaskMoveNetworkReadyForTransition(ped); }
  requestMoveNetworkStateTransition(ped: number, name: string): boolean { return RequestTaskMoveNetworkStateTransition(ped, name); }
  getMoveNetworkState(ped: number): string { return GetTaskMoveNetworkState(ped); }
  setMoveNetworkSignalFloat(ped: number, signalName: string, value: number): void { SetTaskMoveNetworkSignalFloat(ped, signalName, value); }
  setMoveNetworkSignalBool(ped: number, signalName: string, value: boolean): void { SetTaskMoveNetworkSignalBool(ped, signalName, value); }
  getMoveNetworkSignalFloat(ped: number, signalName: string): number { return GetTaskMoveNetworkSignalFloat(ped, signalName); }
  getMoveNetworkSignalBool(ped: number, signalName: string): boolean { return GetTaskMoveNetworkSignalBool(ped, signalName); }
  getMoveNetworkEvent(ped: number, eventName: string): boolean { return GetTaskMoveNetworkEvent(ped, eventName); }
  isMoveBlendRatioStill(ped: number): boolean { return IsMoveBlendRatioStill(ped); }
  isMoveBlendRatioWalking(ped: number): boolean { return IsMoveBlendRatioWalking(ped); }
  isMoveBlendRatioRunning(ped: number): boolean { return IsMoveBlendRatioRunning(ped); }
  isMoveBlendRatioSprinting(ped: number): boolean { return IsMoveBlendRatioSprinting(ped); }
  isPedStill(ped: number): boolean { return IsPedStill(ped); }
  isPedWalking(ped: number): boolean { return IsPedWalking(ped); }
  isPedRunning(ped: number): boolean { return IsPedRunning(ped); }
  isPedSprinting(ped: number): boolean { return IsPedSprinting(ped); }
  isPedStrafing(ped: number): boolean { return IsPedStrafing(ped); }
  updateSweepAimEntity(ped: number, entity: number): void { UpdateTaskSweepAimEntity(ped, entity); }
  updateSweepAimPosition(p0: number, p1: number, p2: number, p3: number): void { UpdateTaskSweepAimPosition(p0, p1, p2, p3); }
  isPedRunningArrest(ped: number): boolean { return IsPedRunningArrestTask(ped); }
  isPedBeingArrested(ped: number): boolean { return IsPedBeingArrested(ped); }
  uncuffPed(ped: number): void { UncuffPed(ped); }
  isPedCuffed(ped: number): boolean { return IsPedCuffed(ped); }

  taskVehicleDriveToCoord(ped: number, vehicle: number, x: number, y: number, z: number, speed: number, p6: number, vehicleModel: number, drivingMode: number, stopRange: number, p10: number): void { TaskVehicleDriveToCoord(ped, vehicle, x, y, z, speed, p6, vehicleModel, drivingMode, stopRange, p10); }
  taskVehicleDriveToCoordLongrange(ped: number, vehicle: number, x: number, y: number, z: number, speed: number, driveMode: number, stopRange: number): void { TaskVehicleDriveToCoordLongrange(ped, vehicle, x, y, z, speed, driveMode, stopRange); }
  taskGoStraightToCoord(ped: number, x: number, y: number, z: number, speed: number, timeout: number, targetHeading: number, distanceToSlide: number): void { TaskGoStraightToCoord(ped, x, y, z, speed, timeout, targetHeading, distanceToSlide); }
  taskVehiclePark(ped: number, vehicle: number, x: number, y: number, z: number, heading: number, mode: number, radius: number, keepEngineOn: boolean): void { TaskVehiclePark(ped, vehicle, x, y, z, heading, mode, radius, keepEngineOn); }
  taskFollowNavMeshToCoord(ped: number, x: number, y: number, z: number, speed: number, timeout: number, stoppingRange: number, persistFollowing: boolean, unk: number): void { TaskFollowNavMeshToCoord(ped, x, y, z, speed, timeout, stoppingRange, persistFollowing as any, unk); }
  taskFollowNavMeshToCoordAdvanced(ped: number, x: number, y: number, z: number, speed: number, timeout: number, unkFloat: number, unkInt: number, unkX: number, unkY: number, unkZ: number, unk_40000f: number): void { TaskFollowNavMeshToCoordAdvanced(ped, x, y, z, speed, timeout, unkFloat, unkInt, unkX, unkY, unkZ, unk_40000f); }
  taskGoToCoordAnyMeans(ped: number, x: number, y: number, z: number, speed: number, p5: number, p6: boolean, walkingStyle: number, p8: number): void { TaskGoToCoordAnyMeans(ped, x, y, z, speed, p5, p6, walkingStyle, p8); }
  taskGoToCoordAnyMeansExtraParams(ped: number, x: number, y: number, z: number, speed: number, p5: number, p6: boolean, walkingStyle: number, p8: number, p9: number, p10: number, p11: number): void { TaskGoToCoordAnyMeansExtraParams(ped, x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11); }
  taskGoToCoordAnyMeansExtraParamsWithCruiseSpeed(ped: number, x: number, y: number, z: number, speed: number, p5: number, p6: boolean, walkingStyle: number, p8: number, p9: number, p10: number, p11: number, p12: number): void { TaskGoToCoordAnyMeansExtraParamsWithCruiseSpeed(ped, x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11, p12); }
  taskPlayAnim(ped: number, animDictionary: string, animationName: string, blendInSpeed: number, blendOutSpeed: number, duration: number, flag: number, playbackRate: number, lockX: boolean, lockY: boolean, lockZ: boolean): void { TaskPlayAnim(ped, animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, playbackRate, lockX, lockY, lockZ); }
  taskPlayAnimAdvanced(ped: number, animDict: string, animName: string, posX: number, posY: number, posZ: number, rotX: number, rotY: number, rotZ: number, animEnterSpeed: number, animExitSpeed: number, duration: number, flag: number, animTime: number, p14: number, p15: number): void { TaskPlayAnimAdvanced(ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, animEnterSpeed, animExitSpeed, duration, flag, animTime, p14, p15); }
  stopAnimTask(ped: number, animDictionary: string, animationName: string, p3: number): void { StopAnimTask(ped, animDictionary, animationName, p3); }
  taskPlayPhoneGestureAnimation(ped: number, animDict: string, animation: string, boneMaskType: string, p4: number, p5: number, p6: boolean, p7: boolean): void { TaskPlayPhoneGestureAnimation(ped, animDict, animation, boneMaskType, p4, p5, p6, p7); }
  taskVehicleMission(driver: number, vehicle: number, vehicleTarget: number, missionType: number, p4: number, p5: number, p6: number, p7: number, DriveAgainstTraffic: boolean): void { TaskVehicleMission(driver, vehicle, vehicleTarget, missionType, p4, p5, p6, p7, DriveAgainstTraffic); }
  taskVehicleMissionCoorsTarget(ped: number, vehicle: number, x: number, y: number, z: number, p5: number, p6: number, p7: number, p8: number, p9: number, DriveAgainstTraffic: boolean): void { TaskVehicleMissionCoorsTarget(ped, vehicle, x, y, z, p5, p6, p7, p8, p9, DriveAgainstTraffic); }
  taskVehicleEscort(ped: number, vehicle: number, targetVehicle: number, mode: number, speed: number, drivingStyle: number, minDistance: number, p7: number, noRoadsDistance: number): void { TaskVehicleEscort(ped, vehicle, targetVehicle, mode, speed, drivingStyle, minDistance, p7, noRoadsDistance); }
  taskVehicleHeliProtect(pilot: number, vehicle: number, entityToFollow: number, targetSpeed: number, p4: number, radius: number, altitude: number, p7: number): void { TaskVehicleHeliProtect(pilot, vehicle, entityToFollow, targetSpeed, p4, radius, altitude, p7); }
  taskPlaneLand(pilot: number, plane: number, runwayStartX: number, runwayStartY: number, runwayStartZ: number, runwayEndX: number, runwayEndY: number, runwayEndZ: number): void { TaskPlaneLand(pilot, plane, runwayStartX, runwayStartY, runwayStartZ, runwayEndX, runwayEndY, runwayEndZ); }
  taskHeliMission(pilot: number, aircraft: number, targetVehicle: number, targetPed: number, destinationX: number, destinationY: number, destinationZ: number, missionFlag: number, maxSpeed: number, landingRadius: number, targetHeading: number, unk1: number, unk2: number, unk3: number, landingFlags: number): void { TaskHeliMission(pilot, aircraft, targetVehicle, targetPed, destinationX, destinationY, destinationZ, missionFlag, maxSpeed, landingRadius, targetHeading, unk1, unk2, unk3, landingFlags); }
  taskPlaneMission(pilot: number, aircraft: number, targetVehicle: number, targetPed: number, destinationX: number, destinationY: number, destinationZ: number, missionFlag: number, angularDrag: number, unk: number, targetHeading: number, maxZ: number, minZ: number, p13: number): void { TaskPlaneMission(pilot, aircraft, targetVehicle, targetPed, destinationX, destinationY, destinationZ, missionFlag, angularDrag, unk, targetHeading, maxZ, minZ, p13 as any); }
  taskBoatMission(pedDriver: number, boat: number, p2: number, p3: number, x: number, y: number, z: number, p7: number, maxSpeed: number, drivingStyle: number, p10: number, p11: number): void { TaskBoatMission(pedDriver, boat, p2, p3, x, y, z, p7, maxSpeed, drivingStyle, p10, p11); }
  taskDriveBy(driverPed: number, targetPed: number, targetVehicle: number, targetX: number, targetY: number, targetZ: number, distanceToShoot: number, pedAccuracy: number, p8: boolean, firingPattern: number): void { TaskDriveBy(driverPed, targetPed, targetVehicle, targetX, targetY, targetZ, distanceToShoot, pedAccuracy, p8, firingPattern); }
  taskGuardSphereDefensiveArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number): void { TaskGuardSphereDefensiveArea(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10); }
  taskStartScenarioAtPosition(ped: number, scenarioName: string, x: number, y: number, z: number, heading: number, duration: number, sittingScenario: boolean, teleport: boolean): void { TaskStartScenarioAtPosition(ped, scenarioName, x, y, z, heading, duration, sittingScenario, teleport); }
  taskVehicleGotoNavmesh(ped: number, vehicle: number, x: number, y: number, z: number, speed: number, behaviorFlag: number, stoppingRange: number): void { TaskVehicleGotoNavmesh(ped, vehicle, x, y, z, speed, behaviorFlag, stoppingRange); }
  taskGoToCoordWhileAimingAtCoord(ped: number, x: number, y: number, z: number, aimAtX: number, aimAtY: number, aimAtZ: number, moveSpeed: number, p8: boolean, p9: number, p10: number, p11: boolean, flags: number, p13: boolean, firingPattern: number): void { TaskGoToCoordWhileAimingAtCoord(ped, x, y, z, aimAtX, aimAtY, aimAtZ, moveSpeed, p8, p9, p10, p11, flags, p13, firingPattern); }
  taskGoToCoordAndAimAtHatedEntitiesNearCoord(pedHandle: number, goToLocationX: number, goToLocationY: number, goToLocationZ: number, focusLocationX: number, focusLocationY: number, focusLocationZ: number, speed: number, shootAtEnemies: boolean, distanceToStopAt: number, noRoadsDistance: number, unkTrue: boolean, unkFlag: number, aimingFlag: number, firingPattern: number): void { TaskGoToCoordAndAimAtHatedEntitiesNearCoord(pedHandle, goToLocationX, goToLocationY, goToLocationZ, focusLocationX, focusLocationY, focusLocationZ, speed, shootAtEnemies, distanceToStopAt, noRoadsDistance, unkTrue, unkFlag, aimingFlag, firingPattern); }
  taskVehicleFollowWaypointRecording(ped: number, vehicle: number, WPRecording: string, p3: number, p4: number, p5: number, p6: number, p7: number, p8: boolean, p9: number): void { TaskVehicleFollowWaypointRecording(ped, vehicle, WPRecording, p3, p4, p5, p6, p7, p8, p9); }
  taskMoveNetwork(ped: number, task: string, multiplier: number, p3: boolean, animDict: string, flags: number): void { TaskMoveNetworkByName(ped, task, multiplier, p3, animDict, flags); }
  taskMoveNetworkAdvanced(ped: number, p1: string, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: boolean, animDict: string, flags: number): void { TaskMoveNetworkAdvancedByName(ped, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, animDict, flags); }
  taskSynchronizedScene(ped: number, scene: number, animDictionary: string, animationName: string, speed: number, speedMultiplier: number, duration: number, flag: number, playbackRate: number, p9: number): void { TaskSynchronizedScene(ped, scene, animDictionary, animationName, speed, speedMultiplier, duration, flag, playbackRate, p9); }
  standStill(ped: number, time: number): void { TaskStandStill(ped, time); }
  jump(ped: number, unused: boolean): void { TaskJump(ped, unused); }
  cower(ped: number, duration: number): void { TaskCower(ped, duration); }
  getOffBoat(ped: number, boat: number): void { TaskGetOffBoat(ped, boat); }
  skyDive(ped: number): void { TaskSkyDive(ped); }
  parachute(ped: number, p1: boolean): void { TaskParachute(ped, p1); }
  parachuteToTarget(ped: number, x: number, y: number, z: number): void { TaskParachuteToTarget(ped, x, y, z); }
  setParachuteTarget(ped: number, x: number, y: number, z: number): void { SetParachuteTaskTarget(ped, x, y, z); }
  setParachuteThrust(ped: number, thrust: number): void { SetParachuteTaskThrust(ped, thrust); }
  rappelFromHeli(ped: number, p1: number): void { TaskRappelFromHeli(ped, p1); }
  followToOffsetOfEntity(ped: number, entity: number, offsetX: number, offsetY: number, offsetZ: number, movementSpeed: number, timeout: number, stoppingRange: number, persistFollowing: boolean): void { TaskFollowToOffsetOfEntity(ped, entity, offsetX, offsetY, offsetZ, movementSpeed, timeout, stoppingRange, persistFollowing); }
  goStraightToCoordRelativeToEntity(entity1: number, entity2: number, p2: number, p3: number, p4: number, p5: number, p6: number): void { TaskGoStraightToCoordRelativeToEntity(entity1, entity2, p2, p3, p4, p5, p6); }
  achieveHeading(ped: number, heading: number, timeout: number): void { TaskAchieveHeading(ped, heading, timeout); }
  flushRoute(): void { TaskFlushRoute(); }
  extendRoute(x: number, y: number, z: number): void { TaskExtendRoute(x, y, z); }
  followPointRoute(ped: number, speed: number, unknown: number): void { TaskFollowPointRoute(ped, speed, unknown); }
  goToEntity(entity: number, target: number, duration: number, distance: number, speed: number, p5: number, p6: number): void { TaskGoToEntity(entity, target, duration, distance, speed, p5, p6); }
  smartFleeCoord(ped: number, x: number, y: number, z: number, distance: number, time: number, p6: boolean, p7: boolean): void { TaskSmartFleeCoord(ped, x, y, z, distance, time, p6, p7); }
  smartFleePed(ped: number, fleeTarget: number, distance: number, fleeTime: number, p4: boolean, p5: boolean): void { TaskSmartFleePed(ped, fleeTarget, distance, fleeTime, p4, p5); }
  reactAndFleePed(ped: number, fleeTarget: number): void { TaskReactAndFleePed(ped, fleeTarget); }
  shockingEventReact(ped: number, eventHandle: number): void { TaskShockingEventReact(ped, eventHandle); }
  wanderSpecific(p0: number, p1: number, p2: number, p3: number): void { TaskWanderSpecific(p0, p1, p2, p3); }
  vehiclePark(ped: number, vehicle: number, x: number, y: number, z: number, heading: number, mode: number, radius: number, keepEngineOn: boolean): void { TaskVehiclePark(ped, vehicle, x, y, z, heading, mode, radius, keepEngineOn); }
  stealthKill(killer: number, target: number, actionType: number, p3: number, p4: number): void { TaskStealthKill(killer, target, actionType, p3, p4); }
  plantBomb(ped: number, x: number, y: number, z: number, heading: number): void { TaskPlantBomb(ped, x, y, z, heading); }
  followNavMeshToCoordAdvanced(ped: number, x: number, y: number, z: number, speed: number, timeout: number, unkFloat: number, unkInt: number, unkX: number, unkY: number, unkZ: number, unk_40000f: number): void { TaskFollowNavMeshToCoordAdvanced(ped, x, y, z, speed, timeout, unkFloat, unkInt, unkX, unkY, unkZ, unk_40000f); }
  goToCoordAnyMeansExtraParams(ped: number, x: number, y: number, z: number, speed: number, p5: number, p6: boolean, walkingStyle: number, p8: number, p9: number, p10: number, p11: number): void { TaskGoToCoordAnyMeansExtraParams(ped, x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11); }
  goToCoordAnyMeansExtraParamsWithCruiseSpeed(ped: number, x: number, y: number, z: number, speed: number, p5: number, p6: boolean, walkingStyle: number, p8: number, p9: number, p10: number, p11: number, p12: number): void { TaskGoToCoordAnyMeansExtraParamsWithCruiseSpeed(ped, x, y, z, speed, p5, p6, walkingStyle, p8, p9, p10, p11, p12); }
  playPhoneGestureAnimation(ped: number, animDict: string, animation: string, boneMaskType: string, p4: number, p5: number, p6: boolean, p7: boolean): void { TaskPlayPhoneGestureAnimation(ped, animDict, animation, boneMaskType, p4, p5, p6, p7); }
  stopPhoneGestureAnimation(ped: number): void { TaskStopPhoneGestureAnimation(ped); }
  vehiclePlayAnim(vehicle: number, animationSet: string, animationName: string): void { TaskVehiclePlayAnim(vehicle, animationSet, animationName); }
  lookAtCoord(entity: number, x: number, y: number, z: number, duration: number, p5: number, p6: number): void { TaskLookAtCoord(entity, x, y, z, duration, p5, p6); }
  performSequence(ped: number, taskSequenceId: number): void { TaskPerformSequence(ped, taskSequenceId); }
  performSequenceLocally(ped: number, taskSequenceId: number): void { TaskPerformSequenceLocally(ped, taskSequenceId); }
  leaveAnyVehicle(ped: number, p1: number, flags: number): void { TaskLeaveAnyVehicle(ped, p1, flags); }
  aimGunScripted(ped: number, scriptTask: number, p2: boolean, p3: boolean): void { TaskAimGunScripted(ped, scriptTask, p2, p3); }
  aimGunScriptedWithTarget(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: boolean, p7: boolean): void { TaskAimGunScriptedWithTarget(p0, p1, p2, p3, p4, p5, p6, p7); }
  turnPedToFaceEntity(ped: number, entity: number, duration: number): void { TaskTurnPedToFaceEntity(ped, entity, duration); }
  shuffleToNextVehicleSeat(ped: number, vehicle: number): void { TaskShuffleToNextVehicleSeat(ped, vehicle); }
  clearPedS(ped: number): void { ClearPedTasks(ped); }
  everyoneLeaveVehicle(vehicle: number): void { TaskEveryoneLeaveVehicle(vehicle); }
  gotoEntityOffset(ped: number, p1: number, p2: number, x: number, y: number, z: number, duration: number): void { TaskGotoEntityOffset(ped, p1, p2, x, y, z, duration); }
  gotoEntityOffsetXy(p0: number, oed: number, duration: number, p3: number, p4: number, p5: number, p6: number, p7: boolean): void { TaskGotoEntityOffsetXy(p0, oed, duration, p3, p4, p5, p6, p7 as any); }
  turnPedToFaceCoord(ped: number, x: number, y: number, z: number, duration: number): void { TaskTurnPedToFaceCoord(ped, x, y, z, duration); }
  vehicleTempAction(driver: number, vehicle: number, action: number, time: number): void { TaskVehicleTempAction(driver, vehicle, action, time); }
  vehicleMission(driver: number, vehicle: number, vehicleTarget: number, missionType: number, p4: number, p5: number, p6: number, p7: number, DriveAgainstTraffic: boolean): void { TaskVehicleMission(driver, vehicle, vehicleTarget, missionType, p4, p5, p6, p7, DriveAgainstTraffic); }
  vehicleMissionPedTarget(ped: number, vehicle: number, pedTarget: number, missionType: number, maxSpeed: number, drivingStyle: number, minDistance: number, p7: number, DriveAgainstTraffic: boolean): void { TaskVehicleMissionPedTarget(ped, vehicle, pedTarget, missionType, maxSpeed, drivingStyle, minDistance, p7, DriveAgainstTraffic); }
  vehicleMissionCoorsTarget(ped: number, vehicle: number, x: number, y: number, z: number, p5: number, p6: number, p7: number, p8: number, p9: number, DriveAgainstTraffic: boolean): void { TaskVehicleMissionCoorsTarget(ped, vehicle, x, y, z, p5, p6, p7, p8, p9, DriveAgainstTraffic); }
  vehicleEscort(ped: number, vehicle: number, targetVehicle: number, mode: number, speed: number, drivingStyle: number, minDistance: number, p7: number, noRoadsDistance: number): void { TaskVehicleEscort(ped, vehicle, targetVehicle, mode, speed, drivingStyle, minDistance, p7, noRoadsDistance); }
  vehicleHeliProtect(pilot: number, vehicle: number, entityToFollow: number, targetSpeed: number, p4: number, radius: number, altitude: number, p7: number): void { TaskVehicleHeliProtect(pilot, vehicle, entityToFollow, targetSpeed, p4, radius, altitude, p7); }
  heliChase(pilot: number, entityToFollow: number, x: number, y: number, z: number): void { TaskHeliChase(pilot, entityToFollow, x, y, z); }
  planeChase(pilot: number, entityToFollow: number, x: number, y: number, z: number): void { TaskPlaneChase(pilot, entityToFollow, x, y, z); }
  planeLand(pilot: number, plane: number, runwayStartX: number, runwayStartY: number, runwayStartZ: number, runwayEndX: number, runwayEndY: number, runwayEndZ: number): void { TaskPlaneLand(pilot, plane, runwayStartX, runwayStartY, runwayStartZ, runwayEndX, runwayEndY, runwayEndZ); }
  planeGotoPreciseVtol(ped: number, vehicle: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number): void { TaskPlaneGotoPreciseVtol(ped, vehicle, p2, p3, p4, p5, p6, p7, p8, p9); }
  submarineGotoAndStop(p0: number, submarine: number, x: number, y: number, z: number, p5: number): void { TaskSubmarineGotoAndStop(p0, submarine, x, y, z, p5); }
  heliMission(pilot: number, aircraft: number, targetVehicle: number, targetPed: number, destinationX: number, destinationY: number, destinationZ: number, missionFlag: number, maxSpeed: number, landingRadius: number, targetHeading: number, unk1: number, unk2: number, unk3: number, landingFlags: number): void { TaskHeliMission(pilot, aircraft, targetVehicle, targetPed, destinationX, destinationY, destinationZ, missionFlag, maxSpeed, landingRadius, targetHeading, unk1, unk2, unk3, landingFlags); }
  heliEscortHeli(pilot: number, heli1: number, heli2: number, p3: number, p4: number, p5: number): void { TaskHeliEscortHeli(pilot, heli1, heli2, p3, p4, p5); }
  planeMission(pilot: number, aircraft: number, targetVehicle: number, targetPed: number, destinationX: number, destinationY: number, destinationZ: number, missionFlag: number, angularDrag: number, unk: number, targetHeading: number, maxZ: number, minZ: number, p13: number): void { TaskPlaneMission(pilot, aircraft, targetVehicle, targetPed, destinationX, destinationY, destinationZ, missionFlag, angularDrag, unk, targetHeading, maxZ, minZ, p13 as any); }
  planeTaxi(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): void { TaskPlaneTaxi(p0, p1, p2, p3, p4, p5, p6); }
  boatMission(pedDriver: number, boat: number, p2: number, p3: number, x: number, y: number, z: number, p7: number, maxSpeed: number, drivingStyle: number, p10: number, p11: number): void { TaskBoatMission(pedDriver, boat, p2, p3, x, y, z, p7, maxSpeed, drivingStyle, p10, p11); }
  setDrivebyTarget(shootingPed: number, targetPed: number, targetVehicle: number, x: number, y: number, z: number): void { SetDrivebyTaskTarget(shootingPed, targetPed, targetVehicle, x, y, z); }
  clearDrivebyUnderneathDrivingTask(ped: number): void { ClearDrivebyTaskUnderneathDrivingTask(ped); }
  setMountedWeaponTarget(shootingPed: number, targetPed: number, targetVehicle: number, x: number, y: number, z: number, p6: number, p7: number): void { SetMountedWeaponTarget(shootingPed, targetPed, targetVehicle, x, y, z); }
  useMobilePhone(ped: number, p1: number): void { TaskUseMobilePhone(ped, p1); }
  useMobilePhoneTimed(ped: number, duration: number): void { TaskUseMobilePhoneTimed(ped, duration); }
  chatToPed(ped: number, target: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number): void { TaskChatToPed(ped, target, p2, p3, p4, p5, p6, p7); }
  warpPedIntoVehicle(ped: number, vehicle: number, seat: number): void { TaskWarpPedIntoVehicle(ped, vehicle, seat); }
  climb(ped: number, unused: boolean): void { TaskClimb(ped, unused); }
  climbLadder(ped: number, p1: number): void { TaskClimbLadder(ped, p1); }
  performSequenceFromProgress(p0: number, p1: number, p2: number, p3: number): void { TaskPerformSequenceFromProgress(p0, p1, p2, p3); }
  gotoEntityAiming(ped: number, target: number, distanceToStopAt: number, StartAimingDist: number): void { TaskGotoEntityAiming(ped, target, distanceToStopAt, StartAimingDist); }
  clearDefensiveArea(p0: number): void { TaskClearDefensiveArea(p0); }
  pedSlideToCoord(ped: number, x: number, y: number, z: number, heading: number, p5: number): void { TaskPedSlideToCoord(ped, x, y, z, heading, p5); }
  pedSlideToCoordHdgRate(ped: number, x: number, y: number, z: number, heading: number, p5: number, p6: number): void { TaskPedSlideToCoordHdgRate(ped, x, y, z, heading, p5, p6); }
  combatPedTimed(p0: number, ped: number, p2: number, p3: number): void { TaskCombatPedTimed(p0, ped, p2, p3); }
  seekCoverFromPed(ped: number, target: number, duration: number, p3: boolean): void { TaskSeekCoverFromPed(ped, target, duration, p3); }
  seekCoverToCoverPoint(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: boolean): void { TaskSeekCoverToCoverPoint(p0, p1, p2, p3, p4, p5, p6); }
  seekCoverToCoords(ped: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, p7: number, p8: boolean): void { TaskSeekCoverToCoords(ped, x1, y1, z1, x2, y2, z2, p7, p8); }
  putPedDirectlyIntoCover(ped: number, x: number, y: number, z: number, timeout: number, p5: boolean, p6: number, p7: boolean, p8: boolean, p9: number, p10: boolean): void { TaskPutPedDirectlyIntoCover(ped, x, y, z, timeout, p5, p6, p7, p8, p9, p10); }
  exitCover(p0: number, p1: number, p2: number, p3: number, p4: number): void { TaskExitCover(p0, p1, p2, p3, p4); }
  putPedDirectlyIntoMelee(ped: number, meleeTarget: number, p2: number, p3: number, p4: number, p5: boolean): void { TaskPutPedDirectlyIntoMelee(ped, meleeTarget, p2, p3, p4, p5); }
  toggleDuck(p0: boolean, p1: boolean): void { TaskToggleDuck(p0, p1); }
  guardAssignedDefensiveArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): void { TaskGuardAssignedDefensiveArea(p0, p1, p2, p3, p4, p5, p6); }
  guardSphereDefensiveArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number): void { TaskGuardSphereDefensiveArea(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10); }
  standGuard(ped: number, x: number, y: number, z: number, heading: number, scenarioName: string): void { TaskStandGuard(ped, x, y, z, heading, scenarioName); }
  setDriveCruiseSpeed(driver: number, cruiseSpeed: number): void { SetDriveTaskCruiseSpeed(driver, cruiseSpeed); }
  setDriveMaxCruiseSpeed(p0: number, p1: number): void { SetDriveTaskMaxCruiseSpeed(p0, p1); }
  setDriveDrivingStyle(ped: number, drivingStyle: number): void { SetDriveTaskDrivingStyle(ped, drivingStyle); }
  addCoverBlockingArea(playerX: number, playerY: number, playerZ: number, radiusX: number, radiusY: number, radiusZ: number, p6: boolean, p7: boolean, p8: boolean, p9: boolean): void { AddCoverBlockingArea(playerX, playerY, playerZ, radiusX, radiusY, radiusZ, p6, p7, p8, p9); }
  useNearestScenarioToCoordWarp(ped: number, x: number, y: number, z: number, radius: number, p5: number): void { TaskUseNearestScenarioToCoordWarp(ped, x, y, z, radius, p5); }
  useNearestScenarioChainToCoord(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): void { TaskUseNearestScenarioChainToCoord(p0, p1, p2, p3, p4, p5); }
  useNearestScenarioChainToCoordWarp(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): void { TaskUseNearestScenarioChainToCoordWarp(p0, p1, p2, p3, p4, p5); }
  combatHatedTargetsAroundPedTimed(p0: number, p1: number, p2: number, p3: number): void { TaskCombatHatedTargetsAroundPedTimed(p0, p1, p2, p3); }
  throwProjectile(ped: number, x: number, y: number, z: number): void { TaskThrowProjectile(ped, x, y, z); }
  swapWeapon(ped: number, p1: boolean): void { TaskSwapWeapon(ped, p1); }
  reloadWeapon(ped: number, unused: boolean): void { TaskReloadWeapon(ped, unused); }
  writhe(ped: number, target: number, time: number, p3: number): void { TaskWrithe(ped, target, time, p3); }
  addVehicleSubAttackCoord(ped: number, x: number, y: number, z: number): void { AddVehicleSubtaskAttackCoord(ped, x, y, z); }
  addVehicleSubAttackPed(ped: number, ped2: number): void { AddVehicleSubtaskAttackPed(ped, ped2); }
  vehicleShootAtPed(ped: number, target: number, p2: number): void { TaskVehicleShootAtPed(ped, target, p2); }
  vehicleAimAtPed(ped: number, target: number): void { TaskVehicleAimAtPed(ped, target); }
  vehicleShootAtCoord(ped: number, x: number, y: number, z: number, p4: number): void { TaskVehicleShootAtCoord(ped, x, y, z, p4); }
  vehicleAimAtCoord(ped: number, x: number, y: number, z: number): void { TaskVehicleAimAtCoord(ped, x, y, z); }
  goToCoordWhileAimingAtCoord(ped: number, x: number, y: number, z: number, aimAtX: number, aimAtY: number, aimAtZ: number, moveSpeed: number, p8: boolean, p9: number, p10: number, p11: boolean, flags: number, p13: boolean, firingPattern: number): void { TaskGoToCoordWhileAimingAtCoord(ped, x, y, z, aimAtX, aimAtY, aimAtZ, moveSpeed, p8, p9, p10, p11, flags, p13, firingPattern); }
  goToCoordWhileAimingAtEntity(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: boolean, p7: number, p8: number, p9: boolean, p10: number, p11: boolean, p12: number, p13: number): void { TaskGoToCoordWhileAimingAtEntity(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13); }
  goToCoordAndAimAtHatedEntitiesNearCoord(pedHandle: number, goToLocationX: number, goToLocationY: number, goToLocationZ: number, focusLocationX: number, focusLocationY: number, focusLocationZ: number, speed: number, shootAtEnemies: boolean, distanceToStopAt: number, noRoadsDistance: number, unkTrue: boolean, unkFlag: number, aimingFlag: number, firingPattern: number): void { TaskGoToCoordAndAimAtHatedEntitiesNearCoord(pedHandle, goToLocationX, goToLocationY, goToLocationZ, focusLocationX, focusLocationY, focusLocationZ, speed, shootAtEnemies, distanceToStopAt, noRoadsDistance, unkTrue, unkFlag, aimingFlag, firingPattern); }
  goToEntityWhileAimingAtCoord(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: boolean, p7: number, p8: number, p9: boolean, p10: boolean, p11: number): void { TaskGoToEntityWhileAimingAtCoord(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11); }
  goToEntityWhileAimingAtEntity(ped: number, entityToWalkTo: number, entityToAimAt: number, speed: number, shootatEntity: boolean, p5: number, p6: number, p7: boolean, p8: boolean, firingPattern: number): void { TaskGoToEntityWhileAimingAtEntity(ped, entityToWalkTo, entityToAimAt, speed, shootatEntity, p5, p6, p7, p8, firingPattern); }
  vehicleFollowWaypointRecording(ped: number, vehicle: number, WPRecording: string, p3: number, p4: number, p5: number, p6: number, p7: number, p8: boolean, p9: number): void { TaskVehicleFollowWaypointRecording(ped, vehicle, WPRecording, p3, p4, p5, p6, p7, p8, p9); }
  moveNetworkByName(ped: number, task: string, multiplier: number, p3: boolean, animDict: string, flags: number): void { TaskMoveNetworkByName(ped, task, multiplier, p3, animDict, flags); }
  moveNetworkAdvancedByName(ped: number, p1: string, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: boolean, animDict: string, flags: number): void { TaskMoveNetworkAdvancedByName(ped, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, animDict, flags); }
  setMoveNetworkSignalFloat2(ped: number, signalName: string, value: number): void { SetTaskMoveNetworkSignalFloatLerpRate(ped, signalName, value); }
  synchronizedScene(ped: number, scene: number, animDictionary: string, animationName: string, speed: number, speedMultiplier: number, duration: number, flag: number, playbackRate: number, p9: number): void { TaskSynchronizedScene(ped, scene, animDictionary, animationName, speed, speedMultiplier, duration, flag, playbackRate, p9); }
  arrestPed(ped: number, target: number): void { TaskArrestPed(ped, target); }
  taskScriptedAnimation(ped: number): { p1: number; p2: number; p3: number } { const r = TaskScriptedAnimation(ped, 0, 0); return Array.isArray(r) ? { p1: r[0], p2: r[1], p3: r[2] } : r; }
  scriptedAnimation(ped: number): { p1: number; p2: number; p3: number } { const r = TaskScriptedAnimation(ped, 0, 0); return Array.isArray(r) ? { p1: r[0], p2: r[1], p3: r[2] } : r; }
  playEntityScriptedAnim(p0: number): { p1: number; p2: number; p3: number } { const r = PlayEntityScriptedAnim(p0, 0, 0); return Array.isArray(r) ? { p1: r[0], p2: r[1], p3: r[2] } : r; }
  sweepAimEntity(ped: number, anim: string, p2: string, p3: string, p4: string, p5: number, vehicle: number, p7: number, p8: number): void { TaskSweepAimEntity(ped, anim, p2, p3, p4, p5, vehicle, p7, p8); }
  sweepAimPosition(p0: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number): { p1: number; p2: number; p3: number; p4: number } { const r = TaskSweepAimPosition(p0, p5, p6, p7, p8, p9, p10); return Array.isArray(r) ? { p1: r[0], p2: r[1], p3: r[2], p4: r[3] } : r; }
  getIsActive(ped: number, taskIndex: number): boolean { return GetIsTaskActive(ped, taskIndex); }
  getScriptStatus(ped: number, taskHash: number): number { return GetScriptTaskStatus(ped, taskHash); }
  isDrivebyUnderneathDrivingTask(ped: number): boolean { return IsDrivebyTaskUnderneathDrivingTask(ped); }
  isMountedWeaponUnderneathDrivingTask(ped: number): boolean { return IsMountedWeaponTaskUnderneathDrivingTask(ped); }
  moveNetworkByNameWithInitParams(ped: number, p1: string, p3: number, p4: boolean, animDict: string, flags: number): number { return TaskMoveNetworkByNameWithInitParams(ped, p1, p3, p4, animDict, flags); }
  rappelDownWall(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number, p9: number, p10: number): void { TaskRappelDownWallUsingClipsetOverride(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10); } // unverified
  clearVehicleS(vehicle: number): void { ClearVehicleCrashTask(vehicle); } // unverified
  agitatedAction(ped: number, ped2: number): void { TaskAgitatedActionConfrontResponse(ped, ped2); } // unverified
}
