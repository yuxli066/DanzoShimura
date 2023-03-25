import { useEffect, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import socket_context from '../context/socketContext';
import user_context from '../context/userContext';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import room_css from 'frontend/styles/rooms.module.css'

interface bunny_button_type {
  [name: string]: { selected: boolean, css: any }
};

const importAll = (imports: any) =>
  imports
    .keys()
    .map((item: string) => ({
      [item.replace(/(\.\/)(.+)(\.jpe?g|\.png|\.PNG|\.JPG)/g, '$2')]: imports(item),
    }));

const Div = styled('Div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const bunny_button_styles = (bunny_images: any, bunny: any) => {
  const bunny_obj = bunny_images[bunny.image_path];
  const linear_gradient = 'linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) )';
  
  return { 
    'backgroundSize': '100% 100%',
    'backgroundImage': `${linear_gradient}, url(${bunny_obj.default.src})`,
    'padding': '3em',
    'flex': '0 0 15%',
  };
};

const bunny_button_styles_selected = (bunny_images: any, bunny: any) => {
  const bunny_obj = bunny_images[bunny.image_path];

  return { 
    'backgroundSize': '100% 100%',
    'backgroundImage': `url(${bunny_obj.default.src})`,
    'padding': '3em',
    'flex': '0 0 15%',
  };
};

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
  const [ bunny_buttons, set_bunny_buttons ] = useState(() => {
    const bunny_btns = {} as bunny_button_type;
    for (let i = 0; i < 12; ++i) {
      bunny_btns[`bunny${i+1}`] = { selected: false, css: null }
    }
    return {
      ...bunny_btns 
    };
  });
  const [ selected_bunnies, set_selected_bunnies ] = useState<any[]>([]);

  /** Update game states */
  const updateGameState = (game_state: any) => {
    set_current_game_state(game_state);
  };
  const updateAvailableBunnies = (available_bunnies: any) => {
    set_available_bunnies(available_bunnies);
  };
  /** Handle bunny selections */
  const handleSelection = (e: any) => {
    console.log("selecting bunnies");
    const selected_bunny = e.target.id;
    console.log(e);
    set_bunny_buttons(() => {
      return {
        ...bunny_buttons,
        [selected_bunny]: true,
      }
    });
    set_selected_bunnies(() => (selected_bunnies.concat(selected_bunny)));
  };
  /** Reset bunny selections */
  const resetSelection = () => {
    set_bunny_buttons(() => {
      const bunny_btns = {} as bunny_button_type;
      for (let i = 0; i < 12; ++i) {
        bunny_btns[`bunny${i}`] = { selected: false, css: null };
      }
      return { 
        ...bunny_btns, 
      }
    });

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
        <Div>
          { `Welcome ${user_state.username} to ${user_state.room}` }
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
          >
          {
            available_bunnies.map((bunny: any, index: number) => (
              <Button 
                variant={bunny_buttons[`${bunny.id}`].selected ? 'contained' : 'outlined' } 
                size="large"
                style={ bunny_button_styles(bunny_images, bunny) }
                id={`${bunny.name}`}
                value={ bunny }
                onClick={ handleSelection }
              >
                <Box component="div" className={ room_css.text }>
                  { bunny.name }
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
      <Div>{"Waiting for room to load..."}</Div>
    </>)
}
