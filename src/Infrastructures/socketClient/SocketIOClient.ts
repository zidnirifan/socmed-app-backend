import { io } from 'socket.io-client';
import SocketClient from '../../Applications/socketClient/SocketClient';
import config from '../../Commons/config';
import { PayloadNotif } from '../../Domains/notif/entities/Notif';

const socket = io(`http://localhost:${config.serverPort}`);

socket.on('connect', () => {
  console.log('socket client connected');
});

class SocketIOClient extends SocketClient {
  sendNotif(payload: PayloadNotif): void {
    socket.emit('send-notif', payload);
  }
}

export default SocketIOClient;
