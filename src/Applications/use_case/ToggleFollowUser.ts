import { IUserRepository } from '../../Domains/users/UserRepository';
import { ISocketClient } from '../socketClient/SocketClient';

interface Dependency {
  userRepository: IUserRepository;
  socketClient: ISocketClient;
}

export interface PayloadFollowUser {
  userId: string;
  userFollow: string;
}

type likeUnlike = 'followed' | 'unfollowed';

class ToggleFollowUser {
  private userRepository: IUserRepository;
  private socketClient: ISocketClient;

  constructor(dependency: Dependency) {
    this.userRepository = dependency.userRepository;
    this.socketClient = dependency.socketClient;
  }

  async execute(payload: PayloadFollowUser): Promise<likeUnlike> {
    await this.userRepository.isUserExistById(payload.userFollow);
    const isFollowed = await this.userRepository.isUserFollowed(payload);

    if (isFollowed) {
      await this.userRepository.unfollowUser(payload);
      return 'unfollowed';
    }

    await this.userRepository.followUser(payload);

    // send notif
    this.socketClient.sendNotif({
      userId: payload.userId,
      to: payload.userFollow,
      type: 'follow',
    });

    return 'followed';
  }
}

export default ToggleFollowUser;
