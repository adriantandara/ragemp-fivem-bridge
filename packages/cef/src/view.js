import { createRuntime } from "./core.js";
import { log, resourceName } from "./transport.js";

export function startView() {
  const { handlePayload } = createRuntime();

  log("view ready in", typeof window !== "undefined" ? window.location.href : "?", "resource =", resourceName());

  function forwardNativeKey(e, down) {
    if (!e.isTrusted) return;
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
      log("view recv", inner.type || (inner.event ? "event:" + inner.event : inner.proc ? "proc:" + inner.proc : "msg"));
      handlePayload(inner);
    }
  });
}
