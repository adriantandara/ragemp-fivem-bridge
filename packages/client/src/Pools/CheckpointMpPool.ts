import { Pool } from "@ragemp-fivem-bridge/shared";
import { CheckpointMp } from "../Entities/CheckpointMp";
import { setupCheckpointPool, createCheckpoint } from "../internal/pools/checkpointPoolService";

export class CheckpointMpPool extends Pool<CheckpointMp> {
  constructor() {
    super();
    setupCheckpointPool(this);
  }

  new(type: number, position: { x: number; y: number; z: number }, nextPosition: { x: number; y: number; z: number } | null | undefined, radius: number, options: any = {}): CheckpointMp {
    return createCheckpoint(this, type, position, nextPosition, radius, options);
  }
}
