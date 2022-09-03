import { Container } from 'instances-container';
import type { Socket } from 'socket.io';
import AddNotif from '../../../Applications/use_case/AddNotif';

const notifSocket = (socket: Socket, container: Container) => {
  socket.on('send-notif', async (data) => {
    const addNotif = container.getInstance(AddNotif.name);
    const notif = await addNotif.execute(data);

    socket.to(notif.to).emit('receive-notif', notif);
  });
};

export default notifSocket;
