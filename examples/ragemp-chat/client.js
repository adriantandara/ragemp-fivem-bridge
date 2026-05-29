let isInputOpen = false;
let isActive = true;
let isHidden = false;
let controlTick = null;

function send(type, payload) {
  SendNuiMessage(JSON.stringify(Object.assign({ type }, payload)));
}

on("chat:addMessage", (data) => {
  const args = (data && data.args) || [];
  send("ADD_MESSAGE", { args, color: data && data.color, multiline: data && data.multiline });
});

on("chat:clear", () => send("CLEAR", {}));

on("chat:toggleActive", (state) => {
  isActive = !!state;
});

on("chat:toggleVisibility", (state) => {
  isHidden = !state;
  send("VISIBILITY", { hidden: isHidden });
});

function openInput() {
  if (isInputOpen || !isActive || isHidden) return;
  isInputOpen = true;
  SetNuiFocus(true, false);
  send("OPEN", {});
  if (controlTick === null) {
    controlTick = setTick(() => {
      if (!isInputOpen) {
        clearTick(controlTick);
        controlTick = null;
        return;
      }
      DisableControlAction(0, 1, true);
      DisableControlAction(0, 2, true);
      DisableControlAction(0, 24, true);
      DisableControlAction(0, 25, true);
      DisableControlAction(0, 142, true);
    });
  }
}

RegisterCommand("+ragempChatOpen", openInput, false);
RegisterCommand("-ragempChatOpen", () => {}, false);
RegisterKeyMapping("+ragempChatOpen", "Open chat", "keyboard", "T");

RegisterNuiCallbackType("chatResult");
on("__cfx_nui:chatResult", (data, cb) => {
  isInputOpen = false;
  SetNuiFocus(false, false);

  const message = data && typeof data.message === "string" ? data.message.trim() : "";
  if (!data || !data.canceled) {
    if (message.length > 0) {
      if (message.charAt(0) === "/") {
        ExecuteCommand(message.substring(1));
      } else {
        emitNet("ragemp:chat:message", message);
      }
    }
  }
  cb({ ok: true });
});

send("VISIBILITY", { hidden: false });
