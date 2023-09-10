

function saysomething(dialougetosay) {
  dialougebox.innerHTML=dialougetosay;
}
function queueevent(eventtobequeued) {
  pendingevents.push(eventtobequeued);
}
function nextevent() {
  if (nexteventcanbeopened && pendingevents.length>1) {
      pendingevents[1]();
      pendingevents.splice(0,1);
  }
}
