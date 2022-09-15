/* istanbul ignore file */

import ChatRepository from '../ChatRepository';
import { IChat } from '../entities/Chat';
import { PayloadChatGet } from '../entities/ChatGet';
import { PayloadLatestChat } from '../entities/LatestChat';

class MockChatRepository extends ChatRepository {
  countChats(userId: string): Promise<number> {
    throw new Error('Method not implemented.');
  }
  readChat(ownUserId: string, foreignUserId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getConversation(
    ownUserId: string,
    foreignUserId: string
  ): Promise<PayloadChatGet[]> {
    throw new Error('Method not implemented.');
  }
  getLatestChat(userId: string): Promise<PayloadLatestChat[]> {
    throw new Error('Method not implemented.');
  }
  addChat(payload: IChat): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default MockChatRepository;
