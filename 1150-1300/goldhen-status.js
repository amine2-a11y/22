(function(){
  'use strict';
  if (window.GoldHENStatus) return;
  var shown = false;
  function ensure(){
    var s=document.getElementById('goldhen-status-overlay');
    if(s) return s;
    s=document.createElement('div'); s.id='goldhen-status-overlay';
    s.style.cssText='position:fixed;inset:0;z-index:2147483647;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.35);pointer-events:none;font-family:Arial,sans-serif;';
    var b=document.createElement('div'); b.id='goldhen-status-box';
    b.style.cssText='min-width:280px;max-width:80vw;padding:22px 30px;border-radius:14px;background:rgba(3,10,20,.94);border:1px solid rgba(143,200,255,.5);box-shadow:0 12px 40px rgba(0,0,0,.55);text-align:center;font-size:22px;font-weight:700;color:#fff;';
    s.appendChild(b); document.body.appendChild(s); return s;
  }
  function show(text,ok){
    if(shown) return; shown=true;
    var s=ensure(), b=document.getElementById('goldhen-status-box');
    b.textContent=text; b.style.color=ok?'#bfffd5':'#ffb8b8'; b.style.borderColor=ok?'rgba(80,220,130,.65)':'rgba(255,90,90,.65)';
    s.style.display='flex';
  }
  window.GoldHENStatus={
    success:function(){show('تم التفعيل بنجاح',true)},
    fail:function(){show('فشل التفعيل',false)},
    reset:function(){shown=false;var s=document.getElementById('goldhen-status-overlay');if(s)s.style.display='none';}
  };
})();
