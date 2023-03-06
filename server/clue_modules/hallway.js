/**
 * Hallway Class Module
 */

class Hallway {
  constructor(num, hallwayCoordinate) {
    this.num = num;
    this.hallwayCoordinate = hallwayCoordinate;
  }

  getName() {
    return 'Hallway ' + this.num.toString();
  }

  // return name of Hallway
  getHallwayNum() {
    return this.num;
  }

  // change/setname of Hallway
  setHallwayNum(num) {
    this.num = num;
  }

  getLocation() {
    return this.hallwayCoordinate;
  }

  setLocation(hallwayCoordinate) {
    this.hallwayCoordinate = hallwayCoordinate;
  }
}

//export class
module.exports.Hallway = Hallway;
