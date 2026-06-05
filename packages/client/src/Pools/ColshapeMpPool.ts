import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { setupColshapePool, createLocalColshape } from "../internal/pools/colshapePoolService";

export class ColshapeMpPool extends Pool<ColshapeMp> {
  constructor() {
    super();
    setupColshapePool(this);
  }

  newSphere(x: number | { x: number; y: number; z: number }, y: number, z: number, range?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return createLocalColshape(this, "sphere", new Vector3(x.x, x.y, x.z), { radius: y }, z ?? 0);
    }
    return createLocalColshape(this, "sphere", new Vector3(x, y, z), { radius: range }, dimension);
  }

  newTube(x: number | { x: number; y: number; z: number }, y: number, z: number, height: number, range?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return createLocalColshape(this, "tube", new Vector3(x.x, x.y, x.z), { radius: y, height: z }, height ?? 0);
    }
    return createLocalColshape(this, "tube", new Vector3(x, y, z), { radius: range, height }, dimension);
  }

  newCircle(x: number, y: number, range: number, dimension: number = 0): ColshapeMp {
    return createLocalColshape(this, "circle", new Vector3(x, y, 0), { radius: range }, dimension);
  }

  newRectangle(x: number, y: number, width: number, height: number, dimension: number = 0): ColshapeMp {
    return createLocalColshape(this, "rectangle", new Vector3(x, y, 0), { width, height }, dimension);
  }

  newCuboid(x: number | { x: number; y: number; z: number }, y: number, z: number, width: number, depth: number, height?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return createLocalColshape(this, "cuboid", new Vector3(x.x, x.y, x.z), { width: y, depth: z, height: width }, depth ?? 0);
    }
    return createLocalColshape(this, "cuboid", new Vector3(x, y, z), { width, depth, height }, dimension);
  }
}
