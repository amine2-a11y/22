(function(){
 var el=document.getElementById("cacheStatus");
 function show(s,c){if(!el)return;el.textContent="OFFLINE CACHE: "+s;el.className="cache-status "+(c||"");}
 var app=window.applicationCache;
 if(!app){show("NOT SUPPORTED BY THIS BROWSER","error");return;}
 function update(){
  switch(app.status){
   case app.UNCACHED: show("NOT STARTED — RELOAD WHILE ONLINE","error");break;
   case app.IDLE: show("READY — SAVED FOR OFFLINE USE","ready");break;
   case app.CHECKING: show("CHECKING MANIFEST…");break;
   case app.DOWNLOADING: show("DOWNLOADING FILES…");break;
   case app.UPDATEREADY: show("UPDATE READY — RELOAD PAGE","ready");break;
   case app.OBSOLETE: show("CACHE OBSOLETE — RELOAD ONLINE","error");break;
   default: show("WAITING FOR CACHE…");
  }
 }
 ["checking","downloading","progress","cached","noupdate","updateready","obsolete","error"].forEach(function(ev){app.addEventListener(ev,function(){update();if(ev==="cached"||ev==="noupdate")show("READY — SAVED FOR OFFLINE USE","ready");if(ev==="error")show("DOWNLOAD FAILED — CHECK SERVER MIME / FILES","error");});});
 update();
 try{app.update();}catch(e){show("UPDATE FAILED — RELOAD WHILE ONLINE","error");}
})();
