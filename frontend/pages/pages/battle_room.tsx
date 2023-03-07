import { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import socket_context from '../context/socketContext';
import user_context from '../context/userContext';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

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
  }
}

export default function BattleRoom(props: any) {
  // shared contexts
  const [ user_state, dispatch ] = useContext(user_context.UserContext);
  const socket = useContext(socket_context.SocketContext);
  
  // game states
  const [ game_state, set_game_state ] = useState<any>(null);
  const [ player_number, set_player_number ] = useState<any>(null);
  const [ player_1_bunny, set_player_1_bunny ] = useState<any>("Player 1");
  const [ player_2_bunny, set_player_2_bunny ] = useState<any>("Player 2");
  
  const [ player1_bunny_buttons, set_player1_bunny_buttons ] = useState(() => {
    const bunny_btns = {} as bunny_button_type;

    for (let i = 0; i < 12; ++i) {
      bunny_btns[`player1_bunny${i+1}`] = {
        selected: false,
        disabled: false,
      };
    }

    return bunny_btns;
  });
  const [ player2_bunny_buttons, set_player2_bunny_buttons ] = useState(() => {
    const bunny_btns = {} as bunny_button_type;
    
    for (let i = 0; i < 12; ++i) {
      bunny_btns[`player2_bunny${i+1}`] = {
        selected: false,
        disabled: false,
      };
    }

    return bunny_btns;
  });

  const updateGameState = (game_state: any) => {
    set_game_state(game_state);
  }
  const handle_player1_selection = (e: any) => {
    const selected_bunny = e.target.id;
    set_player1_bunny_buttons(() => {
      for (let i = 0; i < 12; ++i) {
        player1_bunny_buttons[`player1_bunny${i+1}`].selected = false;
      }
      return { 
        ...player1_bunny_buttons, 
        [selected_bunny]: {
          selected: true
        }
      }
    });
    set_player_1_bunny(selected_bunny);
  }
  const handle_player2_selection = (e: any) => {
    const selected_bunny = e.target.id;
    set_player2_bunny_buttons(() => {
      for (let i = 0; i < 12; ++i) {
        player2_bunny_buttons[`player2_bunny${i+1}`].selected = false;
      }

      return { 
        ...player2_bunny_buttons, 
        [selected_bunny]: {
          selected: true
        }
      }
    });
    set_player_2_bunny(selected_bunny);
  }
  const handle_player1_lockin = (e: any) => {
    set_player1_bunny_buttons(() => {
      for (let i = 0; i < 12; ++i) {
        player1_bunny_buttons[`player1_bunny${i+1}`].disabled = true; 
      }
      return {
        ...player1_bunny_buttons 
      }
    });
  }
  const handle_player2_lockin = (e: any) => {
    set_player2_bunny_buttons(() => {
      for (let i = 0; i < 12; ++i) {
        player2_bunny_buttons[`player2_bunny${i+1}`].disabled = true;
      }
      return { 
        ...player2_bunny_buttons 
      }
    });
  }
  
  useEffect(() => {
    socket?.sck?.emit('begin_battle', user_state.room);
  }, [socket]);

  useEffect(() => {
    socket?.sck?.on('begin_battle_players', updateGameState);

    return () => {
      socket?.sck?.off('begin_battle_players');
    }
  }, [socket]);

  useEffect(() => {
    socket?.sck?.emit('get_player_with_socket_id', {
      room_name: user_state.room, 
      socket_id: socket?.sck?.id
    });
  }, [socket]);

  useEffect(() => {
    socket?.sck?.on('return_player_with_socket_id', (player_id) => {
      set_player_number(player_id.player_number)
    });
    return () => {
      socket?.sck?.off('return_player_with_socket_id');
    }
  }, [socket]);

  return ( player_number && game_state && game_state.game_state.player1 && game_state.game_state.player2 ) ? (
    <>
      <div style={{'fontWeight': 'bold'}}>
        {
          `SELECT YOUR BUNNIES & BEGIN BATTLE! 
            ${game_state['players'].map((player: { [x: string]: any; }) => player['player_name']).toString()}\n
          Current Player: ${player_number}`
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
            { // player 1
                game_state.game_state.player1.alive_bunnies.map((bunny: any, index: number) => (
                  <Button 
                      variant={ player1_bunny_buttons[`player1_${bunny}`].selected ? 'contained' : 'outlined' } 
                      size="large"
                      style={ button_styles }
                      id={ `player1_${bunny}`}
                      value={ bunny }
                      onClick={ handle_player1_selection }
                      disabled={ player1_bunny_buttons[`player1_${bunny}`].disabled ? true : false }
                      color={ player1_bunny_buttons[`player1_${bunny}`].disabled ? "success" : "inherit" }
                  >
                    { bunny }
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
                id={`player1_bunny`}
                value={'lock in'}
                onClick={ handle_player1_lockin }
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
            { // player 2
                game_state.game_state.player2.alive_bunnies.map((bunny: any, index: number) => (
                    <Button 
                      variant={ player2_bunny_buttons[`player2_${bunny}`].selected ? 'contained' : 'outlined' } 
                      size="large"
                      style={button_styles}
                      id={`player2_${bunny}`}
                      value={ bunny }
                      onClick={ handle_player2_selection }
                      disabled={ player2_bunny_buttons[`player2_${bunny}`].disabled }
                      color={ player2_bunny_buttons[`player2_${bunny}`].disabled ? "success" : "inherit" }
                    >
                      { bunny }
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
                id={`player2_bunny`}
                value={ 'lock in' }
                onClick={ handle_player2_lockin }
              >
                { "Lock In" }
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </>
  ) : (<>
    <Div>{"Waiting for players... "}</Div>
  </>)
}
