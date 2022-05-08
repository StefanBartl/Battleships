const Ship = function (length) {
    // Ships will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk
    
      if(length < 1 || length === undefined) throw new Error("Ship must have a length.");
      this.length = length;
  
      // Setup the ship sections depending on ther length
      sections = {};
      for(let x = 1; x <= length; x++){
          sections[x] = "ok";
      };
  
      // Assign type to ship depening on its length
      type = '';
      switch (length) {
        case 1:
            type = 'cruiser';
            break;
        case 2:
          type = 'corvette';
          break;
        case 3:
          type = 'battleship';
          break;
        case 4:
          type = 'aircraft-carrier';
          break;
    };
  
      // Returns the actual states of the sections
      sectionsState = () => {
        actual_ship_state = {};
        for(let x = 1; x <= length; x++){
            actual_ship_state[`Section`+x] = sections[x];
        };
        return actual_ship_state;
      };
  
      // Returns the actual number of damaged sections
      damage = () => {
        damagedSections = 0;
        for(let x = 1; x <= length; x++){
            if(sections[x] === "hitted") damagedSections++;
        };
        return damagedSections;
      };
  
       // Returns the health points
      health = () => {
       return length - damage();
      };
  
      // sunkenState should be a function that calculates it based on their length and whether all of their positions are ‘hit’. The result can be returned as boolean or as a string
      sunkenState = (asString)=>{
          if(damage() === length){
              if(asString === true) {return `This ship is sunken.`}
              else return true;
           } else if(asString === true){return `This ship isn't sunken. Actual health: ${health()}`}
              else return false;
      };
    
      // Ships should have a hit() function that takes a number and then marks that position as ‘hit’
       hit =  (section)=>{
         // Check for correct argument
          if(typeof section !== 'number' || section < 1 || section > length) throw new Error(`Only a 'number' between 1 an ${length} (ship length) is allowed.`);
          sections[section] = "hitted";   // console.log(`Section ${section} status: ${sections[section]}`);
          health--;
          return `Ship hitted at section ${section}`;
      };
  
     return { length, type, health, damage, sectionsState, sunkenState, hit};
 };

  const Player = function (name, human, ownGameboard, enemyGameboard, game){

    this.name = name;
    this.ownGameboard = ownGameboard;
    this.enemyGameboard = enemyGameboard;
    this.game = game;

    // Argument validation
    if(typeof name !== 'string') throw new TypeError (`The name parameter must be a string.`);
    if(typeof game !== 'object' && game.constructor !== Object)
        {throw new TypeError('The game parameter must be a "object".')}
         else { // ? Check if there are players open to play
             if(game.playerCounter < 3) {game.newPlayer();}// ? Sign new player up if possible
                else throw new Error("No more players allowed.") // ? Or reject
            };  

    // ! Players can take turns playing the game by attacking the enemy Gameboard.
        humanAttack = (y, x) => {
            // Argument validation
            if(typeof y !== 'number' || typeof x !== 'number') throw new TypeError(`Only 'numbers' are allowed as arguments.`);
            if(y >= enemyGameboard.sizeY || x >= enemyGameboard.sizeX) throw new RangeError(`For argument y max ${enemyGameboard.sizeY - 1} and for argument x max ${enemyGameboard.sizeX - 1} are allowed.`)
            
            if(human === true){ // ? Check for human player
                row = enemyGameboard.gameboard[y - 1];
                fieldNumber = row[x - 1];
                if(enemyGameboard.missedAttacks.indexOf(fieldNumber) !== -1) throw new Error(`This field was attacked before`); // ? Check if the field was attacked before by checking the field number in the enemy missedAttacks array
                result = enemyGameboard.receiveAttack(y, x); // ? Attack the enemy gameboard
                game.nextRound(); // ? Increase the round counter
                return result 
            } else throw new Error(`Computer Player must use cpuAttack()`);
        };

    //#region Section exclusive for Computer Players 
    // ! The game is played against the computer, so make ‘computer’ players capable of making random plays. 

    getRandomInt = (max) =>{
        return Math.floor(Math.random() * max);
      };

    getRandomAttackCo = () => {
        rand = getRandomInt(enemyGameboard.sizeX * enemyGameboard.sizeY); // ? Get a random integer between 0 and the maximum field amount of the gameboard
        for (row = 0; row < enemyGameboard.sizeY; row++){   // ? Loop trough the rows 
            if(enemyGameboard.gameboard[row].indexOf(rand) !== -1){ // ? Get the field via matching the random number with the field number in the row
                grow = enemyGameboard.gameboard[row];
                fieldNumber = grow[enemyGameboard.gameboard[row].indexOf(rand)];
                coordinates = [row, enemyGameboard.gameboard[row].indexOf(rand)]; // ? Get the coordinates of the field via the loop paramters from before
                if(enemyGameboard.missedAttacks.indexOf(rand) === -1){ // ? Check if the random field was not attacked before
                    return coordinates; // ? Return the coordinates if everything is ok
                }   else return false;  // ? Else return false
            };
        };
    };

    getValidRandomAttackCo = () => {
        validCoordinates = getRandomAttackCo(); // ? Invoke getRandomAttackCo() to either get coordinates or false
        if(validCoordinates === false || validCoordinates ===  undefined){
            getRandomAttackCo(); } // ? If no valid coordinates are returned, invoke it again
             return validCoordinates; // ? If coordinates are received, return it        
    };

    // ! The AI does not have to be smart, but it should know whether or not a given move is legal. (i.e. it shouldn’t shoot the same coordinate twice).
    cpuAttack = () => {
        if(human === false){ // ? Only allow computer  player
            randomCoordinates = getValidRandomAttackCo(); // ? Get valid coordinates
            result = enemyGameboard.receiveAttack(randomCoordinates[0] + 1, randomCoordinates[1] + 1); // ? Attack the enemy gameboard
            game.nextRound(); // ? Increase round counter
            return result
        } else throw new Error(`Humans must use humanAttack()`);
    };

    //#endregion

    return { name, human, ownGameboard, enemyGameboard, humanAttack, cpuAttack };

};

