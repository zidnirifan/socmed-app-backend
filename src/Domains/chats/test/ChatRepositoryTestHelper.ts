/* istanbul ignore file */

import ChatRepository from '../ChatRepository';
import { IChat } from '../entities/Chat';
import { ILatestChat } from '../entities/LatestChat';

class MockChatRepository extends ChatRepository {
  getLatestChat(userId: string): Promise<ILatestChat[]> {
    throw new Error('Method not implemented.');
  }
  addChat(payload: IChat): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default MockChatRepository;
