import { createUnkProxy } from "./_helpers.js";

export class GameEventNs {
  unk = createUnkProxy();

  removeShockingEvent(handle: number): void { RemoveShockingEvent(handle); }

  clearDecisionMakerEventResponse(name: number, eventType: number): void { ClearDecisionMakerEventResponse(name, eventType); }
  blockDecisionMakerEvent(name: number, eventType: number): void { BlockDecisionMakerEvent(name, eventType); }
  unblockDecisionMakerEvent(name: number, eventType: number): void { UnblockDecisionMakerEvent(name, eventType); }
  addShockingEventAtPosition(eventType: number, x: number, y: number, z: number, duration: number): number { return AddShockingEventAtPosition(eventType, x, y, z, duration); }
  addShockingEventForEntity(eventType: number, entity: number, duration: number): number { return AddShockingEventForEntity(eventType, entity, duration); }
  isShockingEventInSphere(eventType: number, x: number, y: number, z: number, radius: number): boolean { return IsShockingEventInSphere(eventType, x, y, z, radius); }
  removeAllShockingEvents(p0: boolean): void { RemoveAllShockingEvents(!!p0); }
  suppressShockingEventTypeNextFrame(eventType: number): void { SuppressShockingEventTypeNextFrame(eventType); }
  setDecisionMaker(ped: number, name: number): void { SetDecisionMaker(ped, name); }
  blockDecisionMaker(name: number, eventType: number): void { BlockDecisionMakerEvent(name, eventType); }
  unblockDecisionMaker(name: number, eventType: number): void { UnblockDecisionMakerEvent(name, eventType); }
  removeShocking(event: number): boolean { return RemoveShockingEvent(event); }
  suppressShockingEventsNextFrame(): void { SuppressShockingEventsNextFrame(); }
  suppressAgitationEventsNextFrame(): void { SuppressAgitationEventsNextFrame(); }

  clearDecisionMakerResponse(name: number, eventType: number): void { ClearDecisionMakerEventResponse(name, eventType); }
  addShockingAtPosition(eventType: number, x: number, y: number, z: number, duration: number): number { return AddShockingEventAtPosition(eventType, x, y, z, duration); }
  addShockingForEntity(eventType: number, entity: number, duration: number): number { return AddShockingEventForEntity(eventType, entity, duration); }
  isShockingInSphere(eventType: number, x: number, y: number, z: number, radius: number): boolean { return IsShockingEventInSphere(eventType, x, y, z, radius); }
  removeAllShockingS(p0: boolean): void { RemoveAllShockingEvents(!!p0); }
  removeShockingSpawnBlockingAreas(): void { RemoveShockingEventSpawnBlockingAreas(); }
  suppressShockingTypeNextFrame(eventType: number): void { SuppressShockingEventTypeNextFrame(eventType); }
}
