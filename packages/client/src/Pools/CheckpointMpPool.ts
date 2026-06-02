import { Pool } from "@ragemp-fivem-bridge/shared";
import { CheckpointMp } from "../Entities/CheckpointMp";
import { setupCheckpointPool, createCheckpoint } from "../internal/pools/checkpointPoolService";

let localCheckpointIdCounter = 100000;

export class CheckpointMpPool extends Pool {
  constructor() {
    super();
    setupCheckpointPool(this);
  }

  atRemoteId(remoteId: number): CheckpointMp | null {
    return this.at(remoteId) as unknown as CheckpointMp | null;
  }

  new(type: number, position: { x: number; y: number; z: number }, nextPosition: { x: number; y: number; z: number } | null | undefined, radius: number, options: any = {}): CheckpointMp {
    const id = ++localCheckpointIdCounter;
    return createCheckpoint(this, id, type, position, nextPosition, radius, options);
  }
}
