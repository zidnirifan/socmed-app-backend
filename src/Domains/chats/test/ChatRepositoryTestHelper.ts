/* istanbul ignore file */

import ChatRepository from '../ChatRepository';
import { IChat } from '../entities/Chat';

class MockChatRepository extends ChatRepository {
  addChat(payload: IChat): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default MockChatRepository;
