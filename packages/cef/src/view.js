import { createRuntime } from "./core.js";
import { log, resourceName, preventReload } from "./transport.js";

export function startView() {
  const { handlePayload, getSelfId } = createRuntime();

  log("view ready in", typeof window !== "undefined" ? window.location.href : "?", "resource =", resourceName());

  let readyAcked = false;
  function announceReady(attempt) {
    if (readyAcked) return;
    if (!window.parent || window.parent === window) return;
    try {
      window.parent.postMessage({ type: "__ragemp:viewReady" }, "*");
    } catch (e) {}
    if (attempt < 40) setTimeout(() => announceReady(attempt + 1), 100);
  }
  function beginAnnounce() {
    announceReady(0);
  }
  if (typeof document === "undefined" || document.readyState !== "loading") {
    beginAnnounce();
  } else {
    document.addEventListener("DOMContentLoaded", beginAnnounce, { once: true });
  }

  function forwardNativeKey(e, down) {
    if (!e.isTrusted) return;
    preventReload(e);
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
    if (code && window.parent && window.parent !== window) {
      try {
        window.parent.postMessage({ type: "__ragemp:keyFromFrame", code, down }, "*");
      } catch (err) {}
    }
  }
  window.addEventListener("keydown", (e) => forwardNativeKey(e, true), true);
  window.addEventListener("keyup", (e) => forwardNativeKey(e, false), true);

  window.addEventListener("message", (nativeEvent) => {
    const data = nativeEvent.data;
    if (!data || typeof data !== "object") return;
    if (data.__ragempForward && data.inner) {
      const inner = data.inner;
      if (inner.type === "__ragemp:assignId") readyAcked = true;
      log("view recv", inner.type || (inner.event ? "event:" + inner.event : inner.proc ? "proc:" + inner.proc : "msg"));
      handlePayload(inner);
    }
  });
}
