import { startManager } from "./manager.js";
import { startView } from "./view.js";
import { log } from "./transport.js";

function hasViewMarker() {
  if (typeof window === "undefined") return false;
  const hash = window.location && window.location.hash ? String(window.location.hash) : "";
  if (hash.indexOf("__ragemp_view") !== -1) return true;
  if (typeof window.name === "string" && window.name.indexOf("__ragemp_view") !== -1) return true;
  return false;
}

const IS_VIEW = hasViewMarker();

log("boot", IS_VIEW ? "view (iframe)" : "manager (host)");

if (IS_VIEW) startView();
else startManager();
