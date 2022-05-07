const Ship= require('./ship');

test('Ships should have a length property of 7.', () => {
  const MS_Battleship = new Ship(7);
  expect(MS_Battleship.length).toBe(7);
});

test('Ships should have a damage property.', () => {
  const MS_Battleship = new Ship(7);
  MS_Battleship.hit(1);
  MS_Battleship.hit(3);
  expect(MS_Battleship.damage()).toBe(2);
});

test('sunkenState() should be a function that calculates it based on their length and whether all of their positions are hit. (boolean)', () => {
  const MS_Battleship = new Ship(7);
  expect(MS_Battleship.sunkenState(false)).toBe(false);
});

test('should be a function that calculates it based on their length and whether all of their positions are hit. (boolean)', () => {
  const MS_Battleship = new Ship(4);
  MS_Battleship.hit(1); MS_Battleship.hit(2); MS_Battleship.hit(3); MS_Battleship.hit(4);
  expect(MS_Battleship.sunkenState()).toBe(true);
});

test('should be a function that calculates it based on their length and whether all of their positions are hit. (string)', () => {
  const MS_Battleship = new Ship(7);
  expect(MS_Battleship.sunkenState(true)).toBe(`This ship isn't sunken. Actual health: 7`);
});

test('Should return the actual state of Section 1', () => {
  const MS_Battleship = new Ship(7);
  test_sections = MS_Battleship.sectionsState();
  expect(test_sections.Section1).toBe("ok");
});

test('Should return the actual state of Section 2', () => {
  const MS_Battleship = new Ship(7);
  MS_Battleship.hit(2);
  test_sections = MS_Battleship.sectionsState();
  expect(test_sections.Section2).toBe("hitted");
});

test('Ships should have a hit() function that takes a number and then marks that position as hit.', () => {
  const MS_Battleship = new Ship(7);
  expect(MS_Battleship.hit(2)).toBe(`Ship hitted at section 2`);
});

/* Assignment:
Begin your app by creating the Ship factory function
  - Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.
  - REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
  - Ships should have a hit() function that takes a number and then marks that position as ‘hit’.
  -  isSunk() should be a function that calculates it based on their length and whether all of their positions are ‘hit’.
*/