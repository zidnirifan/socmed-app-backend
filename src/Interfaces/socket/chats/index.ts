import { Container } from 'instances-container';
import type { Socket } from 'socket.io';
import AddChat from '../../../Applications/use_case/AddChat';

const chatsSocket = (socket: Socket, container: Container) => {
  socket.on('send-chat', ({ chat, time, date, from, to, fromUsername }) => {
    const addChat = container.getInstance(AddChat.name);
    addChat.execute({ chat, from, to });

    socket
      .to(to)
      .emit('receive-chat', { chat, time, date, from, fromUsername });
  });
};

export default chatsSocket;
