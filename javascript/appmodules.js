//#region Functions

getRandomInt = (max) =>{
    return Math.floor(Math.random() * max);
};

openInNewTab = (href) => {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href: href,
    }).click();
};

getShipLength = (shipType) =>{
if(typeof shipType !== 'string') throw new TypeError(`Argument shipType must be an 'string'`)
if(shipType === `Destroyer`) return 2;
if(shipType === `Submarine`) return 3;
if(shipType === `Cruiser`) return 3;
if(shipType === `Battleship`) return 4;
if(shipType === `Carrier`) return 5;
throw new Error(`Argument shipType must be Destroyer, Submarine, Cruiser, Battleship or Carrier 'string'`);
};

calculateFieldID = (y, x) => {
    // ! Calculate the fieldID and the DOM-Element via the attack coordinates
    if(typeof y !== 'number' || typeof x !== 'number') throw new TypeError(`Only 'number' are allowed as argument types. You have passed ${typeof y} for the y and ${typeof x} for the x paramter`);
    if( y < 1 || y > 10 || x < 1 || x > 10) throw new RangeError(`For the y or x argments only passing a 'number' between 1 and 10 is allowed You have passed  ${y} for the y and ${x} for the parameter`);
    
    if(y === 1){ // ?  If the row is 0 or in other words y = 1 
        res = x;    // ? fieldID is exactly the x value (column)
        return res;
    };
    
    if (y > 1 && y < 11){ // ? If the fieldID is between 11 & 99 the row is between 1 & 11
        if(x === 10){ // ? If x = 10
            yVal = y;
            xVal= 0;
            res = parseInt(`${yVal}${xVal}`);
            return res;
        };
        if(x !== 10){
        yVal = y - 1;  // ?  First digit is y-1 f.e. row 3 column 1 (1, 3) the field id is 21
        xVal = x;
        res = parseInt(`${yVal}${xVal}`);
        return res;
        };
    };

};

getRandomDirection = () => {
    // ? Randomize in which direction ship is placed. (  horizontal -- or vertical  |  )
    if(getRandomInt(2) === 0){
         return `horizontal`       // ?   --
    } else return `vertical`;    // ? |
};

getRandomXCPUValues = (sizeX) => {
    xValue = getRandomInt(sizeX + 1);
    if(xValue === 0 || typeof xValue !== 'number' || xValue === undefined) {
        getRandomXCPUValues();
        return;
    };
    return xValue;
};

getRandomYCPUValues = (sizeY) => {
    yValue = getRandomInt(sizeY + 1);
    if(yValue === 0 || typeof yValue !== 'number' || yValue === undefined) {
        getRandomYCPUValues();
        return;
    };
    return yValue;
};

randomShipPlacementValues = (shipType, sizeY, sizeX) => {
    if(typeof shipType !== 'string') throw new TypeError(`Argument shipType must be an 'string'`)
    shipLength = getShipLength(shipType);

    // ? Random Destroyer placement
    direction =  getRandomDirection();
    if (direction === `horizontal`){ // ? --
        xValue =  getRandomXCPUValues(sizeX - shipLength - 1);
        yValue = getRandomYCPUValues(sizeY);
        return {direction: direction, shipType: shipType, start: [yValue, xValue], end: [yValue, xValue + shipLength - 1]};
    };
    if (direction === `vertical`){ // ? |
        xValue =  getRandomXCPUValues(sizeX);
        yValue = getRandomYCPUValues(sizeY - shipLength - 1);
        return {start: [yValue, xValue], end: [yValue + shipLength - 1, xValue]};
    };
};

proofFieldForFree = (coordinates, playerToProof) => {

    if(coordinates.start[0] === coordinates.end[0]){
        counter = coordinates.end[1] - coordinates.start[1] + 1; // ? Difference +1 is the number of fields
        for(x = 0; x < counter; x++){
            val = coordinates.start[1] + x;
            fieldID = calculateFieldID(coordinates.start[0], val);
            valDOMElement = document.querySelector(`.${playerToProof.name}${fieldID}`);
            valAtt = valDOMElement.getAttribute(`data-occupied`);
            if(valAtt === `true` || valAtt === `true`){
               return false;
               };
        };
        return true
    };
    
    if(coordinates.start[1] === coordinates.end[1]){
        counter = coordinates.end[0] - coordinates.start[0] + 1;
        for(x = 0; x < counter; x++){
            val = coordinates.start[0] + x;
            fieldID = calculateFieldID(val, coordinates.start[1]);
            valDOMElement = document.querySelector(`.${playerToProof.name}${fieldID}`);
            valAtt = valDOMElement.getAttribute(`data-occupied`);

            if(valAtt === `true` || valAtt === `true`){
               return false;
               };
        };
        return true
        };
};

