import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import socket_context from './context/socketContext';
import user_context from './context/userContext';
import room_context from './context/roomContext';

export default function App({ Component, pageProps }: AppProps) {

  return (
    <socket_context.SocketProvider>
      <socket_context.SocketGate loading={<p>establishing websocket connection...</p>}>
        <user_context.UserProvider>
          <room_context.RoomProvider>
            <Component {...pageProps} />
          </room_context.RoomProvider>
        </user_context.UserProvider>
      </socket_context.SocketGate>
    </socket_context.SocketProvider>
  );
}
