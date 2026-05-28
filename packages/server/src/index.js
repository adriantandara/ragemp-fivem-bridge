import { Mp } from "./Mp";
import * as fsCompat from "./Plugins/builtin/fs-compat";
import * as envLoader from "./Plugins/builtin/env-loader";
import * as spawnmanager from "./Plugins/builtin/spawnmanager";
import * as rageRpc from "./Plugins/builtin/rage-rpc";

if (GetCurrentResourceName() !== "ragemp-fivem-bridge") {
  globalThis.mp = new Mp();

  globalThis.mp.plugins.registerBuiltin(fsCompat);
  globalThis.mp.plugins.registerBuiltin(envLoader);
  globalThis.mp.plugins.registerBuiltin(rageRpc);
  globalThis.mp.plugins.registerBuiltin(spawnmanager);
  globalThis.mp.plugins.loadAll();
}
