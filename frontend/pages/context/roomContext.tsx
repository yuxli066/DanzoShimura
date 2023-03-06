import React, { createContext, useReducer } from 'react';

const ROOM_STATES = {
    Room1: {
        name: 'Room1',
        players: 0,
        socket_id: null,
    },
    Room2: {
        name: 'Room2',
        players: 0,
        socket_id: null,
    },
    Room3: {
        name: 'Room3', 
        players: 0,
        socket_id: null,
    }
};

interface UserProviderProps {
    children: React.ReactNode;
}

const RoomContext = createContext<{ username: string }[] | any[] | undefined[]>([undefined]);

const RoomReducer = (state: any, action: any) => {
    const room_name = action.payload.room_name; 
    const num_players = action.payload.num_players;
    const socket_id = action.socket_id;
    switch (action.type) {
      case 'INIT ROOM STATE':
        return {
            ...state,
            [room_name]: {
                name: room_name,
                players: num_players
            }
        };
      case 'UPDATE NUM PLAYERS': 
        return {
            ...state,
            [room_name]: {
                players: num_players,
            }
        };
    case 'SET PLAYER SOCKET ID':
        return {
            ...state,
            [room_name]: {
                socket_id: socket_id,
            }
        };
      default:
        throw new Error();
    }
}

const RoomProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(RoomReducer, ROOM_STATES);

    return (
        <RoomContext.Provider value={ [state, dispatch] }>
            {children}
        </RoomContext.Provider>
    );
};

export default {
    RoomContext: RoomContext,
    RoomProvider: RoomProvider
}