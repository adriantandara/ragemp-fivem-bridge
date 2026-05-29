import rpc from "@ragemp-fivem-bridge/rage-rpc";
import { EventManager } from "./events.js";
import { toClient, log, setDebug, isDebug } from "./transport.js";

export function createRuntime() {
  let selfId = "host";
  const getSelfId = () => selfId;

  const events = new EventManager(getSelfId);

  const mp = {
    trigger(eventName, ...args) {
      log("trigger ->client", eventName, "from", selfId);
      toClient("ragemp:browserEvent", { browserId: selfId, event: eventName, args });
    },
    invoke(eventName, ...args) {
      mp.trigger(eventName, ...args);
    },
    events,
    cef: {
      setDebugMode: setDebug,
      get debug() { return isDebug(); },
      get id() { return selfId; },
    },
  };

  globalThis.mp = mp;
  mp.rpc = rpc;
  rpc.register("__rpc:noop", () => true);

  function setSelfId(id) {
    selfId = id;
  }

  function handlePayload(data) {
    if (!data || typeof data !== "object") return;

    if (data.type === "__ragemp:exec" && data.code) {
      try { (0, eval)(data.code); } catch (e) { log("exec error", String(e)); console.error("[ragemp:exec]", e); }
      return;
    }

    if (data.type === "__ragemp:reload") {
      location.reload();
      return;
    }

    if (data.type === "__ragemp:assignId") {
      setSelfId(data.browserId);
      log("assigned id", data.browserId);
      return;
    }

    if (data.event) {
      log("recv event", data.event);
      events._fire(data.event, ...(Array.isArray(data.args) ? data.args : []));
      return;
    }

    if (data.proc) {
      log("recv proc call", data.proc);
      events.runProc(data.proc, data.args)
        .then((result) => toClient("ragemp:cefProcResult", { browserId: selfId, requestId: data.requestId, result }))
        .catch((err) => toClient("ragemp:cefProcResult", { browserId: selfId, requestId: data.requestId, error: err instanceof Error ? err.message : String(err) }));
      return;
    }

    if (data.procResult) {
      events.resolveProc(data.requestId, data.result, data.error);
    }
  }

  return { mp, events, handlePayload, setSelfId, getSelfId };
}
