import UserSearch, {
  IUserSearch,
} from '../../Domains/users/entities/UserSearch';
import { IUserRepository } from '../../Domains/users/UserRepository';

interface Dependency {
  userRepository: IUserRepository;
}

class SearchUsers {
  private userRepository: IUserRepository;

  constructor(dependency: Dependency) {
    this.userRepository = dependency.userRepository;
  }

  async execute(text: string): Promise<IUserSearch[]> {
    const users = await this.userRepository.searchUsers(text);

    return users.map((u) => new UserSearch(u));
  }
}

export default SearchUsers;
