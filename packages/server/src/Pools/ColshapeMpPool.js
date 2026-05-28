import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";

let colshapeIdCounter = 0;

export class ColshapeMpPool extends Pool {
  _playerStates = new Map();

  constructor() {
    super();
    this._startChecking();
  }

  _startChecking() {
    setInterval(() => {
      this._checkAll();
    }, 500);
  }

  _checkAll() {
    const mp = globalThis.mp;
    if (!mp || !mp.players) return;

    for (const colshape of this) {
      if (!this._playerStates.has(colshape.id)) {
        this._playerStates.set(colshape.id, new Set());
      }
      const inside = this._playerStates.get(colshape.id);

      mp.players.forEach((player) => {
        const matchesDimension =
          colshape.dimension === 0 || player.dimension === colshape.dimension;

        let isInside = false;
        if (matchesDimension) {
          try {
            isInside = colshape.isPointWithin(player.position);
          } catch (e) {
          }
        }

        if (isInside && !inside.has(player.id)) {
          inside.add(player.id);
          mp.events._fire("playerEnterColshape", player, colshape);
        } else if (!isInside && inside.has(player.id)) {
          inside.delete(player.id);
          mp.events._fire("playerExitColshape", player, colshape);
        }
      });

      for (const playerId of inside) {
        if (!mp.players.exists(playerId)) {
          inside.delete(playerId);
        }
      }
    }
  }

  newSphere(position, radius) {
    const id = ++colshapeIdCounter;
    const colshape = new ColshapeMp(id, "sphere", position, { radius });
    this._add(colshape);
    return colshape;
  }

  newTube(position, radius, height) {
    const id = ++colshapeIdCounter;
    const colshape = new ColshapeMp(id, "tube", position, { radius, height });
    this._add(colshape);
    return colshape;
  }

  newCircle(x, y, radius) {
    const id = ++colshapeIdCounter;
    const position = new Vector3(x, y, 0);
    const colshape = new ColshapeMp(id, "circle", position, { radius });
    this._add(colshape);
    return colshape;
  }

  newRectangle(x, y, width, height) {
    const id = ++colshapeIdCounter;
    const position = new Vector3(x, y, 0);
    const colshape = new ColshapeMp(id, "rectangle", position, { width, height });
    this._add(colshape);
    return colshape;
  }

  newCuboid(position, width, depth, height) {
    const id = ++colshapeIdCounter;
    const colshape = new ColshapeMp(id, "cuboid", position, { width, depth, height });
    this._add(colshape);
    return colshape;
  }

  _remove(id) {
    this._playerStates.delete(id);
    super._remove(id);
  }
}
