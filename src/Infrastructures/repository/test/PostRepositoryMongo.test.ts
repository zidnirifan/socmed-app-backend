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
        profilePhoto: 'profile.png',
      });

      const { _id: userId } = await user.save();

      const post = {
        userId,
        caption: 'hello ges',
        media: ['http://images.com/img.png'],
        likes: [userId],
      };

      const postRepositoryMongo = new PostRepositoryMongo();
      const id = await postRepositoryMongo.addPost(post);

      const postGet = await postRepositoryMongo.getPostById(id, userId);

      expect(postGet).toHaveProperty('id');
      expect(postGet).toHaveProperty('user');
      expect(postGet).toHaveProperty('media');
      expect(postGet).toHaveProperty('caption');
      expect(postGet).toHaveProperty('createdAt');
      expect(postGet).toHaveProperty('likesCount');
      expect(postGet).toHaveProperty('isLiked');
      expect(postGet.user).toHaveProperty('id');
      expect(postGet.user).toHaveProperty('username');
      expect(postGet.user).toHaveProperty('profilePhoto');
    });
  });

  describe('getHomePosts function', () => {
    it('should return array of posts correctly', async () => {
      const user = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
        profilePhoto: 'profile.png',
      });

      const { _id: userId } = await user.save();

      const post = {
        userId,
        caption: 'hello ges',
        media: ['http://images.com/img.png'],
        likes: [userId],
      };

      const postRepositoryMongo = new PostRepositoryMongo();
      await postRepositoryMongo.addPost(post);

      const posts = await postRepositoryMongo.getHomePosts(userId);

      expect(posts[0]).toHaveProperty('id');
      expect(posts[0]).toHaveProperty('user');
      expect(posts[0]).toHaveProperty('media');
      expect(posts[0]).toHaveProperty('caption');
      expect(posts[0]).toHaveProperty('createdAt');
      expect(posts[0]).toHaveProperty('likesCount');
      expect(posts[0]).toHaveProperty('isLiked');
      expect(posts[0].user).toHaveProperty('id');
      expect(posts[0].user).toHaveProperty('username');
      expect(posts[0].user).toHaveProperty('profilePhoto');
    });
  });

  describe('getPostMediaByUserId function', () => {
    it('should return array of post media correctly', async () => {
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

      const postInstanse = new PostModel(post);
      const { _id: postId } = await postInstanse.save();

      const posts = await postRepositoryMongo.getPostMediaByUserId(userId);

      expect(posts[0].id).toEqual(postId.toString());
      expect(posts[0].media).toEqual(post.media[0]);
    });
  });

  describe('isPostLiked function', () => {
    it('should return true if post liked', async () => {
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
        likes: [userId],
      };

      const postRepositoryMongo = new PostRepositoryMongo();

      const postInstanse = new PostModel(post);
      const { _id: postId } = await postInstanse.save();

      const isLiked = await postRepositoryMongo.isPostLiked({ userId, postId });

      expect(isLiked).toEqual(true);
    });

    it('should return false if post not liked', async () => {
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

      const postInstanse = new PostModel(post);
      const { _id: postId } = await postInstanse.save();

      const isLiked = await postRepositoryMongo.isPostLiked({ userId, postId });

      expect(isLiked).toEqual(false);
    });
  });

  describe('likePost function', () => {
    it('should update post likes', async () => {
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

      const postInstanse = new PostModel(post);
      const { _id: postId } = await postInstanse.save();

      await postRepositoryMongo.likePost({ userId, postId });

      const postUpdated = await PostModel.findOne({ _id: postId });

      expect(postUpdated.likes).toHaveLength(1);
      expect(postUpdated.likes[0]).toEqual(userId);
    });
  });

  describe('likePost function', () => {
    it('should update post likes', async () => {
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
        likes: [userId],
      };

      const postRepositoryMongo = new PostRepositoryMongo();

      const postInstanse = new PostModel(post);
      const { _id: postId } = await postInstanse.save();

      await postRepositoryMongo.unlikePost({ userId, postId });

      const postUpdated = await PostModel.findOne({ _id: postId });

      expect(postUpdated.likes).toHaveLength(0);
    });
  });
});
