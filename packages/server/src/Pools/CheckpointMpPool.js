import { Pool } from "@ragemp-fivem-bridge/shared";
import { CheckpointMp } from "../Entities/CheckpointMp";

let checkpointIdCounter = 0;

export class CheckpointMpPool extends Pool {
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
  }

  new(type, position, nextPosition, radius, options = {}) {
    const id = ++checkpointIdCounter;
    const checkpoint = new CheckpointMp(id, type, position, nextPosition, radius, options);

    this._add(checkpoint);
    emitNet("ragemp:checkpointCreate", -1, checkpoint.toData());

    return checkpoint;
  }
}
