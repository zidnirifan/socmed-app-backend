import { IChat } from './entities/Chat';

export interface IChatRepository {
  addChat(payload: IChat): Promise<string>;
}

abstract class ChatRepository implements IChatRepository {
  abstract addChat(payload: IChat): Promise<string>;
}

export default ChatRepository;
