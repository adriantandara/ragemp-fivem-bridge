import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { onWorldScan } from "../utils/worldScan";

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
        const isInside = colshape.isPointWithin(localPos);
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

  _createLocal(shapeType, position, params) {
    const id = ++localColshapeIdCounter;
    const colshape = new ColshapeMp(id, shapeType, position, params);
    colshape._origin = "local";
    this._add(colshape);
    return colshape;
  }

  newSphere(position, radius) {
    return this._createLocal("sphere", position, { radius });
  }

  newTube(position, radius, height) {
    return this._createLocal("tube", position, { radius, height });
  }

  newCircle(x, y, radius) {
    return this._createLocal("circle", new Vector3(x, y, 0), { radius });
  }

  newRectangle(x, y, width, height) {
    return this._createLocal("rectangle", new Vector3(x, y, 0), { width, height });
  }

  newCuboid(position, width, depth, height) {
    return this._createLocal("cuboid", position, { width, depth, height });
  }

  _remove(id) {
    this._insideSet.delete(id);
    super._remove(id);
  }
}
