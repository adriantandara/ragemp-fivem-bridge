import { NotImplementedError } from "@ragemp-fivem-bridge/shared";

const MAYBE_MISSING_NATIVES = [
  "GetVehicleTrailerVehicle",
  "IsEntityDead",
  "SetEntityHealth",
];

for (const name of MAYBE_MISSING_NATIVES) {
  if (typeof (globalThis as any)[name] !== "function") {
    (globalThis as any)[name] = () => {
      throw new NotImplementedError(name);
    };
  }
}

declare global {
  function GetVehicleTrailerVehicle(...args: any[]): any;
  function IsEntityDead(...args: any[]): any;
  function SetEntityHealth(...args: any[]): any;
}
