import { Pool, Vector3 } from "@ragemp-fivem-bridge/shared";
import { poolAdd } from "@ragemp-fivem-bridge/shared/internal";
import { CheckpointMp } from "../Entities/CheckpointMp";
import { setupCheckpointPool } from "../internal/pools/checkpointPoolService";

let checkpointIdCounter = 0;

export class CheckpointMpPool extends Pool {
  constructor() {
    super();
    setupCheckpointPool(this);
  }

  new(type: number, position: Vector3, nextPosition: Vector3 | null, radius: number, options: {
    color?: [number, number, number, number] | { r: number; g: number; b: number; a: number };
    dimension?: number;
    direction?: Vector3;
    visible?: boolean;
  } = {}): CheckpointMp {
    const id = ++checkpointIdCounter;
    const checkpoint = new CheckpointMp(id, type, position, nextPosition, radius, options);

    poolAdd(this, checkpoint as any);
    emitNet("ragemp:checkpointCreate", -1, checkpoint.toData());

    return checkpoint;
  }
}
