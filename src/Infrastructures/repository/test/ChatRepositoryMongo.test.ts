import Chat from '../../../Domains/chats/entities/Chat';
import ChatRepositoryMongo from '../ChatRepositoryMongo';
import ChatModel from '../../model/Chat';
import UserModel from '../../model/User';
import db from '../../database/mongo/db';

describe('ChatRepositoryMongo', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await ChatModel.deleteMany();
    await UserModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('addChat function', () => {
    it('should save chat to database and return id chat correctly', async () => {
      const chat = new Chat({
        from: '62bbec0108243e15bde1c28c',
        to: '62b55fb7f96df4d764f67233',
        chat: 'hello',
      });

      const chatRepositoryMongo = new ChatRepositoryMongo();

      const chatId = await chatRepositoryMongo.addChat(chat);

      const chatSaved = await ChatModel.findById(chatId);

      expect(chatSaved?._id.toString()).toEqual(chatId);
      expect(chatSaved?.from.toString()).toEqual(chat.from);
      expect(chatSaved?.to.toString()).toEqual(chat.to);
      expect(chatSaved?.chat).toEqual(chat.chat);
    });
  });

  describe('getLatestChat function', () => {
    it('should get latest chats by userId', async () => {
      const user = {
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
        profilePhoto: 'profile.png',
      };
      const user2 = {
        username: 'paijo',
        fullName: 'Paijo',
        password: 'password',
        profilePhoto: 'profile.png',
      };

      const { _id: userId } = await new UserModel(user).save();

      const { _id: userId2 } = await new UserModel(user2).save();

      const chat = new ChatModel({
        from: userId,
        to: userId2,
        chat: 'hello',
      });

      const chat2 = new ChatModel({
        from: '62bbec0108243e15bde1c27e',
        to: '62b55fb7f96df4d764f67265',
        chat: 'woe',
      });

      await chat.save();
      await chat2.save();

      const chatRepositoryMongo = new ChatRepositoryMongo();

      const chats = await chatRepositoryMongo.getLatestChat(userId);

      expect(chats).toHaveLength(1);
      expect(chats[0]).toHaveProperty('id');
      expect(chats[0]).toHaveProperty('from');
      expect(chats[0]).toHaveProperty('to');
      expect(chats[0]).toHaveProperty('chat');
      expect(chats[0]).toHaveProperty('createdAt');
      expect(chats[0].from.id).toEqual(userId);
      expect(chats[0].from.fullName).toEqual(user.fullName);
      expect(chats[0].from.profilePhoto).toEqual(user.profilePhoto);
      expect(chats[0].to.id).toEqual(userId2);
      expect(chats[0].to.fullName).toEqual(user2.fullName);
      expect(chats[0].to.profilePhoto).toEqual(user2.profilePhoto);
      expect(chats[0].isRead).toEqual(false);
    });
  });

  describe('getConversation function', () => {
    it('should get conversation', async () => {
      const user1 = '62bbec0108243e15bde1c27e';
      const user2 = '62b55fb7f96df4d764f67265';

      const chat = {
        from: user1,
        to: user2,
        chat: 'hello',
      };

      const { _id: chatId } = await new ChatModel(chat).save();

      const chat2 = new ChatModel({
        from: '62b55fb7f96df4d764f67277',
        to: '62b55fb7f96df4d764f67233',
        chat: 'woe',
      });

      await chat2.save();

      const chatRepositoryMongo = new ChatRepositoryMongo();

      const chats = await chatRepositoryMongo.getConversation(user1, user2);

      expect(chats).toHaveLength(1);
      expect(chats[0]).toHaveProperty('id');
      expect(chats[0]).toHaveProperty('from');
      expect(chats[0]).toHaveProperty('to');
      expect(chats[0]).toHaveProperty('chat');
      expect(chats[0]).toHaveProperty('createdAt');
      expect(chats[0].id).toEqual(chatId);
      expect(chats[0].from.toString()).toEqual(user1);
      expect(chats[0].to.toString()).toEqual(user2);
      expect(chats[0].chat).toEqual(chat.chat);
    });
  });

  describe('readChat function', () => {
    it('should update isRead to true', async () => {
      const user1 = '62bbec0108243e15bde1c27e';
      const user2 = '62b55fb7f96df4d764f67265';

      const chat = {
        from: user1,
        to: user2,
        chat: 'hello',
      };

      const { _id: chatId } = await new ChatModel(chat).save();

      const chat2 = new ChatModel({
        from: user2,
        to: user1,
        chat: 'woe',
      });

      const { _id: chatId2 } = await chat2.save();

      const chatRepositoryMongo = new ChatRepositoryMongo();

      await chatRepositoryMongo.readChat(user1, user2);
      const chat1Updated = await ChatModel.findById(chatId);
      const chat2Updated = await ChatModel.findById(chatId2);

      expect(chat1Updated?.isRead).toEqual(false);
      expect(chat2Updated?.isRead).toEqual(true);
    });
  });
});
