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

  // ? Invoke ship placement
  placingRandomShipFormation(true);
  placingRandomShipFormation(false);

  // ? Trigger cpu attack after a human attack. Check every interVal if CPU is on turn
  interVal = 100;
  cpuAttackInterval =  setInterval(() => {
      if(info.actualOnTurn() === `cpu`) {
          CPU.cpuAttack();
          info.nextRound(); // ? Trigger next round from a cpu attack
      };
  }, interVal);
  // clearInterval(cpuAttackInterval); // ? To clear the interval f.e. after the game end

  // TestPlayer.humanAttack(1, 3);
  // FirstComputer.cpuAttack();
  // TestPlayer.humanAttack(3, 1);

  // ! You can implement a system for allowing players to place their ships later.
// cpu_Gameboard.enemyGameboardAdd(player_Gameboard);
// player_Gameboard.enemyGameboardAdd(cpu_Gameboard);
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
