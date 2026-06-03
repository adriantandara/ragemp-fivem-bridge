import { defineInternals } from "@ragemp-fivem-bridge/shared/internal";
import type { BrowserMp } from "../Entities/BrowserMp";
import type { BrowserMpPool } from "../Pools/BrowserMpPool";

export interface BrowserInternalsRec {
  url: string;
  active: boolean;
  isChatBrowser: boolean;
  destroyed: boolean;
  inputEnabled: boolean;
  mouseInputEnabled: boolean;
  orderId: number;
  domReady: boolean;
  cachedExec: string[];
}

export const BrowserInternals = defineInternals<BrowserInternalsRec>();

export function initBrowserInternals(browser: BrowserMp, url: string): BrowserInternalsRec {
  return BrowserInternals.init(browser, {
    url,
    active: false,
    isChatBrowser: false,
    destroyed: false,
    inputEnabled: true,
    mouseInputEnabled: true,
    orderId: 0,
    domReady: false,
    cachedExec: [],
  });
}

export function browserDomReady(browser: BrowserMp): void {
  const rec = BrowserInternals.get(browser);
  rec.domReady = true;
  if (rec.cachedExec.length === 0) return;
  for (const code of rec.cachedExec) browser.execute(code);
}

export function applyBrowserPointerEvents(browser: BrowserMp): void {
  const rec = BrowserInternals.get(browser);
  if (rec.destroyed || typeof SendNuiMessage !== "function") return;
  SendNuiMessage(
    JSON.stringify({
      type: "__ragemp:browser:pointerEvents",
      browserId: browser.id,
      enabled: rec.inputEnabled && rec.mouseInputEnabled,
    })
  );
}

interface BrowserPoolRec {
  chatBrowser: BrowserMp | null;
}

const BrowserPoolInternals = defineInternals<BrowserPoolRec>();

export function initBrowserPoolInternals(pool: BrowserMpPool): void {
  BrowserPoolInternals.init(pool, { chatBrowser: null });
}

export function getChatBrowser(pool: BrowserMpPool): BrowserMp | null {
  return BrowserPoolInternals.get(pool).chatBrowser;
}

export function setChatBrowser(pool: BrowserMpPool, browser: BrowserMp | null): void {
  BrowserPoolInternals.get(pool).chatBrowser = browser;
}

interface PendingProc {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

const pendingProcs = new Map<number, PendingProc>();
let procCounter = 0;
let procTimeout = 10000;

export function setBrowserProcTimeout(ms: number): void {
  if (typeof ms === "number" && ms > 0) procTimeout = ms;
}

export function getBrowserProcTimeout(): number {
  return procTimeout;
}

export function callBrowserProc<T = any>(browserId: number, procName: string, args: any[]): Promise<T> {
  const requestId = ++procCounter;
  return new Promise<T>((resolve, reject) => {
    pendingProcs.set(requestId, { resolve, reject });
    SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:proc", browserId, proc: procName, requestId, args }));
    setTimeout(() => {
      if (pendingProcs.has(requestId)) {
        pendingProcs.delete(requestId);
        reject(new Error(`Proc "${procName}" timed out after ${procTimeout}ms`));
      }
    }, procTimeout);
  });
}

let procChannelRegistered = false;

export function registerBrowserProcChannel(): void {
  if (procChannelRegistered) return;
  if (typeof RegisterNuiCallbackType !== "function") return;
  procChannelRegistered = true;

  RegisterNuiCallbackType("ragemp:cefProcResult");
  on("__cfx_nui:ragemp:cefProcResult", (data: any, cb: (result: any) => void) => {
    const pending = pendingProcs.get(data.requestId);
    if (pending) {
      pendingProcs.delete(data.requestId);
      if (data.error) pending.reject(new Error(data.error));
      else pending.resolve(data.result);
    }
    cb({});
  });

  RegisterNuiCallbackType("ragemp:cefProc");
  on("__cfx_nui:ragemp:cefProc", (data: any, cb: (result: any) => void) => {
    const { procName, requestId, args, browserId } = data;
    const handler = globalThis.mp?.events?._procs?.get(procName);
    if (!handler) {
      SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:procResult", browserId, requestId, error: `Unknown proc: ${procName}` }));
      cb({});
      return;
    }
    Promise.resolve()
      .then(() => handler(...(args ?? [])))
      .then((result) => SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:procResult", browserId, requestId, result })))
      .catch((err) => SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:procResult", browserId, requestId, error: String(err) })));
    cb({});
  });
}
