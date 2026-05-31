import rpc from "@ragemp-fivem-bridge/rage-rpc";
import { EventManager } from "./events.js";
import { toClient, log, setDebug, isDebug, setResourceName } from "./transport.js";
import { installErrorCapture, serializeError, report } from "./errors.js";

function dispatchSyntheticKey(down, init) {
  if (typeof document === "undefined") return;
  const type = down ? "keydown" : "keyup";
  let event;
  try {
    event = new KeyboardEvent(type, {
      key: init.key,
      code: init.code,
      location: init.location || 0,
      altKey: !!init.altKey,
      ctrlKey: !!init.ctrlKey,
      shiftKey: !!init.shiftKey,
      metaKey: !!init.metaKey,
      repeat: !!init.repeat,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
  } catch (e) {
    event = document.createEvent("Event");
    event.initEvent(type, true, true);
  }
  const kc = init.keyCode || init.which || 0;
  try {
    Object.defineProperty(event, "keyCode", { configurable: true, get: () => kc });
    Object.defineProperty(event, "which", { configurable: true, get: () => kc });
    Object.defineProperty(event, "key", { configurable: true, get: () => init.key });
    Object.defineProperty(event, "code", { configurable: true, get: () => init.code });
  } catch (e) {  }
  const target =
    document.activeElement || document.body || document.documentElement || document;
  target.dispatchEvent(event);
}

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
      if (eventName === "command") {
        toClient("ragemp:cef:command", { command: args[0] });
        return;
      }
      if (eventName === "chatMessage" || eventName === "chat:message") {
        toClient("ragemp:cef:chatMessage", { message: args[0] });
        return;
      }
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

  installErrorCapture(
    (info) => toClient("ragemp:browserError", info),
    getSelfId,
  );

  function setSelfId(id) {
    selfId = id;
  }

  function handlePayload(data) {
    if (!data || typeof data !== "object") return;

    if (data.type === "__ragemp:exec" && data.code) {
      try {
        (0, eval)(data.code);
      } catch (e) {
        log("exec error", String(e));
        console.error("[ragemp:exec]", e);
        report({ kind: "exec", ...serializeError(e) });
      }
      return;
    }

    if (data.type === "__ragemp:reload") {
      location.reload();
      return;
    }

    if (data.type === "__ragemp:key") {
      dispatchSyntheticKey(data.down, data.init || {});
      return;
    }

    if (data.type === "__ragemp:assignId") {
      setSelfId(data.browserId);
      if (data.resource) setResourceName(data.resource);
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
