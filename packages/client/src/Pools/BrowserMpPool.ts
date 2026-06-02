import { Pool } from "@ragemp-fivem-bridge/shared";
import { poolAdd } from "@ragemp-fivem-bridge/shared/internal";
import { BrowserMp, setBrowserProcTimeout, getBrowserProcTimeout } from "../Entities/BrowserMp";
import { setupBrowserPool } from "../internal/pools/browserPoolService";

let _browserIdCounter = -1;

export class BrowserMpPool extends Pool {
  _chatBrowser: BrowserMp | null = null;
  at!: (id: number) => BrowserMp | null;
  exists!: (entity: number | { id: number }) => boolean;
  forEach!: (fn: (entity: BrowserMp) => void) => void;
  toArray!: () => BrowserMp[];

  constructor() {
    super();
    setupBrowserPool(this);
  }

  new(url: string): BrowserMp {
    const id = ++_browserIdCounter;
    const browser = new BrowserMp(id, url);
    poolAdd(this, browser);

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
}
