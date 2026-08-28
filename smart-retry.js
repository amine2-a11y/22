/* Jailbreak Amine PS4 - Safe Reload Retry, shared by firmware pages. */
(function(){
  "use strict";
  var KEY="jamine-reload-retry-v6";
  var MAX=2, BASE=2500;

  function get(){
    try { return JSON.parse(sessionStorage.getItem(KEY)||'{"n":0,"last":0}'); }
    catch(e) { return {n:0,last:0}; }
  }
  function set(s){ try { sessionStorage.setItem(KEY,JSON.stringify(s)); } catch(e) {} }

  function isRetryable(reason){
    var t=String(reason||"");
    return /failed SerializedScriptValue UAF|multiple blurs|blurs before pop|DieError|unhandled rejection|unhandled error/i.test(t);
  }

  function retry(reason){
    if(!isRetryable(reason)) return false;
    var s=get(), now=Date.now();
    if(s.n>=MAX || now-s.last<1500) return false;

    s.n++;
    s.last=now;
    set(s);

    // Tell the diagnostic module that this same failure is already handled.
    // This prevents a second alert/reload handler from acting on it.
    window.__safeReloadRetryHandled=true;

    var delay=BASE*Math.pow(2,s.n-1);
    setTimeout(function(){
      try {
        // Reload the current document only. Do not navigate to a new URL or
        // create another history/frequently-visited page entry.
        location.reload();
      } catch(e) {
        try { location.reload(); } catch(e2) {}
      }
    },delay);
    return true;
  }

  function clean(){
    try { sessionStorage.removeItem(KEY); } catch(e) {}
    window.__safeReloadRetryHandled=false;
  }

  window.SafeReloadRetry={retry:retry,reset:clean};

  addEventListener('unhandledrejection',function(e){
    if(retry(e&&e.reason)) e.preventDefault();
  },true);

  addEventListener('error',function(e){
    if(retry(e&&e.error)) e.preventDefault();
  },true);
})();
