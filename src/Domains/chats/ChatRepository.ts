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
  readChat(ownUserId: string, foreignUserId: string): Promise<void>;
  countChats(userId: string): Promise<number>;
}

abstract class ChatRepository implements IChatRepository {
  abstract addChat(payload: IChat): Promise<string>;
  abstract getLatestChat(userId: string): Promise<PayloadLatestChat[]>;
  abstract getConversation(
    ownUserId: string,
    foreignUserId: string
  ): Promise<PayloadChatGet[]>;
  abstract readChat(ownUserId: string, foreignUserId: string): Promise<void>;
  abstract countChats(userId: string): Promise<number>;
}

export default ChatRepository;
