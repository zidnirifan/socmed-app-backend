import { Container } from 'instances-container';
import { Socket } from 'socket.io';
import AddChat from '../../../Applications/use_case/AddChat';

const chatsSocket = (socket: Socket, container: Container) => {
  socket.on('send-chat', ({ chat, time, date, from, to }) => {
    const addChat = container.getInstance(AddChat.name);
    addChat.execute({ chat, from, to });

    socket.to(to).emit('receive-chat', { chat, time, date, from });
  });

  socket.on('join-chat', (myId) => {
    socket.join(myId);
  });
};

export default chatsSocket;
