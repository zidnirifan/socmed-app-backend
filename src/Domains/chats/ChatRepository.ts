import { IChat } from './entities/Chat';
import ChatGet from './entities/ChatGet';
import { ILatestChat } from './entities/LatestChat';

export interface IChatRepository {
  addChat(payload: IChat): Promise<string>;
  getLatestChat(userId: string): Promise<ILatestChat[]>;
  getConversation(ownUserId: string, foreignUserId: string): Promise<ChatGet[]>;
}

abstract class ChatRepository implements IChatRepository {
  abstract addChat(payload: IChat): Promise<string>;
  abstract getLatestChat(userId: string): Promise<ILatestChat[]>;
  abstract getConversation(
    ownUserId: string,
    foreignUserId: string
  ): Promise<ChatGet[]>;
}

export default ChatRepository;
