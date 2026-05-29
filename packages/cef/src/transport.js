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

export function resourceName() {
  if (
    typeof window !== "undefined" &&
    window.location &&
    typeof window.location.hostname === "string"
  ) {
    const host = window.location.hostname;
    if (host.indexOf("cfx-nui-") === 0) return host.slice(8);
    if (host && host !== "localhost") return host;
  }
  if (typeof GetParentResourceName === "function")
    return GetParentResourceName();
  return "ragemp-fivem-bridge";
}

export async function toClient(channel, body) {
  const url = `https://${resourceName()}/${channel}`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  }).catch((err) => log("toClient failed", channel, String(err)));
}
