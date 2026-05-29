import { Mp } from "./Mp";
import * as fsCompat from "./Plugins/builtin/fs-compat";
import * as envLoader from "./Plugins/builtin/env-loader";
import * as spawnmanager from "./Plugins/builtin/spawnmanager";
import * as vehicleSync from "./Plugins/builtin/vehicle-sync";
import * as rageRpc from "./Plugins/builtin/rage-rpc";

if (GetResourceMetadata(GetCurrentResourceName(), "ragemp_bridge", 0) !== "library") {
  globalThis.mp = new Mp();

  globalThis.mp.plugins.registerBuiltin(fsCompat);
  globalThis.mp.plugins.registerBuiltin(envLoader);
  globalThis.mp.plugins.registerBuiltin(rageRpc);
  globalThis.mp.plugins.registerBuiltin(spawnmanager);
  globalThis.mp.plugins.registerBuiltin(vehicleSync);
  globalThis.mp.plugins.loadAll();
}
