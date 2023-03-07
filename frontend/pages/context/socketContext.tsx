import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import LoadingButton from '@mui/lab/LoadingButton';

type ContextType = {
    sck: Socket | undefined
}

interface SocketProviderProps {
    children: React.ReactNode;
}

const SocketContext = createContext<ContextType | undefined>(undefined);
const socketio_host = 'http://localhost:3001'

const SocketGate: React.FC<{ loading: React.ReactElement; children: React.ReactElement }> = ({ loading, children }) => {
    const socket = useContext(SocketContext);

    if (!socket) {
        return (
            <>
                <LoadingButton
                    size="small"
                    loading={true}
                    variant="outlined"
                    disabled
                >
                </LoadingButton>
                <React.Fragment>
                    { loading }
                </React.Fragment>
            </>
        )
    }

    return children;
};
  
const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<{ sck: Socket } | undefined>(undefined);

    useEffect(() => {
        const socket = io(socketio_host);
        setSocket({
            sck: socket,
        });
    }, []);

    useEffect(() => {
        const waitForSocketConnect = () => {
                if (socket) {
                    socket.sck.on("connect", () => {
                        console.log("Client connected to server! The client ID is:", socket.sck.id);
                    });
                    
                    return () => socket.sck.close();
                }
            }
        waitForSocketConnect();
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default {
    SocketContext: SocketContext,
    SocketProvider: SocketProvider,
    SocketGate: SocketGate
}