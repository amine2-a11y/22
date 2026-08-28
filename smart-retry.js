/* Jailbreak Amine PS4 - Smart Retry (UI/orchestration only) */
(function(){
  "use strict";
  var KEY="jamine-smart-retry-v1";
  var MAX=3, base=1800;
  function state(){ try { return JSON.parse(sessionStorage.getItem(KEY)||'{"n":0}'); } catch(e){ return {n:0}; } }
  function save(s){ try{sessionStorage.setItem(KEY,JSON.stringify(s));}catch(e){} }
  function reset(){ try{sessionStorage.removeItem(KEY);}catch(e){} }
  function attempt(action, reason){
    var s=state();
    if(s.n>=MAX) return false;
    s.n++; save(s);
    var delay=base*Math.pow(2,s.n-1);
    try{ var c=document.getElementById("console"); if(c) c.textContent += "\n[Smart Retry] "+s.n+"/"+MAX+(reason?" — "+reason:""); }catch(e){}
    setTimeout(function(){ try{ action(); }catch(e){} },delay);
    return true;
  }
  function success(){ reset(); }
  window.SmartRetry={attempt:attempt,success:success,max:MAX};
})();
