const AVAILABLE_BUNNIES = [
    {
      name: 'BUG BUNNY', 
      id: 'bunny1',
      power_level: 1, 
      image_path: 'bunnies/bugbunny.png',
    },
    {
      name: 'DARK BUNNY',
      id: 'bunny2',
      power_level: 2, 
      image_path: 'bunnies/darkbunny.png',
    },
    {
      name: 'ELECTRIC BUNNY', 
      id: 'bunny3',
      power_level: 3, 
      image_path: 'bunnies/electricbunny.png',
    },
    {
      name: 'FAIRY BUNNY',
      id: 'bunny4',
      power_level: 4, 
      image_path: 'bunnies/fairybunny.png',
    },
    {
      name: 'FIGHTING BUNNY',
      id: 'bunny5',
      power_level: 5, 
      image_path: 'bunnies/fightingbunny.png',
    },
    {
      name: 'FIRE BUNNY', 
      id: 'bunny6',
      power_level: 6, 
      image_path: 'bunnies/firebunny.png',
    },
    {
      name: 'FLYING BUNNY',
      id: 'bunny7', 
      power_level: 7, 
      image_path: 'bunnies/flyingbunny.png',
    },
    {
      name: 'GHOST BUNNY',
      id: 'bunny8',
      power_level: 8, 
      image_path: 'bunnies/ghostbunny.png',
    },
    {
      name: 'GRASS BUNNY', 
      id: 'bunny9',
      power_level: 9, 
      image_path: 'bunnies/grassbunny.png',
    },
    {
      name: 'GROUND BUNNY',
      id: 'bunny10',
      power_level: 10, 
      image_path: 'bunnies/groundbunny.png',
      
    },
    {
      name: 'ICE BUNNY',
      id: 'bunny11',
      power_level: 11, 
      image_path: 'bunnies/icebunny.png',
    },
    {
      name: 'NORMAL BUNNY',
      id: 'bunny12',
      power_level: 12, 
      image_path: 'bunnies/normaltbunny.png',
    },
];

const GAME_STATES_OBJECT = {
    current_turn: 'Player 1', 
    player1: null, 
    player2: null
};

module.exports = { AVAILABLE_BUNNIES, GAME_STATES_OBJECT };