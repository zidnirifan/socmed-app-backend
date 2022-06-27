import { IUser } from './entities/User';

export interface IUserRepository {
  addUser(payload: IUser): Promise<string>;
  verifyAvailableUsername(username: string): Promise<void>;
  isUsernameExist(username: string): Promise<void>;
  getPasswordByUsername(username: string): Promise<string>;
  getIdByUsername(username: string): Promise<string>;
  editProfilePhotoById(id: string, profilePhoto: string): Promise<void>;
}

abstract class UserRepository implements IUserRepository {
  abstract verifyAvailableUsername(username: string): Promise<void>;

  abstract addUser(payload: IUser): Promise<string>;

  abstract isUsernameExist(username: string): Promise<void>;

  abstract getPasswordByUsername(username: string): Promise<string>;

  abstract getIdByUsername(username: string): Promise<string>;

  abstract editProfilePhotoById(
    id: string,
    profilePhoto: string
  ): Promise<void>;
}

export default UserRepository;
