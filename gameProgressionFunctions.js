function opengame() {
  homescreen.style.display="none";
  gamescreen.style.display="block";
  openingdialouge();
}
function openingdialouge() {
  nexteventcanbeopened=true;
  queueevent(()=>{saysomething("It's not every day you get to catch a killer.</br> But you had a feeling this wasn't going to be an average day as soon as you saw the bloodied body.")});
  queueevent(()=>{saysomething("<i>It was the middle of the night when you had been woken up by a panicked member of Ravenswood Bluff.</i>")});
  queueevent(()=>{saysomething("<i>The figure explaine that they had travelled from the next town over to seek your aid.</i>")});
  queueevent(()=>{saysomething("<i>For there has been a heinous crime, and you, Investigator Scarlet, are the only one who can get to the bottom of it.</i>")});
  queueevent(setupthegame);
  queueevent(()=>{var allnames=""; allsuspects.forEach((suspect) => {allnames+=(suspect.name+", ");}); saysomething("There are "+numberofsuspects+ " suspects. "+allnames+" some will help your investigation, others would hinder it.");
  queueevent(()=>{saysomething("Any one of these idyllic villagers could be a killer. Be careful who you trust.");})
  queueevent(()=>{saysomething("You can speak to two people every day. Each day you must accuse someone, and each night the killer will strike again.");})
  queueevent(()=>{refillconversationtokens(); gameactioncanbetaken=true; nightone();})
  })

  nextevent();
}
function setupthegame() {
  createcharacters();
  allsuspects.forEach((item, i) => {alivesuspects.push(item);});
  setupkillerthreat();

}



opengamebutton.addEventListener("click", opengame);
window.addEventListener("keydown", processkeyclick);

/*

opengame();//CHANGE IN FINAL PRODUCT.
nextevent();
nextevent();
nextevent();
nextevent();
nextevent();
nextevent();
nextevent();
nextevent();
console.log(allsuspects)
*/