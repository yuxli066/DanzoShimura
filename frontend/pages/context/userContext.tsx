import React, { createContext, useReducer } from 'react';

const init_state = {
    username: 'Player',
    username_tag: 'none',
    room: 'none',
    bunnies: [],
    socket_id: null,
};

interface UserProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<{ username: string }[] | any[] | undefined[]>([undefined]);

const UserReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'SET NAME':
        return {
          username: action.payload,
        };
      case 'SET ROOM':
        return {
            ...state,
            room: action.payload,
        };
      case 'SET PLAYER BUNNIES':
        return {
            ...state,
            bunnies: action.payload,
        };
      case 'SET USERNAME TAG': 
        return {
          ...state,
          username_tag: action.payload, 
        };
      case 'SET SOCKET ID': 
        return {
          ...state, 
          socket_id: action.payload,
        }
      default:
        throw new Error();
    }
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, init_state);

    return (
        <UserContext.Provider value={ [state, dispatch] }>
            {children}
        </UserContext.Provider>
    );
};

export default {
    UserContext: UserContext,
    UserProvider: UserProvider
}