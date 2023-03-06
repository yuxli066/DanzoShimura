/**
 * Gamecard
 */

class GameCard {
  constructor() {}

  gameCardList = new Set();
  clientID = undefined;
  clientPlayer = undefined;

  getClientID() {
    return this.clientID;
  }

  setClientID(clientID) {
    this.clientID = clientID;
  }

  getClientPlayer() {
    return this.clientPlayer;
  }

  setClientPlayer(player) {
    this.clientPlayer = player;
  }

  getGameCardList() {
    return this.gameCardList;
  }

  addGameCard(gameCard) {
    this.gameCardList.add(gameCard);
  }

  removeGameCard(gameCard) {
    if (this.gameCardList.has(gameCard)) {
      this.gameCardList.delete(gameCard);
    }
  }

  showGameCard(gameCard) {
    if (this.gameCardList.has(gameCard)) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports.GameCard = GameCard;
