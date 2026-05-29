import { Pool } from "@ragemp-fivem-bridge/shared";
import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { ColshapeMp } from "../Entities/ColshapeMp";
import { onWorldScan } from "../utils/worldScan";

let colshapeIdCounter = 0;

export class ColshapeMpPool extends Pool {
  _insideSet = new Set();

  constructor() {
    super();
    this._startChecking();
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _startChecking() {
    onWorldScan(() => {
      const mp = globalThis.mp;
      if (!mp || !mp.players || !mp.players.local) return;

      const localPos = mp.players.local.position;

      for (const colshape of this) {
        const isInside = colshape.isPointWithin(localPos);

        if (isInside && !this._insideSet.has(colshape.id)) {
          this._insideSet.add(colshape.id);
          mp.events._fire("playerEnterColshape", mp.players.local, colshape);
        } else if (!isInside && this._insideSet.has(colshape.id)) {
          this._insideSet.delete(colshape.id);
          mp.events._fire("playerExitColshape", mp.players.local, colshape);
        }
      }
    });
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
    this._insideSet.delete(id);
    super._remove(id);
  }
}