// ! Invoking full ship formation
placingShipsRandomly = (player, gameboard) => {     

// ? Argument Validation
// if(typeof human !== 'boolean') throw new TypeError(`Argument human must be a 'boolean'. You have passed a ${typeof human}`);

randomPlacement = (player, gameboard, shipType) => {   // ? Player must be a 'human' or 'cpu' string with 'Destroyer', 'Submarine', 'Cruiser', 'Battleship'or 'Carrier' ship type
// ? Argument validation
if(typeof player !== 'object') throw new TypeError('Only objects are allowed as player arguments.');
if(typeof shipType !== 'string') throw new TypeError(`The shipType argument must be a 'string'`);

this.player = player;
this.name = player.name;
this.shipType = shipType;
this.gameboard = gameboard;
sizeY = gameboard.sizeY;
sizeX = gameboard.sizeX;

if(shipType === `Destroyer`){
    coordinates = randomShipPlacementValues(`Destroyer`, sizeY, sizeX);  // console.log(destroyerCoordinates); // console.log([destroyerCoordinates.start[0],destroyerCoordinates.start[1]], [destroyerCoordinates.end[0], destroyerCoordinates.end[1]]);
    if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
        return false;
    };

    freeField = proofFieldForFree(coordinates, player);
    if(freeField === false){
        return false;
    };

    if(document.querySelector(`.${name}${shipType}`) !== null) return false; // ? Double placement security

    gameboard.placement(`Destroyer`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
    return true;
};

if(shipType === `Submarine`){
    coordinates = randomShipPlacementValues(`Submarine`, sizeY, sizeX);  // console.log(destroyerCoordinates); // console.log([destroyerCoordinates.start[0],destroyerCoordinates.start[1]], [destroyerCoordinates.end[0], destroyerCoordinates.end[1]]);
    if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
        return false;
    };

    freeField = proofFieldForFree(coordinates, player);
    if(freeField === false){
        return false;
    };

    if(document.querySelector(`.${name}${shipType}`) !== null) return false; // ? Double placement security

    gameboard.placement(`Submarine`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
    return true;
};

if(shipType === `Cruiser`){
    coordinates = randomShipPlacementValues(`Cruiser`,  sizeY, sizeX); 
    if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
        return false;
    };
    
    freeField = proofFieldForFree(coordinates, player);
    if(freeField === false){
        return false;
    };

    if(document.querySelector(`.${name}${shipType}`) !== null) return false; // ? Double placement security

    gameboard.placement(`Cruiser`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
    return true;
};

if(shipType === `Battleship`){
    coordinates = randomShipPlacementValues(`Battleship`, sizeY, sizeX);  // console.log(destroyerCoordinates); // console.log([destroyerCoordinates.start[0],destroyerCoordinates.start[1]], [destroyerCoordinates.end[0], destroyerCoordinates.end[1]]);
    if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
        return false;
    };
    
    freeField = proofFieldForFree(coordinates, player);
    if(freeField === false){
        return false;
    };

    if(document.querySelector(`.${name}${shipType}`) !== null) return false; // ? Double placement security

    gameboard.placement(`Battleship`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
    return true;
};

if(shipType === `Carrier`){
    coordinates = randomShipPlacementValues(`Carrier`, sizeY, sizeX);  // console.log(destroyerCoordinates); // console.log([destroyerCoordinates.start[0],destroyerCoordinates.start[1]], [destroyerCoordinates.end[0], destroyerCoordinates.end[1]]);
    if(typeof coordinates.start[0] !== 'number' || typeof coordinates.start[1] !== 'number' || typeof coordinates.end[0] !== 'number' || typeof coordinates.end[1] !== 'number'){
        return false;
    };

    freeField = proofFieldForFree(coordinates, player);
    if(freeField === false){
        return false;
    };

    if(document.querySelector(`.${name}${shipType}`) !== null) return false; // ? Double placement security

    gameboard.placement(`Carrier`, [coordinates.start[0], coordinates.start[1]], [coordinates.end[0], coordinates.end[1]]);  
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

all = () => {
    destroyer(); submarine(); cruiser(); battleship(); carrier();
};

return {destroyer, submarine, cruiser, battleship, carrier, all };

};

function hovering (playerName, horizontal, adding,  length, basis){
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

//#endregion


//#region Classes

class Ship {
    // Ships will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk
    constructor(length){
      if(length < 1 || length === undefined) throw new Error("Ship must have a length between 2 and 5.");
      this.length = length;
      let health = length;
  
      // Setup the ship sections depending on ther length
      let sections = {};
      for(let x = 1; x <= length; x++){
          sections[x] = "ok";
      };
  
      // Assign type to ship depening on its length
      let type = '';
      switch (length) {
        case 2:
            type = 'Destroyer';
            break;
        case 3:
          type = 'Submarine';
          break;
        case 3:
          type = 'Cruiser';
          break;
        case 4:
          type = 'Battleship';
          break;
        case 4:
        type = 'Carrier';
        break;
    };
  
      // Returns the actual states of the sections
      const sectionsState = () => {
        let actual_ship_state = {};
        for(let x = 1; x <= length; x++){
            actual_ship_state[`Section`+x] = sections[x];
        };
        return actual_ship_state;
      };
  
      // Returns the actual number of damaged sections
      const damage = () => {
        let damagedSections = 0;
        for(let x = 1; x <= length; x++){
            if(sections[x] === "hitted") damagedSections++;
        };
        return damagedSections;
      };
  
       // Returns the health points
       const healthStatus = () => { // ! ? Needed
       return length - damage();
      };
  
      // sunkenState should be a function that calculates it based on their length and whether all of their positions are ‘hit’. The result can be returned as boolean or as a string
      const sunkenState = (asString)=>{
          if(damage() === length){
              if(asString === true) {return `This ship is sunken.`}
              else return true;
           } else if(asString === true){return `This ship isn't sunken. Actual health: ${health()}`}
              else return false;
      };
    
      // Ships should have a hit() function that takes a number and then marks that position as ‘hit’
      const hit =  (section)=>{
         // Check for correct argument
          if(typeof section !== 'number' || section < 1 || section > length) throw new Error(`Only a 'number' between 1 an ${length} (ship length) is allowed.`);
          sections[section] = "hitted";   // console.log(`Section ${section} status: ${sections[section]}`);
          health--;
          return `Ship hitted at section ${section}`;
      };
  
     return { length, type, health, healthStatus, damage, sectionsState, sunkenState, hit};
    };
};

class Player {
    constructor(name, human, ownGameboard, enemyGameboard, info){
    this.name = name;
    this.human = human;
    this.ownGameboard = ownGameboard;
    this.enemyGameboard = enemyGameboard;
    this.info = info;

    // Argument validation
    if(typeof name !== 'string') throw new TypeError (`The name parameter must be a string.`);
    if(typeof info !== 'object' && info.constructor !== Object)
        {throw new TypeError('The game parameter must be a "object".')}
            else { // ? Check if there are players open to play
                if(info.playerCounter < 3) {info.newPlayer();}// ? Sign new player up if possible
                else throw new Error("No more players allowed.") // ? Or reject
            };  

    // ! Players can take turns playing the game by attacking the enemy Gameboard.
    const humanAttack = (y, x) => {
        // Argument validation
        if(typeof y !== 'number' || typeof x !== 'number') throw new TypeError(`Only 'numbers' are allowed as arguments.`);
        if(y >= enemyGameboard.sizeY || x >= enemyGameboard.sizeX) throw new RangeError(`For argument y max ${enemyGameboard.sizeY - 1} and for argument x max ${enemyGameboard.sizeX - 1} are allowed.`)
        
        if(human === true){ // ? Check for human player
            let row = enemyGameboard.gameboard[y - 1], fieldNumber = row[x - 1];
            if(enemyGameboard.missedAttacks.indexOf(fieldNumber) !== -1) throw new Error(`This field was attacked before`); // ? Check if the field was attacked before by checking the field number in the enemy missedAttacks array
            let result = enemyGameboard.receiveAttack(y, x); // ? Attack the enemy gameboard
            return result 
        } else throw new Error(`Computer Player must use cpuAttack()`);
    };

    // ! The game is played against the computer, so make ‘computer’ players capable of making random plays. 

    const getRandomAttackCo = () => {
        let rand = getRandomInt(enemyGameboard.sizeY * enemyGameboard.sizeX) + 1 ; // ? Get a random integer between 0 and the maximum field amount of the gameboard. +1 because the argument number itself can not be returned by getRandomInt()
        if(rand === 0){ // ? Restart if rand is 0
            return false;
        };
        for (let row = 0; row < enemyGameboard.sizeY; row++){   // ? Loop trough the rows 
            if(enemyGameboard.gameboard[row].indexOf(rand) !== -1){ // ? Get the field via matching the random number with the field number in the row
                let eGrow = enemyGameboard.gameboard[row];
                let fieldNumber = eGrow[enemyGameboard.gameboard[row].indexOf(rand)];
                let coordinates = [row, enemyGameboard.gameboard[row].indexOf(rand)]; // ? Get the coordinates of the field via the loop paramters from before
                if(enemyGameboard.missedAttacks.indexOf(rand) === -1){ // ? Check if the random field was not attacked before
                    return coordinates; // ? Return the coordinates if everything is ok
                }   else return false;  // ? Else return false
            };
        };
    };

    const getValidRandomAttackCo = () => {
        let validCoordinates = getRandomAttackCo(); // ? Invoke getRandomAttackCo() to either get coordinates or false
        if(validCoordinates === false || validCoordinates ===  undefined){
            getRandomAttackCo();
            return; // ? If no valid coordinates are returned, invoke it again
        }; 
            return validCoordinates; // ? If coordinates are received, return it        
    };

    // ! The AI does not have to be smart, but it should know whether or not a given move is legal. (i.e. it shouldn’t shoot the same coordinate twice).
    const cpuAttack = () => {
        if(human === false){ // ? Only allow computer  player
            let randomCoordinates = getValidRandomAttackCo(); // ? Get valid coordinates
            if(randomCoordinates === undefined){
                cpuAttack();
                return;
            };
            let result = enemyGameboard.receiveAttack(randomCoordinates[0] + 1, randomCoordinates[1] + 1); // ? Attack the enemy gameboard
            return result
        } else throw new Error(`Humans must use humanAttack()`);
    };

    return { name, human, ownGameboard, enemyGameboard, humanAttack, cpuAttack };
    };
};

class Gameboard {
    constructor (sizeX, sizeY, player, info){
    // ? Argument validation
    // if(typeof sizeX !== 'number' || typeof sizeY !== 'number') throw new TypeError(`Gameboard size arguments must be 'numbers'`);
    // if( player === undefined || typeof player === null) throw new TypeError(`Human players needs a 'string' argumnent, CPU-Players a Object with keys player & position.`)
    // if(typeof info !== 'object') throw new TypeError(`The info argument must be GameInformation Object.`);
    // if( missedAttacks !== undefined || shipIDCounter !== undefined || shipFormation !== undefined || formationCounter !== undefined) throw new TypeError(`Passing arguments for this parameter is not allowed`);

    this.sizeX = sizeX; // ? X-axis length
    this.sizeY = sizeY; // ? Y-axis length
    this.player = player; // ? Owner of the Gameboard object if it is a human
    this.info = info; // ? Info object of the current game
    let shipIDCounter = 0; // ? Unique ship ID
    let shipFormation = []; // ? Stores all ships
    let formationCounter = 0;  // ? Gameboards should be able to report whether or not all of their ships have been sunk.
    let missedAttacks = [];  // ? Gameboards should keep track of missed attacks so they can display them properly.

    // ? Create gameboard container and append it to the game DOM-Section-Element
    const gameboard_container = document.createElement(`div`);
    gameboard_container.classList.add(`gameboards`);
    document.querySelector(`.game-container`).appendChild(gameboard_container);

    // ! Create new gameboard: 2 objects are created, the gameboard array to hold informations about ships, attacks etc... and the DOM-Elements to display it in the browser
    let gameboard = [];
    let fieldID = 0;
    for(let y = 1; y <= sizeY; y++){ // ? Row loop
        let row = []; // ? Create row array for the gameboard array
        const row_container = document.createElement(`div`);  // ? Create the row DOM-Element with properties & append it to players gameboard DOM container
        row_container.classList.add(`rows`);
        row_container.setAttribute(`data-rowNumber`, y);
        gameboard_container.appendChild(row_container);
        for(let x = 1; x <= sizeX; x++){ // ? Fields loop
            fieldID++; // ? Increase the field ID
            row.push(fieldID); // ? Push the field to the row array in the gameboard array
            const field = document.createElement(`div`); // ? Create the field DOM-Element with properties and append it to the row DOM-Element
            field.id = `${player}-fieldID:${fieldID}`;
            field.classList.add(`fields`);
            field.setAttribute(`data-fieldID`, fieldID);
            field.setAttribute(`data-fieldY`, y);
            field.setAttribute(`data-fieldX`, x);
            field.setAttribute(`data-playerFieldID`, player+fieldID);
            field.setAttribute(`data-occupied`, `false`);
            field.classList.add(player);
            field.classList.add( `${player}${fieldID}`);

            field.innerText = fieldID;

        // ? Add Event-Listener for receiveAttack() the CPU gameboard 
         if(player === `cpu`){
            field.addEventListener('click', () => {
                y = parseInt(field.getAttribute(`data-fieldY`));
                x = parseInt(field.getAttribute(`data-fieldX`));
                receiveAttack(y, x);
                info.nextRound(); // ? Trigger next round from a human attack
            });
        };
            row_container.appendChild(field);
        };
        gameboard.push(row); // ? Push the row array within the fieldIDs to the gameboard array 
    };

    const placement = (type, start, end) => {
        // ? Argument validation
        if(typeof type !== 'string') throw new TypeError('Only the strings "Destroyer", "Submarine", "Cruiser", "Battleship"or "Carrier"are allowed as ship type.')
        if(Array.isArray(start) === false || Array.isArray(end) === false) throw new TypeError(`Only 'arrays' are allowed as start & end arguments.`);
        if(start.length + end.length !== 4) throw new Error('In each placement array 2 values are allowed: The x and the y coordinate values.');

        //  ? Create new ship for placement
        let newShip;
        switch (type) {
            case 'Destroyer':
                newShip = new Ship(2);
                break;
            case 'Submarine':
                newShip = new Ship(3);
                break;
            case 'Cruiser':
                newShip = new Ship(3);
                break;
            case 'Battleship':
                newShip = new Ship(4);
                break;
            case 'Carrier':
                newShip = new Ship(5);
                break;
                default:
                    throw new Error(`Only the strings "Destroyer", "Submarine", "Cruiser", "Battleship"or "Carrier"are allowed as ship type.`);
        };
        // ? Finalize ship 
        newShip.ID = `ID${shipIDCounter}`;
        newShip.Owner = this.player;
        shipFormation.push(newShip);
        formationCounter++;

        // ? Validate if placement correspond to ship length
        if(start[0] === end[0]){ // ? Check direction of the placement: Ship length to Y-axis, like --
            // ? f.e. if placement is: start 1/2 to end 1/3, get the y coordinates (2&3) & subtract it from each other. This have to be the exact value of the ship length minus 1. 
            // ? If this value is positive or negative depends if the coordinates are f.e. 1/2 to 1/3 or 1/2 to 1/1.  
            if(start[1] - end[1] !== -(newShip.length -1) && start[1] - end[1] !== (newShip.length -1)) throw new Error(`Placement coordinates do not correspond with ship length. For ${newShip.type} the coordinates only can differ ${newShip.length} fields.`)
        };
        // ? Same as above but if the placement is in  the other direction.   
        if(start[1] === end[1]){ // ? Check direction of the placement: Ship length to X-axis, like | 
            if(start[0] - end[0] !== -(newShip.length -1) && start[0] - end[0] !== (newShip.length -1)) throw new Error(`Placement coordinates do not correspond with ship length. For ${newShip.type} the coordinates only can differ ${newShip.length} fields.`)
        };

         // ! Make  placement
        let correctPlacement = false; 
        let section = 1;   
         if(start[0] === end[0]){ // ? Get the placement direction, here like --
                for(let y = start[1] - 1; y <= end[1] - 1; y++){ // ? Number of fields for -- placement is the difference between start[0] and end[0]
                    let row = gameboard[start[0] - 1]; // ? Get correct row (which is the same for all fields in a -- direction placement)

                    // ? Make placement in DOM
                    let fieldIDPlacement = calculateFieldID(start[0], y +1);
                    let fieldAtDOM = document.querySelector(`.${player}${fieldIDPlacement}`);
                    fieldAtDOM.innerText = `${type}${section}`;
                    fieldAtDOM.classList.add(`${player}${newShip.ID}`)
                    fieldAtDOM.classList.add(`${player}${type}`);
                    fieldAtDOM.setAttribute(`data-occupied`, `true`);
                    fieldAtDOM.setAttribute(`data-type`, type);
                    fieldAtDOM.setAttribute(`data-section`, section);
                    fieldAtDOM.setAttribute(`data-shipID`,`${newShip.ID}`);

                    // ? Finalize ship placement in the gameboard array
                    row[y] = {ID: newShip.ID, Type: type, Section: section}; // ? Set ship informations at actual field of the placement 
                    section++; // ? Ship section is placed on the gameboard
                };
                correctPlacement = true; // ? If ship is correct placed on gameboard, placement is done
        };         
        if(start[1] === end[1]){ // ? Get placement direction, here |
            for(let x = start[0] - 1; x <= end[0] - 1; x++){ 
                let row = gameboard[x];
                let fieldIDPlacement =  calculateFieldID(x +1 , start[1]);
                let fieldAtDOM = document.querySelector(`.${player}${fieldIDPlacement}`);
                fieldAtDOM.innerText = `${type}${section}`;
                fieldAtDOM.classList.add(`${player}${newShip.ID}`)
                fieldAtDOM.classList.add(`${player}${type}`);
                fieldAtDOM.setAttribute(`data-occupied`, `true`);
                fieldAtDOM.setAttribute(`data-type`, type);
                fieldAtDOM.setAttribute(`data-section`, section);
                fieldAtDOM.setAttribute(`data-shipID`,`${newShip.ID}`);
                row[start[1] - 1]  = {ID: newShip.ID, Type: type, Section: section};
                section++;
            };

            correctPlacement = true;  // ? If ship is correct placed on gameboard, placement is done
        };       
        shipIDCounter++; // ? Increase shipID counter so the next ship have a own ID

        // ? Inform invoker of placement
        if  (correctPlacement === true) {
            return  `Placement of ${type} fullfilled: ${correctPlacement}. Coordinates: Start X${start[0]}/Y${start[1]}, End X${end[0]}/Y${end[1]}`;
        } else {
            return `Placement of ${type} fullfilled: ${correctPlacement}. Coordinates for placement not accurate.`; 
        };
    };

    const receiveAttack = (y, x)=>{
    // Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
        // receiveAttack() needs normal indexed arguments!
        // Argument validation
        if(typeof x !== 'number' || typeof y !== 'number') throw new TypeError(`Only 'numbers' are allowed`);
        if(x > sizeX || y > sizeY || x < 0 || y < 0) throw new Error(`Only coordinates between 0 and the gameboard size are allowed. (${sizeX}/${sizeY}).`);
        
        let gameboard_row = gameboard[y-1]; // ? Get the gameboard row of the attacked cell
        let attackedFieldInGameboard = gameboard_row[x-1]; // ? Get the attacked cell in the gameboard
        let fieldID = calculateFieldID(y, x); // ? Get attacked fieldID
        let attackedFieldAtDOM = document.querySelector(`.${player}${fieldID}`); // ? Get the attacked field as DOM-Element
    
        // ! Attack a ship
        if(typeof attackedFieldInGameboard !== 'number') { // ? If the attacked cell is not a number, so a ship object is in,  its a hit..
            let attackedShipID = attackedFieldAtDOM.getAttribute(`data-shipID`); // ? Get the attacked ship ID
            let attackedShipType = attackedFieldInGameboard.Type; // ! ? Use case ?
            let attackedShipInFormation;

            for(let x = 0; x < shipFormation.length; x++){ // ? Get attacked ship in the player formation
                let val =  shipFormation[x];
                if(val.ID === attackedShipID) {attackedShipInFormation = val; console.log(val.ID, attackedShipID, attackedShipInFormation, true);};
            };

            let  attackedShipAtDOMArray = document.querySelectorAll (`.${player}${attackedShipID}`); // ? Get the attacked ship (all sections) as DOM-Elements

            // ! Hit the ship
            attackedShipInFormation.hit(attackedFieldInGameboard.Section); // ? Hit the attacked ship
            attackedFieldInGameboard.hitted = true; // ?  Set gameboard cell to hitted
            attackedFieldAtDOM.innerText = `x`; // todo
            attackedFieldAtDOM.setAttribute(`data-hitted`, true);
            player.name !== typeof 'string' ? attackedFieldAtDOM.classList.add(`hitted-cpu`, `hitted`) : attackedFieldAtDOM.classList.add(`hitted-human`, `hitted`); // ? Depending on the name knowing if human or cpu add hitted classes

            // ! If whole formation is erased
            formationCounter = shipFormation.length;
            for(let x = 0; x < shipFormation.length; x++){
                if(shipFormation[x].sunkenState() === true){ // ? Proof if all ships in formation are sunken
                    formationCounter--;
                    if(formationCounter === 0){
                        alert(`Enemy formation is destroyed`);

                        for(x of attackedShipAtDOMArray){
                            x.classList.add(`sunken-ship`); // ! Maybe an animation ???
                        };

                        // ! Here we must go to next level, congratulations, and so on... In the MainGameLoop we must proof of return to get know this
                        console.log(`Attack hitted & destroyed last ship!`);
                        return `Attack hitted & destroyed last shipt!`;
                    };
                };
            };
            // ! If ship is destroyed
            if(attackedShipInFormation.sunkenState() === true){
                console.log(attackedShipInFormation);
                for(x of attackedShipAtDOMArray){
                    x.classList.add(`sunken-ship`); // ! Maybe an animation ???
                };

                alert(`Ship destroyed`);
                console.log(`Ship destroyed`);
                return  { string: 'Ship destroyed', ship: attackedShipInFormation }
            };

                // ! Return from the function if a ship get hitted  by the attack and inform player
                console.log(`Attack hitted a ship`);  // ? If the attack hitted a ship, return this
                return  { string: 'Attack hitted a ship', ship: attackedShipInFormation }
            } else { // ! If the attack didn't hit a ship, return this and keep track of missed attacks
                missedAttacks.push(gameboard_row[x - 1]);  

                attackedFieldAtDOM.innerText = `o`;
                attackedFieldAtDOM.setAttribute(`data-attacked`, true);
                player.name !== typeof 'string' ? attackedFieldAtDOM.classList.add(`attacked-cpu`, `attacked`) : attackedFieldAtDOM.classList.add(`attacked-human`, `attacked`);

                console.log(`Attack didn't hitted a ship`);
                return false;
            };
    };

    const alive = () => {
    // Returns if there are ships on the gameboard or not
        if(formationCounter > 0) 
            {return true}
            else return false; 
    };

    const missedAttacksArray = () =>{
        return missedAttacks;
    };

    const humanPlacingDestroyer = () => {
            // ? Proof if 'no random ship placement' for human player is selected
                    let finished = false;

                    const fieldArray = document.querySelectorAll(`.${player}`)
                    fieldArray.forEach(element => {
                        let horizontal = true;
                        element.style.pointerEvents = `all`;
                        let fieldIDString = element.getAttribute(`data-fieldID`);
                        let fieldID = parseInt(element.getAttribute(`data-fieldID`));

                        // ? Get next fieldsID-Values in horizontal direction
                       let nextHorIDFirst = fieldID + 1;
                        // ? Get next fieldsID-Values in vertical direction
                        let nextVerIDFirst = fieldID + 10;

                        function addDestroyerHor (){
                            element.classList.add(`placingHover`);
                            document.querySelector(`.${player}${nextHorIDFirst}`).classList.add(`placingHover`);
                        };

                        function removeDestroyerHor() {
                            element.classList.remove(`placingHover`);
                            document.querySelector(`.${player}${nextHorIDFirst}`).classList.remove(`placingHover`);
                        }

                        function addDestroyerVer (){
                            element.classList.add(`placingHover`);
                            document.querySelector(`.${player}${nextVerIDFirst}`).classList.add(`placingHover`);
                        };

                        function removeDestroyerVer() {
                            element.classList.remove(`placingHover`);
                            document.querySelector(`.${player}${nextVerIDFirst}`).classList.remove(`placingHover`);
                        }

                        if(fieldIDString[1] !== `0`){
                            // ? Initialize first placement direction (full ship length)
                            if(finished === false){
                            element.addEventListener(`mouseenter`, addDestroyerHor);
                            element.addEventListener(`mouseleave`, removeDestroyerHor);
                            };
                            // ? Listen for keypress on space to change direction of placement
                            document.addEventListener(`keyup`, (event) => {
                                    if(event.code === `Space`){
                                        event.preventDefault();
                                        if(horizontal === true && finished === false){
                                            element.removeEventListener(`mouseenter`, addDestroyerHor);
                                            element.removeEventListener(`mouseleave`, removeDestroyerHor);
                                            element.addEventListener(`mouseenter`, addDestroyerVer);
                                            element.addEventListener(`mouseleave`, removeDestroyerVer);
                                            horizontal = false;
                                            return;
                                        };
                                        if(horizontal === false && finished === false){
                                            element.removeEventListener(`mouseenter`, addDestroyerVer);
                                            element.removeEventListener(`mouseleave`, removeDestroyerVer);
                                            element.addEventListener(`mouseenter`, addDestroyerHor);
                                            element.addEventListener(`mouseleave`, removeDestroyerHor);
                                            horizontal = true;
                                            return;
                                        };
                                    };
                                });
                        };

                        // ? Coordinates for placement
                        let yValueBasis =  parseInt(element.getAttribute(`data-fieldy`));
                        let xValueBasis = parseInt(element.getAttribute(`data-fieldx`));
                    
                        // ? Trigger placement
                       element.addEventListener(`click`, () => {
                           const arr = document.querySelectorAll(`.${player}`);
                           arr.forEach(e => {
                            e.removeEventListener(`mouseenter`, addDestroyerHor);
                            e.removeEventListener(`mouseenter`, addDestroyerVer);
                            e.style.pointerEvents = `none`;
                           });

                            if(horizontal === true){
                                placement(`Destroyer`, [yValueBasis, xValueBasis], [yValueBasis, xValueBasis + 1]);
                                console.log("po");
                                finished = true;
                                return true;
                            };
                            if(horizontal === false){
                                placement(`Destroyer`, [yValueBasis, xValueBasis], [yValueBasis + 1, xValueBasis]);
                                console.log("op");
                                finished = true;
                                return true;
                            };
                        });
                    });


    };

    return { sizeX, sizeY, gameboard, placement, player, receiveAttack, missedAttacks,  missedAttacksArray, shipFormation, formationCounter, alive, humanPlacingDestroyer };
    };
};

class GameInformation {
    constructor (playerName){
    // ? Declaration
    this.playerName = playerName;
    let playerCounter = 0, roundCounter = 0, onTurn = `player`;

    if(localStorage.Level === undefined) {localStorage.Level = `1`;} // ? Check & set actual level

    const actualOnTurn = () => {
        return onTurn;
    };

    const newPlayer = () => { // ? Sign a new player
        playerCounter++; // ? Increase player counter
    };

    const nextRound = () => {
        roundCounter++; // ? Increase the round counter
        onTurn === `player` ? onTurn = `cpu` : onTurn =  `player`; //  ?! Needed ?
    }; 

    return { playerName, actualOnTurn, newPlayer, playerCounter, nextRound, roundCounter};
    };
};

//#endregion