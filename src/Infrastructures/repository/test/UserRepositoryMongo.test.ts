import User from '../../../Domains/users/entities/User';
import UserRepositoryMongo from '../UserRepositoryMongo';
import UserModel from '../../model/User';
import db from '../../database/mongo/db';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';

describe('UserRepositoryMongo', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('verifyAvailableUsername function', () => {
    it('should throw InvriantError when username not available', async () => {
      const username = 'jhondoe';

      const user = new UserModel({
        username,
        fullName: 'Jhon Doe',
        password: 'password',
      });

      await user.save();

      const userRepositoryMongo = new UserRepositoryMongo(UserModel);

      await expect(
        async () => await userRepositoryMongo.verifyAvailableUsername(username)
      ).rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when username available', async () => {
      const userRepositoryMongo = new UserRepositoryMongo(UserModel);

      await expect(
        userRepositoryMongo.verifyAvailableUsername('jhondoe')
      ).resolves.not.toThrowError(InvariantError);
    });
  });

  describe('addUser function', () => {
    it('should persist register user and return id user correctly', async () => {
      const user = new User({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const userRepositoryMongo = new UserRepositoryMongo(UserModel);

      const userId = await userRepositoryMongo.addUser(user);

      const userSaved = await UserModel.findById(userId);
      expect(userSaved._id.toString()).toEqual(userId);
      expect(userSaved.username).toEqual(user.username);
      expect(userSaved.password).toEqual(user.password);
      expect(userSaved.fullName).toEqual(user.fullName);
    });
  });

  describe('isUsernameExist function', () => {
    it('should throw NotFoundError when username not found', async () => {
      const userRepositoryMongo = new UserRepositoryMongo(UserModel);

      await expect(
        async () => await userRepositoryMongo.isUsernameExist('jhondoe')
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when username exist', async () => {
      const username = 'jhondoe';

      const user = new UserModel({
        username,
        fullName: 'Jhon Doe',
        password: 'password',
      });

      await user.save();

      const userRepositoryMongo = new UserRepositoryMongo(UserModel);

      await expect(
        userRepositoryMongo.isUsernameExist(username)
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('getPasswordByUsername function', () => {
    it('should return password user correctly', async () => {
      const username = 'jhondoe';
      const password = 'password';

      const user = new UserModel({
        username,
        fullName: 'Jhon Doe',
        password,
      });

      await user.save();

      const userRepositoryMongo = new UserRepositoryMongo(UserModel);

      const resultPassword = await userRepositoryMongo.getPasswordbByUsername(
        username
      );

      expect(typeof resultPassword).toEqual('string');
      expect(resultPassword).toEqual(password);
    });
  });
});
