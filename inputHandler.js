function applyInputHandlerToSuspectBoxes(){
    allsuspects.forEach((item, i) => {
        var charactercontainer=item.charactercontainer;
        charactercontainer.addEventListener("mouseover", ()=>{if(canExecute()&&item.isalive){item.hoverovertodie();}});
        charactercontainer.addEventListener("mouseout", ()=>{if(canExecute()&&item.isalive){item.stophoverovertodie();}});
      });
}
