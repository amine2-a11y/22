/* The landing page: pick a payload, then start the run.
 *
 * Leaving this page has to be a real navigation from it -- the referrer guard
 * in jb.js arms the chain only when the run page was reached from here. */

var TARGET = {
  hen: "log=1&afterglow=run&payload=hen.bin",
  goldhen: "log=1&afterglow=run&mode=goldhen",
};

var AUTOSTART_SECONDS = 5;
var STORE_KEY = "afterglow.choice";

var form = document.getElementById("pick");
var autoBox = document.getElementById("auto");
var countEl = document.getElementById("count");
var ticker = null;

/* The choice is remembered in localStorage, not by any HTTP cache: cache
   headers decide whether a file is fetched again, never what the page
   remembers. Both accessors are guarded, because storage can be unavailable
   or throw outright, and the page has to work either way. */
function remember() {
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({ payload: picked(), autostart: autoBox.checked }),
    );
  } catch (e) {}
}

function restore() {
  var saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
  } catch (e) {}
  if (!saved) return;

  if (saved.payload && TARGET[saved.payload]) {
    var radio = form.querySelector(
      'input[name="payload"][value="' + saved.payload + '"]',
    );
    if (radio) radio.checked = true;
  }
  if (typeof saved.autostart === "boolean") autoBox.checked = saved.autostart;
}

function picked() {
  var radio = form.querySelector('input[name="payload"]:checked');
  return radio ? radio.value : "goldhen";
}

function start() {
  stopClock();
  location.href = "jb.html?" + TARGET[picked()];
}

function stopClock() {
  if (ticker !== null) {
    clearInterval(ticker);
    ticker = null;
  }
  countEl.textContent = "";
}

function startClock() {
  var left = AUTOSTART_SECONDS;
  countEl.textContent = "starting in " + left + "s";
  ticker = setInterval(function () {
    left -= 1;
    if (left <= 0) {
      start();
      return;
    }
    countEl.textContent = "starting in " + left + "s";
  }, 1000);
}

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  start();
});

form.addEventListener("change", function (ev) {
  remember();
  if (ev.target === autoBox) {
    if (autoBox.checked) startClock();
    else stopClock();
    return;
  }
  /* Switching payload while the clock runs restarts it, so what is counting
     down is always what is actually selected. */
  if (ev.target.name === "payload" && autoBox.checked) {
    stopClock();
    startClock();
  }
});

/* A run that reached the kernel swaps the address for this page and leaves
   the marker behind (jb.js, at the end of the chain). Coming up on that
   address means the browser restored a finished run, so the clock stays
   stopped -- the choice is still restored and start still works, it just does
   not go by itself. */
var DONE = false;
try {
  DONE = new URLSearchParams(location.search).get("afterglow") === "done";
} catch (e) {}

restore();
if (DONE) {
  countEl.textContent = "kernel already patched - autostart held";
} else if (autoBox.checked) {
  startClock();
}


/* Report whether the PS4 browser has stored this host for offline use. */
(function () {
  var el = document.getElementById("cacheStatus");
  if (!el) return;
  function show(text, state) {
    el.textContent = text;
    el.className = "cache-status" + (state ? " " + state : "");
  }
  try {
    var appCache = window.applicationCache;
    if (!appCache) { show("OFFLINE CACHE: NOT SUPPORTED BY THIS BROWSER", "error"); return; }
    function update() {
      if (appCache.status === 1) show("OFFLINE CACHE: READY", "ready");
      else if (appCache.status === 2 || appCache.status === 3) show("OFFLINE CACHE: DOWNLOADING FILES…", "");
      else if (appCache.status === 4) show("OFFLINE CACHE: UPDATE READY — REOPEN PAGE", "ready");
      else if (appCache.status === 5) show("OFFLINE CACHE: OBSOLETE — RELOAD ONLINE", "error");
      else show("OFFLINE CACHE: FIRST ONLINE LOAD REQUIRED", "");
    }
    ["checking", "downloading", "progress", "cached", "noupdate", "updateready", "obsolete", "error"].forEach(function (name) {
      appCache.addEventListener(name, function () {
        if (name === "cached" || name === "noupdate") show("OFFLINE CACHE: READY", "ready");
        else if (name === "error") show("OFFLINE CACHE: DOWNLOAD FAILED", "error");
        else update();
      }, false);
    });
    update();
  } catch (e) { show("OFFLINE CACHE: STATUS UNAVAILABLE", "error"); }
})();
