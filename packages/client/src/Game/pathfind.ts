import { createUnkProxy, toVec3 } from "./_helpers.js";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GamePathfindNs {
  unk = createUnkProxy();

  getRandomVehicleNode(x: number, y: number, z: number): { x: number; y: number; z: number; heading: number } | null {
    const [hit, coords, heading] = GetNthClosestVehicleNodeWithHeading(x, y, z, 0, 1, 3, 0);
    if (!hit || !coords) return null;
    return { x: coords[0], y: coords[1], z: coords[2], heading };
  }
  getClosestVehicleNode(x: number, y: number, z: number, nodeFlags: number): { x: number; y: number; z: number; heading: number } | null {
    const [hit, coords, heading] = GetClosestVehicleNodeWithHeading(x, y, z, nodeFlags ?? 1, 3.0, 0);
    if (!hit || !coords) return null;
    return { x: coords[0], y: coords[1], z: coords[2], heading };
  }
  getClosestRoad(x: number, y: number, z: number, minimumEdgeLength: number, minimumLaneCount: number, onlyMajorRoads: boolean): { roads: ({ x: number; y: number; z: number } | null)[]; headings: number[]; density: number } | null {
    const [hit, road1, road2, heading1, heading2, density] = GetClosestRoad(x, y, z, minimumEdgeLength ?? 0, minimumLaneCount ?? 1, onlyMajorRoads ?? false);
    if (!hit) return null;
    return {
      roads: [road1 ? { x: road1[0], y: road1[1], z: road1[2] } : null, road2 ? { x: road2[0], y: road2[1], z: road2[2] } : null],
      headings: [heading1, heading2],
      density,
    };
  }
  isPointOnRoad(x: number, y: number, z: number, entity: number): boolean { return IsPointOnRoad(x, y, z, entity ?? 0); }
  generateDirectionsToCoord(x: number, y: number, z: number, p3: boolean): void { GenerateDirectionsToCoord(x, y, z, p3); }
  getStreetNameAtCoord(x: number, y: number, z: number): { streetName: number; crossingRoad: number } {
    const [streetName, crossingRoad] = GetStreetNameAtCoord(x, y, z);
    return { streetName, crossingRoad };
  }

  setRoadsInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, nodeEnabled: boolean, unknown2: boolean): void { SetRoadsInArea(x1, y1, z1, x2, y2, z2, !!nodeEnabled, !!unknown2); }
  setRoadsInAngledArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, width: number, unknown1: boolean, unknown2: boolean, unknown3: boolean): void { SetRoadsInAngledArea(x1, y1, z1, x2, y2, z2, width, !!unknown1, !!unknown2, !!unknown3); }
  setPedPathsInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, unknown: boolean, p7: number): void { SetPedPathsInArea(x1, y1, z1, x2, y2, z2, !!unknown); }
  getSafeCoordForPed(x: number, y: number, z: number, onGround: boolean, flags: number): Vector3 { return toVec3((GetSafeCoordForPed as any)(x, y, z, !!onGround, flags)); } // NOTE: native returns [boolean,number[]] per typings
  getClosestMajorVehicleNode(x: number, y: number, z: number, unknown1: number, unknown2: number): Vector3 { return toVec3((GetClosestMajorVehicleNode as any)(x, y, z, unknown1, unknown2)); } // NOTE: native returns [boolean,number[]] per typings
  getNthClosestVehicleNode(x: number, y: number, z: number, nthClosest: number, unknown1: number, unknown2: number, unknown3: number): Vector3 { return toVec3((GetNthClosestVehicleNode as any)(x, y, z, nthClosest, unknown1, unknown2, unknown3)); } // NOTE: native returns [boolean,number[]] per typings
  getNthClosestVehicleNodeId(x: number, y: number, z: number, nth: number, nodetype: number, p5: number, p6: number): number { return GetNthClosestVehicleNodeId(x, y, z, nth, nodetype, p5, p6); }
  getClosestVehicleNodeWithHeading(x: number, y: number, z: number, nodeType: number, p6: number, p7: number): { outPosition: Vector3; outHeading: number; result: boolean } {
    const r = GetClosestVehicleNodeWithHeading(x, y, z, nodeType, p6, p7);
    return { outPosition: toVec3(r[1]), outHeading: r[2], result: !!r[0] };
  }
  getNthClosestVehicleNodeWithHeading(x: number, y: number, z: number, nthClosest: number, unknown2: number, unknown3: number, unknown4: number): { outPosition: Vector3; outHeading: number; unknown1: number; result: boolean } {
    const r = GetNthClosestVehicleNodeWithHeading(x, y, z, nthClosest, unknown2, unknown3, unknown4);
    return { outPosition: toVec3(r[1]), outHeading: r[2], unknown1: r[3], result: !!r[0] };
  }
  getNthClosestVehicleNodeIdWithHeading(x: number, y: number, z: number, nthClosest: number, p6: number, p7: number, p8: number): { outPosition: Vector3; outHeading: number; result: number } {
    const r = GetNthClosestVehicleNodeIdWithHeading(x, y, z, nthClosest, p6, p7, p8);
    return { outPosition: toVec3(r[1]), outHeading: r[2], result: r[0] };
  }
  getNthClosestVehicleNodeFavourDirection(x: number, y: number, z: number, desiredX: number, desiredY: number, desiredZ: number, nthClosest: number, nodetype: number, p10: number, p11: number): { outPosition: Vector3; outHeading: number; result: boolean } {
    const r = GetNthClosestVehicleNodeFavourDirection(x, y, z, desiredX, desiredY, desiredZ, nthClosest, nodetype, p10, p11);
    return { outPosition: toVec3(r[1]), outHeading: r[2], result: !!r[0] };
  }
  getVehicleNodeProperties(x: number, y: number, z: number): { density: number; flags: number; result: boolean } {
    const r = GetVehicleNodeProperties(x, y, z);
    return { density: r[1], flags: r[2], result: !!r[0] };
  }
  isVehicleNodeIdValid(vehicleNodeId: number): boolean { return IsVehicleNodeIdValid(vehicleNodeId); }
  getVehicleNodePosition(nodeId: number): Vector3 { return toVec3(GetVehicleNodePosition(nodeId)); }
  getVehicleNodeIsGpsAllowed(nodeID: number): boolean { return GetVehicleNodeIsGpsAllowed(nodeID); }
  getVehicleNodeIsSwitchedOff(nodeID: number): boolean { return GetVehicleNodeIsSwitchedOff(nodeID); }
  setAllPathsCacheBoundingstruct(toggle: boolean): void { SetAllPathsCacheBoundingstruct(!!toggle); } // unverified
  setAiGlobalPathNodesType(type: number): void { SetAiGlobalPathNodesType(type); } // unverified
  requestPathsPreferAccurateBoundingstruct(x1: number, y1: number, x2: number, y2: number): boolean { return RequestPathsPreferAccurateBoundingstruct(x1, y1, x2, y2); } // unverified
  setIgnoreSecondaryRouteNodes(toggle: boolean): void { SetIgnoreSecondaryRouteNodes(!!toggle); } // unverified
  getRoadSidePointWithHeading(x: number, y: number, z: number, heading: number): Vector3 { return toVec3((GetRoadSidePointWithHeading as any)(x, y, z, heading)); } // NOTE: native returns [boolean,number[]] per typings
  getPointOnRoadSide(x: number, y: number, z: number, p3: number): Vector3 { return toVec3((GetPointOnRoadSide as any)(x, y, z, p3)); } // NOTE: native returns [boolean,number[]] per typings
  isNavmeshRequiredRegionOwnedByAnyThread(): boolean { return IsNavmeshRequiredRegionOwnedByAnyThread(); } // unverified
  getHeightmapTopZForPosition(x: number, y: number): number { return GetHeightmapTopZForPosition(x, y); } // unverified
  getHeightmapTopZForArea(x1: number, y1: number, x2: number, y2: number): number { return GetHeightmapTopZForArea(x1, y1, x2, y2); } // unverified
  getHeightmapBottomZForPosition(x: number, y: number): number { return GetHeightmapBottomZForPosition(x, y); } // unverified
  getHeightmapBottomZForArea(x1: number, y1: number, x2: number, y2: number): number { return GetHeightmapBottomZForArea(x1, y1, x2, y2); } // unverified
  getSupportsGpsRouteFlag(nodeID: number): boolean { return GetSupportsGpsRouteFlag(nodeID); } // unverified
  getIsSlowRoadFlag(nodeID: number): boolean { return GetIsSlowRoadFlag(nodeID); } // unverified
  areNodesLoadedForArea(x1: number, y1: number, x2: number, y2: number): boolean { return AreNodesLoadedForArea(x1, y1, x2, y2); }
  setRoadsBackToOriginal(minx: number, miny: number, minz: number, maxx: number, maxy: number, maxz: number): void { SetRoadsBackToOriginal(minx, miny, minz, maxx, maxy, maxz); }
  setRoadsBackToOriginalInAngledArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, width: number): void { SetRoadsBackToOriginalInAngledArea(x1, y1, z1, x2, y2, z2, width); }
  setAmbientPedRangeMultiplierThisFrame(multiplier: number): void { SetAmbientPedRangeMultiplierThisFrame(multiplier); }
  setPedPathsBackToOriginal(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number): void { SetPedPathsBackToOriginal(p0, p1, p2, p3, p4, p5); }
  setIgnoreNoGpsFlag(toggle: boolean): void { SetIgnoreNoGpsFlag(!!toggle); }
  setGpsDisabledZone(x1: number, y1: number, z1: number, x2: number, y2: number, z3: number): void { SetGpsDisabledZone(x1, y1, z1, x2, y2, z3); }
  getGpsBlipRouteLength(): number { return GetGpsBlipRouteLength(); }
  getGpsBlipRouteFound(): boolean { return GetGpsBlipRouteFound(); }
  getNextGpsDisabledZoneIndex(index: number): number { return GetNextGpsDisabledZoneIndex(index); }
  setGpsDisabledZoneAtIndex(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, index: number): void { SetGpsDisabledZoneAtIndex(x1, y1, z1, x2, y2, z2, index); }
  clearGpsDisabledZoneAtIndex(index: number): void { ClearGpsDisabledZoneAtIndex(index); }
  addNavmeshRequiredRegion(x: number, y: number, radius: number): void { AddNavmeshRequiredRegion(x, y, radius); }
  removeNavmeshRequiredRegions(): void { RemoveNavmeshRequiredRegions(); }
  disableNavmeshInArea(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number): void { (DisableNavmeshInArea as any)(p0, p1, p2, p3, p4, p5, p6); }
  areAllNavmeshRegionsLoaded(): boolean { return AreAllNavmeshRegionsLoaded(); }
  isNavmeshLoadedInArea(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): boolean { return IsNavmeshLoadedInArea(x1, y1, z1, x2, y2, z2); }
  addNavmeshBlockingObject(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: boolean, p8: number): number { return AddNavmeshBlockingObject(p0, p1, p2, p3, p4, p5, p6, !!p7, p8); }
  updateNavmeshBlockingObject(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number, p8: number): void { UpdateNavmeshBlockingObject(p0, p1, p2, p3, p4, p5, p6, p7, p8); }
  removeNavmeshBlockingObject(p0: number): void { RemoveNavmeshBlockingObject(p0); }
  doesNavmeshBlockingObjectExist(p0: number): boolean { return DoesNavmeshBlockingObjectExist(p0); }
  calculateTravelDistanceBetweenPoints(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number { return CalculateTravelDistanceBetweenPoints(x1, y1, z1, x2, y2, z2); }
}
