import { createUnkProxy, toVec3 } from "./_helpers.js";
import { Vector3 } from "@ragemp-fivem-bridge/shared";

export class GameWaterNs {
  unk: any = createUnkProxy();

  getWaterHeight(x: number, y: number, z: number): number { return (GetWaterHeight as any)(x, y, z); }
  getWaterHeightNoWaves(x: number, y: number, z: number): number { return (GetWaterHeightNoWaves as any)(x, y, z); }
  testProbeAgainstWater(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): Vector3 { return toVec3((TestProbeAgainstWater as any)(x1, y1, z1, x2, y2, z2)); }
  testProbeAgainstAllWater(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number): boolean { return (TestProbeAgainstAllWater as any)(p0, p1, p2, p3, p4, p5, p6, p7); }
  testVerticalProbeAgainstAllWater(x: number, y: number, z: number, p3: number): number { return (TestVerticalProbeAgainstAllWater as any)(x, y, z, p3); }
  modifyWater(x: number, y: number, radius: number, height: number): void { ModifyWater(x, y, radius, height); }
  setWavesIntensity(intensity: number): void { SetCalmedWaveHeightScaler(intensity); }
  ["_0x547237AA71AB44DE"](...args: any[]): any { return Citizen.invokeNative("0x547237AA71AB44DE", ...args); }
  getHeight(x: number, y: number, z: number): number { return (GetWaterHeight as any)(x, y, z); }
  getHeightNoWaves(x: number, y: number, z: number): number { return (GetWaterHeightNoWaves as any)(x, y, z); }
  testProbeAgainst(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): Vector3 { return toVec3((TestProbeAgainstWater as any)(x1, y1, z1, x2, y2, z2)); }
  testProbeAgainstAll(p0: number, p1: number, p2: number, p3: number, p4: number, p5: number, p6: number, p7: number): boolean { return (TestProbeAgainstAllWater as any)(p0, p1, p2, p3, p4, p5, p6, p7); }
  testVerticalProbeAgainstAll(x: number, y: number, z: number, p3: number): number { return (TestVerticalProbeAgainstAllWater as any)(x, y, z, p3); }
  modify(x: number, y: number, radius: number, height: number): void { ModifyWater(x, y, radius, height); }
  addCurrentRise(x: number, y: number, z: number, radius: number, unk: number): number { return AddExtraCalmingQuad(x, y, z, radius, unk); }
  removeCurrentRise(p0: number): void { RemoveExtraCalmingQuad(p0); }
  setDeepOceanScaler(intensity: number): void { SetDeepOceanScaler(intensity); }
  getDeepOceanScaler(): number { return GetDeepOceanScaler(); }
  resetDeepOceanScaler(): void { ResetDeepOceanScaler(); }
}
