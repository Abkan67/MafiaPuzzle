const characternames=["Nathanathan", "Mabel", "Sunny", "Thama", "Juli", "Alexandra", "Mia", "Niko", "Chanat", "Waverly", "Holden", "Suzan",
    "Regan", "Roginell", "Spectacle", "Gendrell", "Perkeus"];
endconversationbutton.addEventListener("click", endtheconversation);
const conversation= {depthlevel:1}







const allquestions = {
  "roleswap":{questionname:"What is your role?",},
  "gossip": {questionname: "What do you think of...?",},
  "information": {questionname: "What is your information?"}
}

function createcharacters() {
  for (var i = 0; i < numberofsuspects; i++) {
    var suspectsname=characternames.splice(randInt(0,characternames.length),1);

    var suspectsroletype=characterroletypes.splice(randInt(0, characterroletypes.length), 1);
    var suspectsrole=allroles[suspectsroletype].splice(randInt(0, allroles[suspectsroletype].length),1)
    allsuspects.push(new Suspect(suspectsname, thecurrentidnumber++, suspectsroletype, suspectsrole));
  }
}


class Suspect {
  constructor(name, id, roletype, role) {

    this.name=name[0];
    this.role=role[0];
    this.id=id;
    this.corruption=[];
    this.corrupt=false;
    this.roletype=roletype[0];
    this.isevil=true;
    this.isalive=true;
    if(this.roletype=="worker" || this.roletype=="liability"){this.isevil=false};
    this.allinformation=[];
    this.bluffs={}
    this.questions=["roleswap", "gossip", "information"];
    this.allquestionfunctions={"roleswap":()=>{this.roleswap();}, "gossip":()=>{this.gossip();}, "information":()=>{this.information();}, };
    this.display();
  }
  display() {
    this.charactercontainer=document.createElement("div");
    this.charactercontainer.setAttribute("class", "charactercontainers");
    characterdisplay.appendChild(this.charactercontainer);
    this.charactercontainernamedisplay=document.createTextNode(this.name);
    this.charactercontainer.appendChild(this.charactercontainernamedisplay);
    this.charactercontainer.addEventListener("click", ()=>{this.onclick();});
  }
  hoverovertodie() {
    this.charactercontainer.setAttribute("class", "candie");
  }
  stophoverovertodie() {
    this.charactercontainer.setAttribute("class", "charactercontainers");
  }

  execute() {
    saysomething("The people clamor for an answer, a face to their misery.");
    queueevent(()=>{saysomething("You scan the crowd, putting together everything you can. Every scrap of the puzzle, every nugget of information locked away behind the lock of mundainity");})
    queueevent(()=>{saysomething("There is only one answer, one possible conclusion.");})
    queueevent(()=>{saysomething("You whip your pistol around and fire a shot straight into "+this.name+" before they can escape");})
    if(this.roletype=="gangster") {if(!demonpass(this)){gamewinbydemonkill(this.name);};}
    if(this.role=="Child" && !this.corrupt) {gamelosebychildkill(this.name);}
    queueevent(()=>{saysomething("You just have to pray you're correct, but only time will tell.");})
    queueevent(()=>{this.die(); lastexecuted=this; nightfalls();})
    }
  die() {
    this.charactercontainer.style.backgroundColor="white";
    this.isalive=false;
    alivesuspects.forEach((item, i) => {  if (item.id==this.id){alivesuspects.splice(i,1);}  });
  }
  secretdie() {
    this.isalive=false;
    alivesuspects.forEach((item, i) => {  if (item.id==this.id){alivesuspects.splice(i,1);}  });
    }

  nightone() {  var informationtoadd; this.checkifcorrupt()
    if(!this.corrupt){informationtoadd=allrolesabilities[this.role].startingnight(this);}
    else{informationtoadd=allrolesabilities[this.role].startingnightbluff(this, false);};
    this.allinformation.push(informationtoadd);
  }
  othernights(night) { var informationtoadd;  this.checkifcorrupt();
    if(!this.corrupt){informationtoadd=allrolesabilities[this.role].othernights(this);}else{informationtoadd=allrolesabilities[this.role].othernightsbluff(this, false);};
    if(informationtoadd!=undefined){this.allinformation[night-1]=informationtoadd;}
  }
  updatecorruption() {this.corruption.forEach((item, i) => {  if(--this.corruption[i]<=0){this.corruption.splice(i, 1);}    });
  }
  checkifcorrupt(){  if(this.corruption.length>0){this.corrupt=true} else {this.corrupt=false;}  }
  makeabluff(isinformed, ismalicious) {var bluff;
    do {    if(isinformed){bluff=randomArray(allroles.worker.concat(allroles.liability));}else {bluff=randomArray(allrolestemplate.worker.concat(allrolestemplate.liability));}
  } while (this.bluffs[bluff]!=undefined || bluff=="Screw-up")
    this.bluffs[bluff]={}
    var bluffobject=this.bluffs[bluff];
    bluffobject.information=[];
    bluffobject.information.push(allrolesabilities[bluff].startingnightbluff(this, this.isevil));
    for(var i=0; i<daynumber-1; i++) {
      var informationtoadd=allrolesabilities[bluff].othernightsbluff(this, this.isevil);
      if(informationtoadd!=undefined){bluffobject.information.push(informationtoadd);}
      }
      var toreturn;
    if(ismalicious){
    allroles.worker.forEach((item, i) => {  if(item==bluff){toreturn={"role":allroles.worker.splice(i,1)[0], "roletype":"worker"}    }});
    allroles.liability.forEach((item, i) => {  if(item==bluff){toreturn={"role":allroles.liability.splice(i,1), "roletype":"liability"}   }});
        }
      return toreturn
    }
    updatebluffs(bluff) {
        var informationtoadd=allrolesabilities[bluff].othernightsbluff(this, this.isevil);
        if(informationtoadd!=undefined){this.bluffs[bluff].information.push(informationtoadd);}
    }

