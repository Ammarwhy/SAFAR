import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      console.log('Connected to backend socket');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const joinRoom = (roomId: string) => {
    socketRef.current?.emit('join_room', roomId);
  };

  const sendMessage = (data: { roomId: string; senderId: string; content: string }) => {
    socketRef.current?.emit('send_message', data);
  };

  const onMessage = (callback: (data: any) => void) => {
    socketRef.current?.on('receive_message', callback);
  };

  return { socket: socketRef.current, joinRoom, sendMessage, onMessage };
};
