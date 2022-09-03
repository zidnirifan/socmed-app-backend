import { IChatRepository } from '../../Domains/chats/ChatRepository';

interface IDependency {
  chatRepository: IChatRepository;
}

class ReadChat {
  private chatRepository: IChatRepository;

  constructor(dependency: IDependency) {
    this.chatRepository = dependency.chatRepository;
  }

  async execute(ownUserId: string, foreignUserId: string) {
    await this.chatRepository.readChat(ownUserId, foreignUserId);
  }
}

export default ReadChat;
