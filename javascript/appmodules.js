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
    this.player = player; // ? Owner of the Gameboard object if it is a human
    if(typeof player === 'object'){player = player.name; position= player.position} // ? Destructure player object if human is false to get name and position of the cpu 
    shipIDCounter = 0; // ? Unique ship ID
    shipFormation = []; // ? Stores all ships
    formationCounter = 0;  // ? Gameboards should be able to report whether or not all of their ships have been sunk.
    this.missedAttacks = missedAttacks;
    missedAttacks = [];  // ? Gameboards should keep track of missed attacks so they can display them properly.

    // ? Create gameboard container and append it to the game DOM-Section-Element
    const gameboard_container = document.createElement(`div`);
    gameboard_container.classList.add(`gameboards`);
    document.querySelector(`.game-container`).appendChild(gameboard_container);

    // ! Create new gameboard: 2 objects are created, the gameboard array to hold informations about ships, attacks etc... and the DOM-Elements to display it in the browser
    let gameboard = [];
    let fieldID = 0;
    for(y = 1; y <= sizeY; y++){ // ? Row loop
        let row = []; // ? Create row array for the gameboard array
        const row_container = document.createElement(`div`);  // ? Create the row DOM-Element with properties & append it to players gameboard DOM container
        row_container.classList.add(`rows`);
        row_container.setAttribute(`data-rowNumber`, y);
        gameboard_container.appendChild(row_container);
        for(x = 1; x <= sizeX; x++){ // ? Fields loop
            fieldID++; // ? Increase the field ID
            row.push(fieldID); // ? Push the field to the row array in the gameboard array
            const field = document.createElement(`div`); // ? Create the field DOM-Element with properties and append it to the row DOM-Element
            field.classList.add(`fields`);
            field.setAttribute(`data-fieldID`, fieldID);
            field.setAttribute(`data-fieldY`, y);
            field.setAttribute(`data-fieldX`, x);
            field.classList.add(player+ fieldID);
            field.innerText = fieldID;

            field.addEventListener('click', () => {
                y = parseInt(field.getAttribute(`data-fieldY`));
                x = parseInt(field.getAttribute(`data-fieldX`));
                receiveAttack(y, x);

            });

            row_container.appendChild(field);
        };
        gameboard.push(row); // ? Push the row array within the fieldIDs to the gameboard array 
    };


    placement = (type, start, end) => {

        // ? Argument validation
        if(typeof type !== 'string') throw new TypeError('Only the strings "cruiser", "corvette", "battleship" or "aircraft-carrier" are allowed as ship type. Default is "cruiser".')
        if(Array.isArray(start) === false || Array.isArray(end) === false) throw new TypeError(`Only 'arrays' are allowed as start & end arguments.`);
        if(start.length + end.length !== 4) throw new Error('In each placement array 2 values are allowed: The x and the y coordinate values.');

        //  ? Create new ship for placement
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
        // ? Finalize ship 
        newShip.ID = shipIDCounter;
        newShip.Owner = player;
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

         //  ? Make the placement in gameboard array
        correctPlacement = false; 
        section = 1;   
         if(start[0] === end[0]){ // ? Get the placement direction, here like --
                for(y = start[1] - 1; y <= end[1] - 1; y++){ // ? Number of fields for -- placement is the difference between start[0] and end[0]
                    row = gameboard[start[0]]; // ? Get correct row (which is the same for all fields in a -- direction placement)
                    fieldIDPlacement = row[y] ; // ? Get fieldID via row and the increasing column number between start[0] and end[0] 
                   
                    // ? With the field id place the ship in the corresponend DOM-Element 
                    fieldAtDOM = document.querySelector(`.${player}${fieldIDPlacement}`);
                    fieldAtDOM.innerText = `${type}${section}`;
                   
                    // ? Finalize ship placement in the gameboard array
                    row[y] = {ID: shipIDCounter, Type: type, Section: section}; // ? Set ship informations at actual field of the placement 
                    section++; // ? Ship section is placed on the gameboard
                };
                correctPlacement = true; // ? If ship is correct placed on gameboard, placement is done
        };         
        if(start[1] === end[1]){ // ? Get placement direction, here |
            for(x = start[0] - 1; x <= end[0] - 1; x++){ // ? Loop trough  rows
                row = gameboard[x];  // ? Get teh correct row in this loop round
                fieldIDPlacement = row[start[1] - 1] ;  // ? Get fieldID via increasing row and the column, which stays the same for the whole | placement

                // ? With the field id place the ship in the corresponend DOM-Element 
                fieldAtDOM = document.querySelector(`.${player}${fieldIDPlacement}`);
                fieldAtDOM.innerText = `${type}${section}`;

                // ? Finalize ship placement in the gameboard array
                row[start[1] - 1]  = {ID: shipIDCounter, Type: type, Section: section}; // ? Set ship informations at actual field of the placement 
                section++; // ? Ship section is placed on the gameboard
            };
            correctPlacement = true;  // ? If ship is correct placed on gameboard, placement is done
        };       
        shipIDCounter++; // ? Increase shipID counter so the next ship have a own ID

        // ? Inform invoker of placement
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
        
        gameboard_row = gameboard[y-1]; // ? Get the gameboard row of the attacked cell
        attackedFieldID = gameboard_row[x-1];
        
        // ? Calculate the fieldID via the attack coordinates
        if(y === 1){
            res = x;    // ? If the row is 0, the fieldID is exactly the x value (column)
        };

        if(y > 1){ // ? If row (y) is over 1.. (row 2 begins with 11) 
            yVal = y-1; // ? The first digit of the result is y-1 (row 2 starts with 11, row 3 starts with 21...) 
            if(x < 10){ // ? But the x value is under 10...
                res = parseInt(`${yVal}${x}`);
            };
            if(x >= 10){ // ? If the x is over 9 we have to increase the y to...
                xString = `${x}`; // ? Get the 2 digit via string
                xVal = parseInt(xString[2]); // ? tranform it to number
                yIncrease = parseInt(xString[1]); // ? Get the 1 digit via string
                yVal +=yIncrease; // ? Increase y
                res = parseInt(`${yVal}${xVal}`) // ? Get the result
            };
        };

        attackedFieldAtDOM = document.querySelector(`.${player}${res}`); // ? Get the attacked field as DOM-Element

        if(typeof attackedFieldID !== 'number') { // ? If the attacked cell is not empty. its a hit..
            gameboard_row[x -1].hitted = true; // ?  Set gameboard cell to hitted
            formationPosition = gameboard_row[x - 1].ID - 1; // ? The ship ID is a unique increasing number, shipFormattion an array. If we want the ship with the the ID in the array, we must do shipFormation[ID - 1] 
            attackedShip = shipFormation[formationPosition]; // ? Get the attacked ship object in the shipFormation array
            attackedShip.hit(gameboard_row[x - 1].Section); // ? Hit the attacked ship
            
            attackedFieldAtDOM.innerText = `x`;
            attackedFieldAtDOM.setAttribute(`data-hitted`, true);
            player.name !== typeof 'string' ? attackedFieldAtDOM.classList.add(`hitted-cpu`, `hitted`) : attackedFieldID.classList.add(`hitted-human`, `hitted`);

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

                attackedFieldAtDOM.innerText = `o`;
                attackedFieldAtDOM.setAttribute(`data-attacked`, true);
                player.name !== typeof 'string' ? attackedFieldAtDOM.classList.add(`attacked-cpu`, `attacked`) : attackedFieldID.classList.add(`attacked-human`, `attacked`);

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

const GameInformation = function (playerName){
    // ? Declaration
    this.playerName = playerName;
    playerCounter = 0;
    roundCounter = 0;
    onTurn = `player`;

    if(localStorage.Level === undefined) {localStorage.Level = `1`;} // ? Check & set actual level

    newPlayer = () => { // ? Sign a new player
        playerCounter++; // ? Increase player counter
    };

    nextRound = () => {
        roundCounter++; // ? Increase the round counter
        onTurn === `player` ? onTurn = `cpu` : `player`; // ? Change who is on turn
    };

    cpuFullName = () => {
        switch (parseInt(localStorage.Level)) {
            case 1:
                return {position: `General`, name: `Battlesmith`};
        };
    };

    return { playerName, newPlayer, playerCounter, nextRound, roundCounter, cpuFullName };
};

function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
      target: '_blank',
      href: href,
    }).click();
};

