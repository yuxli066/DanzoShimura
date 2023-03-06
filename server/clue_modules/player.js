/**
 * Player
 * Player Class
 */

var hallway = require('./hallway');
var room = require('./room');

class Player {
  constructor(name) {
    this.name = name;
  }

  location = '';

  // return name of player
  getName() {
    return this.name;
  }

  // change/setname of player
  setName(name) {
    this.name = name;
  }

  getLocation() {
    return this.location;
  }

  setLocation(location) {
    this.location = location;
  }
}

//export class
module.exports.Player = Player;
