import { PayloadFollowUser } from '../../Applications/use_case/ToggleFollowUser';
import { IUser } from './entities/User';

export interface UserGet {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
  bio: string;
}

export interface IUserRepository {
  addUser(payload: IUser): Promise<string>;
  verifyAvailableUsername(username: string): Promise<void>;
  isUsernameExist(username: string): Promise<void>;
  isUserExistById(id: string): Promise<void>;
  getPasswordByUsername(username: string): Promise<string>;
  getIdByUsername(username: string): Promise<string>;
  editProfilePhotoById(id: string, profilePhoto: string): Promise<void>;
  getUserById(id: string): Promise<UserGet>;
  isUserFollowed(payload: PayloadFollowUser): Promise<boolean>;
  followUser(payload: PayloadFollowUser): Promise<void>;
  unfollowUser(payload: PayloadFollowUser): Promise<void>;
}

abstract class UserRepository implements IUserRepository {
  abstract verifyAvailableUsername(username: string): Promise<void>;

  abstract addUser(payload: IUser): Promise<string>;

  abstract isUsernameExist(username: string): Promise<void>;

  abstract isUserExistById(id: string): Promise<void>;

  abstract getPasswordByUsername(username: string): Promise<string>;

  abstract getIdByUsername(username: string): Promise<string>;

  abstract editProfilePhotoById(
    id: string,
    profilePhoto: string
  ): Promise<void>;

  abstract getUserById(id: string): Promise<UserGet>;

  abstract isUserFollowed(payload: PayloadFollowUser): Promise<boolean>;

  abstract followUser(payload: PayloadFollowUser): Promise<void>;

  abstract unfollowUser(payload: PayloadFollowUser): Promise<void>;
}

export default UserRepository;
