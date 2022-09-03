import { IChatRepository } from '../../Domains/chats/ChatRepository';
import ChatGet from '../../Domains/chats/entities/ChatGet';

interface IDependency {
  chatRepository: IChatRepository;
}

class GetConversation {
  private chatRepository: IChatRepository;

  constructor(dependency: IDependency) {
    this.chatRepository = dependency.chatRepository;
  }

  async execute(userId: string, foreignUserId: string) {
    const chats = await this.chatRepository.getConversation(
      userId,
      foreignUserId
    );

    return chats.map((chat) => new ChatGet(chat));
  }
}

export default GetConversation;
