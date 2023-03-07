const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const cors = require('cors');
const fallback = require('express-history-api-fallback');
const path = require('path');
const app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(fallback('index.html', { root: path.join(__dirname, 'public') }));
app.use('/', indexRouter);
app.use(logger((tokens, req, res) => {
  return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
  ].join(' ')
}));

/**
 * Normalize a port into a number, string, or false.
 */
 function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
const http = require('http');
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const corsOptions = { origin:'*' };
app.use(cors(corsOptions));

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const { GameStates } = require('./game/game_states');

const game = GameStates.getInstance();
game.init_states() /** Set up global room states */
const GAME_STATES = game.GAME_STATES;
const GAME_PLAYERS = game.GAME_PLAYERS;

io.on('connect', (socket) => {
  console.log(`new websocket client with id ${socket.id} connected!`);
  socket.on('disconnect', () => console.log(`client ${socket.id} disconnected!`));

  // adapted from: https://stackoverflow.com/a/40413809
  // using rooms as opposed to namespaces for now so that we minimize the back-and forth between socket and client
  // (namespaces would mean the server creating the namespace and then the client connecting to the namespace, so an extra trip)
  socket.on('join', (player_info) => {
    const { room_name, player_name, player_tag } = JSON.parse(player_info);
    console.log(`Client with client id: ${socket.id}, joining room: ${room_name}`);
    
    if (room_name) {
      socket.join(room_name);
    } else {
      // TODO: Allow users to create rooms if we have time
    }

    const ROOM_MAP = GAME_STATES.get(room_name), 
          ROOM_PLAYERS = ROOM_MAP.get('players');
    
    let NUM_PLAYERS = ROOM_MAP.get('num_players');
    
    ROOM_PLAYERS.push({
      socket_id: socket.id,
      player_name: player_name, 
      player_tag: player_tag,
      player_number: `player${NUM_PLAYERS + 1}`
    });
    ROOM_MAP.set('num_players', NUM_PLAYERS + 1);

    if (ROOM_PLAYERS.length === 2) {
      ROOM_MAP.set('status', 'Ready');
      io.emit(`FULL`, room_name);
      io.emit(`game_state`, Object.fromEntries(ROOM_MAP));
    } else if (ROOM_PLAYERS.length === 1) {
      ROOM_MAP.set('status', 'Waiting');
      io.emit(`game_state`, Object.fromEntries(ROOM_MAP));
      io.emit(`WAITING`, room_name);
    }
    game.print('Joining Rooms:');
  });

  socket.on('check_rooms', () => {
    for (let [room_name, room_attributes] of GAME_STATES.entries()) {
      const num_players = room_attributes.get('players');
      if (num_players.length === 2) { 
        room_attributes.set('status', 'Ready');
        io.emit(`FULL`, room_name);
      } else if (num_players.length === 1) {
        io.emit(`WAITING`, room_name);
      } else {
        // console.log(room_name, 'ROOM IS EMPTY');
      }
    }

    console.log(game.serialize())
    io.emit('room_status', game.serialize());
  });

  socket.on('get_game_state', ({room_name}) => {
    const ROOM_MAP = GAME_STATES.get(room_name) ? GAME_STATES.get(room_name) : new Map();
    io.emit(`game_state`, Object.fromEntries(ROOM_MAP));
  });

  socket.on('player_ready', ({ room_name, player_name, selected_bunnies }) => {
    const ROOM_MAP = GAME_STATES.get(room_name), 
          CURRENT_GAME_STATE = ROOM_MAP.get('game_state');
    
    const new_player_object = {
      player_name: player_name,
      alive_bunnies: selected_bunnies, 
      current_bunny: null
    }

    if (CURRENT_GAME_STATE.player1 === null) {
      CURRENT_GAME_STATE.player1 = new_player_object; 
    } else {
      CURRENT_GAME_STATE.player2 = new_player_object;
    }
    
    if (CURRENT_GAME_STATE.player1 === null || CURRENT_GAME_STATE.player2 === null) {
      io.emit(`waiting for players`, room_name);
    } else {
      console.log("starting game");
    }

    game.print('Getting Game State:');
  });

  socket.on('begin_battle', (room_name) => {
    const ROOM_MAP = GAME_STATES.get(room_name); 
    io.emit('begin_battle_players', Object.fromEntries(ROOM_MAP));
  });

  socket.on('track_players', (player_info) => {
    const { room_name, player_name } = player_info;
    const players = GAME_PLAYERS.get('Players');

    players.push({
      socket_id: socket.id,
      room_name: room_name,
      player_name: player_name, 
    });

  });

  socket.on('get_player_with_socket_id', ( player_info ) => {
    const { room_name } = player_info;
    const ROOM_MAP = GAME_STATES.get(room_name), 
          ROOM_PLAYERS = ROOM_MAP.get('players');

    io.emit('return_player_with_socket_id', ROOM_PLAYERS);
    
  });

});

module.exports = {
  server,
  io,
  port_number: port
};
