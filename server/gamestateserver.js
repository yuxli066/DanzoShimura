class player {
  constructor(id, name, location, isKiller = false) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.isKiller = isKiller;
  }
}

class gamestate {
  allPlayers = {};
  constructor(allPlayers, currentPlayerTurn, gameInProgress = false) {
    this.allPlayers = allPlayers;
    this.currentPlayerTurn = currentPlayerTurn;
    this.gameInProgress = gameInProgress;
  }
  isMoveValid(playername) {
    return playername === this.currentPlayerTurn;
  }
  get allPlayers() {
    return this.allPlayers;
  }
  get checkGameInProgress() {
    return this.gameInProgress;
  }
}

module.exports = gamestate;
