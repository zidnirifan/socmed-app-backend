import { INotifRepository } from '../../Domains/notif/NotifRepository';
import NotifGet from '../../Domains/notif/entities/NotifGet';

interface IDependency {
  notifRepository: INotifRepository;
}

class GetNotifs {
  private notifRepository: INotifRepository;

  constructor(dependency: IDependency) {
    this.notifRepository = dependency.notifRepository;
  }

  async execute(userId: string) {
    const notifs = await this.notifRepository.getNotifs(userId);

    return notifs.map((notif) => new NotifGet(notif));
  }
}

export default GetNotifs;
