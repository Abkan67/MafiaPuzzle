enddaybutton.addEventListener("click", endday);

function endday() {
  if(gameactioncanbetaken){
  gameactioncanbetaken=false;
  saysomething("The sun falls from its loft in the sky, preparing to plunge the town into another bout of darkness.");
  queueevent(()=>{saysomething("Each of the "+alivesuspects.length+" alive suspects stand before you, demading answers");});
  queueevent(()=>{saysomething("Accuse one living suspect <b><i>(They Will Die)</i></b>"); allowmurder();});
}}
function allowmurder() {
  setGameState("execute");
}
function disallowmurder() {
  setGameState("endExecute");
}

function nightfalls() {
  daynumber++;
  queueevent(()=>{checkfordeath();saysomething("The light of the sun bears down once more, but it only accentuates the shadows.");gameactioncanbetaken=true;refillconversationtokens();})
  allsuspects.forEach((suspect, i) => {
    suspect.updatecorruption();
  });

  nightorder.forEach((character, i) => {
    allsuspects.forEach((item, i) => {
      if(item.isalive && (item.role==character || item.believedrole==character)){
      item.othernights(daynumber);
        }
        Object.keys(item.bluffs).forEach((bluffofcharacter, i) => {
          if(bluffofcharacter==character){item.updatebluffs(character);}
        });

    });

  });



}
function nightone() {
  var evilbluffstoaddworker=[]
  var evilbluffstoaddliability=[]
  allsuspects.forEach((suspect, i) => {
    suspect.updatecorruption();
  });
  firstnightorder.forEach((character, i) => {
    allsuspects.forEach((suspect, index) => { if(suspect.role==character){
      if(suspect.isevil){var evilblufftoadd=suspect.makeabluff(true, true);
      if(evilblufftoadd.roletype=="liability"){evilbluffstoaddliability.push(evilblufftoadd)} else {evilbluffstoaddworker.push(evilblufftoadd)};
      }
      suspect.nightone();
    }
    });
  });
  evilbluffstoaddworker.forEach((item, i) => {  allroles.worker.push(item.role);  });
  evilbluffstoaddliability.forEach((item, i) => {  allroles.liability.push(item.role);  });

}
function checkfordeath() {
  numberalive=0;
  alivesuspects.forEach((item, i) => {  if(item.isevil){numberalive-=1} else {numberalive+=1}; });
  if(numberalive<=0){gamelosebyoutnumbered();}
}
