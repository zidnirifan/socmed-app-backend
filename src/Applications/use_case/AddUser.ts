import User, { IUser } from '../../Domains/users/entities/User';
import { IUserRepository } from '../../Domains/users/UserRepository';
import { IPasswordHash } from '../security/PasswordHash';

interface IDepedency {
  userRepository: IUserRepository;
  passwordHash: IPasswordHash;
}

class AddUser {
  private userRepository: IUserRepository;
  private passwordHash: IPasswordHash;

  constructor(depedency: IDepedency) {
    this.userRepository = depedency.userRepository;
    this.passwordHash = depedency.passwordHash;
  }

  async execute(useCasePayload: IUser) {
    const user = new User(useCasePayload);
    await this.userRepository.verifyAvailableUsername(user.username);
    user.password = await this.passwordHash.hash(user.password);
    return this.userRepository.addUser(user);
  }
}

export default AddUser;
