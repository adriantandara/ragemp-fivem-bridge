import { Pool } from "@ragemp-fivem-bridge/shared";
import { DummyMp } from "../Entities/DummyMp";

let dummyIdCounter = 0;

export class DummyMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync() {
    onNet("ragemp:playerReady", () => {
      const playerSource = globalThis.source;
      const dummies = [];
      this.forEach((d) => dummies.push(d.toData()));
      if (dummies.length > 0) {
        emitNet("ragemp:dummySyncAll", playerSource, dummies);
      }
    });
  }

  new(dummyType, data) {
    const id = ++dummyIdCounter;
    const dummy = new DummyMp(id, dummyType, data);
    this._add(dummy);
    emitNet("ragemp:dummyCreate", -1, dummy.toData());
    return dummy;
  }

  forEachByType(type, fn) {
    this.forEach((d) => {
      if (d.dummyType === type) fn(d);
    });
  }
}