const Gameboard = function (sizeX, sizeY, player, missedAttacks, shipFormation){

    this.sizeX = sizeX; // ? X-axis length
    this.sizeY = sizeY; // ? Y-axis length
    this.player = player; // ? Owner of the Gameboard object
    shipIDCounter = 1; // ? Unique ship ID
    shipFormation = []; // ? Stores all ships
    formationCounter = 0;  // ? Gameboards should be able to report whether or not all of their ships have been sunk.
    this.missedAttacks = missedAttacks;
    missedAttacks = [];  // ? Gameboards should keep track of missed attacks so they can display them properly.
    

    // Create a new Gameboard
    let gameboard = [];
    let fieldID = 0;
    for(y = 1; y <= sizeY; y++){
        let row = [];
        for(x = 1; x <= sizeX; x++){
            fieldID++;
            row.push(fieldID);
        };
        gameboard.push(row);
    };

    placement = (type, start, end) => {

        // Argument validation
        if(typeof type !== 'string') throw new TypeError('Only the strings "cruiser", "corvette", "battleship" or "aircraft-carrier" are allowed as ship type. Default is "cruiser".')
        if(Array.isArray(start) === false || Array.isArray(end) === false) throw new TypeError(`Only 'arrays' are allowed as start & end arguments.`);
        if(start.length + end.length !== 4) throw new Error('In each placement array 2 values are allowed: The x and the y coordinate values.');

        //  Create new ship for placement
        switch (type) {
            case 'cruiser':
                newShip = Ship(1);
                break;
            case 'corvette':
                newShip = Ship(2);
                break;
            case 'battleship':
                newShip = Ship(3);
                break;
            case 'aircraft-carrier':
                newShip = Ship(4);
                break;
        };
        // Finalize ship 
        newShip.ID = shipIDCounter;
        newShip.Owner = player;
        shipFormation.push(newShip);
        formationCounter++;

        // Validate if placement correspond to ship length
        if(start[0] === end[0]){ // Check direction of the placement: Ship length to Y-axis, like |
            // f.e. if placement is: start 1/2 to end 1/3, get the y coordinates (2&3) & subtract it from each other. This have to be the exact value of the ship length minus 1. If this value is positive or negative depends if the coordinates are f.e. 1/2 to 1/3 or 1/2 to 1/1.  
            if(start[1] - end[1] !== -(newShip.length -1) && start[1] - end[1] !== (newShip.length -1)) throw new Error(`Placement coordinates do not correspond with ship length. For ${newShip.type} the coordinates only can differ ${newShip.length} fields.`)
        };
        // Same as above but if the placement is in  the other direction.   
        if(start[1] === end[1]){ // Check direction of the placement: Ship length to X-axis, like -- 
            if(start[0] - end[0] !== -(newShip.length -1) && start[0] - end[0] !== (newShip.length -1)) throw new Error(`Placement coordinates do not correspond with ship length. For ${newShip.type} the coordinates only can differ ${newShip.length} fields.`)
        };

         //  Make the placement in gameboard array
        correctPlacement = false; 
        section = 1; 
         if(start[0] === end[0]){ // Get the placement direction
                for(y = start[1] - 1; y <= end[1] - 1; y++){ // Number of fields for placement
                    row = gameboard[y]; // Get corect row in array
                    row[start[0] - 1] = {ID: shipIDCounter, Type: type, Section: section}; // a[start[0]] is the actual field of the placement, set ship informations there
                    section++; // Ship section is placed on the gameboard
                };
                correctPlacement = true; // If ship is correct placed on gameboard, placement is done
        };         
        if(start[1] === end[1]){ // Same as above but in the other axis
            for(x = start[0] - 1; x <= end[0] - 1; x++){
                row = gameboard[x]; 
                row[start[0] - 1] = {ID: shipIDCounter, Type: type, Section: section}; 
                section++; 
            };
            correctPlacement = true;
        };       
        shipIDCounter++; // Increase shipID counter so the next ship have a own ID

        // Inform invoker of placement
        if  (correctPlacement === true) {
            // console.log(`Plaement of ${type} fullfilled: ${correctPlacement}.`); 
            return  `Placement of ${type} fullfilled: ${correctPlacement}. Coordinates: Start X${start[0]}/Y${start[1]}, End X${end[0]}/Y${end[1]}`;
        } else {
            // console.log(`Plaement of ${type} fullfilled: ${correctPlacement}. Coordinates for placement not accurate.`);
            return `Placement of ${type} fullfilled: ${correctPlacement}. Coordinates for placement not accurate.`; 
        };
    };

    receiveAttack = (y, x)=>{
    // Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
        // receiveAttack() needs normal indexed arguments!
        // Argument validation
        if(typeof x !== 'number' || typeof y !== 'number') throw new TypeError(`Only 'numbers' are allowed`);
        if(x > sizeX || y > sizeY || x < 0 || y < 0) throw new Error(`Only coordinates between 0 and the gameboard size are allowed. (${sizeX}/${sizeY}).`);
        
        gameboard_row = gameboard[y-1]; // ? Get the attacked cell in the gameboard
        if(typeof gameboard_row[x-1] !== 'number') { // ? If the attacked cell is not empty...
            gameboard_row[x -1].hitted = true; // ?  Set gameboard cell to hitted
            formationPosition = gameboard_row[x - 1].ID - 1; // ? The ship ID is a unique increasing number, shipFormattion an array. If we want the ship with ID 1, we must do shipFormation[ID - 1]
            attackedShip = shipFormation[formationPosition]; // ? Get the attacked ship object in the shipFormation array
            attackedShip.hit(gameboard_row[x - 1].Section); // ? Hit the attacked ship
            
            // Return from the function if a ship get hitted or maybe the whole formation is erased by the attack
            for(let x of shipFormation){
                if(x.sunkenState() === true){ // ? Return if all ships in formation are sunken
                    formationCounter--;
                    if(formationCounter === 0){
                        alive = false; 
                        console.log(`Attack hitted & destroyed last ship!`);
                        return `Attack hitted & destroyed last shipt!`;
                    };
                };
            };

                console.log(`Attack hitted a ship`);  // ? If the attack hitted a ship, return this
                return  { string: 'Attack hitted a ship', ship: attackedShip }
            } else {
                missedAttacks.push(gameboard_row[x - 1]);  // ? If the attack didn't hit a ship, return this and keep track of missed attacks
                console.log(`Attack didn't hitted a ship`);
                return false;
            };
    };

    alive = () => {
    // Returns if there are ships on the gameboard or not
        if(formationCounter > 0) 
            {return true}
            else return false; 
    };

    missedAttacksArray = () =>{
        return missedAttacks;
    };

    return { sizeX, sizeY, gameboard, placement, player, receiveAttack, missedAttacks,  missedAttacksArray, shipFormation, formationCounter, alive,  };
};

