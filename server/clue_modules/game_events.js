// Import events module
var events = require('events');
var GameState = require('./gamestate');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();
const gameState = new GameState();

// client added event listener
eventEmitter.on('player_joined', function (clientID, clientPlayer) {
  gameState.assignClientPlayer(clientID, clientPlayer);
});

// eventEmitter.on('client0_make_move',function(){
//     console.log('\nClient 0 move');
//     var turnOver = gameState.movePlayerLocation('client0','Lounge');
//     console.log(turnOver);

//     if(turnOver){
//         eventEmitter.emit(gameState.getCurrentPlayer()+'_make_move');
//     }
//     else{
//         gameState.makeGuess('client0','suggestion','Colonel Mustard','Lounge','Knife');
//         eventEmitter.emit(gameState.getDisprovePlayer()+'_disprove');
//     }
// });

eventEmitter.on('make_move', function (clientID) {
  console.log('\n' + clientID + ' move');
  var turnOver = gameState.movePlayerLocation(clientID, 'Lounge');

  if (turnOver) {
    eventEmitter.emit('make_move', gameState.getCurrentPlayer());
  } else {
    eventEmitter.emit('make_accusation', gameState.getCurrentPlayer());
  }
});

eventEmitter.on('make_suggestion', function (clientID) {
  console.log('\n' + clientID + ' made a suggestion');
  gameState.makeGuess(clientID, 'suggestion', 'Colonel Mustard', 'Lounge', 'Knife');

  eventEmitter.emit('disprove', clientID);
});

eventEmitter.on('make_accusation', function (clientID) {
  console.log('\n' + clientID + ' made an accusation');
  var gameWon = gameState.makeGuess(clientID, 'accusation', 'Colonel Mustard', 'Lounge', 'Knife');

  if (gameWon) {
    eventEmitter.emit('end_of_game', clientID);
  } else {
    eventEmitter.emit('make_move' + gameState.getCurrentPlayer());
  }
});

eventEmitter.on('disprove', function (clientID) {
  console.log('\n' + clientID + ' disprove the guess:');
  var guess = gameState.getGuess();
  console.log(
    clientID +
      ' suggests it was ' +
      guess.getMurderPlayer().getName() +
      ' in the ' +
      guess.getMurderRoom().getName() +
      ' with a ' +
      guess.getMurderWeapon().getName(),
  );
  var disproved = gameState.disproveSuggestion('Lounge');
  console.log('disprove card: ' + 'Lounge');
  if (disproved) {
    eventEmitter.emit('make_move', clientID);
  } else {
    eventEmitter.emit('disprove', gameState.getDisprovePlayer());
  }
});

// start game event
eventEmitter.on('start_game', function () {
  gameState.startGame();
  console.log(gameState.getCurrentPlayer());
  // tell current player to go
  eventEmitter.emit('make_move', gameState.getCurrentPlayer());
});

eventEmitter.emit('player_joined', 'client0', 'Colonel Mustard');
eventEmitter.emit('player_joined', 'client1', 'Miss Scarlet');
eventEmitter.emit('player_joined', 'client2', 'Rev. Green');
eventEmitter.emit('start_game');

console.log('Program Ended.');
