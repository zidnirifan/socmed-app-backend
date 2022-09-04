import { PayloadNotif } from '../../Domains/notif/entities/Notif';

export interface ISocketClient {
  sendNotif(payload: PayloadNotif): void;
}

abstract class SocketClient implements ISocketClient {
  abstract sendNotif(payload: PayloadNotif): void;
}

export default SocketClient;
