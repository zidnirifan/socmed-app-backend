import UserGet, { IUserGet } from '../../Domains/users/entities/UserGet';
import { IUserRepository } from '../../Domains/users/UserRepository';

interface Dependency {
  userRepository: IUserRepository;
}

class SearchUsers {
  private userRepository: IUserRepository;

  constructor(dependency: Dependency) {
    this.userRepository = dependency.userRepository;
  }

  async execute(text: string): Promise<IUserGet[]> {
    const users = await this.userRepository.searchUsers(text);

    return users.map((u) => new UserGet(u));
  }
}

export default SearchUsers;
