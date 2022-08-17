import UserEdit, { IUserEdit } from '../../Domains/users/entities/UserEdit';
import { IUserRepository } from '../../Domains/users/UserRepository';
import { IValidator } from '../validator/Validator';

interface IDependency {
  userRepository: IUserRepository;
  validator: IValidator<IUserEdit>;
}

class EditUser {
  private userRepository: IUserRepository;
  private validator: IValidator<IUserEdit>;

  constructor(dependency: IDependency) {
    this.userRepository = dependency.userRepository;
    this.validator = dependency.validator;
  }

  async execute(payload: IUserEdit) {
    this.validator.validate(payload);

    await this.userRepository.isUserExistById(payload.id);

    const oldUsername = await this.userRepository.getUsernameById(payload.id);

    if (payload.username !== oldUsername) {
      await this.userRepository.verifyAvailableUsername(payload.username);
    }

    const user = new UserEdit(payload);
    return this.userRepository.editUser(user);
  }
}

export default EditUser;
