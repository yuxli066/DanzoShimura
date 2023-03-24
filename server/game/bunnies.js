const AVAILABLE_BUNNIES = [
    {
      name: 'bunny1', 
      power_level: 1, 
      image_path: 'bunnies/bugbunny.png',
    },
    {
      name: 'bunny2',
      power_level: 2, 
      image_path: 'bunnies/darkbunny.png',
    },
    {
      name: 'bunny3', 
      power_level: 3, 
      image_path: 'bunnies/electricbunny.png',
    },
    {
      name: 'bunny4',
      power_level: 4, 
      image_path: 'bunnies/fairybunny.png',
    },
    {
      power_level: 5, 
      name: 'bunny5',
      image_path: 'bunnies/fightingbunny.png',
    },
    {
      name: 'bunny6', 
      power_level: 6, 
      image_path: 'bunnies/firebunny.png',
    },
    {
      name: 'bunny7', 
      power_level: 7, 
      image_path: 'bunnies/flyingbunny.png',
    },
    {
      name: 'bunny8',
      power_level: 8, 
      image_path: 'bunnies/ghostbunny.png',
    },
    {
      name: 'bunny9', 
      power_level: 9, 
      image_path: 'bunnies/grassbunny.png',
    },
    {
      name: 'bunny10',
      power_level: 10, 
      image_path: 'bunnies/groundbunny.png',
    },
    {
      name: 'bunny11',
      power_level: 11, 
      image_path: 'bunnies/icebunny.png',
    },
    {
      name: 'bunny12',
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