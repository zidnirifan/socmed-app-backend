import Chat from '../../../Domains/chats/entities/Chat';
import ChatRepositoryMongo from '../ChatRepositoryMongo';
import ChatModel from '../../model/Chat';
import db from '../../database/mongo/db';

describe('ChatRepositoryMongo', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await ChatModel.deleteMany();
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

      expect(chatSaved._id.toString()).toEqual(chatId);
      expect(chatSaved.from.toString()).toEqual(chat.from);
      expect(chatSaved.to.toString()).toEqual(chat.to);
      expect(chatSaved.chat).toEqual(chat.chat);
    });
  });
});
