import { INotif } from './entities/Notif';
import { INotifGet } from './entities/NotifGet';

export interface INotifRepository {
  addNotif(payload: INotif): Promise<string>;
  getNotifById(id: string): Promise<INotifGet>;
}

abstract class NotifRepository implements INotifRepository {
  abstract addNotif(payload: INotif): Promise<string>;
  abstract getNotifById(id: string): Promise<INotifGet>;
}

export default NotifRepository;
