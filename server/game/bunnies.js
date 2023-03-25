const AVAILABLE_BUNNIES = [
    {
      name: 'BUG BUNNY', 
      power_level: 1, 
      image_path: 'bunnies/bugbunny.png',
    },
    {
      name: 'DARK BUNNY',
      power_level: 2, 
      image_path: 'bunnies/darkbunny.png',
    },
    {
      name: 'ELECTRIC BUNNY', 
      power_level: 3, 
      image_path: 'bunnies/electricbunny.png',
    },
    {
      name: 'FAIRY BUNNY',
      power_level: 4, 
      image_path: 'bunnies/fairybunny.png',
    },
    {
      power_level: 5, 
      name: 'FIGHTING BUNNY',
      image_path: 'bunnies/fightingbunny.png',
    },
    {
      name: 'FIRE BUNNY', 
      power_level: 6, 
      image_path: 'bunnies/firebunny.png',
    },
    {
      name: 'FLYING BUNNY', 
      power_level: 7, 
      image_path: 'bunnies/flyingbunny.png',
    },
    {
      name: 'GHOST BUNNY',
      power_level: 8, 
      image_path: 'bunnies/ghostbunny.png',
    },
    {
      name: 'GRASS BUNNY', 
      power_level: 9, 
      image_path: 'bunnies/grassbunny.png',
    },
    {
      name: 'GROUND BUNNY',
      power_level: 10, 
      image_path: 'bunnies/groundbunny.png',
      
    },
    {
      name: 'ICE BUNNY',
      power_level: 11, 
      image_path: 'bunnies/icebunny.png',
    },
    {
      name: 'NORMAL BUNNY',
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