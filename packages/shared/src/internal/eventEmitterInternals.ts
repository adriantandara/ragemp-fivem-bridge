import { defineInternals } from "./defineInternals";

export type EventHandler = (...args: unknown[]) => void;

export interface EventEmitterInternalsRec {
  handlers: Map<string, Set<EventHandler>>;
}

export const EventEmitterInternals = defineInternals<EventEmitterInternalsRec>();

export function initEventEmitterInternals(emitter: object): EventEmitterInternalsRec {
  return EventEmitterInternals.init(emitter, {
    handlers: new Map(),
  });
}
