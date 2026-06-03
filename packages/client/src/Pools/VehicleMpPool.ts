import { StreamingPool } from "./StreamingPool";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { VehicleMp } from "../Entities/VehicleMp";
import { getVehiclePool } from "../utils/worldScan";
import {
  setupVehiclePool,
  addVehicleStreamInHandler,
  fireVehicleStreamIn,
} from "../internal/pools/vehiclePoolService";
import { startStreaming, setStreamHandlers } from "../internal/pools/streamingService";

export class VehicleMpPool extends StreamingPool<VehicleMp> {
  constructor() {
    super("vehicle");
    setupVehiclePool(this);
    startStreaming(this, getVehiclePool, (netId: number, handle: number) => new VehicleMp(CONSTRUCT, netId, handle));
    setStreamHandlers(this, {
      onStreamIn: (entity: VehicleMp, handle: number, netId: number) => fireVehicleStreamIn(this, entity, handle, netId),
    });
  }

  onVehicleStreamIn(handler: (entity: VehicleMp, handle: number, netId: number) => void): () => void {
    return addVehicleStreamInHandler(this, handler);
  }
}
