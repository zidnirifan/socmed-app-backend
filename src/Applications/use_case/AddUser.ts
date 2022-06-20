import User, { IUser } from '../../Domains/users/entities/User';
import { IUserRepository } from '../../Domains/users/UserRepository';
import { IPasswordHash } from '../security/PasswordHash';
import { IValidator } from '../validator/Validator';

interface IDependency {
  userRepository: IUserRepository;
  passwordHash: IPasswordHash;
  validator: IValidator<IUser>;
}

class AddUser {
  private userRepository: IUserRepository;
  private passwordHash: IPasswordHash;
  private validator: IValidator<IUser>;

  constructor(dependency: IDependency) {
    this.userRepository = dependency.userRepository;
    this.passwordHash = dependency.passwordHash;
    this.validator = dependency.validator;
  }

  async execute(payload: IUser) {
    this.validator.validate(payload);
    const user = new User(payload);
    await this.userRepository.verifyAvailableUsername(user.username);
    user.password = await this.passwordHash.hash(user.password);
    return this.userRepository.addUser(user);
  }
}

export default AddUser;
