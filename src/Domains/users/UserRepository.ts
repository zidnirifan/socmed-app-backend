import { PayloadFollowUser } from '../../Applications/use_case/ToggleFollowUser';
import { IUser } from './entities/User';
import UserEdit from './entities/UserEdit';
import { IUserGet } from './entities/UserGet';

export interface UserGet {
  id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  isFollowed: boolean;
}

export interface IUserRepository {
  addUser(payload: IUser): Promise<string>;
  verifyAvailableUsername(username: string): Promise<void>;
  isUsernameExist(username: string): Promise<void>;
  isUserExistById(id: string): Promise<void>;
  getPasswordByUsername(username: string): Promise<string>;
  getIdByUsername(username: string): Promise<string>;
  editProfilePhotoById(id: string, profilePhoto: string): Promise<void>;
  getUserById(id: string, userId: string): Promise<UserGet>;
  isUserFollowed(payload: PayloadFollowUser): Promise<boolean>;
  followUser(payload: PayloadFollowUser): Promise<void>;
  unfollowUser(payload: PayloadFollowUser): Promise<void>;
  editUser(payload: UserEdit): Promise<void>;
  searchUsers(text: string): Promise<IUserGet[]>;
  getUsernameById(id: string): Promise<string>;
  getFollowers(ownId: string, id: string): Promise<IUserGet[]>;
  getFollowing(ownId: string, id: string): Promise<IUserGet[]>;
  getSuggested(id: string): Promise<IUserGet[]>;
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
  abstract getUserById(id: string, userId: string): Promise<UserGet>;
  abstract isUserFollowed(payload: PayloadFollowUser): Promise<boolean>;
  abstract followUser(payload: PayloadFollowUser): Promise<void>;
  abstract unfollowUser(payload: PayloadFollowUser): Promise<void>;
  abstract editUser(payload: UserEdit): Promise<void>;
  abstract searchUsers(text: string): Promise<IUserGet[]>;
  abstract getUsernameById(id: string): Promise<string>;
  abstract getFollowers(ownId: string, id: string): Promise<IUserGet[]>;
  abstract getFollowing(ownId: string, id: string): Promise<IUserGet[]>;
  abstract getSuggested(id: string): Promise<IUserGet[]>;
}

export default UserRepository;
