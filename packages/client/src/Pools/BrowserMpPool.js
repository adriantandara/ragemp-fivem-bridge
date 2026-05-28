import { Pool } from "@ragemp-fivem-bridge/shared";
import { BrowserMp } from "../Entities/BrowserMp";

let _browserIdCounter = 0;

export class BrowserMpPool extends Pool {
  constructor() {
    super();
    this._setupNuiListeners();
  }

  new(url) {
    const id = ++_browserIdCounter;
    const browser = new BrowserMp(id, url);
    this._add(browser);
    globalThis.mp?.events?._fire("browserCreated", browser);
    setTimeout(() => {
      globalThis.mp?.events?._fire("browserDomReady", browser);
    }, 0);
    return browser;
  }

  newHeadless(url, width, height) {
    return this.new(url);
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _setupNuiListeners() {
    if (typeof RegisterNuiCallbackType !== "function") return;

    RegisterNuiCallbackType("ragemp:browserEvent");
    on("__cfx_nui:ragemp:browserEvent", (data, cb) => {
      const { event, args } = data;
      if (event && globalThis.mp?.events) {
        globalThis.mp.events._fire(event, ...(args ?? []));
      }
      cb({});
    });
  }
}
