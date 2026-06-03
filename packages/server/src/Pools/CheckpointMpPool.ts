import { Vector3, Pool } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { CheckpointMp } from "../Entities/CheckpointMp";
import { setupCheckpointPool } from "../internal/pools/checkpointPoolService";
import { nextBroadcastId, registerBroadcast } from "../internal/pools/broadcastPoolService";

export class CheckpointMpPool extends Pool<CheckpointMp> {
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
    const checkpoint = new CheckpointMp(CONSTRUCT, nextBroadcastId(this), type, position, nextPosition, radius, options);
    return registerBroadcast(this, checkpoint);
  }
}
