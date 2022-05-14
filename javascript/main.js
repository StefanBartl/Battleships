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
todo Human placement function
todo cpu placement thinking? dont allow placement as long as the cpu didnt placed (or make the cpu placement instantly....)
todo display images for human placements. Idea: for 3 fields ship cut a image in 3 pieces and than place it.
todo display the name(s)
todo get informations by attacked and sunken ships by hovering 
todo Animations for attacking, hitted or sunken ships 
todo correct height and width of the gameboards
todo text check
todo UI styling
todo Argument validation in every function? With passed argument types?
todo every class and attribute needed?
todo Function cutting and proof if needed
todo CSS Minimizing and structuring
todo commenting and file structure, also images removing if not needed
todo LAST THING: Dont display the enemy gameboard :-) 
todo storyline & level system
*/
//#endregion


MainGameLoop = (playerName) => {
  
  // ! Argument validation
  if(typeof playerName !== 'string') throw new TypeError(`Player name must be a 'string'`); // ? Argument validation

  
  //#region Preparations
  const game_container = document.createElement(`section`);
  game_container.classList.add(`game-container`);
  document.body.appendChild(game_container);
  const info = new GameInformation(playerName); // ? Open new GameInformation object  
  const humanGameboard = new Gameboard(10, 10, playerName, info);  
  const cpuGameboard = new Gameboard(10, 10, `CPU`, info); 
  const human = new Player(playerName, true, humanGameboard, cpuGameboard, info); // ? Create human player object
  const cpu = new Player(`CPU`, false, cpuGameboard, humanGameboard, info); // ? Create cpu player object
//#endregion


  // ! Invoke random ship placement: For human players validate the dropdown-DOM-Element first, for cpu invoke it definitely
  placingShipsRandomly(cpu, cpuGameboard).all();
 // Random placement for human players
  if(document.querySelector(`.placement`).value === `No` ||
        document.querySelector(`.placement`).value === `Nein`){
            placingShipsRandomly(human, humanGameboard).all();
        };

//   const but = document.createElement(`div`);
//   but.classList.add(`changer`);
//   document.body.appendChild(but);

function hovering (horizontal,  adding,  length, basis){
    // ? Argument validation
    if(typeof horizontal !== `boolean` || typeof adding !== 'boolean') throw new TypeError(`Arguments 'horizontal' and 'adding' must be a 'boolean'`);
    if(typeof length !== `number` || typeof basis !== 'number') throw new TypeError(`Arguments 'length' and 'basisÄ must be a 'number'`); // ! Range

    
    if(horizontal === true && adding === true){
        document.querySelector(`.${playerName}${basis}`).classList.add(`placingHover`);
        if(length >= 2) document.querySelector(`.${playerName}${basis + 1}`).classList.add(`placingHover`);
        if(length >= 3) document.querySelector(`.${playerName}${basis + 2}`).classList.add(`placingHover`);
        if(length >= 4) document.querySelector(`.${playerName}${basis + 3}`).classList.add(`placingHover`);
        if(length >= 5) document.querySelector(`.${playerName}${basis + 4}`).classList.add(`placingHover`);
    };
    if(horizontal === false && adding === true){
        document.querySelector(`.${playerName}${basis}`).classList.add(`placingHover`);
        if(length >= 2) document.querySelector(`.${playerName}${basis + 10}`).classList.add(`placingHover`);
        if(length >= 3) document.querySelector(`.${playerName}${basis + 20}`).classList.add(`placingHover`);
        if(length >= 4) document.querySelector(`.${playerName}${basis + 30}`).classList.add(`placingHover`);
        if(length >= 5) document.querySelector(`.${playerName}${basis + 40}`).classList.add(`placingHover`);
    };

    if(horizontal === true && adding === false){
        document.querySelector(`.${playerName}${basis}`).classList.remove(`placingHover`);
        if(length >= 2) document.querySelector(`.${playerName}${basis + 1}`).classList.remove(`placingHover`);
        if(length >= 3) document.querySelector(`.${playerName}${basis + 2}`).classList.remove(`placingHover`);
        if(length >= 4) document.querySelector(`.${playerName}${basis + 3}`).classList.remove(`placingHover`);
        if(length >= 5) document.querySelector(`.${playerName}${basis + 4}`).classList.remove(`placingHover`);
    };
    if(horizontal === false && adding === false){
        document.querySelector(`.${playerName}${basis}`).classList.remove(`placingHover`);
        if(length >= 2) document.querySelector(`.${playerName}${basis + 10}`).classList.remove(`placingHover`);
        if(length >= 3) document.querySelector(`.${playerName}${basis + 20}`).classList.remove(`placingHover`);
        if(length >= 4) document.querySelector(`.${playerName}${basis + 30}`).classList.remove(`placingHover`);
        if(length >= 5) document.querySelector(`.${playerName}${basis + 40}`).classList.remove(`placingHover`);
    };
    return true;
};

//#region  Helper functions for hover-effect in human player placement
function hoverOneDestroyer (id) {hovering(true, true, 2, id)};
function hoverTwoDestroyer (id){hovering(true, false, 2, id)};
function hoverThreeDestroyer (id) {hovering(false, true, 2, id)};
function hoverFourDestroyer (id) {hovering(false, false, 2, id)};

function hoverOneSubmarine (id) {hovering(true, true, 3, id)};
function hoverTwoSubmarine (id){hovering(true, false, 3, id)};
function hoverThreeSubmarine (id) {hovering(false, true, 3, id)};
function hoverFourSubmarine (id) {hovering(false, false, 3, id)};

function hoverOneCruiser (id) {hovering(true, true, 3, id)};
function hoverTwoCruiser (id){hovering(true, false, 3, id)};
function hoverThreeCruiser (id) {hovering(false, true, 3, id)};
function hoverFourCruiser (id) {hovering(false, false, 3, id)};

function hoverOneBattleship (id) {hovering(true, true, 4, id)};
function hoverTwoBattleship (id){hovering(true, false, 4, id)};
function hoverThreeBattleship (id) {hovering(false, true, 4, id)};
function hoverFourBattleship(id) {hovering(false, false, 4, id)};

function hoverOneCarrier (id) {hovering(true, true, 5, id)};
function hoverTwoCarrier (id){hovering(true, false, 5, id)};
function hoverThreeCarrier (id) {hovering(false, true, 5, id)};
function hoverFourCarrier (id) {hovering(false, false, 5, id)};

//#endregion

function humanPlacement(type, playerName, shipCounter) {

    //! Validation of arguments and describe counter
return new Promise((resolve, reject) => {

    const fieldArray = document.querySelectorAll(`.${playerName}`)
    fieldArray.forEach(element => {
        let horizontal = true;
        element.style.pointerEvents = `all`;
        let fieldNumberString = element.getAttribute(`data-fieldID`);
        let fieldNumberInteger = parseInt(fieldNumberString);
        let fieldID = parseInt(element.getAttribute(`data-fieldID`));


        // ? Destroyer
        if(type === `Destroyer`){
            // ? Preparations
           function a(){hoverOneDestroyer(fieldID)};
           function b(){hoverTwoDestroyer(fieldID)};
           function c(){hoverThreeDestroyer(fieldID)};
           function d(){hoverFourDestroyer(fieldID)};

           // ? Start adding listener 
            if(horizontal === true && fieldNumberString[1] !== `0`){
                element.addEventListener(`mouseenter`, a);
                element.addEventListener(`mouseleave`, b);
            };


            document.addEventListener(`keyup`, (event) => {
                    if(event.code === `Space`){
                        event.preventDefault();

                        // ? Remove all attached listeners
                        element.removeEventListener(`mouseenter`, a);
                        element.removeEventListener(`mouseleave`, b);
                        element.removeEventListener(`mouseenter`, c);
                        element.removeEventListener(`mouseleave`, d);

                        // ? Attach new listeners depending on the direction
                        if(horizontal === true && fieldNumberInteger < 91){
                            element.addEventListener(`mouseenter`, c);
                            element.addEventListener(`mouseleave`, d);
                        };
                        if(horizontal === false && fieldNumberString[1] !== `0`){
                                element.addEventListener(`mouseenter`, a);
                                element.addEventListener(`mouseleave`, b);
                           }; 

                        // ? Toggle horizontal pointer and return
                        horizontal === true ? horizontal = false : horizontal = true;
                        return;
                    };});
        };

        // ? Submarine
        if(type === `Submarine`){
            function e(){hoverOneSubmarine(fieldID)};
            function f(){hoverTwoSubmarine(fieldID)};
            function g(){hoverThreeSubmarine(fieldID)};
            function h(){hoverFourSubmarine(fieldID)};
 
            if(horizontal === true && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9`){
                element.addEventListener(`mouseenter`, e);
                element.addEventListener(`mouseleave`, f);
            };
 
             document.addEventListener(`keyup`, (event) => {
                if(event.code === `Space`){
                    event.preventDefault();
                    
                    element.removeEventListener(`mouseenter`, e);
                    element.removeEventListener(`mouseleave`, f);
                    element.removeEventListener(`mouseenter`, g);
                    element.removeEventListener(`mouseleave`, h);

                    if(horizontal === true && fieldNumberInteger < 81){
                        element.addEventListener(`mouseenter`, g);
                        element.addEventListener(`mouseleave`, h);
                    };
                    if(horizontal === false && fieldNumberString[1] !== `0`  && fieldNumberString[1] !== `9`){
                        element.addEventListener(`mouseenter`, e);
                        element.addEventListener(`mouseleave`, f);
                       }; 

                    horizontal === true ? horizontal = false : horizontal = true;
                    return;
                };});
        };
         

        // ? Cruiser
        if(type === `Cruiser`){
            function i(){hoverOneCruiser(fieldID)};
            function j(){hoverTwoCruiser(fieldID)};
            function k(){hoverThreeCruiser(fieldID)};
            function l(){hoverFourCruiser(fieldID)};
 
            if(horizontal === true && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8`){
                element.addEventListener(`mouseenter`, i);
                element.addEventListener(`mouseleave`, j);
            };

 
             document.addEventListener(`keyup`, (event) => {
                if(event.code === `Space`){
                    event.preventDefault();
                    
                    // ? Remove all attached listeners
                    element.removeEventListener(`mouseenter`, i);
                    element.removeEventListener(`mouseleave`, j);
                    element.removeEventListener(`mouseenter`, k);
                    element.removeEventListener(`mouseleave`, l);

                    // ? Attach new listeners depending on the direction
                    if(horizontal === true && fieldNumberInteger < 71){
                        element.addEventListener(`mouseenter`, k);
                        element.addEventListener(`mouseleave`, l);
                    };
                    if(horizontal === false && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8`){
                            element.addEventListener(`mouseenter`, i);
                            element.addEventListener(`mouseleave`, j);
                       }; 

                    // ? Toggle horizontal pointer and return
                    horizontal === true ? horizontal = false : horizontal = true;
                    return;
                };});
        };


        // ? Battleship
        if(type === `Battleship`){
            function m(){hoverOneBattleship(fieldID)};
            function n(){hoverTwoBattleship(fieldID)};
            function o(){hoverThreeBattleship(fieldID)};
            function p(){hoverFourBattleship(fieldID)};
 
            if(horizontal === true && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8` && fieldNumberString[1] !== `7`){
                element.addEventListener(`mouseenter`, m);
                element.addEventListener(`mouseleave`, n);
            };
 
             document.addEventListener(`keyup`, (event) => {
                if(event.code === `Space`){
                    event.preventDefault();
                    
                    element.removeEventListener(`mouseenter`, m);
                    element.removeEventListener(`mouseleave`, n);
                    element.removeEventListener(`mouseenter`, o);
                    element.removeEventListener(`mouseleave`, p);

                    if(horizontal === true && fieldNumberInteger < 61){
                        element.addEventListener(`mouseenter`, o);
                        element.addEventListener(`mouseleave`, p);
                    };
                    if(horizontal === false && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8` && fieldNumberString[1] !== `7`){
                            element.addEventListener(`mouseenter`, m);
                            element.addEventListener(`mouseleave`, n);
                       }; 

                    horizontal === true ? horizontal = false : horizontal = true;
                    return;
                };});
        };

        // ? Carrier
        if(type === `Carrier`){
    
            function q(){hoverOneCarrier(fieldID)};
            function r(){hoverTwoCarrier(fieldID)};
            function s(){hoverThreeCarrier(fieldID)};
            function t(){hoverFourCarrier(fieldID)};           
 
            if(horizontal === true && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8` && fieldNumberString[1] !== `7` && fieldNumberString[1] !== `6`){
                element.addEventListener(`mouseenter`, q);
                element.addEventListener(`mouseleave`, r);
            };

             element.addEventListener(`mouseenter`, q);
             element.addEventListener(`mouseleave`, r);
 
             document.addEventListener(`keyup`, (event) => {
                if(event.code === `Space`){
                    event.preventDefault();
                    
                    element.removeEventListener(`mouseenter`, q);
                    element.removeEventListener(`mouseleave`, r);
                    element.removeEventListener(`mouseenter`, s);
                    element.removeEventListener(`mouseleave`, t);

                    if(horizontal === true && fieldNumberInteger < 51){
                        element.addEventListener(`mouseenter`, s);
                        element.addEventListener(`mouseleave`, t);
                    };
                    if(horizontal === false && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8` && fieldNumberString[1] !== `7` && fieldNumberString[1] !== `6`){
                            element.addEventListener(`mouseenter`, q);
                            element.addEventListener(`mouseleave`, r);
                       }; 

                    horizontal === true ? horizontal = false : horizontal = true;
                    return;
                };});
        };


         // ! Event-Listener to fullfill placement
        if(type === `Destroyer`){
            element.addEventListener(`click`, () => {
                if(horizontal === true ){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Destroyer`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 1]);
                        console.log("Destroyer horizontal placed.");
                    };
                    resolve(true);
                    return true;
                };
                if(horizontal === false){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Destroyer`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 1, parseInt(element.getAttribute(`data-fieldx`))]);
                        console.log("Destroyer vertical placed.");
                    };
                    resolve(true);
                    return true;
                };
            });
        };

        if(type === `Submarine`){
            element.addEventListener(`click`, () => {
                if(horizontal === true){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Submarine`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 2]);
                        console.log("Submarine horizontal placed");
                    };
                    resolve(true);
                    return true;
                };
                if(horizontal === false){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Submarine`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 2, parseInt(element.getAttribute(`data-fieldx`))]);
                        console.log("Submarine vertical placed");
                    };
                    resolve(true);
                    return true;
                };
            });
        };

        if(type === `Cruiser`){
            element.addEventListener(`click`, () => {
                if(horizontal === true){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Cruiser`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 3]);
                        console.log("Cruiser horizontal placed");
                    };
                    resolve(true);
                    return true;
                };
                if(horizontal === false){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Cruiser`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 3, parseInt(element.getAttribute(`data-fieldx`))]);
                        console.log("Cruiser vertical placed");
                    };
                    resolve(true);
                    return true;
                };
            });
        };

        if(type === `Battleship`){
            element.addEventListener(`click`, () => {
                if(horizontal === true){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Battleship`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 4]);
                        console.log("Battleship horizontal placed");
                    };
                    resolve(true);
                    return true;
                };
                if(horizontal === false){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                    humanGameboard.placement(`Battleship`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 4, parseInt(element.getAttribute(`data-fieldx`))]);
                    console.log("Battleship vertical placed");
                    };
                    resolve(true);
                    return true;
                };
            });
        };

        if(type === `Carrier`){
            element.addEventListener(`click`, () => {
                if(horizontal === true){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Carrier`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 5]);
                        console.log("Carrier horizontal placed");
                    };
                    resolve(true);
                    return true;
                };
                if(horizontal === false){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Carrier`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 5, parseInt(element.getAttribute(`data-fieldx`))]);
                        console.log("Carrier vertical placed");
                    };
                    resolve(true);
                    return true;
                };
            });
        };

    return;
    });
});


};

  if(document.querySelector(`.placement`).value === `Yes` ||
  document.querySelector(`.placement`).value === `Ja`){

    let shipCounter = 1;
    localStorage.HumanPlacementShipCounter = shipCounter;
    async function humanPlacing() {

        const placingDestroyer = await humanPlacement(`Destroyer`, playerName, shipCounter);
        shipCounter++;
        localStorage.HumanPlacementShipCounter = shipCounter;

        const placingSubmarine = await humanPlacement(`Submarine`, playerName, shipCounter);
        shipCounter++;
        localStorage.HumanPlacementShipCounter = shipCounter;

        const placingCruiser = await humanPlacement(`Cruiser`, playerName, shipCounter);
        shipCounter++;
        localStorage.HumanPlacementShipCounter = shipCounter;

        const placingBattleship = await humanPlacement(`Battleship`, playerName, shipCounter);
        shipCounter++;
        localStorage.HumanPlacementShipCounter = shipCounter;

        const placingCarrier = await humanPlacement(`Carrier`, playerName, shipCounter);
        shipCounter++;
        localStorage.HumanPlacementShipCounter = shipCounter;
    };                 

    humanPlacing();
  };


  // ? Trigger cpu attack after a human attack. Check every interVal if CPU is on turn
  interVal = 100;
  cpuAttackInterval =  setInterval(() => {
      if(info.actualOnTurn() === `cpu`) {
          cpu.cpuAttack();
          info.nextRound(); // ? Trigger next round from a cpu attack
      };
  }, interVal);
  // clearInterval(cpuAttackInterval); // ? To clear the interval f.e. after the game end
};

startGame_btn.addEventListener(`click`, () => {
  // ? Name Validation and storing
  let PlayerName = document.querySelector(`.choose-name-input`).value;
  if(PlayerName.length < 3){
    alert(
    localStorage.language === "en" 
      ? `Player Name must be at least 3 characters long` 
      : `Der Spielername muss mindestens 3 Zeichen lang sein`
    )
    throw new RangeError(`Player name was ${PlayerName.length} characters long but must have at least 3 characters.`);
  };
  localStorage.PlayerName = PlayerName;
  
  MainGameLoop(PlayerName);
  startPage_container.remove();
});

myLogo.addEventListener(`click`, () => {
  openInNewTab(`https://stefanbartl.github.io/Portfolio/`);
});

githubLogo.addEventListener(`click`, () => { 
  openInNewTab(`https://github.com/StefanBartl/Battleships`);
});
