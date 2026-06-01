import { createUnkProxy, toVec3 } from "./_helpers.js";
import { testPointToPoint, testCapsule } from "../utils/raycast";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GameShapetestNs {
  unk = createUnkProxy();



  startShapeTestLosProbe(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, flags: number, entity: number, p8: number): number { return StartShapeTestLosProbe(x1, y1, z1, x2, y2, z2, flags, entity, p8); }
  startExpensiveSynchronousShapeTestLosProbe(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, flags: number, entity: number, p8: number): number { return StartExpensiveSynchronousShapeTestLosProbe(x1, y1, z1, x2, y2, z2, flags, entity, p8); }
  startShapeTestBoundingBox(entity: number, flags1: number, flags2: number): number { return StartShapeTestBoundingBox(entity, flags1, flags2); }
  startShapeTestBox(x: number, y: number, z: number, x1: number, y2: number, z2: number, rotX: number, rotY: number, rotZ: number, p9: number, flags: number, entity: number, p12: number): number { return StartShapeTestBox(x, y, z, x1, y2, z2, rotX, rotY, rotZ, p9, flags, entity, p12); }
  startShapeTestBound(entity: number, flags1: number, flags2: number): number { return StartShapeTestBound(entity, flags1, flags2); }
  startShapeTestCapsule(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, radius: number, flags: number, entity: number, p9: number): number { return StartShapeTestCapsule(x1, y1, z1, x2, y2, z2, radius, flags, entity, p9); }
  startShapeTestSweptSphere(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, radius: number, flags: number, entity: number, p9: number): number { return StartShapeTestSweptSphere(x1, y1, z1, x2, y2, z2, radius, flags, entity, p9); }
  startShapeTestSurroundingCoords(flag: number, entity: number, flag2: number): { pVec1: Vector3; pVec2: Vector3; result: number } {
    const r = StartShapeTestMouseCursorLosProbe(flag, entity, flag2);
    return { pVec1: toVec3(r[1]), pVec2: toVec3(r[2]), result: r[0] };
  }
  getShapeTestResult(shapeTestHandle: number): { hit: boolean; endCoords: Vector3 | null; surfaceNormal: Vector3 | null; entityHit: number } {
    const [, hit, endCoords, surfaceNormal, entityHit] = GetShapeTestResult(shapeTestHandle);
    return { hit: !!hit, endCoords: endCoords ? toVec3(endCoords) : null, surfaceNormal: surfaceNormal ? toVec3(surfaceNormal) : null, entityHit };
  }
  getShapeTestResultIncludingMaterial(shapeTestHandle: number): { hit: boolean; endCoords: Vector3 | null; surfaceNormal: Vector3 | null; materialHash: number; entityHit: number } {
    const [, hit, endCoords, surfaceNormal, materialHash, entityHit] = GetShapeTestResultIncludingMaterial(shapeTestHandle);
    return { hit: !!hit, endCoords: endCoords ? toVec3(endCoords) : null, surfaceNormal: surfaceNormal ? toVec3(surfaceNormal) : null, materialHash, entityHit };
  }
  releaseScriptGuidFromEntity(entityHit: number): void { ReleaseScriptGuidFromEntity(entityHit); }
  waitForCompletionAsync(raycastHandle: number, timeout: number = 1000): Promise<boolean> {
    return new Promise((resolve) => {
      const start = Date.now();
      const poll = () => {
        const [state] = GetShapeTestResult(raycastHandle);
        if (state !== 1 || Date.now() - start >= timeout) { resolve(state === 2); return; }
        setTimeout(poll, 0);
      };
      poll();
    });
  }
}
