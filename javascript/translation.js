//#region Language translation setup

// Get setted language from local storage or browser language and store it there
const language = localStorage.language || navigator.language;

// ? Setup Translation 
language[0] === "d" && language[1] === "e" ? localStorage.language = "de" : "en";

// ? Initial Translation
localStorage.language === "en" ? English() : German();

// ? Change Language
languageTranslate.addEventListener("click", ()=>{
  // Check for the actual language
  if(localStorage.language === "en"){
    // Invoke opposite language
    German();
    // Store new language in localStorage
    localStorage.language = "de";
  } else {
    English();
    localStorage.language = "en";
  };
});

//#endregion


//#region Language translation libraries

function English() {
  // Start Page
  languageTranslate.innerText = `de.`;
  languageTranslate.title = `Change language to German`;
  page_headline.innerText = `Battleship Online`;
  game_description.innerText = `Welcome to 'Battleship Online'. 
  Choose your name and click the Start button to start the game. 
  Your level: ${localStorage.Level || 1}`;
  player_name.title = `Choose your name`;
  startGame_btn.innerText = `Start Game`;
  startGame_btn.title = `Click here to start the game`;
  myLogo.title = `Click to go to my personal portfolio page`;
  githubLogo.title = `Click to go to this project's Github repository (including README file)`;
};

function German() {
  // Start page
  languageTranslate.innerText = `en.`;
  languageTranslate.title = `Wechsle die Sprache zu Englisch`;
  page_headline.innerText = `Battleship Online`;
  game_description.innerText = `Willkommen bei 'Battleship Online'. 
  Wähle deinen Namen und klicke auf den Start Button um das Spiel zu starten. 
  Dein Level:  ${localStorage.Level || 1}`;
  player_name.title = `Wähle deinen Namen`;
  startGame_btn.innerText = `Spiel starten`;
  startGame_btn.title = `Klicke um das Spiel zu starten`;
  myLogo.title = `Klicke um zu meiner persönlichen Portfolio-Seite zu kommen`;
  githubLogo.title = `Klicke um zum Github-Repository dieses Projects zu kommen (inklusive README-Datei)`;
};

//#endregion
