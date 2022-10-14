/* istanbul ignore file */

import { PayloadFollowUser } from '../../../Applications/use_case/ToggleFollowUser';
import { IUser } from '../entities/User';
import UserEdit from '../entities/UserEdit';
import { IUserGet } from '../entities/UserGet';
import UserRepository, { UserProfileGet } from '../UserRepository';

class MockUserRepository extends UserRepository {
  editUserBio(id: string, bio: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserById(ownId: string, id: string): Promise<IUserGet> {
    throw new Error('Method not implemented.');
  }
  verifyAvailableUsername(username: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  addUser(payload: IUser): Promise<string> {
    throw new Error('Method not implemented.');
  }
  isUsernameExist(username: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  isUserExistById(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getPasswordByUsername(username: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getIdByUsername(username: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  editProfilePhotoById(id: string, profilePhoto: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserProfileById(id: string, userId: string): Promise<UserProfileGet> {
    throw new Error('Method not implemented.');
  }
  isUserFollowed(payload: PayloadFollowUser): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  followUser(payload: PayloadFollowUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
  unfollowUser(payload: PayloadFollowUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
  editUser(payload: UserEdit): Promise<void> {
    throw new Error('Method not implemented.');
  }
  searchUsers(text: string): Promise<IUserGet[]> {
    throw new Error('Method not implemented.');
  }
  getUsernameById(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  getFollowers(ownId: string, id: string): Promise<IUserGet[]> {
    throw new Error('Method not implemented.');
  }
  getFollowing(ownId: string, id: string): Promise<IUserGet[]> {
    throw new Error('Method not implemented.');
  }
  getSuggested(id: string): Promise<IUserGet[]> {
    throw new Error('Method not implemented.');
  }
}

export default MockUserRepository;
