opennotepadbutton.addEventListener("click", opennotepad);
function opennotepad() {
  notepaddiv.style.display="block";
}
closenotepadbutton.addEventListener("click", closenotepad);
function closenotepad() {
  notepaddiv.style.display="none";
}
opencharscriptbutton.addEventListener("click", opencharscript);
function opencharscript() {
  charscriptdiv.style.display="block";
  opencharscriptbutton.style.display="none";
}
closecharscriptbutton.addEventListener("click", closecharscript);
function closecharscript() {
  charscriptdiv.style.display="none";
  opencharscriptbutton.style.display="block";
}
function loadModuleInCharDisplay() {
  for(role in allroles.worker) {
    const newExplanation = document.createElement("div");
    const newExplanationText = document.createTextNode(""+allroles.worker[role]+": "+allrolesabilities[allroles.worker[role]].description);
    newExplanation.appendChild(newExplanationText);
    newExplanation.setAttribute("class", "scriptRoleDisplay")
    document.getElementsByClassName("scriptElementDisplay")[0].appendChild(newExplanation);
  }
  for(role in allroles.liability) {
    const newExplanation = document.createElement("div");
    const newExplanationText = document.createTextNode(""+allroles.liability[role]+": "+allrolesabilities[allroles.liability[role]].description);
    newExplanation.appendChild(newExplanationText);
    newExplanation.setAttribute("class", "scriptRoleDisplay")
    document.getElementsByClassName("scriptElementDisplay")[1].appendChild(newExplanation);
  }
  for(role in allroles.accomplice) {
    const newExplanation = document.createElement("div");
    const newExplanationText = document.createTextNode(""+allroles.accomplice[role]+": "+allrolesabilities[allroles.accomplice[role]].description);
    newExplanation.appendChild(newExplanationText);
    newExplanation.setAttribute("class", "scriptRoleDisplay")
    document.getElementsByClassName("scriptElementDisplay")[2].appendChild(newExplanation);
  }
  for(role in allroles.gangster) {
    const newExplanation = document.createElement("div");
    const newExplanationText = document.createTextNode(""+allroles.gangster[role]+": "+allrolesabilities[allroles.gangster[role]].description);
    newExplanation.appendChild(newExplanationText);
    newExplanation.setAttribute("class", "scriptRoleDisplay")
    document.getElementsByClassName("scriptElementDisplay")[3].appendChild(newExplanation);
  }
}