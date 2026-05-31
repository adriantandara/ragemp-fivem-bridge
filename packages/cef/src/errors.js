let _forward = null;
let _getId = () => "host";
let _installed = false;

export function serializeError(value) {
  if (value && value instanceof Error) {
    return { message: value.message, name: value.name, stack: value.stack };
  }
  if (value && typeof value === "object") {
    try {
      return { message: JSON.stringify(value) };
    } catch (e) {
      return { message: String(value) };
    }
  }
  return { message: String(value) };
}

export function report(info) {
  if (!_forward) return;
  try {
    _forward({ browserId: _getId(), ...info });
  } catch (e) {}
}

export function installErrorCapture(forward, getId) {
  _forward = forward;
  if (typeof getId === "function") _getId = getId;
  if (_installed || typeof window === "undefined") return;
  _installed = true;

  window.addEventListener(
    "error",
    (e) => {
      const t = e.target;
      if (t && t !== window && t.tagName) {
        report({
          kind: "resource",
          message:
            "Failed to load " +
            String(t.tagName).toLowerCase() +
            ": " +
            (t.src || t.href || "(unknown)"),
          tag: t.tagName,
        });
        return;
      }
      const ser = serializeError(e.error);
      report({
        kind: "error",
        message: e.message || ser.message,
        source: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        name: ser.name,
        stack: ser.stack,
      });
    },
    true,
  );

  window.addEventListener("unhandledrejection", (e) => {
    const reason = e && "reason" in e ? e.reason : e;
    report({ kind: "unhandledrejection", ...serializeError(reason) });
  });
}
