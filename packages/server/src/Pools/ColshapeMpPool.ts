import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { setupColshapePool, createColshape } from "../internal/pools/colshapePoolService";

export class ColshapeMpPool extends Pool<ColshapeMp> {
  constructor() {
    super();
    setupColshapePool(this);
  }

  newSphere(x: number | any, y: number, z?: number, range?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return createColshape(this, "sphere", new Vector3(x.x, x.y, x.z), { radius: y }, z ?? 0);
    }
    return createColshape(this, "sphere", new Vector3(x, y, z!), { radius: range! }, dimension);
  }

  newTube(x: number | any, y: number, z?: number, height?: number, range?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return createColshape(this, "tube", new Vector3(x.x, x.y, x.z), { radius: y, height: z }, height ?? 0);
    }
    return createColshape(this, "tube", new Vector3(x, y, z!), { radius: range!, height: height! }, dimension);
  }

  newCircle(x: number, y: number, range: number, dimension: number = 0): ColshapeMp {
    return createColshape(this, "circle", new Vector3(x, y, 0), { radius: range }, dimension);
  }

  newRectangle(x: number, y: number, width: number, height: number, dimension: number = 0): ColshapeMp {
    return createColshape(this, "rectangle", new Vector3(x, y, 0), { width, height }, dimension);
  }

  newCuboid(x: number | any, y: number, z?: number, width?: number, depth?: number, height?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return createColshape(this, "cuboid", new Vector3(x.x, x.y, x.z), { width: y, depth: z, height: width }, depth ?? 0);
    }
    return createColshape(this, "cuboid", new Vector3(x, y, z!), { width: width!, depth: depth!, height: height! }, dimension);
  }
}
