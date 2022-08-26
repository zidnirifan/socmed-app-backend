/* istanbul ignore file */

import ChatRepository from '../ChatRepository';
import { IChat } from '../entities/Chat';
import ChatGet from '../entities/ChatGet';
import { ILatestChat } from '../entities/LatestChat';

class MockChatRepository extends ChatRepository {
  getConversation(
    ownUserId: string,
    foreignUserId: string
  ): Promise<ChatGet[]> {
    throw new Error('Method not implemented.');
  }
  getLatestChat(userId: string): Promise<ILatestChat[]> {
    throw new Error('Method not implemented.');
  }
  addChat(payload: IChat): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default MockChatRepository;
