import { createUnkProxy } from "./_helpers.js";

export class GamePathfindNs {
  unk = createUnkProxy();

  getRandomVehicleNode(x, y, z) {
    const [hit, coords, heading] = GetNthClosestVehicleNodeWithHeading(x, y, z, 0, 1, 3, 0);
    if (!hit || !coords) return null;
    return { x: coords[0], y: coords[1], z: coords[2], heading };
  }
  getClosestVehicleNode(x, y, z, nodeFlags) {
    const [hit, coords, heading] = GetClosestVehicleNodeWithHeading(x, y, z, nodeFlags ?? 1, 3.0, 0);
    if (!hit || !coords) return null;
    return { x: coords[0], y: coords[1], z: coords[2], heading };
  }
  getClosestRoad(x, y, z, minimumEdgeLength, minimumLaneCount, onlyMajorRoads) {
    const [hit, road1, road2, heading1, heading2, density] = GetClosestRoad(x, y, z, minimumEdgeLength ?? 0, minimumLaneCount ?? 1, onlyMajorRoads ?? false);
    if (!hit) return null;
    return {
      roads: [road1 ? { x: road1[0], y: road1[1], z: road1[2] } : null, road2 ? { x: road2[0], y: road2[1], z: road2[2] } : null],
      headings: [heading1, heading2],
      density,
    };
  }
  isPointOnRoad(x, y, z, entity) { return IsPointOnRoad(x, y, z, entity ?? 0); }
  generateDirectionsToCoord(x, y, z) { GenerateDirectionsToCoord(x, y, z); }
  getStreetNameAtCoord(x, y, z) {
    const [streetName, crossingRoad] = GetStreetNameAtCoord(x, y, z);
    return { streetName, crossingRoad };
  }
}
