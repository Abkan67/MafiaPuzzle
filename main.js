

function processkeyclick(event) {
  var keypressed=event.key;
  if (keypressed==">") {nextevent();}
}
function closecharacterdisplay(){
  containerofcharacterdisplay.style.display="none";
}
function opencharacterdisplay() {
  containerofcharacterdisplay.style.display="block";
  gamescreen.style.backgroundColor="gray";
}
function openconversationdisplay() {
  conversationscreendisplaycontainer.style.display="block";
  gamescreen.style.backgroundColor="#966f33";
}
function closeconversationdisplay() {
  conversationscreendisplaycontainer.style.display="none";
}
function refillconversationtokens(){
  conversationtokenscontainer.innerHTML="";
  let numberofconversationtokens=Math.floor((numberofsuspects+2)/3);
  numberofconversationtokensleft=numberofconversationtokens;
  for(;numberofconversationtokens>0;numberofconversationtokens--){
    let conversationtokensimage=document.createElement("div");
    conversationtokensimage.setAttribute("class", "conversationtokensimage");
    conversationtokenscontainer.appendChild(conversationtokensimage);
  }
}
function loseaconversationtoken() {
  let conversationtokensimage=document.getElementsByClassName("conversationtokensimage")[0];
  conversationtokensimage.remove();
  numberofconversationtokensleft--;
}
function refillquestiontokens() {
  questiontokenscontainer.innerHTML="";
  numberofquestiontokensleft=4;
  for(var i=numberofquestiontokensleft; i>0; i--){
    const questiontokensimage=document.createElement("div");
    questiontokensimage.setAttribute("class", "questiontokensimage");
    questiontokenscontainer.appendChild(questiontokensimage);
  }
}
function loseaquestiontoken() {
  if(numberofquestiontokensleft<1){return false}
  numberofquestiontokensleft--;
  let conversationtokensimage=document.getElementsByClassName("questiontokensimage")[0];
  conversationtokensimage.remove();
  return true;
}
function endtheconversation() {
  if(conversation.depthlevel==1){
  conversingcharacter.endconversation();}
}


function setupkillerthreat() {
  for (var i = 0; i < allsuspects.length; i++) {killerthreat["suspect"+i]=10;}
}
function gamewinbydemonkill(thedemon) {
  gameactioncanbetaken=false;
  queueevent(()=>{saysomething(thedemon+" spasms on the floor, their entire body ricketing with convulsions.");})
  queueevent(()=>{saysomething("And finally, The Plague of this god foresaken town is dead."); })
  queueevent(()=>{saysomething("You killed the demon, "+thedemon+", you win"); gameactioncanbetaken=false; nexteventcanbeopened=false;   })
}
function demonpass(thedemon) {
  var aliveaccomplices=[];
  alivesuspects.forEach((item, i) => {
    if(item.roletype=="accomplice"){aliveaccomplices.push(item);}
  });
  if(aliveaccomplices.length<=0){return false;}
  var ascendedaccomplice=randomArray(aliveaccomplices);
  ascendedaccomplice.roletype="gangster";
  ascendedaccomplice.role="Killer";
  setupkillerthreat();
  return true;
}
function gamelosebychildkill(thechild) {
  gameactioncanbetaken = false;
  queueevent(()=>{saysomething("You killed the child, "+thechild+", you lose."); gameactioncanbetaken=false; nexteventcanbeopened=false; })
}
function gamelosebyoutnumbered() {
  queueevent(()=>{saysomething("You admire the gun in your hand, and start to wonder if all this death is really worth it.");})
  queueevent(()=>{saysomething("When you look up, everyone is dead save for two people"); allsuspects.forEach((item, i) => {
    if(item.isevil){item.charactercontainer.style.backgroundColor="orange"} else {item.charactercontainer.style.backgroundColor="white"}
  });
      })
  queueevent(()=>{saysomething("You lose"); gameactioncanbetaken=false; nexteventcanbeopened=false; })
}