  onclick(){
    if(canExecute()){disallowmurder(); this.execute();}
    if(gameactioncanbetaken && numberofconversationtokensleft>=1){ gameactioncanbetaken=false; closecharacterdisplay(); openconversationdisplay(); this.enterconversation();}
  }
  enterconversation() {loseaconversationtoken(); refillquestiontokens();queueevent(()=>{saysomething("You investigate "+this.name); gameactioncanbetaken=true; this.queuequestionsdepth1();});conversingcharacter=this;}
  endconversation() {if(gameactioncanbetaken){this.closeallconversationquestions(); closeconversationdisplay(); opencharacterdisplay();conversingcharacter={endconversation:()=>{}};saysomething("You leave your conversation with "+this.name);
      if(numberofconversationtokensleft==0){queueevent(()=>{saysomething("You are out of conversations for today.");});}}}
  closeallconversationquestions() {conversationquestionsdepth1container.innerHTML="";conversationquestionsdepth2container.innerHTML="";}// NOTE: CHANGE
  queuequestionsdepth1() {this.questions.forEach((item, i) => {
      const buttontoadd=document.createElement("button");
      buttontoadd.setAttribute("class", "questionbuttondepth1");
      const buttontoaddname=document.createTextNode(allquestions[item]["questionname"]);
      conversationquestionsdepth1container.appendChild(buttontoadd);
      buttontoadd.addEventListener("click", ()=>{if(conversation.depthlevel==1 && gameactioncanbetaken){this.allquestionfunctions[item]();}})
      buttontoadd.appendChild(buttontoaddname);
      });
      conversation.depthlevel=1;
    }
    queuequestionsdepth2(allbuttonentries, shouldaddabackbutton) {
      if(shouldaddabackbutton){allbuttonentries.push({questionname:"Back", use:()=>{this.leavequestionsdepth2();},});}
        allbuttonentries.forEach((item, i) => {
          const buttontoadd=document.createElement("button");
          buttontoadd.setAttribute("class", "questionbuttondepth2");
          const buttontoaddname=document.createTextNode(item.questionname);
          conversationquestionsdepth2container.appendChild(buttontoadd);
          buttontoadd.addEventListener("click", ()=>{if(conversation.depthlevel==2 && gameactioncanbetaken){item.use();}})
          buttontoadd.appendChild(buttontoaddname)
        });
        conversation.depthlevel=2;
    }
    leavequestionsdepth2(){
      while (conversationquestionsdepth2container.hasChildNodes()){conversationquestionsdepth2container.removeChild(conversationquestionsdepth2container.firstChild);}
      conversation.depthlevel=1;
    }
    roleswap() {
      if(!loseaquestiontoken()){return};
      var bluffs=Object.keys(this.bluffs);
      var blufftouse=bluffs[0];
      if(this.isevil){saysomething("Okay, I'm the "+blufftouse);}
      else if (this.role=="Screw-up"){saysomething("Okay, I'm the "+this.believedrole);}
      else{saysomething("Okay, I'm the "+this.role);}
    }
    gossip(){
      var arraytopass=[];
      allsuspects.forEach((suspect, i) => {

        if (suspect.id!=this.id) {
          arraytopass.push({questionname:suspect.name, use:()=>{this.gossipaboutsomeone(suspect.name)}});
          }});
      this.queuequestionsdepth2(arraytopass,true);
    };
    gossipaboutsomeone(someone){
      if(!loseaquestiontoken()){return};
      saysomething("I hate "+someone);
    }
    information() {
      if(!loseaquestiontoken()){return};
      var bluffs=Object.keys(this.bluffs);
      var blufftouse=bluffs[0];
      if(this.isevil){
        gameactioncanbetaken=false;
        this.bluffs[blufftouse].information.forEach((item, i) => {
          queueevent(()=>{saysomething("On Night " +(i+1)+" I learned: "+this.bluffs[blufftouse].information[i])});
        });
        nextevent();
        queueevent(()=>{gameactioncanbetaken=true;saysomething("That's all I got");})
                        }
      else {
      gameactioncanbetaken=false;
      this.allinformation.forEach((item, i) => {
        queueevent(()=>{saysomething("On Night " +(i+1)+" I learned: "+this.allinformation[i])});
      });
      nextevent();
      queueevent(()=>{gameactioncanbetaken=true;saysomething("That's all I got");})
        }
    }
}
