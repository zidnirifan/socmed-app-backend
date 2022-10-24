import { INotif } from '../entities/Notif';
import { PayloadNotifGet } from '../entities/NotifGet';
import NotifRepository from '../NotifRepository';

class MockNotifRepository extends NotifRepository {
  addNotif(payload: INotif): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getNotifs(userId: string): Promise<PayloadNotifGet[]> {
    throw new Error('Method not implemented.');
  }
  countNotifs(userId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
  readNotif(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default MockNotifRepository;
