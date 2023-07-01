var loadstart,isLocal,elemGame,game,body,elemSelect;var game_iframe=document.getElementById('game');var ppressed=false;var keyd=new KeyboardEvent("keydown",{bubbles:true,cancelable:true,keyCode:68});var sound_toggle=document.getElementById('sound-toggle');var muteBool=localStorage.getItem('custom_mute')?localStorage.getItem('custom_mute'):'Off';var applyOnceBool=true;function soundMute(){sound_toggle.innerHTML='<div class="label"><img src="/assets/img/sound_off_icon.png" width="16px"> Sound Off </div>';game_iframe.contentWindow.customMute=true;game.AudioPlayer.pause();localStorage.setItem('custom_mute','On');}
function soundUnmute(){sound_toggle.innerHTML='<div class="label"><img src="/assets/img/sound_on_icon.png" width="16px"> Sound On</div>';game_iframe.contentWindow.customMute=false;game.AudioPlayer.resume();localStorage.setItem('custom_mute','Off');}
if(sound_toggle){sound_toggle.addEventListener("mousedown",function(event){if(game_iframe.contentDocument.getElementById("paused")){game_iframe.contentDocument.getElementById("paused").style.display="none";}
game_iframe.focus();if(muteBool=='On'){soundUnmute();muteBool='Off';}else{soundMute();muteBool='On';}});sound_toggle.addEventListener("mouseup",function(event){if(game_iframe.contentDocument.getElementById("paused")){game_iframe.contentDocument.getElementById("paused").style.display="none";}
game_iframe.focus();});}
if(muteBool=='On'){soundMute();}
function start(){if(window.loadstart)return;window.loadstart=true;setLocalStatus();setReferences();setMapSelector();setLevelEditor();setOptions();setKeyMappingMenu();setCheats();game.startLoadingMaps();setInterval(checkFocus,500);game_iframe.contentDocument.addEventListener("keydown",event=>{if(event.keyCode===80){ppressed=true;}
if(applyOnceBool){if(muteBool=='Off'){if(event.keyCode===68||event.keyCode===39){soundUnmute();}}
applyOnceBool=false;}});var last_power=1;if(is_mobile){setInterval(function(){if(last_power!=game.player.power){if(game.player.power>2){game_iframe.contentDocument.getElementById('move-fire').style.display="block";}else{game_iframe.contentDocument.getElementById('move-fire').style.display="none";}}
last_power=game.player.power;},500);}
if(is_fullscreen){game_iframe.contentDocument.getElementById('explanation').style.display="block";}}
var game_paused=false;function checkFocus(){if(!ppressed){if(document.activeElement!=document.getElementById("game")){if(!game.paused){game.pause();}
game_iframe.contentDocument.getElementById("paused").style.display="flex";game_paused=true;}else{if(game.paused){game.unpause();}
game_iframe.contentDocument.getElementById("paused").style.display="none";game_paused=false;}}}
function setLocalStatus(){window.isLocal=window.location.origin=="file://";}
function setReferences(){window.elemGame=document.getElementById("game");window.game=window.elemGame.contentWindow;if(!isLocal)
window.game.parentwindow=window;window.body=document.body;window.elemSelect=document.getElementById("in_mapselect");}
function setMapSelector(timed){if(!window.elemSelect&&!timed)
setTimeout(function(){setMapSelector(true);},350);var innerHTML="",i,j;for(i=1;i<=8;++i)
for(j=1;j<=4;++j)
innerHTML+=createAdderMap(i,j);elemSelect.innerHTML+=innerHTML+createAdderBigMap("Map Generator!","setGameMapRandom");if(!isLocal){game.parentwindow=window;var elem;for(i=1;i<=8;++i)
for(j=1;j<=4;++j){if(game["World"+i+String(j)]&&(elem=document.getElementById("maprect"+i+","+j)))
elem.className="maprect";}}}
function createAdderMap(i,j){var adder="";adder+="<div class='maprectout'>";adder+="<div id='maprect"+i+","+j;adder+="' class='maprect"+(isLocal?"":" off")+"' onclick='setGameMap("+i+","+j+")'>";adder+=i+"-"+j;adder+="</div></div>";return adder;}
function createAdderBigMap(name,onclick,giant){var adder="";adder+="<div class='maprectout'>";adder+="<div class='maprect big "+(giant?"giant":"")+"' onclick='"+onclick+"()'>";adder+=name;adder+="</div></div>";return adder;}
function setGameMap(one,two){if(document.getElementById("maprect"+one+","+two).className!="maprect")
return;game.postMessage({type:"setMap",map:[one,two]},"*");game.focus();}
function onMapLoad(one,two){var elem=document.getElementById("maprect"+one+","+two);if(elem)
elem.className="maprect";}
function setGameMapRandom(){game.postMessage({type:"setMap",map:["Random","Overworld"]},"*");game.focus();}
function setLevelEditor(){var out=document.getElementById("in_editor"),blurb="Why use Nintendo's?<br />";button=createAdderBigMap("Make your<br />own levels!","startEditor",true);out.innerHTML+=blurb+button+"<br />You can save these as text files when you're done.";}
function startEditor(){game.postMessage({type:"startEditor"},"*");game.focus();}
function setOptions(){var out=document.getElementById("in_options"),options=["Mute","Luigi","FastFWD"],innerHTML="",option,i;for(i in options){option=options[i];innerHTML+="<div class='maprectout' onclick='toggleGame(\""+option+"\")'><div class='maprect big larger'>Toggle "+option+"</div></div>";innerHTML+="<br />";}
out.innerHTML+=innerHTML+"<br />More coming soon!";}
function setKeyMappingMenu(){var out=document.getElementById("in_keymapping"),keys=["Up","Down","Left","Right","Sprint","Pause","Mute"],innerHTML="",key,low,i;for(i in keys){key=keys[i];low=key.toLowerCase();innerHTML+="<div class='maprectout'><div class='maprect big larger'>"+key+"<input onkeydown='setKey(event)' type='texte' id='"+low+"' readonly></input></div></div>";innerHTML+="<br />";}
innerHTML+="<br />";out.innerHTML+=innerHTML;}
function setKey(event){game.postMessage({type:"setKey",action:event.target.id,keyCode:event.keyCode},"*");event.target.value=event.keyCode;}
function toggleGame(me){game.postMessage({type:"toggleOption",option:me},"*");if(me){}}
function setCheats(){var i;console.log("Hi, thanks for playing Full Screen Mario! I see you're using the console.");console.log("There's not really any way to stop you from messing around so if you'd like to know the common cheats, enter \"displayCheats()\" here.");window.cheats={Change_Map:"game.setMap([#,#] or #,#);",Change_Map_Location:"game.shiftToLocation(#);",Fast_Forward:"game.fastforward(amount; 1 by default);",Life:"game.gainLife(# amount or Infinity)",Low_Gravity:"game.player.gravity = game.gravity /= 2;",Lulz:"game.lulz();",Random_Map:"game.setMapRandom();",Shroom:"game.playerShroom(game.player)",Star_Power:"game.playerStar(game.player)",Unlimited_Time:"game.data.time.amount = Infinity;",}
cheatsize=0;for(var i in cheats)
cheatsize=Math.max(cheatsize,i.length);}
function displayCheats(){console.log("These are stored in the global 'cheats' object, by the way.");for(i in cheats)
printCheat(i,cheats[i]);return "Have fun!";}
function printCheat(name,text){for(i=cheatsize-name.length;i>0;--i)
name+=".";console.log(name.replace("_"," ")+"...... "+text);}