/* istanbul ignore file */

import { PayloadFollowUser } from '../../../Applications/use_case/ToggleFollowUser';
import { IUser } from '../entities/User';
import UserRepository, { UserGet } from '../UserRepository';

class MockUserRepository extends UserRepository {
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

  getUserById(id: string): Promise<UserGet> {
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
}

export default MockUserRepository;
