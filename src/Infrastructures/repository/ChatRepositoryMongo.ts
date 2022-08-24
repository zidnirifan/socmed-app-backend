import ChatRepository from '../../Domains/chats/ChatRepository';
import { IChat } from '../../Domains/chats/entities/Chat';
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
}

export default ChatRepositoryMongo;
