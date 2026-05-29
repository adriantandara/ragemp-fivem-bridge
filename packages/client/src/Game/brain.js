import { createUnkProxy } from "./_helpers.js";

export class GameBrainNs {
  unk = createUnkProxy();

  addVehicleCombatAntiCheatTimer(vehicle, p1) { AddVehicleCombatAntiCheatTimer(vehicle, p1); }
  registerBrainEvent(eventId) { return RegisterBrainEvent(eventId); }
  sendBrainEvent(eventId, args) { SendBrainEvent(eventId, args); }
}
