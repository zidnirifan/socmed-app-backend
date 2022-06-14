import { IUser } from '../../Domains/users/entities/User';
import UserRepository from '../../Domains/users/UserRepository';
import InvariantError from '../../Commons/exceptions/InvariantError';
import { IUserModel } from '../model/User';

class UserRepositoryMongo extends UserRepository {
  private Model: IUserModel;

  constructor(userModel: IUserModel) {
    super();
    this.Model = userModel;
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
}

export default UserRepositoryMongo;
