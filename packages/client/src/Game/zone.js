import { createUnkProxy } from "./_helpers.js";

export class GameZoneNs {
  unk = createUnkProxy();

  getNameOfZone(x, y, z) { return GetNameOfZone(x, y, z); }
  getZoneAtCoords(x, y, z) { return GetZoneAtCoords(x, y, z); }
  getZoneIndex(zoneName) { return GetZoneIndex(zoneName); }
  getZonePopType(zoneIndex) { return GetZonePopType(zoneIndex); }
  setZonePopType(zoneIndex, popType) { SetZonePopType(zoneIndex, popType); }
  setZoneDensityMultiplierForPeds(zoneIndex, multiplier) { SetZoneDensityMultiplierForPeds(zoneIndex, multiplier); }
}
