import { StreamingPool } from "./StreamingPool";
import { VehicleMp } from "../Entities/VehicleMp";
import { getVehiclePool } from "../utils/worldScan";
import {
  setupVehiclePool,
  addVehicleStreamInHandler,
  fireVehicleStreamIn,
} from "../internal/pools/vehiclePoolService";
import { startStreaming } from "../internal/pools/streamingService";

export class VehicleMpPool extends StreamingPool {
  constructor() {
    super("vehicle");
    setupVehiclePool(this);
    startStreaming(this, getVehiclePool, (netId: number, handle: number) => new VehicleMp(netId, handle));
  }

  onVehicleStreamIn(handler: (entity: VehicleMp, handle: number, netId: number) => void): () => void {
    return addVehicleStreamInHandler(this, handler);
  }

  _onStreamIn(entity: VehicleMp, handle: number, netId: number): void {
    fireVehicleStreamIn(this, entity, handle, netId);
  }
}
