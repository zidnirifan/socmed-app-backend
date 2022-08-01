import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import db from '../../database/mongo/db';
import CommentModel from '../../model/Comment';
import CommentRepositoryMongo from '../CommentRepositoryMongo';

describe('CommentRepositoryMongo', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await CommentModel.deleteMany();
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
});
