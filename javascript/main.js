//#region Table of Content
/*
!                         Battleships Main-Javascript-File
?                                      powered by
!                                      Stefan Bartl
!                        (WKDSteVIE / WKDMinerva)
?                                            2022             
?                  ________________________________                                                                                                                                                                                                  
!                                     Table of content              
?                                       -) Language     
?                                       -)  Open Jobs
todo                 Javascript - what a wonderful language!
*/
//#endregion


//#region Open Jobs  
/*
todo
*/
//#endregion


//#region User interface

//#endregion


//#region Start-Page Event-Listener

startGame_btn.addEventListener(`click`, () => {
  // ? Name Validation and storing
  let PlayerName = document.querySelector(`.choose-name-input`).value;
  console.log(PlayerName);
  if(PlayerName.length < 3){
    alert(
    localStorage.language === "en" 
      ? `Player Name must be at least 3 characters long` 
      : `Der Spielername muss mindestens 3 Zeichen lang sein`
    )
    throw new RangeError(`Player name was ${PlayerName.length} characters long but must have at least 3 characters.`);
  };
  localStorage.PlayerName = PlayerName;
  
  MainGameLoop();
});

myLogo.addEventListener(`click`, () => {
  OpenInNewTab(`https://stefanbartl.github.io/Portfolio/`);
});

githubLogo.addEventListener(`click`, () => {
  OpenInNewTab(`https://github.com/StefanBartl/Battleships`);
});


//#endregion


//#region Factories

//#region Ship factory
// const Battleship= require('../src/app-modules/ship');
// const MS_BattleshipBrowser = new Battleship(2); // ? Create a new ship. The type depends on the length.
// MS_BattleshipBrowser.hit(1); // ? Hit a ship (Returns a error if the argument isn't in the range of ship length)
// console.log(MS_BattleshipBrowser.type); // ? Returns the ship type
// console.log(MS_BattleshipBrowser.sunkenState()); // ? Returns if the ship is sunken
//#endregion


//#region  Gameboard factory
//const Gameboard = require('./app-modules/gameboard');
// const Gameboard_One = new Gameboard(10,6, 'Test player'); // ? Creates a new Gameboard with 10 rows / 6 columns for the player 'Test player'
// Gameboard_One.placement("battleship", [3, 1], [5, 1]);  // ? Placing a battleship on the gameboard in the 1 column from row 3 to 5
// Gameboard_One.receiveAttack(3,1); // ? Attack the gameboard
// console.log(Gameboard_One.shipFormation[0].sectionsState()); // ? Returns the ship sections
// console.log(Gameboard_One.receiveAttack(1,3)); // ? Returns if the attack hits a ship (maybe which section?   )
// console.log(Gameboard_One.alive()); // ? Returns if ships are on the gameboard
//#endregion


//#region Player factory
//const Player = require('../src/app-modules/player');
// const Gameboard_FirstComputer = new Gameboard(10,6, 'First Computer'); // ? Creates a new Gameboard with 10 rows / 6 columns for the player 'Test player'
// const Gameboard_TestPlayer = new Gameboard(10,6, 'Test Player');
// Gameboard_FirstComputer.enemyGameboardAdd(Gameboard_TestPlayer);
// Gameboard_TestPlayer.enemyGameboardAdd(Gameboard_FirstComputer);

// const FirstComputer = new Player('First Computer', false, Gameboard_FirstComputer, Gameboard_TestPlayer, Gameplay); // ? Create Player
// Gameboard_FirstComputer.placement("battleship", [1, 1], [3, 1]);  // ? Placing a battleship on the gameboard in the 1 column from row 3 to 5

// const TestPlayer = new Player('Test Player', true, Gameboard_TestPlayer, Gameboard_FirstComputer, Gameplay); 
// Gameboard_TestPlayer.placement("battleship", [3, 1], [5, 1]); 

// TestPlayer.humanAttack(2, 1);
// FirstComputer.cpuAttack();

//#endregion

//#endregion
