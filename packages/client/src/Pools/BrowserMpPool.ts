import { Pool } from "@ragemp-fivem-bridge/shared";
import { CONSTRUCT } from "@ragemp-fivem-bridge/shared/internal";
import { addLocal } from "../internal/pools/clientPool";
import { BrowserMp, setBrowserProcTimeout, getBrowserProcTimeout } from "../Entities/BrowserMp";
import { setupBrowserPool } from "../internal/pools/browserPoolService";
import { initBrowserPoolInternals } from "../internal/browserInternals";

export class BrowserMpPool extends Pool<BrowserMp> {
  constructor() {
    super();
    initBrowserPoolInternals(this);
    setupBrowserPool(this);
  }

  new(url: string): BrowserMp {
    const browser = new BrowserMp(CONSTRUCT, 0, url);
    addLocal(this, browser);
    const id = browser.id;

    if (typeof SendNuiMessage === "function") {
      SendNuiMessage(JSON.stringify({ type: "__ragemp:browser:create", browserId: id, url }));
    }

    browser.orderId = id;

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
}
