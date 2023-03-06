/**
 * Guess Class Module
 */

class Guess {
  // constructor(guessType,murderPlayer,murderRoom,murderWeapon) {
  //   this.guessType = guessType;
  //   this.murderPlayer = murderPlayer;
  //   this.murderRoom = murderRoom;
  //   this.murderWeapon = murderWeapon;
  // }

  constructor() {}

  guessType = undefined;
  murderPlayer = undefined;
  murderRoom = undefined;
  murderWeapon = undefined;

  getGuessType() {
    return this.guessType;
  }

  setGuessType(guessType) {
    this.guessType = guessType;
  }

  getMurderPlayer() {
    return this.murderPlayer;
  }

  setMurderPlayer(murderPlayer) {
    this.murderPlayer = murderPlayer;
  }

  getMurderRoom() {
    return this.murderRoom;
  }

  setMurderRoom(murderRoom) {
    this.murderRoom = murderRoom;
  }

  getMurderWeapon() {
    return this.murderWeapon;
  }

  setMurderWeapon(murderWeapon) {
    this.murderWeapon = murderWeapon;
  }
}

//export class
module.exports.Guess = Guess;
