import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { onWorldScan } from "../utils/worldScan";
import { isVisibleHere } from "../utils/dimension";

const LOCAL_ID_BASE = 1000000000;

export class ColshapeMpPool extends Pool {
  _inside: Set<number> = new Set();
  _nextLocalId: number = LOCAL_ID_BASE + 1;
  _warned: boolean = false;
  _entities!: Map<number, ColshapeMp>;
  _add!: (entity: ColshapeMp) => void;
  at!: (id: number) => ColshapeMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: ColshapeMp) => void) => void;
  toArray!: () => ColshapeMp[];

  constructor() {
    super();
    this._setupServerSync();
    this._startChecking();
  }

  atRemoteId(remoteId: number): ColshapeMp | null {
    return this.at(remoteId);
  }

  _createFromData(data: any): ColshapeMp {
    const position = new Vector3(data.position.x, data.position.y, data.position.z);
    const colshape = new ColshapeMp(data.id, data.shapeType, position, data.params, data.dimension ?? 0);
    colshape._origin = "server";
    this._add(colshape);
    return colshape;
  }

  _setupServerSync(): void {
    onNet("ragemp:colshapeCreate", (data: any) => {
      if (data && !this.exists(data.id)) this._createFromData(data);
    });

    onNet("ragemp:colshapeSyncAll", (shapes: any[]) => {
      if (!Array.isArray(shapes)) return;
      for (const data of shapes) {
        if (data && !this.exists(data.id)) this._createFromData(data);
      }
    });

    onNet("ragemp:colshapeUpdate", (id: number, data: any) => {
      const existing = this.at(id);
      if (!existing) {
        if (data) this._createFromData(data);
        return;
      }
      existing._position = new Vector3(data.position.x, data.position.y, data.position.z);
      existing._params = data.params ?? {};
      existing._dimension = data.dimension ?? 0;
    });

    onNet("ragemp:colshapeDestroy", (id: number) => {
      if (this.exists(id)) this._remove(id);
    });
  }

  _startChecking(): void {
    onWorldScan(() => this._scan());
  }

  _scan(): void {
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
      let inside: boolean;
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

  _report(colshape: ColshapeMp, local: any, entering: boolean): void {
    if (colshape._origin === "server") {
      emitNet(entering ? "ragemp:colshape:enter" : "ragemp:colshape:exit", colshape.id);
      return;
    }
    try {
      globalThis.mp.events._fire(
        entering ? "playerEnterColshape" : "playerExitColshape",
        colshape
      );
    } catch (e) {
      console.error(`[bridge:colshape] handler error (${entering ? "enter" : "exit"} #${colshape.id}):`, e);
    }
  }

  _createLocal(shapeType: string, position: Vector3, params: Record<string, any>, dimension: number = 0): ColshapeMp {
    const id = this._nextLocalId++;
    const colshape = new ColshapeMp(id, shapeType, position, params, dimension);
    colshape._origin = "local";
    this._add(colshape);
    return colshape;
  }

  newSphere(x: number | { x: number; y: number; z: number }, y: number, z: number, range?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return this._createLocal("sphere", new Vector3(x.x, x.y, x.z), { radius: y }, z ?? 0);
    }
    return this._createLocal("sphere", new Vector3(x, y, z), { radius: range }, dimension);
  }

  newTube(x: number | { x: number; y: number; z: number }, y: number, z: number, height: number, range?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return this._createLocal("tube", new Vector3(x.x, x.y, x.z), { radius: y, height: z }, height ?? 0);
    }
    return this._createLocal("tube", new Vector3(x, y, z), { radius: range, height }, dimension);
  }

  newCircle(x: number, y: number, range: number, dimension: number = 0): ColshapeMp {
    return this._createLocal("circle", new Vector3(x, y, 0), { radius: range }, dimension);
  }

  newRectangle(x: number, y: number, width: number, height: number, dimension: number = 0): ColshapeMp {
    return this._createLocal("rectangle", new Vector3(x, y, 0), { width, height }, dimension);
  }

  newCuboid(x: number | { x: number; y: number; z: number }, y: number, z: number, width: number, depth: number, height?: number, dimension: number = 0): ColshapeMp {
    if (x !== null && typeof x === "object") {
      return this._createLocal("cuboid", new Vector3(x.x, x.y, x.z), { width: y, depth: z, height: width }, depth ?? 0);
    }
    return this._createLocal("cuboid", new Vector3(x, y, z), { width, depth, height }, dimension);
  }

  _remove(id: number): void {
    this._inside.delete(id);
    super._remove(id);
  }
}