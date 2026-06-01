import { PluginManager as BasePluginManager } from "@ragemp-fivem-bridge/plugin-manager";

export class PluginManager extends BasePluginManager {
  constructor() {
    super({
      side: "server",
      scriptKey: "bridge_server_script",
      resourceStartEvent: "onResourceStart",
    });
  }
}
