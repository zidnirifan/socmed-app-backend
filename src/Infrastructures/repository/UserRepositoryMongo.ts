import { IUser } from '../../Domains/users/entities/User';
import UserRepository from '../../Domains/users/UserRepository';
import InvariantError from '../../Commons/exceptions/InvariantError';
import UserModel from '../model/User';
import NotFoundError from '../../Commons/exceptions/NotFoundError';

class UserRepositoryMongo extends UserRepository {
  private Model;

  constructor() {
    super();
    this.Model = UserModel;
  }

  async verifyAvailableUsername(username: string): Promise<void> {
    const result = await this.Model.findOne({ username });
    if (result) {
      throw new InvariantError('username already exist');
    }
  }

  async addUser(payload: IUser): Promise<string> {
    const user = new this.Model(payload);
    const result = await user.save();

    return result._id.toString();
  }

  async isUsernameExist(username: string): Promise<void> {
    const result = await this.Model.findOne({ username });
    if (!result) {
      throw new NotFoundError('username not found');
    }
  }

  async getPasswordByUsername(username: string): Promise<string> {
    const { password } = await this.Model.findOne({ username }, 'password');
    return password;
  }

  async getIdByUsername(username: string): Promise<string> {
    const { _id } = await this.Model.findOne({ username }, '_id');
    return _id.toString();
  }

  async editProfilePhotoById(id: string, profilePhoto: string): Promise<void> {
    await this.Model.updateOne({ _id: id }, { profilePhoto });
  }
}

export default UserRepositoryMongo;
