import { createUnkProxy } from "./_helpers.js";

export class GameTaskNs {
  unk = createUnkProxy();

  goStraightToCoord(ped, x, y, z, speed, timeout) {
    TaskGoStraightToCoord(ped, x, y, z, speed ?? 1.0, timeout ?? -1, 0, 0);
  }
  goToCoordAnyMeans(ped, x, y, z, speed, p5, p6, walkingStyle) {
    TaskGoToCoordAnyMeans(ped, x, y, z, speed ?? 1.0, 0, walkingStyle ?? 0);
  }
  followNavMeshToCoord(ped, x, y, z, speed, p5, p6, p7, p8) {
    TaskFollowNavMeshToCoord(ped, x, y, z, speed ?? 1.0, p5 ?? -1, p6 ?? 0.1, p7 ?? 0, p8 ?? 0);
  }
  vehicleDriveToCoord(ped, vehicle, x, y, z, speed, p6, vehicleModel, drivingStyle, stopRange, p10) {
    TaskVehicleDriveToCoord(ped, vehicle, x, y, z, speed ?? 10.0, p6 ?? 0, vehicleModel ?? 0, drivingStyle ?? 786603, stopRange ?? 4.0, p10 ?? -1);
  }
  vehicleDriveToCoordLongrange(ped, vehicle, x, y, z, speed, drivingStyle, stopRange) {
    TaskVehicleDriveToCoordLongrange(ped, vehicle, x, y, z, speed ?? 10.0, drivingStyle ?? 786603, stopRange ?? 4.0);
  }
  vehicleDriveWander(ped, vehicle, speed, drivingStyle) {
    TaskVehicleDriveWander(ped, vehicle, speed ?? 10.0, drivingStyle ?? 786603);
  }
  vehicleChase(ped, targetPed) { TaskVehicleChase(ped, targetPed); }
  vehicleFollow(ped, vehicle, targetVehicle, speed, drivingStyle, maxDistance) {
    TaskVehicleFollow(ped, vehicle, targetVehicle, speed ?? 10.0, drivingStyle ?? 786603, maxDistance ?? 10);
  }

  playAnim(ped, animDict, animName, speed, speedMultiplier, duration, flag, playbackRate, lockX, lockY, lockZ) {
    TaskPlayAnim(ped, animDict, animName, speed ?? 8.0, speedMultiplier ?? -8.0, duration ?? -1, flag ?? 0, playbackRate ?? 0, lockX ?? false, lockY ?? false, lockZ ?? false);
  }
  playAnimAdvanced(ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed, speedMultiplier, duration, flag, playbackRate, p14, p15) {
    TaskPlayAnimAdvanced(ped, animDict, animName, posX, posY, posZ, rotX, rotY, rotZ, speed ?? 8.0, speedMultiplier ?? -8.0, duration ?? -1, flag ?? 0, playbackRate ?? 0, p14 ?? 0, p15 ?? 0);
  }
  stopAnim(ped) { ClearPedTasks(ped); }

  aimGunAtCoord(ped, x, y, z, duration, p5, p6) {
    TaskAimGunAtCoord(ped, x, y, z, duration ?? -1, p5 ?? false, p6 ?? false);
  }
  aimGunAtEntity(ped, entity, duration, p4, p5) {
    TaskAimGunAtEntity(ped, entity, duration ?? -1, p4 ?? false);
  }
  shootAtCoord(ped, x, y, z, duration, weaponHash) {
    TaskShootAtCoord(ped, x, y, z, duration ?? -1, weaponHash);
  }
  shootAtEntity(ped, entity, duration, weaponHash) {
    TaskShootAtEntity(ped, entity, duration ?? -1, weaponHash);
  }
  combatPed(ped, targetPed, combatType, p4) {
    TaskCombatPed(ped, targetPed, combatType ?? 0, p4 ?? 16);
  }
  combatHatedTargetsInArea(ped, x, y, z, radius, p5) {
    TaskCombatHatedTargetsInArea(ped, x, y, z, radius, p5 ?? 0);
  }
  combatHatedTargetsAroundPed(ped, radius, p2) {
    TaskCombatHatedTargetsAroundPed(ped, radius, p2 ?? 0);
  }
  fleeFromEntity(ped, fleeTarget, duration, distanceToFleeAt) {
    TaskSmartFleeEntity(ped, fleeTarget, duration ?? -1, distanceToFleeAt ?? 0, false, false);
  }

