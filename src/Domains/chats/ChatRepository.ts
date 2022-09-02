import { IChat } from './entities/Chat';
import { PayloadChatGet } from './entities/ChatGet';
import { PayloadLatestChat } from './entities/LatestChat';

export interface IChatRepository {
  addChat(payload: IChat): Promise<string>;
  getLatestChat(userId: string): Promise<PayloadLatestChat[]>;
  getConversation(
    ownUserId: string,
    foreignUserId: string
  ): Promise<PayloadChatGet[]>;
}

abstract class ChatRepository implements IChatRepository {
  abstract addChat(payload: IChat): Promise<string>;
  abstract getLatestChat(userId: string): Promise<PayloadLatestChat[]>;
  abstract getConversation(
    ownUserId: string,
    foreignUserId: string
  ): Promise<PayloadChatGet[]>;
}

export default ChatRepository;
