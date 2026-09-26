(function(){
'use strict';
if(window.GoldHENStatus)return;
function show(text,ok){
 var old=document.getElementById('goldhen-status-overlay'); if(old)old.remove();
 var s=document.createElement('div'); s.id='goldhen-status-overlay';
 s.style.cssText='position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;pointer-events:none;font-family:Arial,sans-serif;';
 var b=document.createElement('div'); b.textContent=text;
 b.style.cssText='padding:22px 32px;border-radius:14px;background:rgba(3,10,20,.96);border:2px solid '+(ok?'#50dc82':'#ff5a5a')+';box-shadow:0 12px 40px rgba(0,0,0,.65);text-align:center;font-size:25px;font-weight:700;color:'+(ok?'#bfffd5':'#ffb8b8')+';';
 s.appendChild(b); (document.body||document.documentElement).appendChild(s);
}
window.GoldHENStatus={success:function(){show('تم التفعيل بنجاح',true)},fail:function(){show('فشل التفعيل',false)}};
})();