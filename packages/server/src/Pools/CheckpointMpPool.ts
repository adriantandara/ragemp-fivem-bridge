import { Vector3 } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { BroadcastPool } from "./BroadcastPool";
import { CheckpointMp } from "../Entities/CheckpointMp";
import { setupCheckpointPool } from "../internal/pools/checkpointPoolService";

export class CheckpointMpPool extends BroadcastPool<CheckpointMp> {
  protected override readonly createEvent = "ragemp:checkpointCreate";

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
    const checkpoint = new CheckpointMp(CONSTRUCT, this.nextId(), type, position, nextPosition, radius, options);
    return this.register(checkpoint);
  }
}
