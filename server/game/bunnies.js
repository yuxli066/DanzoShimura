const AVAILABLE_BUNNIES = {
  bunny1: {
      power_level: 1, 
      name: 'bunny1', 
      image_path: 'frontend/bunnies/bugbunny.png',
    },
  bunny2: {
      power_level: 2, 
      name: 'bunny2',
      image_path: 'frontend/bunnies/darkbunny.png',
    },
  bunny3: {
      power_level: 3, 
      name: 'bunny3', 
      image_path: 'frontend/bunnies/electricbunny.png',
    },
  bunny4: {
      power_level: 4, 
      name: 'bunny4',
      image_path: 'frontend/bunnies/fairybunny.png',
    },
  bunny5: {
      power_level: 5, 
      name: 'bunny5',
      image_path: 'frontend/bunnies/fightingbunny.png',
    },
  bunny6: {
      power_level: 6, 
      name: 'bunny6', 
      image_path: 'frontend/bunnies/firebunny.png',
    },
  bunny7: {
      power_level: 7, 
      name: 'bunny7', 
      image_path: 'frontend/bunnies/flyingbunny.png',
    },
  bunny8: {
      power_level: 8, 
      name: 'bunny8',
      image_path: 'frontend/bunnies/ghostbunny.png',
    },
  bunny9: {
      power_level: 9, 
      name: 'bunny9', 
      image_path: 'frontend/bunnies/grassbunny.png',
    },
  bunny10: {
      power_level: 10, 
      name: 'bunny10',
      image_path: 'frontend/bunnies/groundbunny.png',
    },
  bunny11: {
      power_level: 11, 
      name: 'bunny11',
      image_path: 'frontend/bunnies/icebunny.png',
    },
  bunny12: {
      power_level: 12, 
      name: 'bunny12',
      image_path: 'frontend/bunnies/normaltbunny.png',
    },
};

const GAME_STATES_OBJECT = {
    current_turn: 'Player 1', 
    player1: null, 
    player2: null
};

module.exports = { AVAILABLE_BUNNIES, GAME_STATES_OBJECT };