import { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Link from 'next/link';
import user_context from './context/userContext';
import socket_context from './context/socketContext';
import room_context from './context/roomContext';

export default function Home() {

  const [ username, setUsername ] = useState(null);
  const [ user_state, user_dispatch ] = useContext(user_context.UserContext);
  const [ room_state, room_dispatch ] = useContext(room_context.RoomContext);
  const socket = useContext(socket_context.SocketContext);

  const handleChange = (e: any) => {
    const username = e.target.value;
    setUsername(username);
  }

  const handleSubmit = () => {
    user_dispatch({
      type: 'SET NAME',
      payload: username,
    });

    user_dispatch({
      type: 'SET SOCKET ID',
      payload: socket?.sck?.id,
    });
    
  }

  const updateRoomState = (room_states: Array<any>) => {
    for (let current_state of room_states) {
      const room_name = current_state["playerInfo"]["name"];
      const num_players = current_state["playerInfo"]["num_players"];
      room_dispatch({
        type: 'INIT ROOM STATE',
        payload: {
          room_name: room_name, 
          num_players: num_players
        },
      });
    }
  }

  useEffect(() => {
    socket?.sck?.emit('check_rooms');
  }, [socket]);

  useEffect(() => {
    socket?.sck?.on('room_status', updateRoomState);

    return () => {
      socket?.sck?.off('room_status');
    }
  }, [socket]);

  return (
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
        'flexDirection': 'column',
        'justifyContent': 'center',
        'alignItems': 'center'
      }}  
    >
        <TextField 
          id="username_input" 
          label="Username" 
          helperText="Please enter your username"
          variant="outlined" 
          onChange={ handleChange }
          inputProps={{ maxLength: 10 }}
        />
        <Link href={"/pages/pick_rooms"}>
          <Button 
            variant="contained" 
            endIcon={ <SendIcon /> }
            onClick={ handleSubmit }
          >
            PLAY
          </Button>
        </Link>
  </Box>
  )
}
