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
}

export default UserRepository;
