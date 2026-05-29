let hud = null;

function openHud() {
  if (hud) return;

  hud = mp.browsers.new("index.html");
  mp.gui.cursor.visible = true;
}

function closeHud() {
  if (!hud) return;
  hud.destroy();
  hud = null;
  mp.gui.cursor.visible = false;
}

mp.events.add("showcase:toggleUI", () => {
  if (hud) closeHud();
  else openHud();
});

mp.events.add("showcase:uiClose", () => closeHud());

mp.events.add("showcase:hudReady", () => {
  mp.events.callRemote("showcase:requestHudUpdate");
});

mp.events.add("showcase:uiButton", (label) => {
  mp.gui.chat.push(`!{#4ade80}Browser button clicked: ${label}`);
});

let crossResourceBrowser = null;

mp.events.add("showcase:openCrossResource", (url) => {
  if (crossResourceBrowser && !crossResourceBrowser._destroyed) {
    crossResourceBrowser.destroy();
    crossResourceBrowser = null;
    mp.gui.cursor.visible = false;
  }
  crossResourceBrowser = mp.browsers.new(url);
  mp.gui.cursor.visible = true;
  mp.gui.chat.push(`!{#60a5fa}Browser opened: ${url}`);
});

mp.events.add("showcase:closeCrossResource", () => {
  if (!crossResourceBrowser) return;
  crossResourceBrowser.destroy();
  crossResourceBrowser = null;
  mp.gui.cursor.visible = false;
});

// F9 — toggle a login page loaded cross-resource via the @-path.
let loginBrowser = null;

function closeLogin() {
  if (!loginBrowser) return;
  loginBrowser.destroy();
  loginBrowser = null;
  mp.gui.cursor.visible = false;
}

mp.keys.bind(0x78, true, () => {
  if (loginBrowser) {
    closeLogin();
    return;
  }
  loginBrowser = mp.browsers.new("@ragemp/ui/login.html");
  mp.gui.cursor.visible = true;
  mp.gui.chat.push("!{#60a5fa}Login UI opened (F9 to close).");
});

mp.events.add("showcase:loginClose", () => closeLogin());

mp.events.add("showcase:loginSubmit", (username) => {
  mp.gui.chat.push(`!{#4ade80}Login submitted as: ${username}`);
  closeLogin();
});

// F10 — open an inline (data:) browser to prove the srcdoc CSP bypass works.
let dataBrowser = null;

function closeData() {
  if (!dataBrowser) return;
  dataBrowser.destroy();
  dataBrowser = null;
  mp.gui.cursor.visible = false;
}

mp.keys.bind(0x79, true, () => {
  if (dataBrowser) {
    closeData();
    return;
  }
  const html =
    '<!doctype html><html><head><style>' +
    'body{margin:0;font-family:"Segoe UI",sans-serif;background:rgba(0,0,0,0.5)}' +
    '#c{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;padding:24px;background:#11151c;color:#e5e7eb;border:1px solid #2b3340;border-radius:12px}' +
    'h1{margin:0 0 8px;color:#4ade80;font-size:18px}button{margin-top:14px;width:100%;padding:10px;background:#4ade80;color:#07210f;border:0;border-radius:8px;font-weight:700;cursor:pointer}' +
    '</style></head><body><div id="c"><h1>data: + srcdoc OK</h1>' +
    '<p>Inline &lt;style&gt; rendered despite FiveM CSP.</p><button id="x">Close</button></div>' +
    '<script src="https://cfx-nui-ragemp-fivem-bridge/ui/_bridge.js"><\/script>' +
    '<script>document.addEventListener("DOMContentLoaded",function(){var b=document.getElementById("x");b.addEventListener("click",function(){if(typeof mp!=="undefined")mp.trigger("showcase:dataClose")})});<\/script>' +
    '</body></html>';
  dataBrowser = mp.browsers.new("data:text/html," + encodeURIComponent(html));
  mp.gui.cursor.visible = true;
  mp.gui.chat.push("!{#60a5fa}data: browser opened (F10 to close). Inline style should render.");
});

mp.events.add("showcase:dataClose", () => closeData());
