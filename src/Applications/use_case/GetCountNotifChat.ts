import { IChatRepository } from '../../Domains/chats/ChatRepository';
import { INotifRepository } from '../../Domains/notif/NotifRepository';

interface IDependency {
  notifRepository: INotifRepository;
  chatRepository: IChatRepository;
}

class GetCountNotifChat {
  private notifRepository: INotifRepository;
  private chatRepository: IChatRepository;

  constructor(dependency: IDependency) {
    this.notifRepository = dependency.notifRepository;
    this.chatRepository = dependency.chatRepository;
  }

  async execute(userId: string): Promise<{ notif: number; chat: number }> {
    const notif = await this.notifRepository.countNotifs(userId);
    const chat = await this.chatRepository.countChats(userId);

    return { notif, chat };
  }
}

export default GetCountNotifChat;
