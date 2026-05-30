import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { onWorldScan } from "../utils/worldScan";
import { isVisibleHere } from "../utils/dimension";

const LOCAL_ID_BASE = 1000000000;

export class ColshapeMpPool extends Pool {
  _inside = new Set();
  _nextLocalId = LOCAL_ID_BASE + 1;
  _warned = false;

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
    const colshape = new ColshapeMp(data.id, data.shapeType, position, data.params, data.dimension ?? 0);
    colshape._origin = "server";
    this._add(colshape);
    return colshape;
  }

  _setupServerSync() {
    onNet("ragemp:colshapeCreate", (data) => {
      if (data && !this.exists(data.id)) this._createFromData(data);
    });

    onNet("ragemp:colshapeSyncAll", (shapes) => {
      if (!Array.isArray(shapes)) return;
      for (const data of shapes) {
        if (data && !this.exists(data.id)) this._createFromData(data);
      }
    });

    onNet("ragemp:colshapeUpdate", (id, data) => {
      const existing = this.at(id);
      if (!existing) {
        if (data) this._createFromData(data);
        return;
      }
      existing._position = new Vector3(data.position.x, data.position.y, data.position.z);
      existing._params = data.params ?? {};
      existing._dimension = data.dimension ?? 0;
    });

    onNet("ragemp:colshapeDestroy", (id) => {
      if (this.exists(id)) this._remove(id);
    });
  }

  _startChecking() {
    onWorldScan(() => this._scan());
  }

  _scan() {
    const mp = globalThis.mp;
    const local = mp?.players?.local;
    if (!local) return;

    let localPos;
    try {
      localPos = local.position;
    } catch (e) {
      return;
    }
    if (!localPos) return;

    for (const colshape of this.toArray()) {
      let inside;
      try {
        inside = isVisibleHere(colshape._dimension) && colshape.isPointWithin(localPos);
      } catch (e) {
        if (!this._warned) {
          this._warned = true;
          console.error(`[bridge:colshape] check failed for #${colshape?.id} (${colshape?._shapeType}):`, e);
        }
        continue;
      }

      const wasInside = this._inside.has(colshape.id);
      if (inside === wasInside) continue;

      if (inside) {
        this._inside.add(colshape.id);
        this._report(colshape, local, true);
      } else {
        this._inside.delete(colshape.id);
        this._report(colshape, local, false);
      }
    }
  }

  _report(colshape, local, entering) {
    if (colshape._origin === "server") {
      emitNet(entering ? "ragemp:colshape:enter" : "ragemp:colshape:exit", colshape.id);
      return;
    }
    try {
      globalThis.mp.events._fire(
        entering ? "playerEnterColshape" : "playerExitColshape",
        local,
        colshape
      );
    } catch (e) {
      console.error(`[bridge:colshape] handler error (${entering ? "enter" : "exit"} #${colshape.id}):`, e);
    }
  }

  _createLocal(shapeType, position, params, dimension = 0) {
    const id = this._nextLocalId++;
    const colshape = new ColshapeMp(id, shapeType, position, params, dimension);
    colshape._origin = "local";
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
      return this._createLocal("tube", new Vector3(x.x, x.y, x.z), { radius: y, height: z }, height ?? 0);
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
      return this._createLocal("cuboid", new Vector3(x.x, x.y, x.z), { width: y, depth: z, height: width }, depth ?? 0);
    }
    return this._createLocal("cuboid", new Vector3(x, y, z), { width, depth, height }, dimension);
  }

  _remove(id) {
    this._inside.delete(id);
    super._remove(id);
  }
}
