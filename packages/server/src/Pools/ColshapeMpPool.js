import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";

let colshapeIdCounter = 0;

export class ColshapeMpPool extends Pool {
  _inside = new Map();

  constructor() {
    super();
    this._setupSync();
  }

  _setupSync() {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const shapes = [];
      this.forEach((cs) => shapes.push(cs.toData()));
      if (shapes.length > 0) {
        emitNet("ragemp:colshapeSyncAll", playerSource, shapes);
      }
    });

    onNet("ragemp:colshape:enter", (id) => {
      this._handleTransition(source, id, true);
    });

    onNet("ragemp:colshape:exit", (id) => {
      this._handleTransition(source, id, false);
    });

    on("playerDropped", () => {
      const dropped = source;
      for (const set of this._inside.values()) set.delete(dropped);
    });
  }

  _handleTransition(playerSource, id, entering) {
    const mp = globalThis.mp;
    const player = mp?.players?.at(playerSource);
    const colshape = this.at(id);
    if (!player || !colshape) return;

    let inside = this._inside.get(id);
    if (!inside) {
      inside = new Set();
      this._inside.set(id, inside);
    }

    if (entering) {
      if (inside.has(playerSource)) return;
      if (colshape.dimension !== 0 && player.dimension !== colshape.dimension) return;
      let position;
      try {
        position = player.position;
      } catch (e) {
        return;
      }
      if (!colshape.isPointWithin(position)) return;
      inside.add(playerSource);
      mp.events._fire("playerEnterColshape", player, colshape);
    } else {
      if (!inside.has(playerSource)) return;
      inside.delete(playerSource);
      mp.events._fire("playerExitColshape", player, colshape);
    }
  }

  _broadcast(event, ...args) {
    if (typeof emitNet === "function") emitNet(event, -1, ...args);
  }

  _onColshapeChanged(colshape) {
    this._broadcast("ragemp:colshapeUpdate", colshape.id, colshape.toData());
  }

  _create(shapeType, position, params) {
    const id = ++colshapeIdCounter;
    const colshape = new ColshapeMp(id, shapeType, position, params);
    this._add(colshape);
    this._broadcast("ragemp:colshapeCreate", colshape.toData());
    return colshape;
  }

  newSphere(position, radius) {
    return this._create("sphere", position, { radius });
  }

  newTube(position, radius, height) {
    return this._create("tube", position, { radius, height });
  }

  newCircle(x, y, radius) {
    return this._create("circle", new Vector3(x, y, 0), { radius });
  }

  newRectangle(x, y, width, height) {
    return this._create("rectangle", new Vector3(x, y, 0), { width, height });
  }

  newCuboid(position, width, depth, height) {
    return this._create("cuboid", position, { width, depth, height });
  }

  _remove(id) {
    this._inside.delete(id);
    this._broadcast("ragemp:colshapeDestroy", id);
    super._remove(id);
  }
}
