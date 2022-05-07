/* =================
?   === dom elements ===
     ================= */

//#region Start page

// Create DOM-Elements
const languageTranslate = document.querySelector(`.language-translate`);
const startPage_container = document.querySelector(`.start-page-container`);
const page_headline = document.createElement(`h1`);
const game_description = document.createElement(`p`);
const player_name = document.createElement(`input`);
const startGame_btn = document.createElement(`button`);
const section_about = document.createElement(`section`);
const myLogo = new Image();
const githubLogo = new Image();

// Add properties
player_name.type = `text`;
player_name.minLength = 3;
player_name.maxLength = 15;
if(localStorage.PlayerName !== undefined) player_name.value = localStorage.PlayerName;
myLogo.src  = `/graphics/icons/dev_logo.png`;
githubLogo.src =  `/graphics/icons/github/github-original-wordmark.svg`;

// Add classes
page_headline.classList.add(`page-headline`);
game_description.classList.add(`game-description`);
player_name.classList.add(`choose-name-input`);
startGame_btn.classList.add(`.start-game-btn`);
myLogo.classList.add(`myLogo`, `contact-logos`);
githubLogo.classList.add(`githubLogo`, `contact-logos`);
section_about.classList.add(`section-about`);

// Append elements
startPage_container.appendChild(page_headline);
startPage_container.appendChild(game_description);
startPage_container.appendChild(player_name);
startPage_container.appendChild(startGame_btn);
section_about.appendChild(myLogo);
section_about.appendChild(githubLogo);
startPage_container.appendChild(section_about);

//#endregion
