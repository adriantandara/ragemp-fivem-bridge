import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolAdd } from "@ragemp-fivem-bridge/shared/internal";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { setupColshapePool } from "../internal/pools/colshapePoolService";

let colshapeIdCounter = 1;

export class ColshapeMpPool extends Pool {
  constructor() {
    super();
    setupColshapePool(this);
  }

  _broadcast(event: string, ...args: any[]): void {
    if (typeof emitNet === "function") emitNet(event, -1, ...args);
  }

  _onColshapeChanged(colshape: ColshapeMp): void {
    this._broadcast("ragemp:colshapeUpdate", colshape.id, colshape.toData());
  }

  _create(shapeType: string, position: Vector3, params: Record<string, any>, dimension: number = 0): ColshapeMp {
    const id = colshapeIdCounter++;
    const colshape = new ColshapeMp(id, shapeType, position, params, dimension);
    poolAdd(this, colshape as any);
    this._broadcast("ragemp:colshapeCreate", colshape.toData());
    return colshape;
  }

  newSphere(x: number | any, y: number, z?: number, range?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return this._create("sphere", new Vector3(x.x, x.y, x.z), { radius: y }, z ?? 0);
    }
    return this._create("sphere", new Vector3(x, y, z!), { radius: range! }, dimension);
  }

  newTube(x: number | any, y: number, z?: number, height?: number, range?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return this._create("tube", new Vector3(x.x, x.y, x.z), { radius: y, height: z }, height ?? 0);
    }
    return this._create("tube", new Vector3(x, y, z!), { radius: range!, height: height! }, dimension);
  }

  newCircle(x: number, y: number, range: number, dimension: number = 0): ColshapeMp {
    return this._create("circle", new Vector3(x, y, 0), { radius: range }, dimension);
  }

  newRectangle(x: number, y: number, width: number, height: number, dimension: number = 0): ColshapeMp {
    return this._create("rectangle", new Vector3(x, y, 0), { width, height }, dimension);
  }

  newCuboid(x: number | any, y: number, z?: number, width?: number, depth?: number, height?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return this._create("cuboid", new Vector3(x.x, x.y, x.z), { width: y, depth: z, height: width }, depth ?? 0);
    }
    return this._create("cuboid", new Vector3(x, y, z!), { width: width!, depth: depth!, height: height! }, dimension);
  }
}
