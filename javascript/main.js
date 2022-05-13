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

  if(typeof playerName !== 'string') throw new TypeError(`Player name must be a 'string'`); // ? Argument validation

  const game_container = document.createElement(`section`);
  game_container.classList.add(`game-container`);
  document.body.appendChild(game_container);

  const info = new GameInformation(playerName); // ? Open new GameInformation object  

  //The game loop should set up a new game by creating Players and Gameboards. 
  const player_Gameboard = new Gameboard(10, 10, playerName, info);  
  const cpu_Gameboard = new Gameboard(10, 10, `CPU`, info); 

  const Human = new Player(playerName, true, player_Gameboard, cpu_Gameboard, info); // ? Create human player object
  const CPU = new Player(`CPU`, false, cpu_Gameboard, player_Gameboard, info); // ? Create cpu player object

  // player_Gameboard.placement("Submarine", [3, 5], [3, 7]); // ? Placing a Submarine on the gameboard in the 1 column from r ow 3 to 5

  // ? Invoking full ship formation by invoking placingRandomShipFormation() with passing true as argument for human gameboard and false for cpu gameboard
  //+++ placingRandomShipFormation() needs existing gameboards and players. It expliciy have to live here in the code  +++
  placingRandomShipFormation = (human) => {     

    // ? Argument Validation
    if(typeof human !== 'boolean') throw new TypeError(`Argument human must be a 'boolean'. You have passed a ${typeof human}`);
    let player, gameboard;
    human === true ? player = `human` : player = `cpu`;
    human === true ? gameboard = player_Gameboard : gameboard = cpu_Gameboard;

    randomPlacement = (player, gameboard, shipType) => {   // ? Player must be a 'human' or 'cpu' string with 'Destroyer', 'Submarine', 'Cruiser', 'Battleship'or 'Carrier' ship type
    // ? Argument validation
    if(typeof player !== 'string') throw new TypeError('Only strings are allowed as player arguments.');
    if(typeof shipType !== 'string') throw new TypeError(`The shipType argument must be a 'string'`);
    
    this.player = player;
    this.shipType = shipType;
    this.gameboard = gameboard;
    sizeY = gameboard.sizeY;
    sizeX = gameboard.sizeX;
    
    if(shipType === `Destroyer`){
        coordinates = randomShipPlacementValues(`Destroyer`, sizeY, sizeX);  // console.log(destroyerCoordinates); // console.log([destroyerCoordinates.start[0],destroyerCoordinates.start[1]], [destroyerCoordinates.end[0], destroyerCoordinates.end[1]]);
        if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
            return false;
        };

        freeField = proofFieldForFree(coordinates, CPU);
        if(freeField === false){
            return false;
        };

        if(document.querySelector(`.${player}${shipType}`) !== null) return false; // ? Double placement security

        if(player === `human`)  player_Gameboard.placement(`Destroyer`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        if(player === `cpu`)  cpu_Gameboard.placement(`Destroyer`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        return true;
    };

    if(shipType === `Submarine`){
        coordinates = randomShipPlacementValues(`Submarine`, sizeY, sizeX);  // console.log(destroyerCoordinates); // console.log([destroyerCoordinates.start[0],destroyerCoordinates.start[1]], [destroyerCoordinates.end[0], destroyerCoordinates.end[1]]);
        if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
            return false;
        };
    
        freeField = proofFieldForFree(coordinates, CPU);
        if(freeField === false){
            return false;
        };

        if(document.querySelector(`.${player}${shipType}`) !== null) return false; // ? Double placement security

        if(player === `human`)  player_Gameboard.placement(`Submarine`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        if(player === `cpu`)  cpu_Gameboard.placement(`Submarine`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        return true;
    };

    if(shipType === `Cruiser`){
        coordinates = randomShipPlacementValues(`Cruiser`,  sizeY, sizeX); 
        if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
            return false;
        };
        
        freeField = proofFieldForFree(coordinates, CPU);
        if(freeField === false){
            return false;
        };

        if(document.querySelector(`.${player}${shipType}`) !== null) return false; // ? Double placement security

        if(player === `human`)  player_Gameboard.placement(`Cruiser`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        if(player === `cpu`)  cpu_Gameboard.placement(`Cruiser`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        return true;
    };

    if(shipType === `Battleship`){
        coordinates = randomShipPlacementValues(`Battleship`, sizeY, sizeX);  // console.log(destroyerCoordinates); // console.log([destroyerCoordinates.start[0],destroyerCoordinates.start[1]], [destroyerCoordinates.end[0], destroyerCoordinates.end[1]]);
        if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
            return false;
        };
        
        freeField = proofFieldForFree(coordinates, CPU);
        if(freeField === false){
            return false;
        };

        if(document.querySelector(`.${player}${shipType}`) !== null) return false; // ? Double placement security

        if(player === `human`)  player_Gameboard.placement(`Battleship`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        if(player === `cpu`)  cpu_Gameboard.placement(`Battleship`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        return true;
    };

    if(shipType === `Carrier`){
        coordinates = randomShipPlacementValues(`Carrier`, sizeY, sizeX);  // console.log(destroyerCoordinates); // console.log([destroyerCoordinates.start[0],destroyerCoordinates.start[1]], [destroyerCoordinates.end[0], destroyerCoordinates.end[1]]);
        if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
            return false;
        };

        freeField = proofFieldForFree(coordinates, CPU);
        if(freeField === false){
            return false;
        };

        if(document.querySelector(`.${player}${shipType}`) !== null) return false; // ? Double placement security

        if(player === `human`)  player_Gameboard.placement(`Carrier`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        if(player === `cpu`)  cpu_Gameboard.placement(`Carrier`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
        return true;
    };

    throw new Error(`Only the strings 'Destroyer', 'Submarine', 'Cruiser', 'Battleship' or 'Carrier' are allowed as ship type.`) // ? If nothing returned before there must be a problem with the shipType string
    };

    destroyer = () =>{
        val = randomPlacement(player, gameboard,  `Destroyer`);
        if(val !== true) {
            destroyer();
        };
    }; 

    submarine = () =>{
        val = randomPlacement(player, gameboard,  `Submarine`);
        if(val !== true) {
            submarine();
        };
    };

    cruiser = () => {
        val = randomPlacement(player, gameboard, `Cruiser`);
        if(val !== true) {
            cruiser();
        };
    };

    battleship = () => {
        val = randomPlacement(player, gameboard, `Battleship`);
        if(val !== true) {
            battleship();
        };
    };

    carrier = () => {
        val = randomPlacement(player, gameboard, `Carrier`);
        if(val !== true)  {
            carrier();
        };
    };

    // ? Invoke ship creation and random placement
    destroyer(); submarine(); cruiser(); battleship(); carrier();

    return true;

  };

  // ? Invoke random ship placement: For human players check first the dropdown list, for cpu invoke it definitely
 // Random placement for human players
  if(document.querySelector(`.placement`).value === `No` ||
        document.querySelector(`.placement`).value === `Nein`)
        placingRandomShipFormation(true);
  placingRandomShipFormation(false);

  // if(document.querySelector(`.placement`).value === `Yes` ||
  // document.querySelector(`.placement`).value === `Ja`){
  //   player_Gameboard.humanPlacingDestroyer();
  // };

  const but = document.createElement(`div`);
  but.classList.add(`changer`);
  document.body.appendChild(but);

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


function humanPlacementDestroyer() {
return new Promise((resolve, reject) => {

    const fieldArray = document.querySelectorAll(`.${playerName}`)
    fieldArray.forEach(element => {
        let horizontal = true;
        element.style.pointerEvents = `all`;
        let fieldIDString = element.getAttribute(`data-fieldID`);
        let fieldID = parseInt(element.getAttribute(`data-fieldID`));
        function att () {hovering(true, true, 2, fieldID)};
        function btt (){hovering(true, false, 2, fieldID)};
        function ctt () {hovering(false, true, 2, fieldID)};
        function dtt () {hovering(false, false, 2, fieldID)};

        if(fieldIDString[1] !== `0` && fieldID < 91){

            element.addEventListener(`mouseenter`, att);
            element.addEventListener(`mouseleave`, btt);

            document.addEventListener(`keyup`, (event) => {
                    if(event.code === `Space`){
                        event.preventDefault();
                        if(horizontal === true){
                            element.removeEventListener(`mouseenter`, att);
                            element.removeEventListener(`mouseleave`, btt);

                            element.addEventListener(`mouseenter`, ctt);
                            element.addEventListener(`mouseleave`, dtt);
                            horizontal = false;
                            return;
                        };
                        if(horizontal === false){
                            element.removeEventListener(`mouseenter`, ctt);
                            element.removeEventListener(`mouseleave`, dtt);

                            element.addEventListener(`mouseenter`, att);
                            element.addEventListener(`mouseleave`, btt);
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
               player_Gameboard.placement(`Destroyer`, [yValueBasis, xValueBasis], [yValueBasis, xValueBasis + 1]);
                console.log("po");
                resolve({ var: "Hello Steve" });
                return true;
            };
            if(horizontal === false){
                player_Gameboard.placement(`Destroyer`, [yValueBasis, xValueBasis], [yValueBasis + 1, xValueBasis]);
                console.log("op");
                resolve({ var: "Hello Steve" });
                return true;
            };
        });
    });

    // but.addEventListener(`click`, () =>{
    //     resolve({ var: "Hello Steve" });
    // });
});


};

  if(document.querySelector(`.placement`).value === `Yes` ||
  document.querySelector(`.placement`).value === `Ja`){



    async function result() {
        const first = await humanPlacementDestroyer();
        console.log(first);
    };                 
    result();


  };




















  // ? Trigger cpu attack after a human attack. Check every interVal if CPU is on turn
  interVal = 100;
  cpuAttackInterval =  setInterval(() => {
      if(info.actualOnTurn() === `cpu`) {
          CPU.cpuAttack();
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
