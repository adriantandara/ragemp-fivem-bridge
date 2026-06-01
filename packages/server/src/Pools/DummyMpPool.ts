import { Pool } from "@ragemp-fivem-bridge/shared";
import { DummyMp } from "../Entities/DummyMp";

let dummyIdCounter = 0;

export class DummyMpPool extends Pool {
  constructor() {
    super();
    this._setupSync();
  }

  _setupSync(): void {
    onNet("ragemp:playerReady", () => {
      const playerSource = source;
      const dummies: ReturnType<DummyMp["toData"]>[] = [];
      this.forEach(((d: DummyMp) => dummies.push(d.toData())) as any);
      if (dummies.length > 0) {
        emitNet("ragemp:dummySyncAll", playerSource, dummies);
      }
    });
  }

  new(dummyType: number, data: Record<string, any>): DummyMp {
    const id = ++dummyIdCounter;
    const dummy = new DummyMp(id, dummyType, data);
    this._add(dummy as any);
    emitNet("ragemp:dummyCreate", -1, dummy.toData());
    return dummy;
  }

  forEachByType(type: number, fn: (entity: DummyMp) => void): void {
    this.forEach(((d: DummyMp) => {
      if (d.dummyType === type) fn(d);
    }) as any);
  }
}
