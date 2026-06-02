import { createUnkProxy } from "./_helpers.js";

export class GameSystemNs {
  unk = createUnkProxy();

  wait(ms: number): void { Wait(ms); }
  startNewScript(scriptName: string, stackSize: number): number { return (StartNewScript as any)(scriptName, stackSize ?? 1000); } // NOTE: native returns [number,number] per typings
  startNewScriptWithArgs(scriptName: string, args: number, argCount: number, stackSize: number): number {
    return (StartNewScriptWithArgs as any)(scriptName, args, argCount, stackSize ?? 1000); // NOTE: native returns [number,number] per typings
  }
  startNewScriptWithNameHash(scriptHash: number, stackSize: number): number { return StartNewScriptWithNameHash(scriptHash, stackSize ?? 1000); }
  startNewScriptWithNameHashAndArgs(scriptHash: number, args: number, argCount: number, stackSize: number): { args: number; result: number } {
    return (StartNewScriptWithNameHashAndArgs as any)(scriptHash, args, argCount, stackSize ?? 1000);
  }

  timera(): number { return Timera(); }
  timerb(): number { return Timerb(); }
  settimera(value: number): void { Settimera(value); }
  settimerb(value: number): void { Settimerb(value); }
  timestep(): number { return Timestep(); }

  sin(value: number): number { return Sin(value); }
  cos(value: number): number { return Cos(value); }
  sqrt(value: number): number { return Sqrt(value); }
  pow(base: number, exponent: number): number { return Pow(base, exponent); }
  log10(value: number): number { return Log10(value); }

  vmag(x: number, y: number, z: number): number {
    return Math.sqrt(x * x + y * y + z * z);
  }
  vmag2(x: number, y: number, z: number): number { return Vmag2(x, y, z); }


  vdist(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    const dx = x1 - x2, dy = y1 - y2, dz = z1 - z2;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
  vdist2(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number { return Vdist2(x1, y1, z1, x2, y2, z2); }


  shiftLeft(value: number, bitShift: number): number { return ShiftLeft(value, bitShift); }
  shiftRight(value: number, bitShift: number): number { return ShiftRight(value, bitShift); }
  floor(value: number): number { return Floor(value); }
  ceil(value: number): number { return Ceil(value); }
  round(value: number): number { return Round(value); }
  toFloat(value: number): number { return ToFloat(value); }

  startNewStreamedScript(scriptHash: number, stackSize: number): number { return StartNewStreamedScript(scriptHash, stackSize ?? 1000); } // unverified
  startNewStreamedScriptWithArgs(scriptHash: number, args: number, argCount: number): { result: number; args: number } {
    const r = StartNewStreamedScriptWithArgs(scriptHash, args, argCount); // unverified
    return Array.isArray(r) ? { result: r[0], args: r[1] } : { result: r, args };
  }
  setThreadPriority(priority: number): void { SetThreadPriority(priority); }
  setConnectableServers(serverIps: string[]): void { SetConnectableServers(serverIps); } // unverified
  connectToServer(ip: string, port: number, sessionData?: string): void { ConnectToServer(ip, port, sessionData); } // unverified
}
