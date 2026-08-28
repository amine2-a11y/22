/* Jailbreak Amine PS4 - Safe Smart Retry (orchestration only)
 * Retries transient page/runtime failures, but never automatically retries
 * after a reboot/crash. A pending attempt is persisted only as a crash guard.
 */
(function(){
  "use strict";
  var KEY="jamine-smart-retry-v2";
  var PENDING="jamine-smart-retry-pending-v2";
  var MAX=3, base=1800;
  var rebootGuard=false;

  function read(key, fallback){
    try { var v=localStorage.getItem(key); return v===null?fallback:JSON.parse(v); }
    catch(e){ return fallback; }
  }
  function write(key, value){ try{localStorage.setItem(key,JSON.stringify(value));}catch(e){} }
  function sessionState(){
    try { return JSON.parse(sessionStorage.getItem(KEY)||'{"n":0}'); }
    catch(e){ return {n:0}; }
  }
  function sessionSave(s){ try{sessionStorage.setItem(KEY,JSON.stringify(s));}catch(e){} }
  function sessionReset(){ try{sessionStorage.removeItem(KEY);}catch(e){} }
  function log(msg){
    try{
      var c=document.getElementById("console");
      if(c) c.textContent += "\n[Smart Retry] "+msg;
    }catch(e){}
  }

  // sessionStorage normally survives an ordinary reload/navigation but is lost
  // when the browser/console restarts. If a retry was pending and the session
  // is gone, treat it as a crash/reboot and refuse automatic retry.
  (function detectReboot(){
    try{
      var p=read(PENDING,null);
      if(p && !sessionStorage.getItem(KEY)){
        rebootGuard=true;
        log("Previous attempt did not return cleanly; automatic retry disabled after reboot/crash.");
      }
    }catch(e){}
  })();

  function clearPending(){ try{localStorage.removeItem(PENDING);}catch(e){} }

  function attempt(action, reason){
    if(rebootGuard){
      log("Stopped: reboot/crash guard is active. No automatic retry.");
      return false;
    }
    var s=sessionState();
    if(s.n>=MAX){
      log("Stopped: maximum retries reached.");
      return false;
    }
    s.n++;
    sessionSave(s);
    // Persist a marker so a reboot/crash cannot trigger a fresh automatic loop.
    write(PENDING,{n:s.n,at:Date.now(),reason:String(reason||"")});
    var delay=base*Math.pow(2,s.n-1);
    log(s.n+"/"+MAX+(reason?" — "+reason:""));
    setTimeout(function(){
      try { action(); }
      catch(e){ log("Retry action failed: "+(e&&e.message?e.message:e)); }
    },delay);
    return true;
  }

  function success(){
    clearPending();
    sessionReset();
    rebootGuard=false;
  }

  function reset(){ clearPending(); sessionReset(); rebootGuard=false; }

  window.SmartRetry={attempt:attempt,success:success,reset:reset,max:MAX,rebootGuard:function(){return rebootGuard;}};
})();
