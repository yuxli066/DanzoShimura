import { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import socket_context from '../context/socketContext';
import user_context from '../context/userContext';
import room_context from '../context/roomContext';
import { styled } from '@mui/material/styles';
import Link from 'next/link'

const Div = styled('Div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export default function Lobby(props: any) {
  const [ user_state, user_dispatch ] = useContext(user_context.UserContext);
  const [ room_state, room_dispatch ] = useContext(room_context.RoomContext);

  const socket = useContext(socket_context.SocketContext);
  const button_styles = {
    'padding': '3em'
  };

  const joinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
    const room_id = e.target.id;
    const join_event = {
      room_name: room_id, 
      player_name: user_state.username,
      player_tag: user_state.username_tag,
    }

    socket?.sck?.emit('join', JSON.stringify(join_event));
    
    user_dispatch({
      type: 'SET ROOM',
      payload: room_id,
    });

    /** Remove this state update when cleaning up code */
    room_dispatch({
      type: 'UPDATE NUM PLAYERS', 
      payload: {
        num_players: room_state[room_id].players + 1,
      }
    });

    socket?.sck?.emit('track_players', { 
      player_name: user_state.username,
      room_name: room_id,
      socket_id: socket?.sck?.id 
    });
    
  }

  return (
    <>
    <Div>
      {"Welcome " + user_state.username + " to bunny battler!"}
    </Div>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      style={{
        'height': '95vh',
        'display': 'flex', 
        'flexDirection': 'row',
        'justifyContent': 'center',
        'alignItems': 'center'
      }}  
    >
        <Box>
          <Link href={"/pages/game_room"}>
            <Button 
              variant="contained" 
              size="large"
              style={button_styles}
              onClick={joinRoom}
              id='Room1'
              disabled={room_state['Room1'].players === 2}
            >
              ROOM 1
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/pages/game_room"}>
            <Button 
              variant="contained" 
              size="large"
              style={button_styles}
              onClick={joinRoom}
              id='Room2'
              disabled={room_state['Room2'].players === 2}
            >
              ROOM 2
            </Button>
          </Link>
        </Box>
        <Box>
          <Link href={"/pages/game_room"}>
            <Button 
              variant="contained" 
              size="large"
              style={button_styles}
              onClick={joinRoom}
              id='Room3'
              disabled={room_state['Room3'].players === 2 }
            >
              ROOM 3
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  )
}
