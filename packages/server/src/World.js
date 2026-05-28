import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class WorldMp {
  _weather = "CLEAR";
  _time = { hour: 12, minute: 0, second: 0 };
  _trafficLights = { locked: false, state: 0 };

  constructor() {
    onNet("ragemp:playerReady", () => {
      const src = global.source;
      emitNet("ragemp:setWeather", src, this._weather);
      emitNet("ragemp:setTime", src, this._time.hour, this._time.minute, this._time.second);
    });
  }

  get weather() {
    return this._weather;
  }

  set weather(value) {
    this._weather = value;
    emitNet("ragemp:setWeather", -1, value);
  }

  get time() {
    const self = this;
    return {
      get hour() { return self._time.hour; },
      set hour(v) { self._time.hour = v; self._syncTime(); },
      get minute() { return self._time.minute; },
      set minute(v) { self._time.minute = v; self._syncTime(); },
      get second() { return self._time.second; },
      set second(v) { self._time.second = v; self._syncTime(); },
      set(hour, minute, second = 0) {
        self._time.hour = hour;
        self._time.minute = minute;
        self._time.second = second;
        self._syncTime();
      }
    };
  }

  get trafficLights() {
    const self = this;
    return {
      get locked() { return self._trafficLights.locked; },
      set locked(v) { self._trafficLights.locked = v; },
      get state() { return self._trafficLights.state; },
      set state(v) { self._trafficLights.state = v; }
    };
  }

  _syncTime() {
    emitNet("ragemp:setTime", -1, this._time.hour, this._time.minute, this._time.second);
  }

  setWeatherTransition(from, to) {
    this._weather = to;
    emitNet("ragemp:setWeatherTransition", -1, from, to);
  }

  removeIpl(name) {
    emitNet("ragemp:removeIpl", -1, name);
  }

  requestIpl(name) {
    emitNet("ragemp:requestIpl", -1, name);
  }
}
