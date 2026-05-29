import { createRuntime } from "./core.js";
import { log, resourceName } from "./transport.js";

export function startManager() {
  const { handlePayload } = createRuntime();
  const frames = new Map();
  const HOST_RESOURCE = resourceName();

  log("manager ready on", typeof window !== "undefined" ? window.location.href : "?", "resource =", HOST_RESOURCE);

  function ensureContainer() {
    let c = document.getElementById("__ragemp_browsers");
    if (!c) {
      c = document.createElement("div");
      c.id = "__ragemp_browsers";
      c.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;border:0;margin:0;padding:0;pointer-events:none;background:transparent;z-index:0;";
      (document.body || document.documentElement).appendChild(c);
    }
    return c;
  }

  function resolveUrl(url) {
    let resolved = url;
    const atMatch = /^@([^/]+)\/(.+)$/.exec(url);
    if (atMatch) {
      resolved = `https://cfx-nui-${atMatch[1]}/${atMatch[2]}`;
    } else if (!/^(https?:|nui:|file:|blob:|data:)/i.test(url)) {
      try { resolved = new URL(url, location.href).href; } catch (e) { resolved = url; }
    }
    return resolved + (resolved.indexOf("#") === -1 ? "#__ragemp_view" : "&__ragemp_view");
  }

  function flush(entry, browserId) {
    entry.ready = true;
    try { entry.iframe.contentWindow.postMessage({ __ragempForward: true, inner: { type: "__ragemp:assignId", browserId } }, "*"); } catch (e) { log("assignId post failed", String(e)); }
    const pending = entry.queue.splice(0);
    for (const inner of pending) {
      try { entry.iframe.contentWindow.postMessage({ __ragempForward: true, inner }, "*"); } catch (e) { log("flush post failed", String(e)); }
    }
  }

  function createBrowser(browserId, url) {
    if (frames.has(browserId)) { log("create ignored, exists", browserId); return; }
    const resolved = resolveUrl(url);
    log("create browser", browserId, url, "->", resolved);

    const iframe = document.createElement("iframe");
    iframe.dataset.browserId = String(browserId);
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("frameborder", "0");
    iframe.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;border:0;margin:0;padding:0;background:transparent;pointer-events:auto;display:block;";

    const entry = { iframe, ready: false, queue: [] };

    iframe.addEventListener("load", () => {
      log("iframe loaded", browserId);
      flush(entry, browserId);
    });
    iframe.addEventListener("error", () => log("iframe error", browserId, resolved));

    iframe.src = resolved;
    ensureContainer().appendChild(iframe);
    frames.set(browserId, entry);

    setTimeout(() => {
      if (!entry.ready) log("iframe still not loaded after 5s", browserId, resolved);
    }, 5000);
  }

  function destroyBrowser(browserId) {
    const entry = frames.get(browserId);
    if (entry) {
      entry.iframe.remove();
      frames.delete(browserId);
      log("destroyed browser", browserId);
    }
  }

  function forward(browserId, inner) {
    const entry = frames.get(browserId);
    if (!entry) { log("forward to unknown browser", browserId); return; }
    if (!entry.ready) { entry.queue.push(inner); return; }
    if (entry.iframe.contentWindow) {
      entry.iframe.contentWindow.postMessage({ __ragempForward: true, inner }, "*");
    }
  }

  window.addEventListener("message", (nativeEvent) => {
    const data = nativeEvent.data;
    if (!data || typeof data !== "object") return;

    if (typeof data.type === "string" && data.type.indexOf("__ragemp:browser:") === 0) {
      log("manager recv", data.type, data.browserId ?? "");
    }

    switch (data.type) {
      case "__ragemp:browser:create":
        createBrowser(data.browserId, data.url);
        return;
      case "__ragemp:browser:destroy":
        destroyBrowser(data.browserId);
        return;
      case "__ragemp:browser:exec":
        forward(data.browserId, { type: "__ragemp:exec", code: data.code });
        return;
      case "__ragemp:browser:reload":
        forward(data.browserId, { type: "__ragemp:reload" });
        return;
      case "__ragemp:browser:event":
        forward(data.browserId, { event: data.event, args: data.args });
        return;
      case "__ragemp:browser:proc":
        forward(data.browserId, { proc: data.proc, requestId: data.requestId, args: data.args });
        return;
      case "__ragemp:browser:procResult":
        forward(data.browserId, { procResult: true, requestId: data.requestId, result: data.result, error: data.error });
        return;
    }

    handlePayload(data);
  });
}
