function openGameFromOpenPage() {
    homescreen.style.display="none";
    gamescreen.style.display="block";
    openGame();
}
function openGame() {
    loadModuleInCharDisplay();
    openingdialouge();
}
opengamebutton.addEventListener("click", openGameFromOpenPage);