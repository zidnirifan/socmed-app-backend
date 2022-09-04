import UserGet, { IUserGet } from '../../Domains/users/entities/UserGet';
import { IUserRepository } from '../../Domains/users/UserRepository';

interface Dependency {
  userRepository: IUserRepository;
}

class GetFollowers {
  private userRepository: IUserRepository;

  constructor(dependency: Dependency) {
    this.userRepository = dependency.userRepository;
  }

  async execute(ownUserId: string, userId: string): Promise<IUserGet[]> {
    const users = await this.userRepository.getFollowers(ownUserId, userId);

    return users.map((u) => new UserGet(u));
  }
}

export default GetFollowers;
