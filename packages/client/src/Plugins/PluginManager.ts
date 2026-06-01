import { PluginManager as BasePluginManager } from "@ragemp-fivem-bridge/plugin-manager";

export class PluginManager extends BasePluginManager {
  constructor() {
    super({
      side: "client",
      scriptKey: "bridge_client_script",
      resourceStartEvent: "onClientResourceStart",
      contextExtras: (name: string) => {
        const mp = globalThis.mp;
        return {
          browsers: {
            create(url: string) {
              const browser = mp.browsers.new(url);
              const originalCall = browser.call.bind(browser);
              browser.call = (eventName: string, ...args: unknown[]) => originalCall(`${name}:${eventName}`, ...args);
              return browser;
            },
          },
        };
      },
    });
  }
}
