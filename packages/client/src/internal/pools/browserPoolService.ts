import { registerBrowserProcChannel } from "../browserInternals";
import type { BrowserMpPool } from "../../Pools/BrowserMpPool";

export function execBrowserCommand(raw: any): void {
  const text = typeof raw === "string" ? raw.trim() : "";
  const command = text.charAt(0) === "/" ? text.slice(1) : text;
  if (command) emitNet("ragemp:command", command);
}

export function sendBrowserChatMessage(message: any): void {
  const text = typeof message === "string" ? message.trim() : "";
  if (!text) return;
  if (text.charAt(0) === "/") {
    execBrowserCommand(text);
    return;
  }
  emitNet("ragemp:chat:message", text);
}

function formatError(info: any): string {
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

export function setupBrowserPool(pool: BrowserMpPool): void {
  registerBrowserProcChannel();

  if (typeof RegisterNuiCallbackType !== "function") return;

  RegisterNuiCallbackType("ragemp:browserError");
  on("__cfx_nui:ragemp:browserError", (data: any, cb: (result: Record<string, never>) => void) => {
    const browser = pool.at(data && data.browserId);
    console.error(formatError(data));
    if (data && data.stack) console.error(data.stack);
    globalThis.mp?.events?.call("browserError", browser ?? null, data);
    cb({});
  });

  RegisterNuiCallbackType("ragemp:browserLifecycle");
  on("__cfx_nui:ragemp:browserLifecycle", (data: any, cb: (result: Record<string, never>) => void) => {
    const browser = pool.at(data && data.browserId);
    if (!browser) {
      cb({});
      return;
    }
    if (data.event === "domReady") {
      if (typeof browser._onDomReady === "function") browser._onDomReady();
      globalThis.mp?.events?.call("browserDomReady", browser);
    } else if (data.event === "loadError") {
      console.error(
        `[browser ${data.browserId}] failed to load: ${data.url ?? "(unknown url)"}`,
      );
      globalThis.mp?.events?.call("browserLoadError", browser, data);
    }
    cb({});
  });

  RegisterNuiCallbackType("ragemp:browserEvent");
  on("__cfx_nui:ragemp:browserEvent", (data: any, cb: (result: Record<string, never>) => void) => {
    const { event, args } = data;
    if (event === "command") {
      execBrowserCommand((args ?? [])[0]);
    } else if (event === "chatMessage" || event === "chat:message") {
      sendBrowserChatMessage((args ?? [])[0]);
    } else if (event && globalThis.mp?.events) {
      globalThis.mp.events.call(event, ...(args ?? []));
    }
    cb({});
  });

  RegisterNuiCallbackType("ragemp:cef:command");
  on("__cfx_nui:ragemp:cef:command", (data: any, cb: (result: Record<string, never>) => void) => {
    execBrowserCommand(data && data.command);
    cb({});
  });

  RegisterNuiCallbackType("ragemp:cef:chatMessage");
  on("__cfx_nui:ragemp:cef:chatMessage", (data: any, cb: (result: Record<string, never>) => void) => {
    sendBrowserChatMessage(data && data.message);
    cb({});
  });
}
