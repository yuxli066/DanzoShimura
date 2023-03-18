const AVAILABLE_BUNNIES = [
    {
      power_level: 1, 
      name: 'bunny1', 
      image_path: 'frontend/bunnies/bugbunny.png',
    },
    {
      power_level: 2, 
      name: 'bunny2',
      image_path: 'frontend/bunnies/darkbunny.png',
    },
    {
      power_level: 3, 
      name: 'bunny3', 
      image_path: 'frontend/bunnies/electricbunny.png',
    },
    {
      power_level: 4, 
      name: 'bunny4',
      image_path: 'frontend/bunnies/fairybunny.png',
    },
    {
      power_level: 5, 
      name: 'bunny5',
      image_path: 'frontend/bunnies/fightingbunny.png',
    },
    {
      power_level: 6, 
      name: 'bunny6', 
      image_path: 'frontend/bunnies/firebunny.png',
    },
    {
      power_level: 7, 
      name: 'bunny7', 
      image_path: 'frontend/bunnies/flyingbunny.png',
    },
    {
      power_level: 8, 
      name: 'bunny8',
      image_path: 'frontend/bunnies/ghostbunny.png',
    },
    {
      power_level: 9, 
      name: 'bunny9', 
      image_path: 'frontend/bunnies/grassbunny.png',
    },
    {
      power_level: 10, 
      name: 'bunny10',
      image_path: 'frontend/bunnies/groundbunny.png',
    },
    {
      power_level: 11, 
      name: 'bunny11',
      image_path: 'frontend/bunnies/icebunny.png',
    },
    {
      power_level: 12, 
      name: 'bunny12',
      image_path: 'frontend/bunnies/normaltbunny.png',
    },
  ];

const GAME_STATES = {
    current_turn: 'Player 1', 
    player1: null, 
    player2: null
};

export default { AVAILABLE_BUNNIES, GAME_STATES };