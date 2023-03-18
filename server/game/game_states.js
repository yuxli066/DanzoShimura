const BUNNIES = require('./bunnies')

class GameStates {
    constructor() {
        this.NUM_ROOMS = 3;
        this.AVAILABLE_BUNNIES = BUNNIES.default.AVAILABLE_BUNNIES;
        this.GAME_STATES_OBJECT = BUNNIES.default.GAME_STATES;

        /** track all game states */
        this.GAME_STATES = new Map();
    }
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new GameStates();
      }
      return this.instance;
    }

    /**  */
    init_states() {
        for (let i = 0; i < this.NUM_ROOMS; ++i) {
          const init_state = new Map();
          const room_name = `Room${i+1}`;

          init_state.set('name', room_name);
          init_state.set('status', 'Not Ready');
          init_state.set('num_players', 0);
          init_state.set('players', []);
          init_state.set('alive_bunnies', AVAILABLE_BUNNIES);
          init_state.set('')

          this.GAME_STATES.set(room_name, init_state);
          this.GAME_STATES.set(room_name, init_state);
          this.GAME_STATES.set(room_name, init_state);
        };
    }

    print(text) {
        console.log('\n' + text + '\n');
        const serialized_map = [];
        for (const [key, value] of this.GAME_STATES) {
          serialized_map.push({id: key, playerInfo: value});
        }
        console.log('GAME STATE:', serialized_map);
    }

    serialize() {
      const serialized_map = [];
      for (const [key, value] of this.GAME_STATES) {
        serialized_map.push({
          room_id: Object.fromEntries(value)['name'], 
          playerInfo: Object.fromEntries(value)
        });
      }
      return serialized_map
    }
}

module.exports = { GameStates };