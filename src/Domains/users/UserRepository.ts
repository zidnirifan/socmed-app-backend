import { IUser } from './entities/User';

export interface IUserRepository {
  addUser(payload: IUser): Promise<string>;
  verifyAvailableUsername(username: string): Promise<void>;
}

abstract class UserRepository implements IUserRepository {
  abstract verifyAvailableUsername(username: string): Promise<void>;

  abstract addUser(payload: IUser): Promise<string>;

  abstract isUsernameExist(username: string): Promise<void>;

  abstract getPasswordbByUsername(username: string): Promise<string>;
}

export default UserRepository;
