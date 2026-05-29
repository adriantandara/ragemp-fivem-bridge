import { createRuntime } from "./core.js";
import { log, resourceName } from "./transport.js";

export function startView() {
  const { handlePayload } = createRuntime();

  log("view ready in", typeof window !== "undefined" ? window.location.href : "?", "resource =", resourceName());

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
