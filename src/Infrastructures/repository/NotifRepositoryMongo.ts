import { INotif } from '../../Domains/notif/entities/Notif';
import {
  INotifGet,
  PayloadNotifGet,
} from '../../Domains/notif/entities/NotifGet';
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

  async getNotifs(userId: string): Promise<PayloadNotifGet[]> {
    const result = await this.Model.find({ to: userId })
      .populate('userId', 'username _id')
      .sort({
        createdAt: -1,
      });

    return result.map((n) => ({
      id: n._id,
      to: n.to,
      user: { id: n.userId._id, username: n.userId.username },
      text: n.text,
      type: n.type,
      postId: n.postId,
      commentId: n.commentId,
      createdAt: n.createdAt,
    }));
  }
}

export default NotifRepositoryMongo;
