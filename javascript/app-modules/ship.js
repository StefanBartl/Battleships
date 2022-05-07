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
  
module.exports = Ship;

/* Assignment:
Begin your app by creating the Ship factory function
  - Your ‘ships’ will be objects that include their length, where they’ve been hit and whether or not they’ve been sunk.
  - REMEMBER you only have to test your object’s public interface. Only methods or properties that are used outside of your ‘ship’ object need unit tests.
  - Ships should have a hit() function that takes a number and then marks that position as ‘hit’.
  -  isSunk() should be a function that calculates it based on their length and whether all of their positions are ‘hit’.
*/