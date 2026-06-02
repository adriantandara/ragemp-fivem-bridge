(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    if (typeof mp === "undefined") {
      console.warn("[showcase ui] bridge not loaded — running outside the game?");
      return;
    }

    var playersEl = document.getElementById("players");
    var timeEl = document.getElementById("time");

    mp.events.add("hud:update", function (data) {
      if (data && typeof data.players !== "undefined") playersEl.textContent = data.players;
      if (data && data.time) timeEl.textContent = data.time;
    });

    mp.trigger("showcase:hudReady");

    document.querySelectorAll(".actions button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        mp.trigger("showcase:uiButton", btn.dataset.label);
      });
    });

    document.getElementById("close").addEventListener("click", function () {
      mp.trigger("showcase:uiClose");
    });
  });
})();
