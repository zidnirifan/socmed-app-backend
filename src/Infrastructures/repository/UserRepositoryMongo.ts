import { Types } from 'mongoose';
import { IUser } from '../../Domains/users/entities/User';
import UserRepository, { UserGet } from '../../Domains/users/UserRepository';
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

  async isUserExistById(id: string): Promise<void> {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new NotFoundError('user not found');
    }

    const result = await this.Model.findById(id);
    if (!result) {
      throw new NotFoundError('user not found');
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

  async getUserById(id: string): Promise<UserGet> {
    const { _id, username, fullName, profilePhoto, bio } =
      await this.Model.findOne(
        { _id: id },
        'username fullName profilePhoto bio'
      );

    return {
      id: _id.toString(),
      username,
      fullName,
      profilePhoto,
      bio,
    };
  }
}

export default UserRepositoryMongo;
