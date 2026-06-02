import { Pool } from "@ragemp-fivem-bridge/shared";
import {
  setupStreamingPool,
  atRemote,
  atHandle,
  atNetId,
  existsRemote,
  LOCAL_STREAM_ID_BASE,
} from "../internal/pools/streamingService";

export { LOCAL_STREAM_ID_BASE };

export class StreamingPool extends Pool {
  forEach!: (fn: (entity: any) => void) => void;
  toArray!: () => any[];

  constructor(netType: string | null = null) {
    super();
    setupStreamingPool(this, netType);
  }

  _onStreamIn(entity: any, handle: number, netId: number): void {}

  _onStreamOut(entity: any): void {}

  at(id: number): any {
    return atRemote(this, id);
  }

  atRemoteId(remoteId: number): any {
    return this.at(remoteId);
  }

  atRemoteIdAsync(remoteId: number, options: any = {}): Promise<any> {
    const timeout = typeof options === "number" ? options : options.timeout ?? 5000;
    const interval = (typeof options === "object" && options.interval) || 50;
    return new Promise((resolve) => {
      const immediate = this.atRemoteId(remoteId);
      if (immediate) {
        resolve(immediate);
        return;
      }
      const now = () => (typeof GetGameTimer === "function" ? GetGameTimer() : 0);
      const start = now();
      const tick = setInterval(() => {
        const found = this.atRemoteId(remoteId);
        if (found) {
          clearInterval(tick);
          resolve(found);
          return;
        }
        if (now() - start >= timeout) {
          clearInterval(tick);
          resolve(null);
        }
      }, interval);
    });
  }

  atHandle(handle: number): any {
    return atHandle(this, handle);
  }

  atNetId(netId: number): any {
    return atNetId(this, netId);
  }

  exists(entity: any): boolean {
    return existsRemote(this, entity);
  }
}
