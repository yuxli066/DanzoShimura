const AVAILABLE_BUNNIES = [
    {
      name: 'BUG BUNNY',
      image_name: 'bugbunny', 
      id: 'bunny1',
      power_level: 1, 
      selected: false, 
    },
    {
      name: 'DARK BUNNY',
      image_name: 'darkbunny',
      id: 'bunny2',
      power_level: 2, 
      selected: false, 
    },
    {
      name: 'ELECTRIC BUNNY',
      image_name: 'electricbunny', 
      id: 'bunny3',
      power_level: 3, 
      selected: false, 
    },
    {
      name: 'FAIRY BUNNY',
      image_name: 'fairybunny',
      id: 'bunny4',
      power_level: 4, 
      selected: false, 
    },
    {
      name: 'FIGHTING BUNNY',
      image_name: 'fightingbunny',
      id: 'bunny5',
      power_level: 5, 
      selected: false, 
    },
    {
      name: 'FIRE BUNNY',
      image_name: 'firebunny', 
      id: 'bunny6',
      power_level: 6, 
      selected: false, 
    },
    {
      name: 'FLYING BUNNY',
      image_name: 'flyingbunny',
      id: 'bunny7', 
      power_level: 7, 
      selected: false, 
    },
    {
      name: 'GHOST BUNNY',
      image_name: 'ghostbunny',
      id: 'bunny8',
      power_level: 8, 
      selected: false, 
    },
    {
      name: 'GRASS BUNNY',
      image_name: 'grassbunny', 
      id: 'bunny9',
      power_level: 9, 
      selected: false, 
    },
    {
      name: 'GROUND BUNNY',
      image_name: 'groundbunny',
      id: 'bunny10',
      power_level: 10, 
      selected: false, 
    },
    {
      name: 'ICE BUNNY',
      image_name: 'icebunny',
      id: 'bunny11',
      power_level: 11, 
      selected: false, 
    },
    {
      name: 'NORMAL BUNNY',
      image_name: 'normaltbunny',
      id: 'bunny12',
      power_level: 12,
      selected: false, 
    },
];

const GAME_STATES_OBJECT = {
    current_turn: 'Player 1', 
    player1: null, 
    player2: null
};

module.exports = { AVAILABLE_BUNNIES, GAME_STATES_OBJECT };