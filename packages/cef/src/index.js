import { startManager } from "./manager.js";
import { startView } from "./view.js";
import { log } from "./transport.js";

const IS_VIEW =
  typeof window !== "undefined" &&
  typeof window.location !== "undefined" &&
  String(window.location.hash || "").indexOf("__ragemp_view") !== -1;

log("boot", IS_VIEW ? "view (iframe)" : "manager (host)");

if (IS_VIEW) startView();
else startManager();
