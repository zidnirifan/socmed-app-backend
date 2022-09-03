import { INotif } from '../../Domains/notif/entities/Notif';
import { INotifGet } from '../../Domains/notif/entities/NotifGet';
import NotifRepository from '../../Domains/notif/NotifRepository';
import NotifModel from '../model/Notif';

class NotifRepositoryMongo extends NotifRepository {
  private Model;

  constructor() {
    super();
    this.Model = NotifModel;
  }

  async addNotif(payload: INotif): Promise<string> {
    const chat = new this.Model(payload);
    const result = await chat.save();
    return result._id.toString();
  }

  async getNotifById(id: string): Promise<INotifGet> {
    const notif = await this.Model.findById(id).populate(
      'userId',
      'username _id'
    );
    return notif;
  }
}

export default NotifRepositoryMongo;
