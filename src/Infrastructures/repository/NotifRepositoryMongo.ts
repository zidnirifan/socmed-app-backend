import { Types } from 'mongoose';
import { INotif } from '../../Domains/notif/entities/Notif';
import { PayloadNotifGet } from '../../Domains/notif/entities/NotifGet';
import NotifRepository from '../../Domains/notif/NotifRepository';
import NotifModel from '../model/Notif';
import { IUserModel } from '../model/User';

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

  async getNotifs(userId: string): Promise<PayloadNotifGet[]> {
    const result = await this.Model.find({ to: userId })
      .populate<{ userId: IUserModel }>(
        'userId',
        'username _id profilePhoto followers'
      )
      .sort({
        createdAt: -1,
      });

    return result.map((n) => ({
      id: n._id.toString(),
      to: n.to.toString(),
      user: {
        id: n.userId._id.toString(),
        username: n.userId.username,
        profilePhoto: n.userId.profilePhoto,
        isFollowed:
          n.userId.followers.filter((follow) => follow.toString() === userId)
            .length > 0,
      },
      text: n.text,
      type: n.type,
      postId: n.postId?.toString(),
      commentId: n.commentId?.toString(),
      createdAt: n.createdAt,
      isRead: n.isRead,
    }));
  }

  async countNotifs(userId: string): Promise<number> {
    return this.Model.countDocuments({
      $and: [{ to: { $eq: new Types.ObjectId(userId) } }, { isRead: false }],
    });
  }

  async readNotif(userId: string): Promise<void> {
    await this.Model.updateMany(
      {
        $and: [{ to: { $eq: new Types.ObjectId(userId) } }, { isRead: false }],
      },
      { isRead: true }
    );
  }
}

export default NotifRepositoryMongo;
