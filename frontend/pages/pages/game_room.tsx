import { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import socket_context from '../context/socketContext';
import user_context from '../context/userContext';
import room_context from '../context/roomContext';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Link from 'next/link'

const Div = styled('Div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const button_styles = {
  'padding': '3em',
  'flex': '0 0 15%'
};

interface bunny_button_type {
  [name: string]: boolean
}

export default function GameRoom(props: any) {
  // shared contexts
  const [ user_state, user_dispatch ] = useContext(user_context.UserContext);
  const [ room_context_state, room_context_dispatch ] = useContext(room_context.RoomContext);
  const socket = useContext(socket_context.SocketContext);
  
  // game states
  const [ game_state, set_game_state ] = useState<any>(null);
  const [ bunny_buttons, set_bunny_buttons ] = useState(() => {
    const bunny_btns = {} as bunny_button_type;
    for (let i = 0; i < 12; ++i) {
      bunny_btns[`bunny${i}`] = false;
    }
    return {
      ...bunny_btns 
    };
  });
  const [ selected_bunnies, set_selected_bunnies ] = useState<any[]>([]);
  const [ current_player, set_current_player ] = useState<string>('');

  const updateGameState = (game_state: any) => {
    console.log("Room State:", game_state);
    set_game_state(game_state);
    
    if (game_state.num_players === 1) {
      console.log("THIS IS PLAYER 1");
      user_dispatch({
        type: 'SET USERNAME TAG',
        payload: 'player1',
      });

      set_game_state(() => {
        return {
          ...game_state,
          client_player: 'player1',
        }
      });

      set_current_player('player1');
    } 

    if (game_state.num_players === 2) {
      console.log("THIS IS PLAYER 2");
      user_dispatch({
        type: 'SET USERNAME TAG',
        payload: 'player2',
      });

      set_game_state(() => {
        return {
          ...game_state,
          client_player: 'player2',
        }
      });

      set_current_player('player2');
    }
    
    socket?.sck?.emit('get_player_socket_id', game_state.name);
  }
  const handleSelection = (e: any) => {
    console.log("selecting bunnies");
    const selected_bunny = e.target.id;
    set_bunny_buttons(() => {
      return {
        ...bunny_buttons,
        [selected_bunny]: true,
      }
    });
    set_selected_bunnies(() => (selected_bunnies.concat(selected_bunny)));
  }
  const resetSelection = () => {
    set_bunny_buttons(() => {
      const bunny_btns = {} as bunny_button_type;
      for (let i = 0; i < 12; ++i) {
        bunny_btns[`bunny_${i}`] = false;
      }
      return { 
        ...bunny_btns 
      }
    });

    user_dispatch({
      type: 'SET PLAYER BUNNIES',
      payload: []
    });

    set_selected_bunnies(() => []);
  }
  const playerIsReady = (e: any) => {
    console.log("player is ready!");
    socket?.sck?.emit('player_ready', {
      room_name: user_state.room,
      player_name: user_state.username,
      selected_bunnies: selected_bunnies
    });

    user_dispatch({
      type: 'SET PLAYER BUNNIES',
      payload: selected_bunnies,
    });

  }
  const handleServerSocketID = (socket_id: string) => {
    if (game_state.num_players === 1) {
      console.log("SOCKET ID PLAYER 1:", socket_id);
      user_dispatch({
        type: 'SET USERNAME TAG',
        payload: 'player1',
      });

      set_game_state(() => {
        return {
          ...game_state,
          client_player: 'player1',
        }
      });

      set_current_player('player1');
    } 

    if (game_state.num_players === 2) {
      console.log("SOCKET ID PLAYER 2:", socket_id);
      user_dispatch({
        type: 'SET USERNAME TAG',
        payload: 'player1',
      });

      set_game_state(() => {
        return {
          ...game_state,
          client_player: 'player1',
        }
      });

      set_current_player('player1');
    } 
    socket?.sck?.on('return_player_socket_id', (socket_id) => {

    })
    console.log("Socket ID from Server:", socket_id);
  }

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
  
  // useEffect(() => {
  //   if (socket) {
  //     console.log("Socket connected");
  //   }
  //   const socket_id_type = room_context_state[].player_1_socket_id === null ?  
  //   room_context_dispatch({
  //     type: 'UPDATE NUM PLAYERS', 
  //     payload: {
  //       num_players: room_state[].players + 1,
  //     }
  //   })
  // }, [socket]);

  return ( game_state?.status === 'Ready' ) ? (
    <>
      <Div>
        {" Welcome " + user_state.username + " to " + user_state.room}
      </Div>
      <Box 
        component={"div"}
        style={{
          'height': '95vh',
          'display': 'flex', 
          'flexDirection': 'row',
          'justifyContent': 'center',
          'alignItems': 'center',
        }}
      >
        <Box
          component="div"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          style={{
            'height': '95vh',
            'display': 'flex', 
            'flexDirection': 'row',
            'justifyContent': 'center',
            'backgroundColor': 'transparent',
            'width': '75%',
            'flexWrap': 'wrap'
          }}  
        >{
          game_state.available_bunnies.map((bunny: any, index: number) => (
            <Button 
              variant={bunny_buttons[`${bunny.name}`] ? 'contained' : 'outlined' } 
              size="large"
              style={button_styles}
              id={`${bunny.name}`}
              value={bunny}
              onClick={ handleSelection }
            >
              { bunny.name }
            </Button>
          ))
        }
        </Box>
        <Box
          style={{
            'display': 'flex', 
            'flexDirection': 'column',
            'justifyContent': 'center',
            'backgroundColor': 'transparent',
            'flexWrap': 'wrap',
            'gap': '2em'
          }}  
        >
          <Link href={"/pages/battle_room"}>
            <Button 
              variant={'contained'} 
              size="large"
              style={ button_styles }
              onClick={ playerIsReady }
            >
              { "Ready" }
            </Button>
          </Link>
          <Button 
            variant={'contained'} 
            size="large"
            style={ button_styles }
            onClick={ resetSelection }
          >
            { "Reset" }
          </Button>
        </Box>
      </Box>
    </>
  ) : (<>
    <Div>{"Waiting for room to load..."}</Div>
  </>)
}
