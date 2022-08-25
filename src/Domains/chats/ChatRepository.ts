import { IChat } from './entities/Chat';
import { ILatestChat } from './entities/LatestChat';

export interface IChatRepository {
  addChat(payload: IChat): Promise<string>;
  getLatestChat(userId: string): Promise<ILatestChat[]>;
}

abstract class ChatRepository implements IChatRepository {
  abstract addChat(payload: IChat): Promise<string>;
  abstract getLatestChat(userId: string): Promise<ILatestChat[]>;
}

export default ChatRepository;
