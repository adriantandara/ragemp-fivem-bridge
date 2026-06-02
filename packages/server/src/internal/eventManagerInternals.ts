import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";

export interface ServerEventManagerRec {
  procs: Map<string, (...args: any[]) => any>;
  playerReadyHandled: Set<number>;
  commands: Map<string, (...args: any[]) => any>;
  dataHandlers: Map<string, Array<(...args: any[]) => void>> | null;
  dataSnapshots: WeakMap<object, Map<string, any>> | null;
}

export const ServerEventManagerInternals = defineInternals<ServerEventManagerRec>();

export function initServerEventManagerInternals(mgr: object): ServerEventManagerRec {
  return ServerEventManagerInternals.init(mgr, {
    procs: new Map(),
    playerReadyHandled: new Set(),
    commands: new Map(),
    dataHandlers: null,
    dataSnapshots: null,
  });
}
