(function () {
  var chat = document.getElementById("chat");
  var messages = document.getElementById("messages");
  var input = document.getElementById("input");

  var MAX_MESSAGES = 80;
  var history = [];
  var historyIndex = -1;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  var FIVEM_COLORS = ["#fff", "#f44", "#4caf50", "#ff0", "#42a5f5", "#26c6da", "#ab47bc", "#fff", "#ff9800", "#9e9e9e"];

  function colorize(text) {
    var out = "";
    var open = 0;
    var i = 0;
    text = escapeHtml(text);

    while (i < text.length) {

      var rage = /^!\{#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\}/.exec(text.slice(i));
      if (rage) {
        if (open) { out += "</span>"; open--; }
        out += '<span style="color:#' + rage[1] + '">';
        open++;
        i += rage[0].length;
        continue;
      }

      var fv = /^\^([0-9])/.exec(text.slice(i));
      if (fv) {
        if (open) { out += "</span>"; open--; }
        out += '<span style="color:' + FIVEM_COLORS[+fv[1]] + '">';
        open++;
        i += 2;
        continue;
      }
      out += text[i];
      i++;
    }
    while (open-- > 0) out += "</span>";
    return out;
  }

  function textFromArgs(args, color) {
    if (!Array.isArray(args)) return String(args == null ? "" : args);
    if (args.length >= 2) return String(args[0]) + ": " + args.slice(1).join(" ");
    return String(args[0] == null ? "" : args[0]);
  }

  function addMessage(args, color) {
    var div = document.createElement("div");
    div.className = "msg";
    div.innerHTML = colorize(textFromArgs(args, color));
    messages.appendChild(div);
    while (messages.children.length > MAX_MESSAGES) messages.removeChild(messages.firstChild);
    messages.scrollTop = messages.scrollHeight;
  }

  function openInput() {
    chat.classList.add("input-open");
    chat.classList.remove("hidden-input");
    input.value = "";
    historyIndex = -1;
    setTimeout(function () { input.focus(); }, 0);
  }

  function closeInput(message, canceled) {
    chat.classList.remove("input-open");
    chat.classList.add("hidden-input");
    input.blur();
    var text = message || "";
    fetch("https://ragemp-chat/chatResult", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, canceled: !!canceled }),
    }).catch(function () {});
  }

  window.addEventListener("message", function (e) {
    var data = e.data || {};
    switch (data.type) {
      case "ADD_MESSAGE":
        addMessage(data.args, data.color);
        break;
      case "CLEAR":
        messages.innerHTML = "";
        break;
      case "OPEN":
        openInput();
        break;
      case "VISIBILITY":
        chat.classList.toggle("hidden", !!data.hidden);
        break;
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      var msg = input.value.trim();
      if (msg.length) {
        history.unshift(msg);
        if (history.length > 40) history.pop();
      }
      closeInput(msg, false);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeInput("", true);
    } else if (e.key === "ArrowUp") {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      } else {
        historyIndex = -1;
        input.value = "";
      }
      e.preventDefault();
    }
  });
})();
