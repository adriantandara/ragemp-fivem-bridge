// AUTO-GENERATED. Natives referenced by the bridge but absent from the pinned
// @citizenfx/server typings (build 2.0.25839-1) — i.e. not exposed by this FiveM
// runtime. We install a throwing fallback for any that are genuinely missing so
// calls fail loudly with NotImplementedError instead of "undefined is not a
// function", and declare them for the type-checker. If the runtime DOES provide
// one, the real native is used untouched.
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
