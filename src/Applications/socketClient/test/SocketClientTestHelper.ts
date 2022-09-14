/* istanbul ignore file */

import { PayloadNotif } from '../../../Domains/notif/entities/Notif';
import SocketClient from '../SocketClient';

class MockSocketClient extends SocketClient {
  sendNotif(payload: PayloadNotif): void {
    throw new Error('Method not implemented.');
  }
}

export default MockSocketClient;
