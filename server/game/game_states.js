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
        this.GAME_PLAYERS = new Map(); // track all players with corresponding socket ids
        this.BUNNY_MAPPING = {
          'bunny1': 1, 
          'bunny2': 2,
          'bunny3': 3, 
          'bunny4': 4,
          'bunny5': 5, 
          'bunny6': 6,
          'bunny7': 7, 
          'bunny8': 8,
          'bunny9': 9, 
          'bunny10': 10,
          'bunny11': 11, 
          'bunny12': 12,
        };
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
        this.GAME_PLAYERS.set('Players', []);
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