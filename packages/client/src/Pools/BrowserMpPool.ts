import { Pool } from "@ragemp-fivem-bridge/shared";
import { poolAdd, CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { BrowserMp, setBrowserProcTimeout, getBrowserProcTimeout } from "../Entities/BrowserMp";
import { setupBrowserPool } from "../internal/pools/browserPoolService";
import { initBrowserPoolInternals } from "../internal/browserInternals";

let _browserIdCounter = -1;

export class BrowserMpPool extends Pool<BrowserMp> {
  constructor() {
    super();
    initBrowserPoolInternals(this);
    setupBrowserPool(this);
  }

  new(url: string): BrowserMp {
    const id = ++_browserIdCounter;
    const browser = new BrowserMp(CONSTRUCT, id, url);
    poolAdd(this, browser);

    if (typeof SendNuiMessage === "function") {
      SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:create", browserId: id, url }));
    }

    browser.orderId = id;
    browser.active = true;

    globalThis.mp?.events?.call("browserCreated", browser);

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
}
