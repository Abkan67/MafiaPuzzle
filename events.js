function saysomething(dialougetosay) {
  dialougebox.innerHTML=dialougetosay;
}
function queueevent(eventtobequeued) {
  pendingevents.push(eventtobequeued);
  updateClickEnterMessage();
}
function nextevent() {
  if (nexteventcanbeopened && pendingevents.length>1) {
      pendingevents[1]();
      pendingevents.splice(0,1);
      updateClickEnterMessage();
  }
}
function updateClickEnterMessage() {
  if(pendingevents.length==1){clickentermessage.style.visibility="hidden";}
  else {clickentermessage.style.visibility="visible";}
}