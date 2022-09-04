import { INotifRepository } from '../../Domains/notif/NotifRepository';

interface IDependency {
  notifRepository: INotifRepository;
}

class ReadNotif {
  private notifRepository: INotifRepository;

  constructor(dependency: IDependency) {
    this.notifRepository = dependency.notifRepository;
  }

  async execute(UserId: string) {
    await this.notifRepository.readNotif(UserId);
  }
}

export default ReadNotif;
