class GameStates {
    constructor() {
        this.INIT_STATE = {
            Room1: {
              name: 'Room1',
              status: 'Not Ready', 
              num_players: 0,
              players: [],
              available_bunnies: [
                {power_level: 1, name: 'bunny1'},
                {power_level: 2, name: 'bunny2'},
                {power_level: 3, name: 'bunny3'},
                {power_level: 4, name: 'bunny4'},
                {power_level: 5, name: 'bunny5'},
                {power_level: 6, name: 'bunny6'},
                {power_level: 7, name: 'bunny7'},
                {power_level: 8, name: 'bunny8'},
                {power_level: 9, name: 'bunny9'},
                {power_level: 10, name: 'bunny10'},
                {power_level: 11, name: 'bunny11'},
                {power_level: 12, name: 'bunny12'},
              ],
              game_state: {
                current_turn: 'player1', 
                player1: null, 
                player2: null
              },
            },
            Room2: {
              name: 'Room2',
              status: 'Not Ready',
              num_players: 0,
              players: [],
              available_bunnies: [
                {power_level: 1, name: 'bunny1'},
                {power_level: 2, name: 'bunny2'},
                {power_level: 3, name: 'bunny3'},
                {power_level: 4, name: 'bunny4'},
                {power_level: 5, name: 'bunny5'},
                {power_level: 6, name: 'bunny6'},
                {power_level: 7, name: 'bunny7'},
                {power_level: 8, name: 'bunny8'},
                {power_level: 9, name: 'bunny9'},
                {power_level: 10, name: 'bunny10'},
                {power_level: 11, name: 'bunny11'},
                {power_level: 12, name: 'bunny12'},
              ],
              game_state: {
                current_turn: 'player1', 
                player1: null, 
                player2: null
              },
            },
            Room3: {
              name: 'Room3',
              status: 'Not Ready',
              num_players: 0,
              players: [],
              available_bunnies: [
                {power_level: 1, name: 'bunny1'},
                {power_level: 2, name: 'bunny2'},
                {power_level: 3, name: 'bunny3'},
                {power_level: 4, name: 'bunny4'},
                {power_level: 5, name: 'bunny5'},
                {power_level: 6, name: 'bunny6'},
                {power_level: 7, name: 'bunny7'},
                {power_level: 8, name: 'bunny8'},
                {power_level: 9, name: 'bunny9'},
                {power_level: 10, name: 'bunny10'},
                {power_level: 11, name: 'bunny11'},
                {power_level: 12, name: 'bunny12'},
              ],
              game_state: {
                current_turn: 'player1', 
                player1: null, 
                player2: null
              },
            },
        };

        this.GAME_STATES = new Map();
    }
  
    static getInstance() {
      if (!this.instance) {
        this.instance = new GameStates();
      }
  
      return this.instance;
    }

    init_states() {
        this.GAME_STATES.set('Room1', new Map(Object.entries(this.INIT_STATE.Room1)));
        this.GAME_STATES.set('Room2', new Map(Object.entries(this.INIT_STATE.Room2)));
        this.GAME_STATES.set('Room3', new Map(Object.entries(this.INIT_STATE.Room3)));
    }

    print(text) {
        console.log('\n' + text + '\n');
        const serialized_map = [];
        for (const [key, value] of this.GAME_STATES) {
          serialized_map.push({id: key, playerInfo: value});
        }
        console.log('GAME STATE: ', serialized_map);
    }

    serialize() {
      const serialized_map = [];
      for (const [key, value] of this.GAME_STATES) {
        serialized_map.push({
          id: value['name'], 
          playerInfo: Object.fromEntries(value)
        });
      }
      return serialized_map
    }
}

module.exports = { GameStates };