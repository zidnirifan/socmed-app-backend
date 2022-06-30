import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import db from '../../database/mongo/db';
import PostModel from '../../model/Post';
import UserModel from '../../model/User';
import PostRepositoryMongo from '../PostRepositoryMongo';

describe('PostRepositoryMongo', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await PostModel.deleteMany();
    await UserModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('addPost function', () => {
    it('should save post to database', async () => {
      const post = {
        userId: '62bbec0108243e15bde1c28c',
        caption: 'hello ges',
        media: ['http://images.com/img.png'],
      };

      const postRepositoryMongo = new PostRepositoryMongo();
      const id = await postRepositoryMongo.addPost(post);

      const postSaved = await PostModel.findById(id);

      expect(postSaved.userId.toString()).toEqual(post.userId);
      expect(postSaved.caption).toEqual(post.caption);
      expect(postSaved.media).toEqual(post.media);
    });
  });

  describe('isPostExist function', () => {
    it('should throw NotFoundError when id is invalid', async () => {
      const postRepositoryMongo = new PostRepositoryMongo();

      await expect(
        async () => await postRepositoryMongo.isPostExist('invalid_id')
      ).rejects.toThrowError(NotFoundError);
    });

    it('should throw NotFoundError when post not found', async () => {
      const postRepositoryMongo = new PostRepositoryMongo();

      await expect(
        async () =>
          await postRepositoryMongo.isPostExist('62b55fb7f96df4d764f67233')
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when post is exist', async () => {
      const post = new PostModel({
        userId: '62b55fb7f96df4d764f67233',
        caption: 'hello ges',
        media: ['http://images.com/img.png'],
      });

      const { _id } = await post.save();

      const postRepositoryMongo = new PostRepositoryMongo();

      await expect(
        postRepositoryMongo.isPostExist(_id)
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('getPostById function', () => {
    it('should return post correctly', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      });

      const { _id: userId } = await user.save();

      const post = {
        userId,
        caption: 'hello ges',
        media: ['http://images.com/img.png'],
      };

      const postRepositoryMongo = new PostRepositoryMongo();
      const id = await postRepositoryMongo.addPost(post);

      const postGet = await postRepositoryMongo.getPostById(id);
      await postRepositoryMongo.isPostExist(id);

      expect(postGet).toHaveProperty('id');
      expect(postGet).toHaveProperty('user');
      expect(postGet).toHaveProperty('media');
      expect(postGet).toHaveProperty('caption');
      expect(postGet).toHaveProperty('createdAt');
      expect(postGet.user).toHaveProperty('username');
      expect(postGet.user).toHaveProperty('profilePhoto');
    });
  });
});
