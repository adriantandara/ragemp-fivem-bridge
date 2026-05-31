import { createRuntime } from "./core.js";
import { log, resourceName, toClient, preventReload } from "./transport.js";

export function startManager() {
  const { handlePayload } = createRuntime();
  const frames = new Map();
  const pointerState = new Map();
  const orderState = new Map();
  const HOST_RESOURCE = resourceName();
  let focusedBrowserId = null;

  function applyPointer(browserId) {
    const entry = frames.get(browserId);
    if (!entry || !entry.iframe) return;
    entry.iframe.style.pointerEvents =
      pointerState.get(browserId) === false ? "none" : "auto";
  }

  function applyOrder(browserId) {
    const entry = frames.get(browserId);
    if (!entry || !entry.iframe) return;
    const z = orderState.get(browserId);
    entry.iframe.style.zIndex = z == null ? "" : String(z);
  }

  function focusFrame(browserId) {
    const entry = frames.get(browserId);
    if (!entry || !entry.iframe) return;
    try {
      if (entry.iframe.contentWindow) entry.iframe.contentWindow.focus();
    } catch (e) {}
    try {
      entry.iframe.focus();
    } catch (e) {}
  }

  function setFocusedBrowser(browserId) {
    focusedBrowserId = browserId;
    if (browserId !== null && browserId !== undefined) focusFrame(browserId);
  }

  log(
    "manager ready on",
    typeof window !== "undefined" ? window.location.href : "?",
    "resource =",
    HOST_RESOURCE,
  );

  function ensureContainer() {
    let c = document.getElementById("__ragemp_browsers");
    if (!c) {
      c = document.createElement("div");
      c.id = "__ragemp_browsers";
      c.style.cssText =
        "position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;border:0;margin:0;padding:0;pointer-events:none;background:transparent;z-index:0;";
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
      try {
        resolved = new URL(url, location.href).href;
      } catch (e) {
        resolved = url;
      }
    }
    return (
      resolved +
      (resolved.indexOf("#") === -1 ? "#__ragemp_view" : "&__ragemp_view")
    );
  }

  const BRIDGE_URL = `https://cfx-nui-${HOST_RESOURCE}/ui/_bridge.js`;

  function tryInjectBridge(iframe, browserId, done) {
    try {
      const doc = iframe.contentDocument;
      if (!doc) {
        done();
        return;
      }
      if (doc.querySelector("script[data-ragemp-bridge]")) {
        done();
        return;
      }
      const existing = doc.querySelector('script[src*="_bridge"]');
      if (existing) {
        done();
        return;
      }
      const script = doc.createElement("script");
      script.setAttribute("data-ragemp-bridge", "1");
      script.src = BRIDGE_URL;
      script.onload = done;
      script.onerror = done;
      (doc.head || doc.documentElement).appendChild(script);
    } catch (e) {
      done();
    }
  }

  function flush(entry, browserId) {
    entry.ready = true;
    try {
      entry.iframe.contentWindow.postMessage(
        {
          __ragempForward: true,
          inner: {
            type: "__ragemp:assignId",
            browserId,
            resource: HOST_RESOURCE,
          },
        },
        "*",
      );
    } catch (e) {
      log("assignId post failed", String(e));
    }
    const pending = entry.queue.splice(0);
    for (const inner of pending) {
      try {
        entry.iframe.contentWindow.postMessage(
          { __ragempForward: true, inner },
          "*",
        );
      } catch (e) {
        log("flush post failed", String(e));
      }
    }
  }

  function decodeDataHtml(url) {
    const m = /^data:text\/html([^,]*),([\s\S]*)$/i.exec(url);
    if (!m) return null;
    const meta = m[1] || "";
    const content = m[2];
    try {
      if (/;base64/i.test(meta)) return atob(content);
      return decodeURIComponent(content);
    } catch (e) {
      try {
        return decodeURIComponent(content);
      } catch (_) {
        return content;
      }
    }
  }

  function createBrowser(browserId, url) {
    if (frames.has(browserId)) {
      log("create ignored, exists", browserId);
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.dataset.browserId = String(browserId);
    iframe.setAttribute("allowtransparency", "true");
    iframe.setAttribute("frameborder", "0");
    iframe.style.cssText =
      "position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;border:0;margin:0;padding:0;background:transparent;pointer-events:auto;display:block;";

    const entry = { iframe, ready: false, queue: [] };

    iframe.addEventListener("load", () => {
      log("iframe loaded", browserId);
      tryInjectBridge(iframe, browserId, () => {
        flush(entry, browserId);
        if (focusedBrowserId === browserId) focusFrame(browserId);
      });
    });

    const inlineHtml = /^data:text\/html/i.test(url)
      ? decodeDataHtml(url)
      : null;

    if (inlineHtml !== null) {
      log("create browser", browserId, "(inline html via srcdoc)");
      iframe.setAttribute("name", "__ragemp_view");
      iframe.setAttribute(
        "sandbox",
        "allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-pointer-lock allow-downloads allow-top-navigation-by-user-activation",
      );
      iframe.addEventListener("error", () =>
        log("iframe error", browserId, "srcdoc"),
      );
      iframe.srcdoc = inlineHtml;
    } else {
      const resolved = resolveUrl(url);
      log("create browser", browserId, url, "->", resolved);
      iframe.addEventListener("error", () =>
        log("iframe error", browserId, resolved),
      );
      iframe.src = resolved;
    }

    ensureContainer().appendChild(iframe);
    frames.set(browserId, entry);
    applyPointer(browserId);
    applyOrder(browserId);

    setTimeout(() => {
      if (!entry.ready) log("iframe still not loaded after 5s", browserId);
    }, 5000);
  }

  function destroyBrowser(browserId) {
    const entry = frames.get(browserId);
    if (entry) {
      entry.iframe.remove();
      frames.delete(browserId);
      log("destroyed browser", browserId);
    }
    if (focusedBrowserId === browserId) focusedBrowserId = null;
  }

  function forward(browserId, inner) {
    const entry = frames.get(browserId);
    if (!entry) {
      log("forward to unknown browser", browserId);
      return;
    }
    if (!entry.ready) {
      entry.queue.push(inner);
      return;
    }
    if (entry.iframe.contentWindow) {
      entry.iframe.contentWindow.postMessage(
        { __ragempForward: true, inner },
        "*",
      );
    }
  }

  function forwardKey(e, down) {
    if (down && e.repeat) return;
    const t = e.target;
    if (
      t &&
      (t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA" ||
        t.tagName === "SELECT" ||
        t.isContentEditable)
    ) {
      return;
    }
    const code = e.keyCode || e.which;
    if (code) toClient("ragemp:__keyEvent", { code, down });
  }

  function forwardKeyToFrames(e, down) {
    const init = {
      key: e.key,
      code: e.code,
      keyCode: e.keyCode || e.which || 0,
      which: e.which || e.keyCode || 0,
      location: e.location || 0,
      altKey: !!e.altKey,
      ctrlKey: !!e.ctrlKey,
      shiftKey: !!e.shiftKey,
      metaKey: !!e.metaKey,
      repeat: !!e.repeat,
    };
    for (const entry of frames.values()) {
      if (!entry.ready || !entry.iframe.contentWindow) continue;
      try {
        entry.iframe.contentWindow.postMessage(
          { __ragempForward: true, inner: { type: "__ragemp:key", down, init } },
          "*",
        );
      } catch (err) {
        log("key forward failed", String(err));
      }
    }
  }

  window.addEventListener(
    "keydown",
    (e) => {
      preventReload(e);
      forwardKey(e, true);
      forwardKeyToFrames(e, true);
    },
    true,
  );
  window.addEventListener(
    "keyup",
    (e) => {
      preventReload(e);
      forwardKey(e, false);
      forwardKeyToFrames(e, false);
    },
    true,
  );

  window.addEventListener("message", (nativeEvent) => {
    const data = nativeEvent.data;
    if (!data || typeof data !== "object") return;

    if (data.type === "__ragemp:keyFromFrame") {
      toClient("ragemp:__keyEvent", { code: data.code, down: !!data.down });
      return;
    }

    const src = nativeEvent.source;
    if (src) {
      for (const entry of frames.values()) {
        if (entry.iframe && entry.iframe.contentWindow === src) return;
      }
    }

    if (
      typeof data.type === "string" &&
      data.type.indexOf("__ragemp:browser:") === 0
    ) {
      log("manager recv", data.type, data.browserId ?? "");
    }

    switch (data.type) {
      case "__ragemp:browser:create":
        createBrowser(data.browserId, data.url);
        return;
      case "__ragemp:browser:focus":
        setFocusedBrowser(data.browserId);
        return;
      case "__ragemp:browser:blur":
        if (focusedBrowserId === data.browserId) focusedBrowserId = null;
        return;
      case "__ragemp:browser:destroy":
        pointerState.delete(data.browserId);
        orderState.delete(data.browserId);
        destroyBrowser(data.browserId);
        return;
      case "__ragemp:browser:pointerEvents":
        pointerState.set(data.browserId, data.enabled !== false);
        applyPointer(data.browserId);
        return;
      case "__ragemp:browser:orderId":
        orderState.set(data.browserId, data.orderId | 0);
        applyOrder(data.browserId);
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
        forward(data.browserId, {
          proc: data.proc,
          requestId: data.requestId,
          args: data.args,
        });
        return;
      case "__ragemp:browser:procResult":
        forward(data.browserId, {
          procResult: true,
          requestId: data.requestId,
          result: data.result,
          error: data.error,
        });
        return;
    }

    handlePayload(data);
  });
}
