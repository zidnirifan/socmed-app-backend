import UserGet, { IUserGet } from '../../Domains/users/entities/UserGet';
import { IUserRepository } from '../../Domains/users/UserRepository';

interface Dependency {
  userRepository: IUserRepository;
}

class GetUserById {
  private userRepository: IUserRepository;

  constructor(dependency: Dependency) {
    this.userRepository = dependency.userRepository;
  }

  async execute(ownUserId: string, userId: string): Promise<IUserGet> {
    const user = await this.userRepository.getUserById(ownUserId, userId);

    return new UserGet(user);
  }
}

export default GetUserById;
