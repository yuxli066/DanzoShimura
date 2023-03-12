import { useEffect, useContext, useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import socket_context from '../context/socketContext';
import user_context from '../context/userContext';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';

const Div = styled('Div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const button_styles = {
  'padding': '3em',
  'flex': '0 0 25%'
};

interface bunny_button_type {
  [name: string]: {
    selected?: boolean,
    disabled?: boolean,
    alive?: boolean,
  }
}

export default function BattleRoom(props: any) {
  // shared contexts
  const [ user_state, user_dispatch ] = useContext(user_context.UserContext);
  const [ game_state, set_game_state ] = useState<any>(null);
  const socket = useContext(socket_context.SocketContext);
  
  // game states
  const [ player1_lockedin, set_player1_lockedin ] = useState<boolean>(false);
  const [ player2_lockedin, set_player2_lockedin ] = useState<boolean>(false);
  const [ player_1_bunny, set_player_1_bunny ] = useState<any>("Player 1");
  const [ player_2_bunny, set_player_2_bunny ] = useState<any>("Player 2");

  // back drop open/close
  const [ battle_result, set_battle_result ] = useState<any>(null);
  const [ open_popover, set_open_popover ] = useState(false);
  const handleClose = () => {
    set_open_popover(false);
  };
  const player1_bunny_buttons = useMemo<any>(() => {
    const bunny_btns = {} as bunny_button_type;
    for (let i = 0; i < 12; ++i) {
      bunny_btns[`player1_bunny${i+1}`] = {
        selected: false,
        disabled: false,
        alive: true,
      };
    }
    return bunny_btns;
  }, []);
  const player2_bunny_buttons = useMemo<any>(() => {
    const bunny_btns = {} as bunny_button_type;
    for (let i = 0; i < 12; ++i) {
      bunny_btns[`player2_bunny${i+1}`] = {
        selected: false,
        disabled: false,
        alive: true,
      };
    }
    return bunny_btns;
  }, []);

  const updateGameState = (game_state: any) => {
    set_game_state(game_state);
    console.log('Player Numb from local storage', localStorage.getItem(user_state.username));
    console.log('Game State Current Players Turn', game_state.game_state.current_turn);
  }
  const handle_player1_selection = (e: any) => {
    const selected_bunny = e.target.id;
    for (let i = 0; i < 12; ++i) {
      player1_bunny_buttons[`player1_bunny${i+1}`].selected = false;
    }

    player1_bunny_buttons[selected_bunny] = {
        ...player1_bunny_buttons[selected_bunny],
        selected: true,
    }

    set_player_1_bunny(selected_bunny);
  } 
  
  const handle_player2_selection = (e: any) => {
    const selected_bunny = e.target.id;
    for (let i = 0; i < 12; ++i) {
      player2_bunny_buttons[`player2_bunny${i+1}`].selected = false;
    }
    player2_bunny_buttons[selected_bunny] = {
      ...player2_bunny_buttons[selected_bunny],
      selected: true,
    }

    set_player_2_bunny(selected_bunny);
  }
  const handle_lockin = (e: any) => {
    if (e.target.id === 'player1') {

      for (let i = 0; i < 12; ++i) {
        player1_bunny_buttons[`player1_bunny${i+1}`].disabled = true; 
      }

      socket?.sck?.emit('begin_battle', { 
        room: user_state.room, 
        player: 'player1', 
        selected_bunny: player_1_bunny
      });

      set_player1_lockedin(true);
    };

    if (e.target.id === 'player2') { 
      for (let i = 0; i < 12; ++i) {
        player2_bunny_buttons[`player2_bunny${i+1}`].disabled = true;
      }

      socket?.sck?.emit('begin_battle', { 
        room: user_state.room,
        player: 'player2',
        selected_bunny: player_2_bunny
      });

      set_player2_lockedin(true);
    };
  };

  useEffect(() => {
    socket?.sck?.emit('get_game_state', {
      room_name: user_state.room,
      player_name: user_state.username
    });
  }, [socket]);
  useEffect(() => {
    socket?.sck?.on('game_state', updateGameState);
    return () => {
      socket?.sck?.off('game_state');
    }
  }, [socket]);
  useEffect(() => {
    socket?.sck?.emit('get_player_with_socket_id', {
      room_name: user_state.room, 
      socket_id: socket?.sck?.id
    });
  }, [socket]);
  useEffect(() => {
    socket?.sck?.on('return_player_with_socket_id', (players_information) => {
      players_information.forEach((p_info: any) => localStorage.setItem(p_info.player_name, p_info.player_number));
    });
    
    return () => {
      socket?.sck?.off('return_player_with_socket_id');
    }

  }, [socket]);
  useEffect(() => {
    socket?.sck?.on('battle_results', (battle_result) => {
      set_battle_result(battle_result.winner.toUpperCase());
      set_open_popover(!open_popover);
      for (let i = 0; i < 12; ++i) {
        if (player1_bunny_buttons[`player1_bunny${i+1}`].alive)
          player1_bunny_buttons[`player1_bunny${i+1}`].disabled = false; 
        if (player2_bunny_buttons[`player2_bunny${i+1}`].alive)
          player2_bunny_buttons[`player2_bunny${i+1}`].disabled = false; 
      }

      if (battle_result.winner === "player1") { 
        player2_bunny_buttons[`player2_${battle_result.player2_bunny}`] = {
          selected: false,
          disabled: true,
          alive: false,
        }   
      }

      if (battle_result.winner === "player2") { 
        player1_bunny_buttons[`player1_${battle_result.player1_bunny}`] = {
          selected: false,
          disabled: true,
          alive: false,
        }
      }

      set_player_1_bunny(null);
      set_player_2_bunny(null);
      set_player1_lockedin(false);
      set_player2_lockedin(false);

    });

    return () => {
      socket?.sck?.off('battle_results');
    }
  }, [socket]);

  return ( localStorage.getItem(user_state.username) && game_state && game_state.game_state.player1 && game_state.game_state.player2 ) ? (
    <>
      <div style={{'fontWeight': 'bold'}}>
        {
          `SELECT YOUR BUNNIES & BEGIN BATTLE! 
            ${game_state['players'].map((player: { [x: string]: any; }) => player['player_name']).toString()}\n
          Current Player: ${localStorage.getItem(user_state.username)}`
        }
      </div>
      <Box
        style={{
          'display': 'flex', 
          'flexDirection': 'column',
          'alignItems': 'stretch',
          'height': '100vh',
        }}
      >
        <Box style={{
            'display': 'flex', 
            'flexDirection': 'row',
            'alignContent': 'center',
            'width': '80%',
            'margin': 'auto',
            'gap': '0.5rem'
        }}>
          <Box 
            component={"div"}
            style={{
              'display': 'flex', 
              'flexDirection': 'column',
              'alignContent': 'center',
              'width': '80%',
              'margin': 'auto',
              'gap': '0.5rem'
            }}
          >
            <Box>
              { "Player 1" }
            </Box>
            { // player 1
                game_state.game_state.player1.alive_bunnies.map((bunny: any, index: number) => (
                  <Button 
                      variant={ player1_bunny_buttons[`player1_${bunny.bunny_name}`].selected ? 'contained' : 'outlined' } 
                      size="large"
                      style={ button_styles }
                      id={ `player1_${bunny.bunny_name}` }
                      value={ bunny.bunny_name }
                      onClick={ handle_player1_selection }
                      disabled={ ( localStorage.getItem(user_state.username) !== 'player1' ) || player1_bunny_buttons[`player1_${bunny.bunny_name}`].disabled }
                      color={ !player1_bunny_buttons[`player1_${bunny.bunny_name}`].alive ? "primary" : player1_bunny_buttons[`player1_${bunny.bunny_name}`].disabled ? "success" : "inherit" }
                  >
                    { bunny.bunny_name }
                  </Button>
                ))
            }
          </Box>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            style={{
              "flexGrow": 5
            }}
          >
            <Button 
                variant={ 'outlined' } 
                size="large"
                style={{
                  'padding': '1em'
                }}
                id={`player1`}
                value={'lock in'}
                onClick={ handle_lockin }
              >
                { "Lock In" }
            </Button>
          </ButtonGroup>
        </Box>
        <Box
          style={{
            "display": "flex",
            "flexDirection": "row",
            "justifyContent": "center",
            "width": "100%",
            "height": "3em",
            "border": "solid 1px black",
          }}
        >
          <Box 
            style={{
              "border": "solid 1px black",
              "flexGrow": "1",
              "textAlign": "center",
              "padding": ".5em",
            }}
          >
            { player_1_bunny }
          </Box>
          <Box
            style={{
              "border": "solid 1px black",
              "flexGrow": "1",
              "textAlign": "center",
              "padding": ".5em",
            }}
          >
            { player_2_bunny }
          </Box>
        </Box>
        <Box 
          style={{
            'display': 'flex', 
            'flexDirection': 'row',
            'alignContent': 'center',
            'width': '80%',
            'margin': 'auto',
            'gap': '0.5rem'
          }}
        >
          <Box 
            component={"div"}
            style={{
              'display': 'flex', 
              'flexDirection': 'column',
              'alignContent': 'center',
              'width': '80%',
              'margin': 'auto',
              'gap': '0.5rem'
            }}
          >
            <Box>
              { "Player 2" }
            </Box>
            { // player 2
                game_state.game_state.player2.alive_bunnies.map((bunny: any, index: number) => (
                    <Button 
                      variant={ player2_bunny_buttons[`player2_${bunny.bunny_name}`].selected ? 'contained' : 'outlined' } 
                      size="large"
                      style={button_styles}
                      id={`player2_${bunny.bunny_name}`}
                      value={ bunny.bunny_name }
                      onClick={ handle_player2_selection }
                      disabled={ ( localStorage.getItem(user_state.username) !== 'player2') || player2_bunny_buttons[`player2_${bunny.bunny_name}`].disabled }
                      color={ !player2_bunny_buttons[`player2_${bunny.bunny_name}`].alive ? "primary" : player2_bunny_buttons[`player2_${bunny.bunny_name}`].disabled ? "success" : "inherit" }
                    >
                      { bunny.bunny_name }
                  </Button>
                ))
            }
          </Box>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            style={{
              "flexGrow": 5
            }}
          >
            <Button 
                variant={ 'outlined' } 
                size="large"
                style={{
                  'padding': '1em'
                }}
                id={`player2`}
                value={ 'lock in' }
                onClick={ handle_lockin }
              >
                { "Lock In" }
            </Button>
          </ButtonGroup>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open_popover}
          onClick={handleClose}
        >
          { battle_result + " WON!!! " }
        </Backdrop>
      </Box>
    </>
  ) : (<>
    <Div>{"Waiting for players... "}</Div>
  </>)
}
