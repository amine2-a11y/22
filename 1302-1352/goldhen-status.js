(function(){
  'use strict';
  var timer=null, box=null;
  function ensure(){
    if(box) return box;
    box=document.createElement('div');
    box.id='goldhen-status';
    box.style.cssText='position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:2147483647;display:none;padding:18px 30px;border-radius:14px;background:rgba(0,0,0,.88);border:1px solid rgba(255,255,255,.22);color:#fff;font:700 24px/1.2 Arial,sans-serif;text-align:center;box-shadow:0 8px 35px rgba(0,0,0,.55);pointer-events:none;';
    document.documentElement.appendChild(box); return box;
  }
  function show(text,ok){ var e=ensure(); e.textContent=text; e.style.display='block'; e.style.borderColor=ok?'rgba(80,220,130,.7)':'rgba(255,100,100,.7)'; clearTimeout(timer); timer=setTimeout(function(){e.style.display='none';},5000); }
  window.__goldhenStatusSuccess=function(){show('تم التفعيل بنجاح',true)};
  window.__goldhenStatusFailure=function(){show('فشل التفعيل',false)};
})();
