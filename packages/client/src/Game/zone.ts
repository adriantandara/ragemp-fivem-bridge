import { createUnkProxy } from "./_helpers.js";

export class GameZoneNs {
  unk: any = createUnkProxy();

  getZoneAtCoords(x: number, y: number, z: number): number { return GetZoneAtCoords(x, y, z); }
  getZoneFromNameId(zoneName: string): number { return GetZoneFromNameId(zoneName); }
  getZonePopschedule(zoneId: number): number { return GetZonePopschedule(zoneId); }
  getNameOfZone(x: number, y: number, z: number): string { return GetNameOfZone(x, y, z); }
  setZoneEnabled(zoneId: number, toggle: boolean): void { SetZoneEnabled(zoneId, toggle); }
  getZoneScumminess(zoneId: number): number { return GetZoneScumminess(zoneId); }
  getAtCoords(x: number, y: number, z: number): number { return GetZoneAtCoords(x, y, z); }
  getFromNameId(zoneName: string): number { return GetZoneFromNameId(zoneName); }
  getPopschedule(zoneId: number): number { return GetZonePopschedule(zoneId); }
  getNameOf(x: number, y: number, z: number): string { return GetNameOfZone(x, y, z); }
  setEnabled(zoneId: number, toggle: boolean): void { SetZoneEnabled(zoneId, toggle); }
  getScumminess(zoneId: number): number { return GetZoneScumminess(zoneId); }
  overridePopscheduleVehicleModel(scheduleId: number, vehicleHash: number): void { OverridePopscheduleVehicleModel(scheduleId, vehicleHash); }
  clearPopscheduleOverrideVehicleModel(scheduleId: number): void { ClearPopscheduleOverrideVehicleModel(scheduleId); }
  getHashOfMapAreaAtCoords(x: number, y: number, z: number): number { return GetHashOfMapAreaAtCoords(x, y, z); }
}
