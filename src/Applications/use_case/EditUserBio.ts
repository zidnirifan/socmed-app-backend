import { IUserRepository } from '../../Domains/users/UserRepository';

interface IDependency {
  userRepository: IUserRepository;
}

class EditUserBio {
  private userRepository: IUserRepository;

  constructor(dependency: IDependency) {
    this.userRepository = dependency.userRepository;
  }

  async execute(id: string, bio: string) {
    await this.userRepository.isUserExistById(id);

    return this.userRepository.editUserBio(id, bio);
  }
}

export default EditUserBio;
