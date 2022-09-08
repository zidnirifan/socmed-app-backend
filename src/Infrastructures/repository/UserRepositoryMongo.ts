import { Types } from 'mongoose';
import { IUser } from '../../Domains/users/entities/User';
import UserRepository, { UserGet } from '../../Domains/users/UserRepository';
import InvariantError from '../../Commons/exceptions/InvariantError';
import UserModel from '../model/User';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import { PayloadFollowUser } from '../../Applications/use_case/ToggleFollowUser';
import UserEdit from '../../Domains/users/entities/UserEdit';
import { IUserGet } from '../../Domains/users/entities/UserGet';

class UserRepositoryMongo extends UserRepository {
  private Model;

  constructor() {
    super();
    this.Model = UserModel;
  }

  async verifyAvailableUsername(username: string): Promise<void> {
    const result = await this.Model.countDocuments({ username });
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
    const result = await this.Model.countDocuments({ username });
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

  async getUserProfileById(id: string, userId: string): Promise<UserGet> {
    const { _id, username, fullName, profilePhoto, bio, followers } =
      await this.Model.findOne({ _id: id }, '-password');

    const followingCount = await this.Model.countDocuments({ followers: id });

    return {
      id: _id.toString(),
      username,
      fullName,
      profilePhoto,
      bio,
      followersCount: followers.length,
      followingCount,
      isFollowed:
        followers.filter(
          (follow: Types.ObjectId) => follow.toString() === userId
        ).length > 0,
    };
  }

  async isUserFollowed(payload: PayloadFollowUser): Promise<boolean> {
    const isFollowed = await this.Model.countDocuments({
      _id: payload.userFollow,
      followers: payload.userId,
    });
    return !!isFollowed;
  }

  async followUser(payload: PayloadFollowUser): Promise<void> {
    await this.Model.updateOne(
      { _id: payload.userFollow },
      { $push: { followers: payload.userId } }
    );
  }

  async unfollowUser(payload: PayloadFollowUser): Promise<void> {
    await this.Model.updateOne(
      { _id: payload.userFollow },
      { $pull: { followers: payload.userId } }
    );
  }

  async editUser({ id, username, fullName, bio }: UserEdit): Promise<void> {
    await this.Model.updateOne({ _id: id }, { username, fullName, bio });
  }

  async searchUsers(text: string): Promise<IUserGet[]> {
    return this.Model.find({
      $or: [
        { username: { $regex: text, $options: 'i' } },
        { fullName: { $regex: text, $options: 'i' } },
      ],
    }).limit(7);
  }

  async getUsernameById(id: string): Promise<string> {
    const { username } = await this.Model.findOne({ _id: id }, 'username');
    return username;
  }

  async getFollowers(ownId: string, id: string): Promise<IUserGet[]> {
    const user = await this.Model.findById(id).populate('followers');
    return user.followers.map((u: any) => ({
      id: u._id,
      username: u.username,
      profilePhoto: u.profilePhoto,
      fullName: u.fullName,
      isFollowed:
        u.followers.filter(
          (follow: Types.ObjectId) => follow.toString() === ownId
        ).length > 0,
    }));
  }

  async getFollowing(ownId: string, id: string): Promise<IUserGet[]> {
    const users = await this.Model.find({ followers: id });
    return users.map((u: any) => ({
      id: u._id,
      username: u.username,
      profilePhoto: u.profilePhoto,
      fullName: u.fullName,
      isFollowed:
        u.followers.filter(
          (follow: Types.ObjectId) => follow.toString() === ownId
        ).length > 0,
    }));
  }

  async getSuggested(id: string): Promise<IUserGet[]> {
    const users = await this.Model.aggregate([
      {
        $sample: { size: 10 },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          username: 1,
          fullName: 1,
          profilePhoto: 1,
          isFollowed: {
            $filter: {
              input: '$followers',
              as: 'followers',
              cond: { $eq: ['$$followers', new Types.ObjectId(id)] },
            },
          },
        },
      },
    ]);

    return users.map((u) => ({
      ...u,
      isFollowed: !!u.isFollowed[0],
    })) as unknown as IUserGet[];
  }

  async getUserById(ownId: string, id: string): Promise<IUserGet> {
    const user = await this.Model.findById(id);
    return {
      id: user._id,
      username: user.username,
      profilePhoto: user.profilePhoto,
      fullName: user.fullName,
      isFollowed:
        user.followers.filter(
          (follow: Types.ObjectId) => follow.toString() === ownId
        ).length > 0,
    };
  }

  async editUserBio(id: string, bio: string): Promise<void> {
    await this.Model.updateOne({ _id: id }, { bio });
  }
}

export default UserRepositoryMongo;
