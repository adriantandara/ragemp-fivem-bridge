import { createUnkProxy } from "./_helpers.js";

export class GameEventNs {
  unk = createUnkProxy();

  addShockingEvent(type, posX, posY, posZ, p4, p5, p6, duration, p8) {
    return AddShockingEvent(type, posX, posY, posZ, p4 ?? 0, p5 ?? 0, p6 ?? 0, duration ?? 0);
  }
  removeShockingEvent(handle) { RemoveShockingEvent(handle); }
  clearAreaOfShockingEvents(x, y, z, radius) { ClearAreaOfShockingEvents(x, y, z, radius); }
}
