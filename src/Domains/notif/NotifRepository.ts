import { INotif } from './entities/Notif';
import { INotifGet, PayloadNotifGet } from './entities/NotifGet';

export interface INotifRepository {
  addNotif(payload: INotif): Promise<string>;
  getNotifById(id: string): Promise<INotifGet>;
  getNotifs(userId: string): Promise<PayloadNotifGet[]>;
  countNotifs(userId: string): Promise<number>;
  readNotif(userId: string): Promise<void>;
}

abstract class NotifRepository implements INotifRepository {
  abstract addNotif(payload: INotif): Promise<string>;
  abstract getNotifById(id: string): Promise<INotifGet>;
  abstract getNotifs(userId: string): Promise<PayloadNotifGet[]>;
  abstract countNotifs(userId: string): Promise<number>;
  abstract readNotif(userId: string): Promise<void>;
}

export default NotifRepository;
