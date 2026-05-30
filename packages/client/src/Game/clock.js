import { createUnkProxy } from "./_helpers.js";

export class GameClockNs {
  unk = createUnkProxy();

  getHours() { return GetClockHours(); }
  getMinutes() { return GetClockMinutes(); }
  getSeconds() { return GetClockSeconds(); }
  getDayOfMonth() { return GetClockDayOfMonth(); }
  getDayOfWeek() { return GetClockDayOfWeek(); }
  getMonth() { return GetClockMonth(); }
  getYear() { return GetClockYear(); }
  setDate(day, month, year) { SetClockDate(day, month, year); }
  setTime(hours, minutes, seconds) { NetworkOverrideClockTime(hours, minutes, seconds); }
  setMillisecondsPerGameMinute(ms) { NetworkOverrideClockMillisecondsPerGameMinute(ms); }
}
