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

module.exports = Player;
  
/* Assignment:
Create Player.
    - Players can take turns playing the game by attacking the enemy Gameboard.
    - The game is played against the computer, so make ‘computer’ players capable of making random plays. 
    The AI does not have to be smart, but it should know whether or not a given move is legal. 
    (i.e. it shouldn’t shoot the same coordinate twice).
*/