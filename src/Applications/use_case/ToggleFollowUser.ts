import { IUserRepository } from '../../Domains/users/UserRepository';

interface Dependency {
  userRepository: IUserRepository;
}

export interface PayloadFollowUser {
  userId: string;
  userFollow: string;
}

type likeUnlike = 'followed' | 'unfollowed';

class ToggleFollowUser {
  private userRepository: IUserRepository;

  constructor(dependency: Dependency) {
    this.userRepository = dependency.userRepository;
  }

  async execute(payload: PayloadFollowUser): Promise<likeUnlike> {
    await this.userRepository.isUserExistById(payload.userFollow);
    const isFollowed = await this.userRepository.isUserFollowed(payload);

    if (isFollowed) {
      await this.userRepository.unfollowUser(payload);
      return 'unfollowed';
    }

    await this.userRepository.followUser(payload);
    return 'followed';
  }
}

export default ToggleFollowUser;
