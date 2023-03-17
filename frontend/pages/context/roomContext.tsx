import React, { createContext, useReducer } from 'react';

const ROOM_STATES = {
    Room1: {
        name: 'Room1',
        bunnies: {
            player1: 'Player 1', 
            player2: 'Player 2'
        }
    },
    Room2: {
        name: 'Room2',
        bunnies: {
            player1: 'Player 1', 
            player2: 'Player 2'
        }
    },
    Room3: {
        name: 'Room3', 
        bunnies: {
            player1: 'Player 1', 
            player2: 'Player 2'
        }
    }
};

interface UserProviderProps {
    children: React.ReactNode;
}

const RoomContext = createContext<{ username: string }[] | any[] | undefined[]>([undefined]);

const RoomReducer = (state: any, action: any) => {
    const room_name = action.payload.room_name; 
    switch (action.type) {
      case 'INIT ROOM STATE':
        return {
            ...state,
            [room_name]: {
                name: room_name,
                bunnies: {
                    player1: 'Player 1', 
                    player2: 'Player 2'
                }
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