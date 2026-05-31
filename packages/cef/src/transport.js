let DEBUG = false;

export function setDebug(state) {
  DEBUG = !!state;
}

export function isDebug() {
  return DEBUG;
}

export function log(...args) {
  if (DEBUG) console.log("[cef]", ...args);
}

let RESOURCE_OVERRIDE = null;

export function setResourceName(name) {
  if (name && typeof name === "string") RESOURCE_OVERRIDE = name;
}

export function resourceName() {
  if (RESOURCE_OVERRIDE) return RESOURCE_OVERRIDE;
  if (typeof GetParentResourceName === "function") {
    try {
      const owner = GetParentResourceName();
      if (owner) return owner;
    } catch (e) {}
  }
  if (
    typeof window !== "undefined" &&
    window.location &&
    typeof window.location.hostname === "string"
  ) {
    const host = window.location.hostname;
    if (host.indexOf("cfx-nui-") === 0) return host.slice(8);
    if (host && host !== "localhost") return host;
  }
  return "";
}

export function isReloadKey(e) {
  const code = e.keyCode || e.which;
  if (code === 116) return true;
  if (e.ctrlKey && code === 82) return true;
  return false;
}

export function preventReload(e) {
  if (e.isTrusted === false) return false;
  if (!isReloadKey(e)) return false;
  if (typeof e.preventDefault === "function") e.preventDefault();
  return true;
}

export async function toClient(channel, body) {
  const url = `https://${resourceName()}/${channel}`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  }).catch((err) => log("toClient failed", channel, String(err)));
}
