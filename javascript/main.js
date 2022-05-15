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




localStorage.Horizontal = `false`;

function humanPlacement(type, playerName, shipCounter) {

    //! Validation of arguments and describe counter
return new Promise((resolve, reject) => {

    const fieldArray = document.querySelectorAll(`.${playerName}`)
    fieldArray.forEach(element => {
        element.style.pointerEvents = `all`;
        let fieldNumberString = element.getAttribute(`data-fieldID`);
        let fieldNumberInteger = parseInt(fieldNumberString);
        let fieldID = parseInt(element.getAttribute(`data-fieldID`));

        // ! Event-Listener to fullfill placement for hover effect
        // ? Destroyer
        if(type === `Destroyer`){
            // ? Preparations
            let lockHorizontal = false;
            let lockVertical = true;
           function a(){hovering(playerName, true, true, 2, fieldID)};
           function b(){hovering(playerName, true, false, 2, fieldID)};
           function c(){hovering(playerName, false, true, 2, fieldID)};
           function d(){hovering(playerName, false, false, 2, fieldID)};

           // ? Start adding listener 
            if(localStorage.Horizontal === `true` && fieldNumberString[1] !== `0`){
                element.addEventListener(`mouseenter`, a);
                element.addEventListener(`mouseleave`, b);
            };
            if(localStorage.Horizontal === `false` && fieldNumberString[1] !== `0`){
                element.addEventListener(`mouseenter`, c);
                element.addEventListener(`mouseleave`, d);
            };


            document.addEventListener(`keyup`, (event) => {
                    if(event.code === `Space`){
                        event.preventDefault();

                        element.classList.remove(`placingHover`);
                        // ? Remove all attached listeners
                        element.removeEventListener(`mouseenter`, a);
                        element.removeEventListener(`mouseleave`, b);
                        element.removeEventListener(`mouseenter`, c);
                        element.removeEventListener(`mouseleave`, d);

                        // ? Attach new listeners depending on the direction
                        if(localStorage.Horizontal === `true` && fieldNumberInteger < 91){
                            element.addEventListener(`mouseenter`, c);
                            element.addEventListener(`mouseleave`, d);
                            if(fieldNumberInteger === 1 && lockHorizontal === false) {
                                localStorage.Horizontal = false;
                               };
                        };
                        if(localStorage.Horizontal === `false` && fieldNumberString[1] !== `0`){
                                element.addEventListener(`mouseenter`, a);
                                element.addEventListener(`mouseleave`, b);
                                if(fieldNumberInteger === 1 && lockVertical === false) {
                                    localStorage.Horizontal = true;
                                   };
                           }; 
                        // ? Toggle direction locker 
                        lockHorizontal === false ? lockHorizontal = true : lockHorizontal = false;
                        lockVertical === false ? lockVertical = true : lockVertical = false;

                        return;
                    };});
        };

        // ? Submarine
        if(type === `Submarine`){
            let lockHorizontal = false;
            let lockVertical = true;
            function e(){hovering(playerName, true, true, 2, fieldID)};
            function f(){hovering(playerName, true, false, 2, fieldID)};
            function g(){hovering(playerName, false, true, 2, fieldID)};
            function h(){hovering(playerName, false, false, 2, fieldID)};
 
            if(localStorage.Horizontal === `true` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9`){
                element.addEventListener(`mouseenter`, e);
                element.addEventListener(`mouseleave`, f);
            };
            if(localStorage.Horizontal === `false` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9`){
                element.addEventListener(`mouseenter`, g);
                element.addEventListener(`mouseleave`, h);
            };
 
             document.addEventListener(`keyup`, (event) => {
                if(event.code === `Space`){
                    event.preventDefault();
                    
                    element.removeEventListener(`mouseenter`, e);
                    element.removeEventListener(`mouseleave`, f);
                    element.removeEventListener(`mouseenter`, g);
                    element.removeEventListener(`mouseleave`, h);

                    if(localStorage.Horizontal === `true` && fieldNumberInteger < 81){
                        element.addEventListener(`mouseenter`, g);
                        element.addEventListener(`mouseleave`, h);
                        if(fieldNumberInteger === 1 && lockHorizontal === false) {
                            localStorage.Horizontal = false;
                           };
                    };
                    if(localStorage.Horizontal === `false` && fieldNumberString[1] !== `0`  && fieldNumberString[1] !== `9`){
                        element.addEventListener(`mouseenter`, e);
                        element.addEventListener(`mouseleave`, f);
                        if(fieldNumberInteger === 1 && lockVertical === false) {
                            localStorage.Horizontal = true;
                           };
                       }; 
                       lockHorizontal === false ? lockHorizontal = true : lockHorizontal = false;
                       lockVertical === false ? lockVertical = true : lockVertical = false;
                    return;
                };});
        };
         
        // ? Cruiser
        if(type === `Cruiser`){
            let lockHorizontal = false;
            let lockVertical = true;
            function i(){hovering(playerName, true, true, 2, fieldID)};
            function j(){hovering(playerName, true, false, 2, fieldID)};
            function k(){hovering(playerName, false, true, 2, fieldID)};
            function l(){hovering(playerName, false, false, 2, fieldID)};
            if(localStorage.Horizontal === `true` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9`){
                element.addEventListener(`mouseenter`, i);
                element.addEventListener(`mouseleave`, j);
            };
            if(localStorage.Horizontal === `true` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9`){
                element.addEventListener(`mouseenter`, i);
                element.addEventListener(`mouseleave`, j);
            };

             document.addEventListener(`keyup`, (event) => {
                if(event.code === `Space`){
                    event.preventDefault();              
                    element.removeEventListener(`mouseenter`, i);
                    element.removeEventListener(`mouseleave`, j);
                    element.removeEventListener(`mouseenter`, k);
                    element.removeEventListener(`mouseleave`, l);
                    if(localStorage.Horizontal === `true` && fieldNumberInteger < 71){
                        element.addEventListener(`mouseenter`, k);
                        element.addEventListener(`mouseleave`, l);
                        if(fieldNumberInteger === 1 && lockHorizontal === false) {
                            localStorage.Horizontal = false;
                           };
                    };
                    if(localStorage.Horizontal === `false` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9`){
                        element.addEventListener(`mouseenter`, i);
                        element.addEventListener(`mouseleave`, j);
                        if(fieldNumberInteger === 1 && lockVertical === false) {
                            localStorage.Horizontal = true;
                           };
                    }; 
                       lockHorizontal === false ? lockHorizontal = true : lockHorizontal = false;
                         return;
                };});
        };

        // ? Battleship
        if(type === `Battleship`){
            let lockHorizontal = false;
            let lockVertical = true;
            function m(){hovering(playerName, true, true, 2, fieldID)};
            function n(){hovering(playerName, true, false, 2, fieldID)};
            function o(){hovering(playerName, false, true, 2, fieldID)};
            function p(){hovering(playerName, false, false, 2, fieldID)};
 
            if(localStorage.Horizontal === `true` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8`){
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

                    if(localStorage.Horizontal === `true` && fieldNumberInteger < 61){
                        element.addEventListener(`mouseenter`, o);
                        element.addEventListener(`mouseleave`, p);
                        if(fieldNumberInteger === 1 && lockHorizontal === false) {
                            localStorage.Horizontal = false;
                           };
                    };
                    if(localStorage.Horizontal === `false` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8`){
                        element.addEventListener(`mouseenter`, m);
                        element.addEventListener(`mouseleave`, n);
                        if(fieldNumberInteger === 1 && lockVertical === false) {
                            localStorage.Horizontal = true;
                           };
                    }; 
                       lockHorizontal === false ? lockHorizontal = true : lockHorizontal = false;
                       lockVertical === false ? lockVertical = true : lockVertical = false;
                   return;
                };});
        };

        // ? Carrier
        if(type === `Carrier`){ 
            let lockHorizontal = false;
            let lockVertical = true;
            function q(){hovering(playerName, true, true, 2, fieldID)};
            function r(){hovering(playerName, true, false, 2, fieldID)};
            function s(){hovering(playerName, false, true, 2, fieldID)};
            function t(){hovering(playerName, false, false, 2, fieldID)};   
 
            if(localStorage.Horizontal === `true` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8` && fieldNumberString[1] !== `7`){
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

                    if(localStorage.Horizontal === `true` && fieldNumberInteger < 51){
                        element.addEventListener(`mouseenter`, s);
                        element.addEventListener(`mouseleave`, t);
                        if(fieldNumberInteger === 1 && lockHorizontal === false) {
                            localStorage.Horizontal = false;
                           };
                    };
                    if(localStorage.Horizontal === `false` && fieldNumberString[1] !== `0` && fieldNumberString[1] !== `9` && fieldNumberString[1] !== `8` && fieldNumberString[1] !== `7`){
                            element.addEventListener(`mouseenter`, q);
                            element.addEventListener(`mouseleave`, r);
                            if(fieldNumberInteger === 1 && lockVertical === false) {
                                localStorage.Horizontal = true;
                               };
                       }; 
                       lockHorizontal === false ? lockHorizontal = true : lockHorizontal = false;
                       lockVertical === false ? lockVertical = true : lockVertical = false;
                       return;
                };});
        };


         // ! Event-Listener to fullfill placement
        if(type === `Destroyer`){
            element.addEventListener(`click`, () => {
                if(localStorage.Horizontal === `true`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Destroyer`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 1]);
                        console.log("Destroyer horizontal placed.");
                    };
                };
                if(localStorage.Horizontal === `false`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Destroyer`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 1, parseInt(element.getAttribute(`data-fieldx`))]);
                        console.log("Destroyer vertical placed.");
                    };
                };
                // ? Finish
                element.removeEventListener(`mouseenter`, a);
                element.removeEventListener(`mouseleave`, b);
                element.removeEventListener(`mouseenter`, c);
                element.removeEventListener(`mouseleave`, d);
                element.classList.remove(`placingHover`);
                resolve(true);
                return true;
            });
        };

        if(type === `Submarine`){
            element.addEventListener(`click`, () => {
                if(localStorage.Horizontal === `true`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Submarine`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 2]);
                        console.log("Submarine horizontal placed");
                    };
                };
                if(localStorage.Horizontal === `false`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Submarine`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 2, parseInt(element.getAttribute(`data-fieldx`))]);
                        console.log("Submarine vertical placed");
                    };
                };
                element.removeEventListener(`mouseenter`, e);
                element.removeEventListener(`mouseleave`, f);
                element.removeEventListener(`mouseenter`, g);
                element.removeEventListener(`mouseleave`, h);
                element.classList.remove(`placingHover`);
                resolve(true);
                return true;
            });
        };

        if(type === `Cruiser`){
            element.addEventListener(`click`, () => {
                if(localStorage.Horizontal === `true`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Cruiser`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 2]);
                        console.log("Cruiser horizontal placed");
                    };
                };
                if(localStorage.Horizontal === `false`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Cruiser`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 2, parseInt(element.getAttribute(`data-fieldx`))]);
                        console.log("Cruiser vertical placed");
                    };
                };
            element.removeEventListener(`mouseenter`, i);
            element.removeEventListener(`mouseleave`, j);
            element.removeEventListener(`mouseenter`, k);
            element.removeEventListener(`mouseleave`, l);
            element.classList.remove(`placingHover`);
            resolve(true);
            return true;
            });
        };

        if(type === `Battleship`){
            element.addEventListener(`click`, () => {
                if(localStorage.Horizontal === `true`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Battleship`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 3]);
                        console.log("Battleship horizontal placed");
                    };
                };
                if(localStorage.Horizontal === `false`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                    humanGameboard.placement(`Battleship`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 3, parseInt(element.getAttribute(`data-fieldx`))]);
                    console.log("Battleship vertical placed");
                    };
                };
                element.removeEventListener(`mouseenter`, m);
                element.removeEventListener(`mouseleave`, n);
                element.removeEventListener(`mouseenter`, o);
                element.removeEventListener(`mouseleave`, p);
                element.classList.remove(`placingHover`);
                resolve(true);
                return true;
            });
        };

        if(type === `Carrier`){
            element.addEventListener(`click`, () => {
                if(localStorage.Horizontal === `true`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Carrier`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`)) + 4]);
                        console.log("Carrier horizontal placed");
                    };
                };
                if(localStorage.Horizontal === `false`){
                    if(localStorage.HumanPlacementShipCounter === `${shipCounter}`){
                        humanGameboard.placement(`Carrier`, [parseInt(element.getAttribute(`data-fieldy`)), parseInt(element.getAttribute(`data-fieldx`))], [parseInt(element.getAttribute(`data-fieldy`)) + 4, parseInt(element.getAttribute(`data-fieldx`))]);
                        console.log("Carrier vertical placed");
                    };
                };
                element.removeEventListener(`mouseenter`, q);
                element.removeEventListener(`mouseleave`, r);
                element.removeEventListener(`mouseenter`, s);
                element.removeEventListener(`mouseleave`, t);
                element.classList.remove(`placingHover`);
                resolve(true);
                return true;
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
