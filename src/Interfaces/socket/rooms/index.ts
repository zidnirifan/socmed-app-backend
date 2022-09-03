import type { Socket } from 'socket.io';

const roomSocket = (socket: Socket) => {
  socket.on('join-room', (userId: string) => {
    socket.join(userId);
  });
};

export default roomSocket;
