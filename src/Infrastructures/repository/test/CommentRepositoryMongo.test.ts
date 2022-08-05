import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import db from '../../database/mongo/db';
import CommentModel from '../../model/Comment';
import UserModel from '../../model/User';
import CommentRepositoryMongo from '../CommentRepositoryMongo';

describe('CommentRepositoryMongo', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await CommentModel.deleteMany();
    await UserModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('addComment function', () => {
    it('should save comment to database correctly', async () => {
      const comment = {
        userId: '62bbec0108243e15bde1c28c',
        content: 'comment',
        postId: '62b55fb7f96df4d764f67233',
      };

      const commentRepositoryMongo = new CommentRepositoryMongo();
      const id = await commentRepositoryMongo.addComment(comment);

      const commentSaved = await CommentModel.findById(id);

      expect(commentSaved.userId.toString()).toEqual(comment.userId);
      expect(commentSaved.content).toEqual(comment.content);
      expect(commentSaved.postId.toString()).toEqual(comment.postId);
      expect(commentSaved).toHaveProperty('createdAt');
      expect(commentSaved).toHaveProperty('updatedAt');
    });
  });

  describe('isCommentExist function', () => {
    it('should throw NotFoundError when id is invalid', async () => {
      const commentRepositoryMongo = new CommentRepositoryMongo();

      await expect(
        async () => await commentRepositoryMongo.isCommentExist('invalid_id')
      ).rejects.toThrowError(NotFoundError);
    });

    it('should throw NotFoundError when comment not found', async () => {
      const commentRepositoryMongo = new CommentRepositoryMongo();

      await expect(
        async () =>
          await commentRepositoryMongo.isCommentExist(
            '62b55fb7f96df4d764f67233'
          )
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError when comment is exist', async () => {
      const comment = new CommentModel({
        userId: '62b55fb7f96df4d764f67233',
        content: 'comment',
        postId: '62b55fb7f96df4d764f67255',
      });

      const { _id } = await comment.save();

      const commentRepositoryMongo = new CommentRepositoryMongo();

      await expect(
        commentRepositoryMongo.isCommentExist(_id)
      ).resolves.not.toThrowError(NotFoundError);
    });
  });

  describe('getCommentsByPostId function', () => {
    it('should return comment object correctly', async () => {
      const user = {
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
        profilePhoto: 'profile.png',
      };

      const userModel = new UserModel(user);

      const { _id: userId } = await userModel.save();

      const postId = '62b55fb7f96df4d764f67255';
      const comment = new CommentModel({
        userId,
        content: 'comment',
        postId,
      });

      const { _id } = await comment.save();

      const commentRepositoryMongo = new CommentRepositoryMongo();

      const comments = await commentRepositoryMongo.getCommentsByPostId(postId);

      expect(comments[0].id).toEqual(_id);
      expect(comments[0].user).toEqual({
        id: userId,
        username: user.username,
        profilePhoto: user.profilePhoto,
      });
      expect(comments[0].content).toEqual('comment');
      expect(comments[0].postId.toString()).toEqual(postId);
      expect(comments[0].createdAt).toBeDefined();
    });
  });

  describe('getReplies function', () => {
    it('should return comment object correctly', async () => {
      const user = {
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
        profilePhoto: 'profile.png',
      };

      const userModel = new UserModel(user);

      const { _id: userId } = await userModel.save();

      const postId = '62b55fb7f96df4d764f67255';
      const comment = new CommentModel({
        userId,
        content: 'comment',
        postId,
      });

      const { _id: commentId } = await comment.save();

      const reply = new CommentModel({
        userId,
        content: 'comment',
        postId,
        replyTo: commentId,
        parentComment: commentId,
      });

      const { _id: replyId } = await reply.save();

      const commentRepositoryMongo = new CommentRepositoryMongo();

      const replies = await commentRepositoryMongo.getReplies(commentId);

      expect(replies[0].id).toEqual(replyId);
      expect(replies[0].user).toEqual({
        id: userId,
        username: user.username,
        profilePhoto: user.profilePhoto,
      });
      expect(replies[0].content).toEqual('comment');
      expect(replies[0].postId.toString()).toEqual(postId);
      expect(replies[0].replyTo).toEqual({
        id: commentId,
        user: {
          id: userId,
          username: user.username,
        },
      });
      expect(replies[0].createdAt).toEqual('0s');
    });
  });
});
