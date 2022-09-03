import { IChatRepository } from '../../Domains/chats/ChatRepository';
import LatestChat from '../../Domains/chats/entities/LatestChat';

interface IDependency {
  chatRepository: IChatRepository;
}

class GetLatestChat {
  private chatRepository: IChatRepository;

  constructor(dependency: IDependency) {
    this.chatRepository = dependency.chatRepository;
  }

  async execute(userId: string) {
    const chats = await this.chatRepository.getLatestChat(userId);

    return chats.map((chat) => new LatestChat(chat));
  }
}

export default GetLatestChat;
