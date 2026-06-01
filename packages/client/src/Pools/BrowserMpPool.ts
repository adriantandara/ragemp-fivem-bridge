import { Pool } from "@ragemp-fivem-bridge/shared";
import { BrowserMp, setBrowserProcTimeout, getBrowserProcTimeout } from "../Entities/BrowserMp";

let _browserIdCounter = -1;

export class BrowserMpPool extends Pool {
  _chatBrowser: BrowserMp | null = null;
  _entities!: Map<number, BrowserMp>;
  _add!: (entity: BrowserMp) => void;
  _remove!: (id: number) => void;
  at!: (id: number) => BrowserMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: BrowserMp) => void) => void;
  toArray!: () => BrowserMp[];

  constructor() {
    super();
    this._setupNuiListeners();
  }

  _sendChatMessage(message: any): void {
    const text = typeof message === "string" ? message.trim() : "";
    if (!text) return;
    if (text.charAt(0) === "/") {
      this._execCommand(text);
      return;
    }
    emitNet("ragemp:chat:message", text);
  }

  new(url: string): BrowserMp {
    const id = ++_browserIdCounter;
    const browser = new BrowserMp(id, url);
    this._add(browser);

    if (typeof SendNuiMessage === "function") {
      SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:create", browserId: id, url }));
    }

    browser.orderId = id;

    globalThis.mp?.events?._fire("browserCreated", browser);

    return browser;
  }

  newHeadless(url: string): BrowserMp {
    return this.new(url);
  }

  setProcTimeout(ms: number): void {
    setBrowserProcTimeout(ms);
  }

  get procTimeout(): number {
    return getBrowserProcTimeout();
  }

  atRemoteId(remoteId: number): BrowserMp | null {
    return this.at(remoteId);
  }

  _execCommand(raw: any): void {
    const text = typeof raw === "string" ? raw.trim() : "";
    const command = text.charAt(0) === "/" ? text.slice(1) : text;
    if (command) emitNet("ragemp:command", command);
  }

  _formatError(info: any): string {
    const id = info && info.browserId;
    const kind = (info && info.kind) || "error";
    const where = info && info.event ? ` [event: ${info.event}]` : "";
    const loc =
      info && info.source
        ? ` (${info.source}:${info.lineno ?? "?"}:${info.colno ?? "?"})`
        : "";
    const msg = (info && info.message) || "Unknown error";
    return `[browser ${id}] ${kind}${where}: ${msg}${loc}`;
  }

  _setupNuiListeners(): void {
    if (typeof RegisterNuiCallbackType !== "function") return;

    RegisterNuiCallbackType("ragemp:browserError");
    on("__cfx_nui:ragemp:browserError", (data: any, cb: (result: Record<string, never>) => void) => {
      const browser = this.at(data && data.browserId);
      console.error(this._formatError(data));
      if (data && data.stack) console.error(data.stack);
      globalThis.mp?.events?._fire("browserError", browser ?? null, data);
      cb({});
    });

    RegisterNuiCallbackType("ragemp:browserLifecycle");
    on("__cfx_nui:ragemp:browserLifecycle", (data: any, cb: (result: Record<string, never>) => void) => {
      const browser = this.at(data && data.browserId);
      if (!browser) {
        cb({});
        return;
      }
      if (data.event === "domReady") {
        if (typeof browser._onDomReady === "function") browser._onDomReady();
        globalThis.mp?.events?._fire("browserDomReady", browser);
      } else if (data.event === "loadError") {
        console.error(
          `[browser ${data.browserId}] failed to load: ${data.url ?? "(unknown url)"}`,
        );
        globalThis.mp?.events?._fire("browserLoadError", browser, data);
      }
      cb({});
    });

    RegisterNuiCallbackType("ragemp:browserEvent");
    on("__cfx_nui:ragemp:browserEvent", (data: any, cb: (result: Record<string, never>) => void) => {
      const { event, args } = data;
      if (event === "command") {
        this._execCommand((args ?? [])[0]);
      } else if (event === "chatMessage" || event === "chat:message") {
        this._sendChatMessage((args ?? [])[0]);
      } else if (event && globalThis.mp?.events) {
        globalThis.mp.events._fire(event, ...(args ?? []));
      }
      cb({});
    });

    RegisterNuiCallbackType("ragemp:cef:command");
    on("__cfx_nui:ragemp:cef:command", (data: any, cb: (result: Record<string, never>) => void) => {
      this._execCommand(data && data.command);
      cb({});
    });

    RegisterNuiCallbackType("ragemp:cef:chatMessage");
    on("__cfx_nui:ragemp:cef:chatMessage", (data: any, cb: (result: Record<string, never>) => void) => {
      this._sendChatMessage(data && data.message);
      cb({});
    });
  }
}
