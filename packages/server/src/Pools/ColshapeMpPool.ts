import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { dimensionsMatch } from "@ragemp-fivem-bridge/shared";

const ENTER_VALIDATION_MARGIN = 5.0;

export class ColshapeMpPool extends Pool {
  _inside: Map<number, Set<number>> = new Map();
  _nextId: number = 1;

  constructor() {
    super();
    this._setupSync();
  }

  _setupSync(): void {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      if (this.length === 0) return;
      const shapes: ReturnType<ColshapeMp["toData"]>[] = [];
      this.forEach(((cs: ColshapeMp) => shapes.push(cs.toData())) as any);
      emitNet("ragemp:colshapeSyncAll", playerSource, shapes);
    });

    onNet("ragemp:colshape:enter", (id: number) => {
      this._handleTransition(source, id, true);
    });

    onNet("ragemp:colshape:exit", (id: number) => {
      this._handleTransition(source, id, false);
    });

    on("playerDropped", () => {
      const dropped = source;
      for (const [id, set] of this._inside) {
        set.delete(dropped);
        if (set.size === 0) this._inside.delete(id);
      }
    });
  }

  _handleTransition(playerSource: number, id: number, entering: boolean): void {
    const mp = globalThis.mp;
    const player = mp?.players?.at(playerSource);
    const colshape = this.at(id) as unknown as ColshapeMp | null;
    if (!player || !colshape) return;

    let inside = this._inside.get(id);

    if (entering) {
      if (inside && inside.has(playerSource)) return;
      if (!dimensionsMatch(colshape.dimension, player.dimension)) return;

      let position: any = null;
      try {
        position = player.position;
      } catch (e) {
        position = null;
      }
      const posKnown = position && (position.x !== 0 || position.y !== 0 || position.z !== 0);
      if (posKnown && !colshape.isPointWithin(position, ENTER_VALIDATION_MARGIN)) return;

      if (!inside) {
        inside = new Set();
        this._inside.set(id, inside);
      }
      inside.add(playerSource);
      mp.events._fire("playerEnterColshape", player, colshape);
    } else {
      if (!inside || !inside.has(playerSource)) return;
      inside.delete(playerSource);
      if (inside.size === 0) this._inside.delete(id);
      mp.events._fire("playerExitColshape", player, colshape);
    }
  }

  _broadcast(event: string, ...args: any[]): void {
    if (typeof emitNet === "function") emitNet(event, -1, ...args);
  }

  _onColshapeChanged(colshape: ColshapeMp): void {
    this._broadcast("ragemp:colshapeUpdate", colshape.id, colshape.toData());
  }

  _create(shapeType: string, position: Vector3, params: Record<string, any>, dimension: number = 0): ColshapeMp {
    const id = this._nextId++;
    const colshape = new ColshapeMp(id, shapeType, position, params, dimension);
    this._add(colshape as any);
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

  _remove(id: number): void {
    this._inside.delete(id);
    this._broadcast("ragemp:colshapeDestroy", id);
    super._remove(id);
  }
}
