const BattleshipModule= require('./ship');
const GameboardModule = require('./gameboard');
const PlayerModule = require('./player');
const GameplayModule = require('./gameplay');

MainGameLoop = () => {
    const Gameplay = new GameplayModule(1, "Welcome to Battleship"); // Game object which holds information about the game
    const Gameboard_FirstComputer = new GameboardModule(10,6, 'First Computer'); // ? Creates a new Gameboard with 10 rows / 6 columns for the player 'Test player'
    const Gameboard_TestPlayer = new GameboardModule(10,6, 'Test Player');
    Gameboard_FirstComputer.enemyGameboardAdd(Gameboard_TestPlayer);
    Gameboard_TestPlayer.enemyGameboardAdd(Gameboard_FirstComputer);
    
    const FirstComputer = new PlayerModule('First Computer', false, Gameboard_FirstComputer, Gameboard_TestPlayer, Gameplay); // ? Create Player
    Gameboard_FirstComputer.placement("battleship", [1, 1], [3, 1]);  // ? Placing a battleship on the gameboard in the 1 column from row 3 to 5
    
    const TestPlayer = new PlayerModule('Test Player', true, Gameboard_TestPlayer, Gameboard_FirstComputer, Gameplay); 
    Gameboard_TestPlayer.placement("battleship", [3, 1], [5, 1]); 
    
    TestPlayer.humanAttack(2, 1);
    FirstComputer.cpuAttack();
  };

  module.exports = MainGameLoop;