  enterVehicle(ped, vehicle, timeout, seatIndex, speed, flag, p6) {
    TaskEnterVehicle(ped, vehicle, timeout ?? -1, seatIndex ?? -1, speed ?? 1.0, flag ?? 1, p6 ?? 0);
  }
  leaveVehicle(ped, vehicle, flags) { TaskLeaveVehicle(ped, vehicle, flags ?? 0); }
  openVehicleDoor(ped, vehicle, timeOut, doorIndex, speed) {
    TaskOpenVehicleDoor(ped, vehicle, timeOut ?? 1000, doorIndex, speed ?? 1.0);
  }
  vehicleGotoNavmesh(ped, vehicle, x, y, z, speed, behaviour, stopRange) {
    TaskVehicleGotoNavmesh(ped, vehicle, x, y, z, speed ?? 10.0, behaviour ?? 786603, stopRange ?? 4.0);
  }
  driveBy(ped, targetPed, targetVehicle, x, y, z, distanceToLeadVehicle, speed, drivingStyle, weaponHash) {
    TaskDriveBy(ped, targetPed ?? 0, targetVehicle ?? 0, x ?? 0, y ?? 0, z ?? 0, distanceToLeadVehicle ?? 0, speed ?? 10.0, drivingStyle ?? 786603, true, weaponHash ?? 0);
  }

  startScenarioInPlace(ped, scenario, p2, p3) {
    TaskStartScenarioInPlace(ped, scenario, p2 ?? 0, p3 ?? true);
  }
  startScenarioAtPosition(ped, scenario, x, y, z, heading, duration, isStanding, canWarpIntoScenario) {
    TaskStartScenarioAtPosition(ped, scenario, x, y, z, heading ?? 0, duration ?? -1, isStanding ?? true, canWarpIntoScenario ?? true);
  }
  useNearestScenarioToCoord(ped, x, y, z, radius, p5) {
    TaskUseNearestScenarioToCoord(ped, x, y, z, radius, p5 ?? -1);
  }
  wanderInArea(ped, x, y, z, radius, p5, p6) {
    TaskWanderInArea(ped, x, y, z, radius, p5 ?? 1, p6 ?? 10);
  }
  wanderStandard(ped, heading, radius) { TaskWanderStandard(ped, heading ?? 0, radius ?? 0); }
  patrol(ped, p1, p2) { TaskPatrol(ped, p1 ?? 0, p2 ?? 0, true, false); }

  seekCoverFromPos(ped, x, y, z, p4, p5) { TaskSeekCoverFromPos(ped, x, y, z, p4 ?? -1, p5 ?? true); }
  guardCurrentPosition(ped, x, y, z, p4) { TaskGuardCurrentPosition(ped, x ?? 0, y ?? 0, p4 ?? true); }
  stayInCover(ped) { TaskStayInCover(ped); }

  followWaypointRecording(ped, recording, clipSet, speed, p4) {
    TaskFollowWaypointRecording(ped, recording, p4 ?? 0, clipSet ?? "", speed ?? 1.0);
  }

  clearImmediately(ped) { ClearPedTasksImmediately(ped); }
  clearAll(ped) { ClearPedTasks(ped); }
  clearSecondary(ped) { ClearPedSecondaryTask(ped); }
  pause(ped, time) { TaskPause(ped, time ?? 0); }
  handsUp(ped, time, target, p3, anyMeansFlag) {
    TaskHandsUp(ped, time ?? -1, target ?? 0, p3 ?? -1, anyMeansFlag ?? false);
  }
  lookAtEntity(ped, entity, duration, boneIndex, priority) {
    TaskLookAtEntity(ped, entity, duration ?? -1, boneIndex ?? 0, priority ?? 2);
  }
  clearLookAt(ped) { TaskClearLookAtEntity(ped); }
}
