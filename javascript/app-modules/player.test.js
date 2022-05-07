// ! Test Setup
const Player = require('./player');
const Game = require('./gameplay');
const Gameboard = require('./gameboard');
const TestGame = new Game(1, "Test Game");
const PlayerTestGameboard = new Gameboard(10, 10, 'Human');
const CPUTestGameboard = new Gameboard(10, 10, 'CPU');
PlayerTestGameboard.placement("battleship", [3, 1], [5, 1]); 
CPUTestGameboard.placement("battleship", [3, 1], [5, 1]); 
const TestPlayer = new Player("Test", true, PlayerTestGameboard, CPUTestGameboard, TestGame);
const TestCPU = new Player("Test", false, CPUTestGameboard,  PlayerTestGameboard, TestGame);

test('Players can take turns playing the game by attacking the enemy Gameboard.', () => {
    expect(TestPlayer.humanAttack(4,1).ship).not.toBe(false); // Get a object back with a string and the attacked ship
});

test('The game is played against the computer, so make "computer" players capable of making random plays.', () => {
    // The AI does not have to be smart, but it should know whether or not a given move is legal. i.e. it shouldn’t shoot the same coordinate twice. --> It couldn't hit if the field was attacked before
    //Random attack is correct but no hit (It's possible that this test fails because the random attack could hit!)
    expect(TestCPU.cpuAttack()).toBe(false); 
});

/* Assignment:
Create Player.
    - Players can take turns playing the game by attacking the enemy Gameboard.
    - The game is played against the computer, so make ‘computer’ players capable of making random plays. 
    The AI does not have to be smart, but it should know whether or not a given move is legal. 
    (i.e. it shouldn’t shoot the same coordinate twice).
*/