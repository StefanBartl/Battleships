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

// ! Helper functions for hover-effect in human player placement
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

function humanPlacementDestroyer(type, playerName) {
return new Promise((resolve, reject) => {

    const fieldArray = document.querySelectorAll(`.${playerName}`)
    fieldArray.forEach(element => {
        let horizontal = true;
        element.style.pointerEvents = `all`;
        let fieldIDString = element.getAttribute(`data-fieldID`);
        let fieldID = parseInt(element.getAttribute(`data-fieldID`));

        // ? Destroyer
        if(type === `Destroyer`){
           function a(){hoverOneDestroyer(fieldID)};
           function b(){hoverTwoDestroyer(fieldID)};
           function c(){hoverThreeDestroyer(fieldID)};
           function d(){hoverFourDestroyer(fieldID)};
           
           // ? Start adding listener 
            if(fieldIDString[1] !== `0` && fieldIDString[1] !== `9`){
                element.addEventListener(`mouseenter`, a);
                element.addEventListener(`mouseleave`, b);
            };


            document.addEventListener(`keyup`, (event) => {
                    if(event.code === `Space`){
                        event.preventDefault();
                        if(horizontal === true){
                            element.removeEventListener(`mouseenter`, a);
                            element.removeEventListener(`mouseleave`, b);
                            horizontal = false;

                            element.addEventListener(`mouseenter`, c);
                            element.addEventListener(`mouseleave`, d);
                            return;
                        };
                        if(horizontal === false){
                            element.removeEventListener(`mouseenter`, c);
                            element.removeEventListener(`mouseleave`, d);
                            horizontal = true;

                            element.addEventListener(`mouseenter`, a);
                            element.addEventListener(`mouseleave`, b);
                            return;
                        };
                    };
                });
        };

        // ? Submarine
        if(type === `Submarine` && fieldIDString[1] !== `0` && fieldIDString[1] !== `8` && fieldIDString[1] !== `9`){
            function a(){hoverOneSubmarine(fieldID)};
            function b(){hoverTwoSubmarine(fieldID)};
            function c(){hoverThreeSubmarine(fieldID)};
            function d(){hoverFourSubmarine(fieldID)};
 
             element.addEventListener(`mouseenter`, a);
             element.addEventListener(`mouseleave`, b);
 
             document.addEventListener(`keyup`, (event) => {
                     if(event.code === `Space`){
                         event.preventDefault();
                         if(horizontal === true){
                             element.removeEventListener(`mouseenter`, a);
                             element.removeEventListener(`mouseleave`, b);
 
                             element.addEventListener(`mouseenter`, c);
                             element.addEventListener(`mouseleave`, d);
                             horizontal = false;
                             return;
                         };
                         if(horizontal === false){
                             element.removeEventListener(`mouseenter`, c);
                             element.removeEventListener(`mouseleave`, d);
 
                             element.addEventListener(`mouseenter`, a);
                             element.addEventListener(`mouseleave`, b);
                             horizontal = true;
                             return;
                         };
                     };
                 });
         };

        // ? Cruiser
        if(type === `Cruiser` && fieldIDString[1] !== `0` && fieldIDString[1] !== `7` && fieldIDString[1] !== `8` && fieldIDString[1] !== `9`){
            function a(){hoverOneCruiser(fieldID)};
            function b(){hoverTwoCruiser(fieldID)};
            function c(){hoverThreeCruiser(fieldID)};
            function d(){hoverFourCruiser(fieldID)};
 
             element.addEventListener(`mouseenter`, a);
             element.addEventListener(`mouseleave`, b);
 
             document.addEventListener(`keyup`, (event) => {
                     if(event.code === `Space`){
                         event.preventDefault();
                         if(horizontal === true){
                             element.removeEventListener(`mouseenter`, a);
                             element.removeEventListener(`mouseleave`, b);
 
                             element.addEventListener(`mouseenter`, c);
                             element.addEventListener(`mouseleave`, d);
                             horizontal = false;
                             return;
                         };
                         if(horizontal === false){
                             element.removeEventListener(`mouseenter`, c);
                             element.removeEventListener(`mouseleave`, d);
 
                             element.addEventListener(`mouseenter`, a);
                             element.addEventListener(`mouseleave`, b);
                             horizontal = true;
                             return;
                         };
                     };
                 });
         };

        // ? Battleship
        if(type === `Battleship` && fieldIDString[1] !== `0` && fieldIDString[1] !== `6` && fieldIDString[1] !== `7` && fieldIDString[1] !== `8` && fieldIDString[1] !== `9`){
            function a(){hoverOneBattleship(fieldID)};
            function b(){hoverTwoBattleship(fieldID)};
            function c(){hoverThreeBattleship(fieldID)};
            function d(){hoverFourBattleship(fieldID)};
 
             element.addEventListener(`mouseenter`, a);
             element.addEventListener(`mouseleave`, b);
 
             document.addEventListener(`keyup`, (event) => {
                     if(event.code === `Space`){
                         event.preventDefault();
                         if(horizontal === true){
                             element.removeEventListener(`mouseenter`, a);
                             element.removeEventListener(`mouseleave`, b);
 
                             element.addEventListener(`mouseenter`, c);
                             element.addEventListener(`mouseleave`, d);
                             horizontal = false;
                             return;
                         };
                         if(horizontal === false){
                             element.removeEventListener(`mouseenter`, c);
                             element.removeEventListener(`mouseleave`, d);
 
                             element.addEventListener(`mouseenter`, a);
                             element.addEventListener(`mouseleave`, b);
                             horizontal = true;
                             return;
                         };
                     };
                 });
         };

        // ? Carrier
        if(type === `Carrier` && fieldIDString[1] !== `0` && fieldIDString[1] !== `5` && fieldIDString[1] !== `6` && fieldIDString[1] !== `7` && fieldIDString[1] !== `8` && fieldIDString[1] !== `9`){
            function a(){hoverOneCarrier(fieldID)};
            function b(){hoverTwoCarrier(fieldID)};
            function c(){hoverThreeCarrier(fieldID)};
            function d(){hoverFourCarrier(fieldID)};
 
             element.addEventListener(`mouseenter`, a);
             element.addEventListener(`mouseleave`, b);
 
             document.addEventListener(`keyup`, (event) => {
                     if(event.code === `Space`){
                         event.preventDefault();
                         if(horizontal === true){
                             element.removeEventListener(`mouseenter`, a);
                             element.removeEventListener(`mouseleave`, b);
 
                             element.addEventListener(`mouseenter`, c);
                             element.addEventListener(`mouseleave`, d);
                             horizontal = false;
                             return;
                         };
                         if(horizontal === false){
                             element.removeEventListener(`mouseenter`, c);
                             element.removeEventListener(`mouseleave`, d);
 
                             element.addEventListener(`mouseenter`, a);
                             element.addEventListener(`mouseleave`, b);
                             horizontal = true;
                             return;
                         };
                     };
                 });
         };


        let yValueBasis =  parseInt(element.getAttribute(`data-fieldy`));
        let xValueBasis = parseInt(element.getAttribute(`data-fieldx`));

        element.addEventListener(`click`, () => {
            if(horizontal === true){
               humanGameboard.placement(`Destroyer`, [yValueBasis, xValueBasis], [yValueBasis, xValueBasis + 1]);
                console.log("po");
                const array_ = document.querySelectorAll(`.${playerName}`)
                array_.forEach(e => {
                 e.removeEventListener(`mouseenter`, hoverOneDestroyer);
                 e.removeEventListener(`mouseleave`, hoverTwoDestroyer);
                 e.removeEventListener(`mouseenter`, hoverThreeDestroyer);
                 e.removeEventListener(`mouseleave`, hoverFourDestroyer);
                 e.style.pointerEvents = `none`;
                });
                resolve({ var: "Hello Steve" });
                return true;
            };
            if(horizontal === false){
                humanGameboard.placement(`Destroyer`, [yValueBasis, xValueBasis], [yValueBasis + 1, xValueBasis]);
                element.removeEventListener(`mouseenter`, hoverThreeDestroyer);
                element.removeEventListener(`mouseleave`, hoverFourDestroyer);
                console.log("op");
                const array__ = document.querySelectorAll(`.${playerName}`)
                array__.forEach(e => {
                 e.removeEventListener(`mouseenter`, hoverOneDestroyer);
                 e.removeEventListener(`mouseleave`, hoverTwoDestroyer);
                 e.removeEventListener(`mouseenter`, hoverThreeDestroyer);
                 e.removeEventListener(`mouseleave`, hoverFourDestroyer);
                });
                resolve({ var: "Hello Steve" });
                return true;
            };
        });





    });
});


};

  if(document.querySelector(`.placement`).value === `Yes` ||
  document.querySelector(`.placement`).value === `Ja`){

    async function result() {
        const first = await humanPlacementDestroyer(`Destroyer`, playerName);
        console.log(first);
        const secv = await humanPlacementDestroyer(`Submarine`, playerName);
        console.log(secv);

        // const array__ = document.querySelectorAll(`.${playerName}`)
        // array__.forEach(e  => {
        //  e.removeEventListener(`mouseenter`, att, true);
        //  e.removeEventListener(`mouseleave`, btt, true);
        //  e.removeEventListener(`mouseenter`, ctt, true);
        //  e.removeEventListener(`mouseleave`, dtt, true);
        // });
        // e.style.pointerEvents = `all`;
    };                 
    result();
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
