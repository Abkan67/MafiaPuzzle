
const characterroletypes=["gangster", "accomplice", "liability", "liability", "worker", "worker", "worker", "worker", "worker"];
for (var i = numberofsuspects-9; i>0 ; i--) {characterroletypes.push("accomplice");}
const allroles={
 worker: ["Detector", "Neighbor", "Informant", "Manager", "Gravekeeper", "Survivor", "Matchmaker", "Exclusionist"],//, "Vigilante", "Doctor", "Soulreader"/*Each night choose a player and learn their role, you are corrupted until you choose an evil player*/, "Mailman"/*works like the watchman*/],
 liability:["Bartender", "Child", "Screw-up"],// "VIP"/*If you win and the VIP is in play, you must guess who they are or lose*/, "Screw-up"/*drunk*/, ],
 gangster:["Killer",],
 accomplice:["Corrupter",],// "Spy"/*All players read you as good*/, "Blackmailer"/*Each night give a good player the cagey attribute*/, "Hypnotist"/*each night a player becomes a liability*/],
}
const nightorder= ["Corrupter","Bartender","Killer", "Detector", "Neighbor", "Gravekeeper", "Matchmaker", "Exclusionist", "Child", "Informant", "Manager", "Survivor"]
const firstnightorder = ["Corrupter","Bartender","Killer", "Detector", "Neighbor", "Informant", "Manager", "Gravekeeper", "Matchmaker", "Exclusionist", "Child", "Survivor", "Screw-up"]
const allrolestemplate = JSON.parse(JSON.stringify(allroles));
const allrolesabilities = {
  "Informant" : { description:"Learn a worker role and two people it could be.",
    startingnight: (that)=>{
      var seenworker={roletype:"", id:""};
      while (seenworker.roletype!="worker" || seenworker.id==that.id){seenworker= randomArray(allsuspects);}
      var otherworker={id:that.id};
      while (otherworker.id===seenworker.id || otherworker.id===that.id){otherworker=randomArray(allsuspects);}
      if(randInt(0,2)){return "I saw that either "+otherworker.name+" or "+seenworker.name+" is the "+seenworker.role}
      else{return "I saw that either "+seenworker.name+" or "+otherworker.name+" is the "+seenworker.role}
  },
  startingnightbluff: (that, ismalicious)=>{
    var seenworker={id:that.id}
    while (seenworker.id==that.id){seenworker=randomArray(allsuspects);}
    var otherworker={id:that.id}
    while (otherworker.id==that.id || seenworker.id==otherworker.id){otherworker=randomArray(allsuspects)};
    var role=randomArray(allrolestemplate.worker);
    while (role=="Informant"){role=randomArray(allrolestemplate.worker)}
    return "I saw that either "+seenworker.name+" or "+otherworker.name+" is the "+role;
  },
  othernights: ()=>{
  },
  othernightsbluff: ()=>{
  }  },

  "Manager": { description:"Learn a liability role and two people it could be.",
    startingnight: (that)=>{
      var areliabilitiesinplay=false;
      for (var i = 0; i < allsuspects.length; i++) {if(allsuspects[i].roletype=="liability"){areliabilitiesinplay=true; break;}}
      if (areliabilitiesinplay) {
            var seenworker={roletype:"", id:""};
            while (seenworker.roletype!="liability" || seenworker.id==that.id){seenworker= randomArray(allsuspects);}
            var otherworker={id:that.id};
            while (otherworker.id===seenworker.id || otherworker.id===that.id){otherworker=randomArray(allsuspects);}
            if(randInt(0,2)){return "I saw that either "+otherworker.name+" or "+seenworker.name+" is the "+seenworker.role}
            else{return "I saw that either "+seenworker.name+" or "+otherworker.name+" is the "+seenworker.role}
      }
      else {return "There are no liabilities in this town"}
  },
  startingnightbluff: (that, ismalicious)=>{
    var seenworker={id:that.id}
    while (seenworker.id==that.id){seenworker=randomArray(allsuspects);}
    var otherworker={id:that.id}
    while (otherworker.id==that.id || seenworker.id==otherworker.id){otherworker=randomArray(allsuspects);};
    var role=randomArray(allrolestemplate.liability);
    return "I saw that either "+seenworker.name+" or "+otherworker.name+" is the "+role;
  },
  othernights:()=>{},
  othernightsbluff: ()=>{},
 },

  "Detector": { description:"Each night learn three people, and if any are an accomplice.",
    startingnight: (that)=>{
      var chosenplayer1={id:that.id};
      var chosenplayer2={id:that.id};
      var chosenplayer3={id:that.id};
      while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
      while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
      while (chosenplayer3.id==that.id || chosenplayer3.id==chosenplayer2.id || chosenplayer3.id==chosenplayer1.id) {chosenplayer3=randomArray(allsuspects);}
      var isevil="none of them are an accomplice";
      if(chosenplayer1.roletype=="accomplice" || chosenplayer2.roletype=="accomplice" || chosenplayer3.roletype=="accomplice") {isevil="at least one is an accomplice";}
      return "Out of "+chosenplayer1.name+", "+chosenplayer2.name+", and "+chosenplayer3.name+", "+isevil;
  },
  startingnightbluff: (that, ismalicious)=>{
      var chosenplayer1={id:that.id};
      var chosenplayer2={id:that.id};
      var chosenplayer3={id:that.id};
      while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
      while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
      while (chosenplayer3.id==that.id || chosenplayer3.id==chosenplayer2.id || chosenplayer3.id==chosenplayer1.id) {chosenplayer3=randomArray(allsuspects);}
      var isevil="none of them are an accomplice"
      if(ismalicious){    if(!chosenplayer1.isevil && !chosenplayer2.isevil && !chosenplayer3.isevil) {isevil="at least one is an accomplice";}   }
        else{   if(randInt(0,2)==0){isevil="at least one is an accomplice";}    }
      return "Out of "+chosenplayer1.name+", "+chosenplayer2.name+", and "+chosenplayer3.name+", "+isevil;
  },
  othernights:(that)=>{
      var chosenplayer1={id:that.id};
      var chosenplayer2={id:that.id};
      var chosenplayer3={id:that.id};
      while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
      while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
      while (chosenplayer3.id==that.id || chosenplayer3.id==chosenplayer2.id || chosenplayer3.id==chosenplayer1.id) {chosenplayer3=randomArray(allsuspects);}
      var isevil="none of them are an accomplice";
      if(chosenplayer1.roletype=="gangster" || chosenplayer2.roletype=="accomplice" || chosenplayer3.roletype=="accomplice") {isevil="at least one is an accomplice";}
      return "Out of "+chosenplayer1.name+", "+chosenplayer2.name+", and "+chosenplayer3.name+", "+isevil;
  },
  othernightsbluff:(that, ismalicious)=>{
      var chosenplayer1={id:that.id};
      var chosenplayer2={id:that.id};
      var chosenplayer3={id:that.id};
      while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
      while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
      while (chosenplayer3.id==that.id || chosenplayer3.id==chosenplayer2.id || chosenplayer3.id==chosenplayer1.id) {chosenplayer3=randomArray(allsuspects);}
      var isevil="none of them are an accomplice"
      if(ismalicious){    if(!chosenplayer1.isevil && !chosenplayer2.isevil && !chosenplayer3.isevil) {isevil="at least one is an accomplice";}   }
        else{   if(randInt(0,2)==0){isevil="at least one is an accomplice";}    }
      return "Out of "+chosenplayer1.name+", "+chosenplayer2.name+", and "+chosenplayer3.name+", "+isevil;
  },    },

  "Neighbor":{ description:"Each night learn if any of your neighboors are evil",
    startingnight: (that)=>{
      var suspect;
      alivesuspects.forEach((item, i) => {if(item.id==that.id){suspect=i}});
      var neighboorleft; var neighboorright;
      if(suspect==0){neighboorleft=alivesuspects[alivesuspects.length-1]; neighboorright=alivesuspects[1];} else if (suspect==alivesuspects.length-1) {neighboorleft=alivesuspects[alivesuspects.length-2]; neighboorright=alivesuspects[0];} else {neighboorleft=alivesuspects[suspect-1]; neighboorright=alivesuspects[suspect+1];}
      if(neighboorleft.isevil || neighboorright.isevil) {return "At least one of "+neighboorleft.name+" and "+ neighboorright.name+" is evil";}
      else {return "Neither of "+ neighboorleft.name+" or "+neighboorright.name+" is evil";}
    },
    startingnightbluff: (that, ismalicious)=>{
      var suspect;
      alivesuspects.forEach((item, i) => {if(item.id==that.id){suspect=i}});
      var neighboorleft; var neighboorright;
      if(suspect==0){neighboorleft=alivesuspects[alivesuspects.length-1]; neighboorright=alivesuspects[1];} else if (suspect==alivesuspects.length-1) {neighboorleft=alivesuspects[alivesuspects.length-2]; neighboorright=alivesuspects[0];} else {neighboorleft=alivesuspects[suspect-1]; neighboorright=alivesuspects[suspect+1];}
      if(ismalicious){
      if(!neighboorleft.isevil && !neighboorright.isevil) {return "At least one of "+neighboorleft.name+" and "+ neighboorright.name+" is evil";}
      else {return "Neither of "+ neighboorleft.name+" or "+neighboorright.name+" is evil";}  }
      else {
        if(randInt(0,2)==0) {return "At least one of "+neighboorleft.name+" and "+ neighboorright.name+" is evil";}
        else {return "Neither of "+ neighboorleft.name+" or "+neighboorright.name+" is evil";}
      }
    },
    othernights:(that)=>{
      var suspect;
      alivesuspects.forEach((item, i) => {if(item.id==that.id){suspect=i}});
      var neighboorleft; var neighboorright;
      if(suspect==0){neighboorleft=alivesuspects[alivesuspects.length-1]; neighboorright=alivesuspects[1];} else if (suspect==alivesuspects.length-1) {neighboorleft=alivesuspects[alivesuspects.length-2]; neighboorright=alivesuspects[0];} else {neighboorleft=alivesuspects[suspect-1]; neighboorright=alivesuspects[suspect+1];}
      if(neighboorleft.isevil || neighboorright.isevil) {return "At least one of "+neighboorleft.name+" and "+ neighboorright.name+" is evil";}
      else {return "Neither of "+ neighboorleft.name+" or "+neighboorright.name+" is evil";}
    },
    othernightsbluff: (that)=>{
      var suspect;
      alivesuspects.forEach((item, i) => {if(item.id==that.id){suspect=i}});
      var neighboorleft; var neighboorright;
      if(suspect==0){neighboorleft=alivesuspects[alivesuspects.length-1]; neighboorright=alivesuspects[1];} else if (suspect==alivesuspects.length-1) {neighboorleft=alivesuspects[alivesuspects.length-2]; neighboorright=alivesuspects[0];} else {neighboorleft=alivesuspects[suspect-1]; neighboorright=alivesuspects[suspect+1];}
      if(neighboorleft.isevil || neighboorright.isevil) {return "At least one of "+neighboorleft.name+" and "+ neighboorright.name+" is evil";}
      else {return "Neither of "+ neighboorleft.name+" or "+neighboorright.name+" is evil";}
    }
  },

  "Gravekeeper":{ description:"Learn the character of whoever the player shoots.",
  startingnight: (that)=>{ return "Nothing"
  },
  startingnightbluff: (that)=>{return "Nothing"},
  othernights:(that)=>{
    return "The "+lastexecuted.role+" was killed by your hand on the last day ("+lastexecuted.name+").";
  },
  othernightsbluff: (that, ismalicious)=>{
    var lastexecutedbluff;
    do {
    if(ismalicious){
      var number = randInt(0,6)
      if(lastexecuted.isevil){lastexecutedbluff=randomArray(allrolestemplate.worker.concat(allrolestemplate.liability));}
      else {if(number<2){lastexecutedbluff=randomArray(allrolestemplate.accomplice)}
      else if(number<4){lastexecutedbluff=randomArray(allrolestemplate.gangster);}
      else if(number<5){lastexecutedbluff=randomArray(allrolestemplate.worker);}
       else {lastexecutedbluff=randomArray(allrolestemplate.liability);}}
    }
    else {
      lastexecutedbluff=randomArray(   allrolestemplate.worker.concat(allrolestemplate.liability.concat(allrolestemplate.accomplice.concat(allrolestemplate.gangster)))       );
    }       } while(lastexecutedbluff=="Gravekeeper" || lastexecutedbluff=="Child")
    return "The "+lastexecutedbluff+" was killed by your hand on the last day ("+lastexecuted.name+")."
  }
 },

  "Survivor":{ description:"If the killer chooses you, nothing happens.",
  startingnight: (that)=>{ return "Nothing"
  },
  startingnightbluff: (that)=>{return "Nothing"},
  othernights:()=>{
  },
  othernightsbluff: ()=>{},
},

  "Killer":{ description: "Kill someone each night. If you die, an accomplice becomes the killer. Win when all killers are dead.",
  startingnight: (that)=>{
      return "Nothing"
  }, startingnightbluff: (that)=>{return "Nothing"},
  othernights:(that)=>{
      allsuspects.forEach((item, i) => {
        var thisthreat=killerthreat["suspect"+i]
        if(!item.isalive){thisthreat=0;}
        if(item.isevil){thisthreat-=3}


        if(thisthreat<1){thisthreat=1;}
        if(item.roletype=="gangster"){thisthreat=0;}
        killerthreat["suspect"+i]=thisthreat
      });
      var tokill = randweighted(killerthreat).slice(-1);
      if(allsuspects[tokill].isalive && !(allsuspects[tokill].role=="Survivor" && !allsuspects[tokill].corrupt)){  allsuspects[tokill].secretdie();
      queueevent(()=>{ allsuspects[tokill].die();
        saysomething("You wake up to see "+allsuspects[tokill].name+" dead on the streets. When will this madness end?");})
      } else {
        queueevent(()=>{saysomething("No blood was spilled last night, but that doesn't mean this town is safe.");})
      }

  },  othernightsbluff:(that)=>{if(that.role=="Killer"){queueevent(()=>{saysomething("No blood was spilled last night, but that doesn't mean this town is safe.");})};   }},
  "Corrupter": { description:"Each night, corrupt someone until the following night",
  startingnight: (that)=>{
    var topoison=randomArray(alivesuspects);
    while (topoison.id==that.id || topoison.isevil) {topoison=randomArray(alivesuspects);}
    topoison.corruption.push(1)
    return 'Nothing'
  },
  startingnightbluff:()=>{return "Nothing"},
  othernights: (that)=>{
    var topoison=randomArray(alivesuspects);
    while (topoison.id==that.id || topoison.isevil) {topoison=randomArray(alivesuspects);}
    topoison.corruption.push(1)
  },
  othernightsbluff: ()=>{return "Nothing"},   },

  "Child": { description:"If you shoot the child, you lose.",
  startingnight: (that)=>{return "Nothing"},
  startingnightbluff: (that)=>{return "Nothing"},
  othernights: (that)=>{},
  othernightsbluff:(that)=>{},    },

  "Bartender": {
    startingnight: (that)=>{
      var suspect;
      allsuspects.forEach((item, i) => {    if(item.id==that.id) {suspect=i};   });
      var neighboorleft; var neighboorright;
      if(suspect==0){neighboorleft=alivesuspects[alivesuspects.length-1]; neighboorright=alivesuspects[1];} else if (suspect==alivesuspects.length-1) {neighboorleft=alivesuspects[alivesuspects.length-2]; neighboorright=alivesuspects[0];} else {neighboorleft=alivesuspects[suspect-1]; neighboorright=alivesuspects[suspect+1];}
      neighboorleft.corruption.push(1); neighboorright.corruption.push(1);
      return "Nothing";
    },
    startingnightbluff: (that, ismalicious)=>{return "Nothing"},
    othernights: (that)=>{
      var suspect;
      allsuspects.forEach((item, i) => {    if(item.id==that.id) {suspect=i};   });
      var neighboorleft; var neighboorright;
      if(suspect==0){neighboorleft=alivesuspects[alivesuspects.length-1]; neighboorright=alivesuspects[1];} else if (suspect==alivesuspects.length-1) {neighboorleft=alivesuspects[alivesuspects.length-2]; neighboorright=alivesuspects[0];} else {neighboorleft=alivesuspects[suspect-1]; neighboorright=alivesuspects[suspect+1];}
      neighboorleft.corruption.push(1); neighboorright.corruption.push(1);},
    othernightsbluff: (that, ismalicious)=>{},   },

    "Matchmaker": { description:"Each night learn two people and if they share a role type.",
      startingnight: (that)=>{
        var chosenplayer1={id:that.id};
        var chosenplayer2={id:that.id};
        while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
        while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
        if(chosenplayer1.roletype==chosenplayer2.roletype){return chosenplayer1.name+" and "+chosenplayer2.name+" share in their type of role"}
        else {return chosenplayer1.name+" and "+chosenplayer2.name+" do not share in their type of role"}
      },
      startingnightbluff: (that, ismalicious)=>{
        var chosenplayer1={id:that.id};
        var chosenplayer2={id:that.id};
        while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
        while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
        if(randInt(0,3)){return chosenplayer1.name+" and "+chosenplayer2.name+" share in their type of role"}
          else{return chosenplayer1.name+" and "+chosenplayer2.name+" do not share in their type of role"}
      },
      othernights: (that)=>{
        var chosenplayer1={id:that.id};
        var chosenplayer2={id:that.id};
        while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
        while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
        if(chosenplayer1.roletype==chosenplayer2.roletype){return chosenplayer1.name+" and "+chosenplayer2.name+" share in their type of role"}
        else {return chosenplayer1.name+" and "+chosenplayer2.name+" do not share in their type of role"}
      },
      othernightsbluff: (that, ismalicious)=>{
        var chosenplayer1={id:that.id};
        var chosenplayer2={id:that.id};
        while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
        while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
        if(!randInt(0,3)){return chosenplayer1.name+" and "+chosenplayer2.name+" share in their type of role"}
          else{return chosenplayer1.name+" and "+chosenplayer2.name+" do not share in their type of role"}
      }
    },
    "Exclusionist": { description: "Each night learn 2 players, and one character type that neither is",
      startingnight: (that)=>{
        var chosenplayer1={id:that.id};
        var chosenplayer2={id:that.id};
        while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
        while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
        var allroletypes=["worker", "liability", "accomplice", "gangster"];
        allroletypes.forEach((item, i) => {
          var takeitout=false
          if(item==chosenplayer1.roletype){takeitout=true}
          if(item==chosenplayer2.roletype){takeitout=true}
          if(takeitout){allroletypes.splice(i,1);}
        });
        var roletype=randomArray(allroletypes);
        return "There is not a single "+roletype+" among "+chosenplayer1.name+" and "+chosenplayer2.name;
      },
      startingnightbluff: (that, ismalicious)=>{
          var chosenplayer1={id:that.id};
          var chosenplayer2={id:that.id};
          while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
          while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
          if(ismalicious) {
            if(chosenplayer1.isevil || chosenplayer2.isevil) {
              var roletype=randomArray([ "accomplice", "gangster"]);
              return "There is not a single "+roletype+" among "+chosenplayer1.name+" and "+chosenplayer2.name
            } else {
              var roletype=randomArray(["worker", "liability"]);
              return "There is not a single "+roletype+" among "+chosenplayer1.name+" and "+chosenplayer2.name  }
          }
          else{var roletype=randomArray(["worker", "liability", "accomplice", "gangster"]); return "There is not a single "+roletype+" among "+chosenplayer1.name+" and "+chosenplayer2.name}//not ismalicious
      },
      othernights: (that)=>{
        var chosenplayer1={id:that.id};
        var chosenplayer2={id:that.id};
        while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
        while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
        var allroletypes=["worker", "liability", "accomplice", "gangster"];
        allroletypes.forEach((item, i) => {
          var takeitout=false
          if(item==chosenplayer1.roletype){takeitout=true}
          if(item==chosenplayer2.roletype){takeitout=true}
          if(takeitout){allroletypes.splice(i,1);}
        });
        var roletype=randomArray(allroletypes);
        return "There is not a single "+roletype+" among "+chosenplayer1.name+" and "+chosenplayer2.name;
      },
      othernightsbluff: (that, ismalicious)=>{
        var chosenplayer1={id:that.id};
        var chosenplayer2={id:that.id};
        while (chosenplayer1.id==that.id){chosenplayer1=randomArray(allsuspects);}
        while (chosenplayer2.id==that.id || chosenplayer2.id==chosenplayer1.id){chosenplayer2=randomArray(allsuspects);}
        if(ismalicious) {
          if(chosenplayer1.isevil || chosenplayer2.isevil) {
            var roletype=randomArray([ "accomplice", "gangster"]);
            return "There is not a single "+roletype+" among "+chosenplayer1.name+" and "+chosenplayer2.name
          } else {
            var roletype=randomArray(["worker", "liability"]);
            return "There is not a single "+roletype+" among "+chosenplayer1.name+" and "+chosenplayer2.name  }
        }
        else{var roletype=randomArray(["worker", "liability", "accomplice", "gangster"]); return "There is not a single "+roletype+" among "+chosenplayer1.name+" and "+chosenplayer2.name}//not ismalicious
    }
  },
    "Screw-up": { description: "The screw-up is given another role. They get false information based on that role.",
    startingnight: (that)=>{
      that.believedrole=randomArray(allrolestemplate.worker);
      return allrolesabilities[that.believedrole].startingnightbluff(that, false);
    },
    startingnightbluff: (that, ismalicious)=>{
      that.believedrole=randomArray(allrolestemplate.worker);
      return allrolesabilities[that.believedrole].startingnightbluff(that, false);
    },
    othernights: (that)=>{
      if(that.believedrole==undefined){ that.believedrole=randomArray(allrolestemplate.worker); }
      return allrolesabilities[that.believedrole].othernightsbluff(that, false);
    },
    othernightsbluff: (that)=>{
      if(that.believedrole==undefined){ that.believedrole=randomArray(allrolestemplate.worker); }
      return allrolesabilities[that.believedrole].othernightsbluff(that, false);
    },
  },
}
