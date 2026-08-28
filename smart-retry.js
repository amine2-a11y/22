/* Jailbreak Amine PS4 - Safe Reload Retry, all firmware wrappers. */
(function(){
  "use strict";
  var KEY="jamine-reload-retry-v3";
  var MAX=2, BASE=2500;
  function get(){try{return JSON.parse(sessionStorage.getItem(KEY)||'{"n":0,"last":0}')}catch(e){return {n:0,last:0}}}
  function set(s){try{sessionStorage.setItem(KEY,JSON.stringify(s))}catch(e){}}
  function shouldRetry(reason){
    var t=String(reason||"");
    return /unhandled|dieerror|multiple blurs|blurs before pop|rejection|abort|timeout|failed|failure/i.test(t);
  }
  function retry(reason){
    if(!shouldRetry(reason)) return false;
    var s=get(), now=Date.now();
    if(s.n>=MAX || now-s.last<1500) return false;
    s.n++; s.last=now; set(s);
    var delay=BASE*Math.pow(2,s.n-1);
    setTimeout(function(){
      try{ location.reload(); }catch(e){}
    },delay);
    return true;
  }
  function clean(){try{sessionStorage.removeItem(KEY)}catch(e){}}
  window.SafeReloadRetry={retry:retry,reset:clean};
  addEventListener('unhandledrejection',function(e){
    if(retry(e&&e.reason)){e.preventDefault();}
  },true);
  addEventListener('error',function(e){
    if(retry(e&&e.error)){e.preventDefault();}
  },true);
})();
