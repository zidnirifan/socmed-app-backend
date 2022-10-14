import { INotif } from './entities/Notif';
import { PayloadNotifGet } from './entities/NotifGet';

export interface INotifRepository {
  addNotif(payload: INotif): Promise<string>;
  getNotifs(userId: string): Promise<PayloadNotifGet[]>;
  countNotifs(userId: string): Promise<number>;
  readNotif(userId: string): Promise<void>;
}

abstract class NotifRepository implements INotifRepository {
  abstract addNotif(payload: INotif): Promise<string>;
  abstract getNotifs(userId: string): Promise<PayloadNotifGet[]>;
  abstract countNotifs(userId: string): Promise<number>;
  abstract readNotif(userId: string): Promise<void>;
}

export default NotifRepository;
