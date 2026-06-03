import { CheckpointMp } from "../Entities/CheckpointMp";
import { LocalCreatePool } from "./LocalCreatePool";
import { setupCheckpointPool, createCheckpoint } from "../internal/pools/checkpointPoolService";

export class CheckpointMpPool extends LocalCreatePool<CheckpointMp> {
  constructor() {
    super();
    setupCheckpointPool(this);
  }

  atRemoteId(remoteId: number): CheckpointMp | null {
    return this.at(remoteId) as unknown as CheckpointMp | null;
  }

  new(type: number, position: { x: number; y: number; z: number }, nextPosition: { x: number; y: number; z: number } | null | undefined, radius: number, options: any = {}): CheckpointMp {
    return createCheckpoint(this, this.nextLocalId(), type, position, nextPosition, radius, options);
  }
}