MainGameLoop = (playerName) => {
    if(typeof playerName !== 'string') throw new TypeError(`Player name must be a 'string'`); // ? Argument validation

    const game_container = document.createElement(`section`);
    game_container.classList.add(`game-container`);
    document.body.appendChild(game_container);
  
    const info = new GameInformation(playerName); // ? Open new GameInformation object  
    cpuFullName = info.cpuFullName(); // ? Get the name of the enemy cpu depending on the actual level 

    //The game loop should set up a new game by creating Players and Gameboards. 
    const player_Gameboard = new Gameboard(10, 10, playerName);  // For now just populate each Gameboard with predetermined coordinates. 
    const cpu_Gameboard = new Gameboard(10, 10, cpuFullName);  // For now just populate each Gameboard with predetermined coordinates. 
  
    const TestPlayer = new Player('Test Player', true, player_Gameboard, cpu_Gameboard, info); // ? Create human player object
    const FirstComputer = new Player('First Computer', false, cpu_Gameboard, player_Gameboard, info); // ? Create cpu player object

    player_Gameboard.placement("battleship", [3, 5], [3, 7]); // ? Placing a battleship on the gameboard in the 1 column from r ow 3 to 5
    cpu_Gameboard.placement("battleship", [1, 1], [3, 1]);  
    
    // alert(`Player, you are on turn! Select a field in the enemy Gameboard to attack.`); DEUTSCH

    TestPlayer.humanAttack(1, 3);
    FirstComputer.cpuAttack();
    TestPlayer.humanAttack(3, 1);

    // ! You can implement a system for allowing players to place their ships later.
// cpu_Gameboard.enemyGameboardAdd(player_Gameboard);
// player_Gameboard.enemyGameboardAdd(cpu_Gameboard);
};