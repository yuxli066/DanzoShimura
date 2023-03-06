/**
 * Coordinates Class
 */

class Coordinate {
  constructor(axisX, axisY) {
    this.axisX = axisX;
    this.axisY = axisY;
  }

  // return x axis
  getAxisX() {
    return this.axisX;
  }

  // return y axis
  getAxisY() {
    return this.axisY;
  }

  // set x axis value
  setAxisX(xValue) {
    this.axisX = xValue;
  }

  // set y axis value
  setAxisY(yValue) {
    this.axisY = yValue;
  }

  // set both axis values in the same method
  setCoordinate(xValue, yValue) {
    this.axisX = xValue;
    this.axisY = yValue;
  }

  // compare coordinate objects
  compareCoordinate(otherCoordinate) {
    if (this.axisX === otherCoordinate.getAxisX() && this.axisY === otherCoordinate.getAxisY()) {
      return true;
    } else {
      return false;
    }
  }
}

//export class
module.exports.Coordinate = Coordinate;
