import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { onWorldScan } from "../utils/worldScan";
import { isVisibleHere } from "../utils/dimension";

let localColshapeIdCounter = 100000;

export class ColshapeMpPool extends Pool {
  _insideSet = new Set();

  constructor() {
    super();
    this._setupServerSync();
    this._startChecking();
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _createFromData(data) {
    const position = new Vector3(data.position.x, data.position.y, data.position.z);
    const colshape = new ColshapeMp(data.id, data.shapeType, position, data.params);
    colshape._origin = "server";
    colshape._dimension = data.dimension ?? 0;
    this._add(colshape);
    return colshape;
  }

  _setupServerSync() {
    onNet("ragemp:colshapeCreate", (data) => {
      if (!this.exists(data.id)) this._createFromData(data);
    });

    onNet("ragemp:colshapeSyncAll", (shapes) => {
      for (const data of shapes) {
        if (!this.exists(data.id)) this._createFromData(data);
      }
    });

    onNet("ragemp:colshapeUpdate", (id, data) => {
      const existing = this.at(id);
      if (!existing) {
        this._createFromData(data);
        return;
      }
      existing._position = new Vector3(data.position.x, data.position.y, data.position.z);
      existing._params = data.params;
      existing._dimension = data.dimension ?? 0;
    });

    onNet("ragemp:colshapeDestroy", (id) => {
      if (this.exists(id)) this._remove(id);
    });
  }

  _startChecking() {
    onWorldScan(() => {
      const mp = globalThis.mp;
      if (!mp || !mp.players || !mp.players.local) return;

      const localPos = mp.players.local.position;

      for (const colshape of this) {
        const isInside = isVisibleHere(colshape._dimension) && colshape.isPointWithin(localPos);
        const wasInside = this._insideSet.has(colshape.id);

        if (isInside && !wasInside) {
          this._insideSet.add(colshape.id);
          if (colshape._origin === "server") {
            emitNet("ragemp:colshape:enter", colshape.id);
          } else {
            mp.events._fire("playerEnterColshape", mp.players.local, colshape);
          }
        } else if (!isInside && wasInside) {
          this._insideSet.delete(colshape.id);
          if (colshape._origin === "server") {
            emitNet("ragemp:colshape:exit", colshape.id);
          } else {
            mp.events._fire("playerExitColshape", mp.players.local, colshape);
          }
        }
      }
    });
  }

  _createLocal(shapeType, position, params, dimension = 0) {
    const id = ++localColshapeIdCounter;
    const colshape = new ColshapeMp(id, shapeType, position, params);
    colshape._origin = "local";
    if (dimension) colshape._dimension = dimension;
    this._add(colshape);
    return colshape;
  }

  newSphere(x, y, z, range, dimension = 0) {
    if (x !== null && typeof x === "object") {
      return this._createLocal("sphere", new Vector3(x.x, x.y, x.z), { radius: y }, z ?? 0);
    }
    return this._createLocal("sphere", new Vector3(x, y, z), { radius: range }, dimension);
  }

  newTube(x, y, z, height, range, dimension = 0) {
    if (x !== null && typeof x === "object") {
      return this._createLocal("tube", new Vector3(x.x, x.y, x.z), { radius: y, height: z }, 0);
    }
    return this._createLocal("tube", new Vector3(x, y, z), { radius: range, height }, dimension);
  }

  newCircle(x, y, range, dimension = 0) {
    return this._createLocal("circle", new Vector3(x, y, 0), { radius: range }, dimension);
  }

  newRectangle(x, y, width, height, dimension = 0) {
    return this._createLocal("rectangle", new Vector3(x, y, 0), { width, height }, dimension);
  }

  newCuboid(x, y, z, width, depth, height, dimension = 0) {
    if (x !== null && typeof x === "object") {
      return this._createLocal("cuboid", new Vector3(x.x, x.y, x.z), { width: y, depth: z, height: width }, 0);
    }
    return this._createLocal("cuboid", new Vector3(x, y, z), { width, depth, height }, dimension);
  }

  _remove(id) {
    this._insideSet.delete(id);
    super._remove(id);
  }
}
