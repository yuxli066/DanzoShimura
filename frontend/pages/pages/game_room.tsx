import { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import socket_context from '../context/socketContext';
import user_context from '../context/userContext';
import Button from '@mui/material/Button';
import Link from 'next/link';
import room_css from 'frontend/styles/Rooms.module.scss';

const importAll = (imports: any) =>
  imports
    .keys()
    .map((item: string) => ( {[item.replace(/(\.\/|bunnies\/)(.+)(\.jpe?g|\.png|\.PNG|\.JPG)/g, '$2')]: imports(item) }));
  
export default function GameRoom(props: any) {
  // shared contexts
  const [ user_state, user_dispatch ] = useContext(user_context.UserContext);
  const socket = useContext(socket_context.SocketContext);
  
  // game states

  /** Load Bunny Images */
  const [ is_loading, set_loading ] = useState<boolean>(true);
  const [ bunny_images, set_bunny_images ] = useState<any>(null);

  /** Current Game States */
  const [ current_game_state, set_current_game_state ] = useState<any>(null);
  const [ available_bunnies, set_available_bunnies ] = useState<any>(null);

  /** Bunny Selection States */
  const [ selected_bunnies, set_selected_bunnies ] = useState<any[]>([]);

  /** Update game states */ 
  const updateGameState = (game_state: any) => set_current_game_state(game_state);
  const updateAvailableBunnies = (available_bunnies: any) => set_available_bunnies(available_bunnies);

  /** Handle bunny selections */
  const handleSelection = (e: any) => {
    e.preventDefault();
    const selected_bunny = e.target.id;
    if (selected_bunny) {
      let bunnies = [...available_bunnies];
      let current_bunny = bunnies.find((bunny: any) => bunny.id === selected_bunny); 
      current_bunny.selected = true;
      set_available_bunnies(bunnies);
      set_selected_bunnies(selected_bunnies.concat(selected_bunny));
    } else {
      console.log(e)
    }
  };
  /** Reset bunny selections */
  const resetSelection = () => {
    let bunnies = [...available_bunnies];
    bunnies.forEach(bunny => bunny.selected = false);
    set_available_bunnies(bunnies);
    user_dispatch({
      type: 'SET PLAYER BUNNIES',
      payload: []
    });
    set_selected_bunnies(() => []);
  };
  const playerIsReady = (e: any) => {
    socket?.sck?.emit('player_ready', {
      room_name: user_state.room,
      player_name: user_state.username,
      selected_bunnies: selected_bunnies
    });
    user_dispatch({
      type: 'SET PLAYER BUNNIES',
      payload: selected_bunnies,
    });
  };
  
  /** Getting Current State */
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

  /** Getting available bunnies */
  useEffect(() => {
    socket?.sck?.emit('get_available_bunnies', null);
  }, [socket]);
  useEffect(() => {
    socket?.sck?.on('available_bunnies', updateAvailableBunnies);
    return () => {
      socket?.sck?.off('available_bunnies');
    }
  }, [socket]);
  useEffect(() => {
    set_loading(true);
    const loadImages = new Promise((resolve) =>
      resolve(require.context('../../bunnies', false, /\.(jpe?g|png)/i)),
    );
    Promise.all([loadImages])
      .then((data) => {
        let images = Object.assign({}, ...importAll(data[0]));
        set_bunny_images(images);
      }).finally(() => set_loading(false));
  }, []);

  return (!is_loading && current_game_state?.status === 'Ready' && available_bunnies) ? (
    <>
      <Box className={room_css.body_class}>
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
            style={{
              'height': '100%',
              'display': 'flex',
              'justifyContent': 'center',
              'flexDirection': 'column',
              'alignItems': 'center',
              'fontSize': '45px',
              'color': 'black',
              'fontWeight': '900',
            }}
            className={room_css.hanalei_font}
          >
            <span className={room_css.hanalei_font}>Welcome</span>
            <span>{`${user_state.username}`}</span>
            <span>to</span>
            <span>{`${user_state.room}`}</span>
          </Box>
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
          >
          {
            available_bunnies.map((bunny: any) => (
              <Button
                size="large"
                id={ bunny.id }
                key={ bunny.id }
                onClick={ handleSelection }
              >
                <Box component="div" className={ `bg-${bunny.image_name}` } id={ bunny.id }>
                  <Box component="div" className={ room_css.text } id={ bunny.id }>
                    { bunny.name }
                  </Box>
                </Box>
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
                className={ room_css.button_styles }
                onClick={ playerIsReady }
              >
                { "Ready" }
              </Button>
            </Link>
            <Button 
              variant={'contained'} 
              size="large"
              className={ room_css.button_styles }
              onClick={ resetSelection }
            >
              { "Reset" }
            </Button>
          </Box>
        </Box>
      </Box>
      </>
    ) : (<>
      <div>{"Waiting for room to load..."}</div>
    </>)
}
