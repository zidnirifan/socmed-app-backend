import { Types } from 'mongoose';
import ChatRepository from '../../Domains/chats/ChatRepository';
import { IChat } from '../../Domains/chats/entities/Chat';
import { PayloadChatGet } from '../../Domains/chats/entities/ChatGet';
import { PayloadLatestChat } from '../../Domains/chats/entities/LatestChat';
import ChatModel from '../model/Chat';

class ChatRepositoryMongo extends ChatRepository {
  private Model;

  constructor() {
    super();
    this.Model = ChatModel;
  }

  async addChat(payload: IChat): Promise<string> {
    const chat = new this.Model(payload);
    const result = await chat.save();
    return result._id.toString();
  }

  async getLatestChat(userId: string): Promise<PayloadLatestChat[]> {
    const chats = await ChatModel.aggregate([
      {
        $match: {
          $or: [
            {
              to: { $eq: new Types.ObjectId(userId) },
            },
            {
              from: {
                $eq: new Types.ObjectId(userId),
              },
            },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: { from: '$from', to: '$to' },
          createdAt: { $max: '$createdAt' },
          id: { $first: '$_id' },
          chat: { $first: '$chat' },
          isRead: { $first: '$isRead' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.to',
          foreignField: '_id',
          as: 'to',
        },
      },
      {
        $unwind: '$to',
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id.from',
          foreignField: '_id',
          as: 'from',
        },
      },
      {
        $unwind: '$from',
      },
      {
        $project: {
          _id: 0,
          id: 1,
          chat: 1,
          'from.id': '$from._id',
          'from.fullName': 1,
          'from.profilePhoto': 1,
          'to.id': '$to._id',
          'to.fullName': 1,
          'to.profilePhoto': 1,
          createdAt: 1,
          isRead: 1,
          // for filter unique
          foreign: {
            $cond: {
              if: { $ne: ['$from._id', new Types.ObjectId(userId)] },
              then: '$from._id',
              else: '$to._id',
            },
          },
        },
      },
      {
        $sort: {
          // sort from oldest because filter below is from last index
          createdAt: 1,
        },
      },
    ]);

    const unique = [
      ...new Map(
        // filter unique values by foreign
        chats.map((item) => [item.foreign.toString(), item])
      ).values(),
      // sort from latest
    ].sort((a, b) => b.createdAt - a.createdAt);

    return unique;
  }

  async getConversation(
    ownUserId: string,
    foreignUserId: string
  ): Promise<PayloadChatGet[]> {
    const chats = await ChatModel.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                {
                  to: { $eq: new Types.ObjectId(ownUserId) },
                },
                {
                  from: {
                    $eq: new Types.ObjectId(foreignUserId),
                  },
                },
              ],
            },
            {
              $and: [
                {
                  from: { $eq: new Types.ObjectId(ownUserId) },
                },
                {
                  to: {
                    $eq: new Types.ObjectId(foreignUserId),
                  },
                },
              ],
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          chat: 1,
          from: 1,
          to: 1,
          createdAt: 1,
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);

    return chats;
  }

  async readChat(ownUserId: string, foreignUserId: string): Promise<void> {
    await this.Model.updateMany(
      {
        $and: [
          { from: { $eq: new Types.ObjectId(foreignUserId) } },
          { to: { $eq: new Types.ObjectId(ownUserId) } },
          { isRead: false },
        ],
      },
      { isRead: true }
    );
  }

  async countChats(userId: string): Promise<number> {
    return this.Model.countDocuments({
      $and: [{ to: { $eq: new Types.ObjectId(userId) } }, { isRead: false }],
    });
  }
}

export default ChatRepositoryMongo;
