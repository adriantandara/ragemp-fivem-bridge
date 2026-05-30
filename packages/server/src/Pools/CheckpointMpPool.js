import { Pool } from "@ragemp-fivem-bridge/shared";
import { CheckpointMp } from "../Entities/CheckpointMp";

let checkpointIdCounter = 0;

export class CheckpointMpPool extends Pool {
  _inside = new Map();

  constructor() {
    super();
    this._setupSync();
  }

  _setupSync() {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const checkpoints = [];
      this.forEach((cp) => checkpoints.push(cp.toData()));
      if (checkpoints.length > 0) {
        emitNet("ragemp:checkpointSyncAll", playerSource, checkpoints);
      }
    });

    onNet("ragemp:checkpoint:enter", (id) => {
      this._handleTransition(source, id, true);
    });

    onNet("ragemp:checkpoint:exit", (id) => {
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
    const checkpoint = this.at(id);
    if (!player || !checkpoint) return;

    let inside = this._inside.get(id);
    if (!inside) {
      inside = new Set();
      this._inside.set(id, inside);
    }

    if (entering) {
      if (inside.has(playerSource)) return;
      if (checkpoint.dimension !== 0 && player.dimension !== checkpoint.dimension) return;
      let position;
      try {
        position = player.position;
      } catch (e) {
        return;
      }
      if (position.distance(checkpoint.position) > checkpoint.radius) return;
      inside.add(playerSource);
      mp.events._fire("playerEnterCheckpoint", player, checkpoint);
    } else {
      if (!inside.has(playerSource)) return;
      inside.delete(playerSource);
      mp.events._fire("playerExitCheckpoint", player, checkpoint);
    }
  }

  new(type, position, nextPosition, radius, options = {}) {
    const id = ++checkpointIdCounter;
    const checkpoint = new CheckpointMp(id, type, position, nextPosition, radius, options);

    this._add(checkpoint);
    emitNet("ragemp:checkpointCreate", -1, checkpoint.toData());

    return checkpoint;
  }

  _remove(id) {
    this._inside.delete(id);
    super._remove(id);
  }
}