const GameInformation = function (level){

    this.level = level;
    playerCounter = 0;
    roundCounter = 0;

    newPlayer = () => {playerCounter++}
    nextRound = () => {roundCounter++};

    cpuName = (level) => {
        switch (level) {
            case 1:
                return `General Battlesmith`;
        };
    };

    return { level, newPlayer, playerCounter, nextRound, roundCounter, cpuName };
};

MainGameLoop = (playerName) => {
    if(typeof playerName !== 'string') throw new TypeError(`Player name must be a 'string'`); // ? Argument validation
    localStorage.Level === undefined ?  level = 1 : level = localStorage.Level; // ? Check & set level
  
    const info = new GameInformation(level);
    cpuName = info.cpuName();

    //The game loop should set up a new game by creating Players and Gameboards. 
    // For now just populate each Gameboard with predetermined coordinates. You can implement a system for allowing players to place their ships later.
    const player_Gameboard = new Gameboard(10,6, playerName);
    const cpu_Gameboard = new Gameboard(10,6, cpuName); 

    // cpu_Gameboard.enemyGameboardAdd(player_Gameboard);
    // player_Gameboard.enemyGameboardAdd(cpu_Gameboard);
    
    const FirstComputer = new Player('First Computer', false, cpu_Gameboard, player_Gameboard, info); // ? Create Player
    cpu_Gameboard.placement("battleship", [1, 1], [3, 1]);  // ? Placing a battleship on the gameboard in the 1 column from row 3 to 5
    
    const TestPlayer = new Player('Test Player', true, player_Gameboard, cpu_Gameboard, info); 
    player_Gameboard.placement("battleship", [3, 1], [5, 1]); 
    
    TestPlayer.humanAttack(2, 1);
    FirstComputer.cpuAttack();
};

function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href: href,
    }).click();
};