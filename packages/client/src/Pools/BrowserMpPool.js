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

    if (typeof SendNuiMessage === "function") {
      SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:create", browserId: id, url }));
    }

    globalThis.mp?.events?._fire("browserCreated", browser);

    setTimeout(() => {
      globalThis.mp?.events?._fire("browserDomReady", browser);
    }, 0);

    return browser;
  }

  newHeadless(url) {
    return this.new(url);
  }

  atRemoteId(remoteId) {
    return this.at(remoteId);
  }

  _execCommand(raw) {
    const text = typeof raw === "string" ? raw.trim() : "";
    const command = text.charAt(0) === "/" ? text.slice(1) : text;
    if (command) ExecuteCommand(command);
  }

  _setupNuiListeners() {
    if (typeof RegisterNuiCallbackType !== "function") return;

    RegisterNuiCallbackType("ragemp:browserEvent");
    on("__cfx_nui:ragemp:browserEvent", (data, cb) => {
      const { event, args } = data;
      if (event === "command") {
        this._execCommand((args ?? [])[0]);
      } else if (event && globalThis.mp?.events) {
        globalThis.mp.events._fire(event, ...(args ?? []));
      }
      cb({});
    });

    RegisterNuiCallbackType("ragemp:cef:command");
    on("__cfx_nui:ragemp:cef:command", (data, cb) => {
      this._execCommand(data && data.command);
      cb({});
    });
  }
}
