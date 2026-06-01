import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class WorldMp {
  _weather: string = "CLEAR";
  _time: { hour: number; minute: number; second: number } = { hour: 12, minute: 0, second: 0 };
  _trafficLights: { locked: boolean; state: number } = { locked: false, state: 0 };

  constructor() {
    onNet("ragemp:playerReady", () => {
      const src = source;
      emitNet("ragemp:setWeather", src, this._weather);
      emitNet("ragemp:setTime", src, this._time.hour, this._time.minute, this._time.second);
    });
  }

  get weather(): string {
    return this._weather;
  }

  set weather(value: string) {
    this._weather = value;
    emitNet("ragemp:setWeather", -1, value);
  }

  get time(): { hour: number; minute: number; second: number; set(hour: number, minute: number, second?: number): void } {
    const self = this;
    return {
      get hour(): number { return self._time.hour; },
      set hour(v: number) { self._time.hour = v; self._syncTime(); },
      get minute(): number { return self._time.minute; },
      set minute(v: number) { self._time.minute = v; self._syncTime(); },
      get second(): number { return self._time.second; },
      set second(v: number) { self._time.second = v; self._syncTime(); },
      set(hour: number, minute: number, second: number = 0): void {
        self._time.hour = hour;
        self._time.minute = minute;
        self._time.second = second;
        self._syncTime();
      }
    };
  }

  get trafficLights(): { locked: boolean; state: number } {
    const self = this;
    return {
      get locked(): boolean { return self._trafficLights.locked; },
      set locked(v: boolean) { self._trafficLights.locked = v; },
      get state(): number { return self._trafficLights.state; },
      set state(v: number) { self._trafficLights.state = v; }
    };
  }

  _syncTime(): void {
    emitNet("ragemp:setTime", -1, this._time.hour, this._time.minute, this._time.second);
  }

  setWeatherTransition(weather: string, easeTime: number = 0): void {
    this._weather = weather;
    emitNet("ragemp:setWeatherTransition", -1, weather, easeTime);
  }

  removeIpl(name: string): void {
    emitNet("ragemp:removeIpl", -1, name);
  }

  requestIpl(name: string): void {
    emitNet("ragemp:requestIpl", -1, name);
  }
}
