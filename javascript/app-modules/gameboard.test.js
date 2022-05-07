const Gameboard = require('./gameboard');

test('Correct gameboard object placement.', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    expect(Gameboard_Test.placement('battleship', [2, 2], [2 ,4])).toBe('Placement of battleship fullfilled: true. Coordinates: Start X2/Y2, End X2/Y4');
});

test('Incorrect value type for ships. Only strings are allowed.', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    expect(()=>{Gameboard_Test.placement(5, [2, 2], [4, 2])}).toThrow(TypeError);
});

test('Incorrect value type for placement, only arrays are allowed.', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    expect(()=>{Gameboard_Test.placement('battleship', 'two, three', [4, 2])}).toThrow(TypeError);
});

test('Only the x and the y values are allowed in each placement array.', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    expect(()=>{Gameboard_Test.placement('battleship', [2, 3, 4], [2, 4])}).toThrow(Error);
});

test('Ship type do not correspond with the value of possible fields in the placement must be made (f.e. a ship with length 3 occupies 3 fields...).', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    expect(()=>{Gameboard_Test.placement('battleship', [2, 2], [2, 3])}).toThrow(Error);
});

test('Gameboards should be able to report whether or not all of their ships have been sunk. Calling .alive() to get a boolean if there is any ship on the gameboard or not.', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    let  a  =Gameboard_Test.placement('battleship', [2, 2], [2 ,4]);
    expect(Gameboard_Test.alive()).toBe(true);
});

test('Calling .alive() to get a boolean if there is any ship on the gameboard or not - testing of false.', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    // No ship placed on the gameboard or all have been sunken
    expect(Gameboard_Test.alive()).toBe(false);
});

test('Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the "hit" function to the correct ship', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    let a = Gameboard_Test.placement('battleship', [2, 2], [2 ,4]);
    expect(Gameboard_Test.receiveAttack(2, 2)).not.toBe(false);
});

test('Only two "numbers" are allowed', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    Gameboard_Test.placement('battleship', [2, 2], [2 ,4]);
    expect(()=>{Gameboard_Test.receiveAttack(2, "2")}).toThrow(TypeError);
});

test('Only attacks  IN the gameboard are possible.', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    Gameboard_Test.placement('battleship', [2, 2], [2 ,4]);
    expect(()=>{Gameboard_Test.receiveAttack(34, 9)}).toThrow(Error);
});

test('To check the accurate state of a ship is hitted or not and proof if the recceiveAttack() triggers the ship object hit() function', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    Gameboard_Test.placement('battleship', [2, 2], [2 ,4]);
    Gameboard_Test.receiveAttack(3, 2);
    expect(Gameboard_Test.shipFormation[0].sectionsState()).toStrictEqual({
        Section1: "ok",
        Section2: "hitted",
        Section3: "ok"
    });
});

test('Gameboards should keep track of missed attacks so they can display them properly.', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    Gameboard_Test.placement('battleship', [2, 2], [2 ,4]);
    Gameboard_Test.receiveAttack(5, 10);
    expect(Gameboard_Test.missedAttacks[0]).toStrictEqual(50);
});

test('Gameboards should be able to report whether or not all of their ships have been sunk.(Ship on the Gameboard)', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    Gameboard_Test.placement('battleship', [2, 2], [2 ,4]);
    expect(Gameboard_Test.alive()).toBe(true);
});

test('Gameboards should be able to report whether or not all of their ships have been sunk. (No ship on the Gameboard)', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    expect(Gameboard_Test.alive()).toBe(false);
});

test('Gameboards should be able to report whether or not all of their ships have been sunk. (Last ship on the Gameboard destroyed)', () => {
    const Gameboard_Test = new Gameboard(10, 5, 'TestPlayer');
    Gameboard_Test.placement('battleship', [2, 2], [2 ,4]);
    Gameboard_Test.receiveAttack(2, 2);
    Gameboard_Test.receiveAttack(3, 2);
    Gameboard_Test.receiveAttack(4, 2);
    expect(Gameboard_Test.alive()).toBe(false);
});


/* Assignment:
Create Gameboard factory
    - Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. 
    You shouldn’t be relying on console.logs or DOM methods to make sure your code is doing what you expect it to.
    - Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
    - Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship 
    and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
    - Gameboards should keep track of missed attacks so they can display them properly.
    - Gameboards should be able to report whether or not all of their ships have been sunk.
*/