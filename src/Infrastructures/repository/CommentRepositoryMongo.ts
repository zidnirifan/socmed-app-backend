import { Types } from 'mongoose';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import CommentRepository from '../../Domains/comments/CommentRepository';
import { IComment } from '../../Domains/comments/entities/Comment';
import CommentGet, {
  ICommentGet,
  PayloadCommentGet,
} from '../../Domains/comments/entities/CommentGet';
import CommentModel from '../model/Comment';

class CommentRepositoryMongo extends CommentRepository {
  private Model;

  constructor() {
    super();
    this.Model = CommentModel;
  }

  async addComment(payload: IComment): Promise<string> {
    const comment = new this.Model(payload);
    const { _id } = await comment.save();
    return _id.toString();
  }

  async isCommentExist(id: string): Promise<void> {
    const isValid = Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new NotFoundError('comment not found');
    }

    const isExist = await this.Model.countDocuments({ _id: id });
    if (!isExist) {
      throw new NotFoundError('comment not found');
    }
  }

  async getCommentsByPostId(postId: string): Promise<PayloadCommentGet[]> {
    const comments = await this.Model.find(
      { postId, parentComment: undefined },
      '-updatedAt'
    ).populate('userId', 'username profilePhoto');

    return comments.map(
      ({
        _id: id,
        userId: user,
        content,
        // eslint-disable-next-line no-shadow
        postId,
        createdAt,
      }) => ({
        id,
        user: {
          id: user._id,
          username: user.username,
          profilePhoto: user.profilePhoto,
        },
        content,
        postId,
        createdAt,
      })
    );
  }

  async getReplies(parentComment: string): Promise<ICommentGet[]> {
    const comments = await this.Model.find({ parentComment }, '-updatedAt')
      .populate('userId', 'username profilePhoto')
      .populate({
        path: 'replyTo',
        model: 'Comment',
        select: 'userId',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'username',
        },
      });

    return comments.map(
      ({ _id: id, userId: user, content, postId, createdAt, replyTo }) =>
        new CommentGet({
          id,
          user: {
            id: user._id,
            username: user.username,
            profilePhoto: user.profilePhoto,
          },
          content,
          postId,
          replyTo: {
            id: replyTo._id,
            user: {
              id: replyTo.userId._id,
              username: replyTo.userId.username,
            },
          },
          createdAt,
        })
    );
  }
}

export default CommentRepositoryMongo;
