/* istanbul ignore file */

import { IUser } from '../entities/User';
import UserRepository from '../UserRepository';

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

  getPasswordByUsername(username: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  getIdByUsername(username: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  editProfilePhotoById(id: string, profilePhoto: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default MockUserRepository;
