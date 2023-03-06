/**
 * Weapon
 * Weapon Class
 */

class Weapon {
  constructor(name) {
    this.name = name;
  }

  // return name of weapon
  getName() {
    return this.name;
  }

  // change/setname of weapon
  setName(name) {
    this.name = name;
  }
}

//export class
module.exports.Weapon = Weapon;
