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

      const userRepositoryMongo = new UserRepositoryMongo();

      await expect(
        async () => await userRepositoryMongo.verifyAvailableUsername(username)
      ).rejects.toThrowError(InvariantError);
    });

    it('should not throw InvariantError when username available', async () => {
      const userRepositoryMongo = new UserRepositoryMongo();

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

      const userRepositoryMongo = new UserRepositoryMongo();

      const userId = await userRepositoryMongo.addUser(user);

      const userSaved = await UserModel.findById(userId);
      expect(userSaved?._id.toString()).toEqual(userId);
      expect(userSaved?.username).toEqual(user.username);
      expect(userSaved?.password).toEqual(user.password);
      expect(userSaved?.fullName).toEqual(user.fullName);
    });
  });

  describe('isUsernameExist function', () => {
    it('should throw NotFoundError when username not found', async () => {
      const userRepositoryMongo = new UserRepositoryMongo();

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

      const userRepositoryMongo = new UserRepositoryMongo();

      await expect(
        userRepositoryMongo.isUsernameExist(username)
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('isUserExistById function', () => {
    it('should throw NotFoundError when id is invalid', async () => {
      const userRepositoryMongo = new UserRepositoryMongo();

      await expect(
        async () => await userRepositoryMongo.isUserExistById('user-123')
      ).rejects.toThrowError(NotFoundError);
    });

    it('should throw NotFoundError when user not found', async () => {
      const userRepositoryMongo = new UserRepositoryMongo();

      await expect(
        async () =>
          await userRepositoryMongo.isUserExistById('62b55fb7f96df4d764f67233')
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when user exist', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id } = await user.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      await expect(
        userRepositoryMongo.isUserExistById(_id)
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

      const userRepositoryMongo = new UserRepositoryMongo();

      const resultPassword = await userRepositoryMongo.getPasswordByUsername(
        username
      );

      expect(typeof resultPassword).toEqual('string');
      expect(resultPassword).toEqual(password);
    });
  });

  describe('getIdByUsername function', () => {
    it('should return id user correctly', async () => {
      const username = 'username';

      const user = new UserModel({
        username,
        fullName: 'Jhon Doe',
        password: 'password',
      });

      await user.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      const id = await userRepositoryMongo.getIdByUsername(username);

      const userSaved = await UserModel.findOne({ username });

      expect(typeof id).toEqual('string');
      expect(id).toEqual(userSaved?._id.toString());
    });
  });

  describe('editProfilePhotoById', () => {
    it('should update profilePhoto correctly', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id } = await user.save();

      const profilePhoto = 'http://image/profile.img';

      const userRepositoryMongo = new UserRepositoryMongo();

      await userRepositoryMongo.editProfilePhotoById(_id, profilePhoto);

      const result = await UserModel.findOne({ _id });
      expect(profilePhoto).toEqual(result?.profilePhoto);
    });
  });

  describe('getUserProfileById', () => {
    it('should return user correctly', async () => {
      const userFollow = new UserModel({
        username: 'gedang',
        fullName: 'Gedang goreng',
        password: 'password',
      });

      const { _id: userFollowId } = await userFollow.save();

      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
        profilePhoto: 'img.jpg',
        bio: 'i am an engineer',
        followers: [userFollowId],
      });

      const { _id } = await user.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      const resultUser = await userRepositoryMongo.getUserProfileById(
        _id,
        'user-123'
      );

      expect(resultUser.id).toEqual(_id.toString());
      expect(resultUser.username).toEqual(user.username);
      expect(resultUser.fullName).toEqual(user.fullName);
      expect(resultUser.profilePhoto).toEqual(user.profilePhoto);
      expect(resultUser.bio).toEqual(user.bio);
      expect(resultUser.followersCount).toEqual(1);
      expect(resultUser.followingCount).toEqual(0);
      expect(resultUser.isFollowed).toEqual(false);
    });
  });

  describe('isUserFollowed function', () => {
    it('should return true if user followed', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id: userId } = await user.save();

      const userFollow = new UserModel({
        username: 'gedang',
        fullName: 'Jhon Doe',
        password: 'password',
        followers: [userId],
      });

      const { _id: userFollowId } = await userFollow.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      const isFollowd = await userRepositoryMongo.isUserFollowed({
        userId,
        userFollow: userFollowId,
      });

      expect(isFollowd).toEqual(true);
    });

    it('should return false if user not followed', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const userFollow = new UserModel({
        username: 'gedang',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id: userId } = await user.save();
      const { _id: userFollowId } = await userFollow.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      const isFollowd = await userRepositoryMongo.isUserFollowed({
        userId,
        userFollow: userFollowId,
      });

      expect(isFollowd).toEqual(false);
    });
  });

  describe('followUser function', () => {
    it('should update user followers', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const userFollow = new UserModel({
        username: 'gedang',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id: userId } = await user.save();
      const { _id: userFollowId } = await userFollow.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      await userRepositoryMongo.followUser({
        userId,
        userFollow: userFollowId,
      });

      const userUpdated = await UserModel.findOne({ _id: userFollow });

      expect(userUpdated?.followers).toHaveLength(1);
      expect(userUpdated?.followers[0]).toEqual(userId);
    });
  });

  describe('unfollowUser function', () => {
    it('should update user followers', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const userFollow = new UserModel({
        username: 'gedang',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id: userId } = await user.save();
      const { _id: userFollowId } = await userFollow.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      await userRepositoryMongo.unfollowUser({
        userId,
        userFollow: userFollowId,
      });

      const userUpdated = await UserModel.findOne({ _id: userFollow });

      expect(userUpdated?.followers).toHaveLength(0);
    });
  });

  describe('editUser', () => {
    it('should update user correctly', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id } = await user.save();

      const userEdit = {
        id: _id,
        username: 'paijo',
        fullName: 'Paijo',
        bio: 'engineer',
      };

      const userRepositoryMongo = new UserRepositoryMongo();

      await userRepositoryMongo.editUser(userEdit);

      const result = await UserModel.findOne({ _id });
      expect(userEdit.fullName).toEqual(result?.fullName);
      expect(userEdit.bio).toEqual(result?.bio);
    });
  });

  describe('searchUsers function', () => {
    it('should search user correctly', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id } = await user.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      const users = await userRepositoryMongo.searchUsers('jhon', '');

      expect(users).toHaveLength(1);
      expect(users[0].id).toEqual(_id.toString());
      expect(users[0].username).toEqual(user.username);
      expect(users[0].fullName).toEqual(user.fullName);
    });

    it('should return blank array when user not found', async () => {
      const userRepositoryMongo = new UserRepositoryMongo();

      const users = await userRepositoryMongo.searchUsers('jhon', '');

      expect(users).toHaveLength(0);
    });
  });

  describe('getUsernameById function', () => {
    it('should return username correctly', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id } = await user.save();

      const userRepositoryMongo = new UserRepositoryMongo();

      const username = await userRepositoryMongo.getUsernameById(_id);

      expect(username).toEqual('jhondoe');
    });
  });
});
