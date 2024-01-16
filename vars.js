const opengamebutton=document.getElementById("opengamebutton");
const homescreen = document.getElementById("homescreen");
const gamescreen = document.getElementById("gamescreencontainer");
const dialougebox = document.getElementById("dialouge");
const dialougecontainer = document.getElementById("dialougecontainer")
const characterdisplay=document.getElementById("characterdisplay");
const clickentermessage = document.getElementById("clickentermessage");
const containerofcharacterdisplay = document.getElementById("mainscreendisplaycontainer");
const conversationtokenscontainer = document.getElementById("conversationtokenscontainer");
const conversationscreendisplaycontainer=document.getElementById("conversationscreendisplaycontainer");
const conversationquestionsdepth1container=document.getElementById("conversationquestionsdepth1container")
const conversationquestionsdepth2container=document.getElementById("conversationquestionsdepth2container");
const endconversationbutton=document.getElementById("endconversationbutton");
const questiontokenscontainer=document.getElementById("questiontokenscontainer");
const enddaybuttoncontainer=document.getElementById("enddaybuttoncontainer");
const enddaybutton=document.getElementById("enddaybutton");
const notepaddiv = document.getElementById("notepaddiv");
const opennotepadbutton=document.getElementById("opennotepadbutton");
const closenotepadbutton=document.getElementById("closenotepadbutton");
const charscriptdiv = document.getElementById("charscriptdiv");
const opencharscriptbutton = document.getElementById("opencharscriptbutton");
const closecharscriptbutton = document.getElementById("closecharscriptbutton");

let thecurrentidnumber=0;
const totalheight=Window.innerHeight;
const totalWidth=Window.innerWidth;
let conversingcharacter={endconversation:()=>{}};

let nexteventcanbeopened=false;
let gameactioncanbetaken=false;
const pendingevents=[""]
const allsuspects=[];
const alivesuspects=[];
const killerthreat = {};


let lastexecuted;
let numberofsuspects=9;
let numberofconversationtokensleft=Math.floor((numberofsuspects-1)/3)
let numberofquestiontokensleft=0;
let daynumber=1;
let gameState = "day"; //day, execute, conversation