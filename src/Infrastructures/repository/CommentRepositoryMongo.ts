import { ObjectId, Types } from 'mongoose';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import CommentRepository, {
  LikeCommentPayload,
} from '../../Domains/comments/CommentRepository';
import { IComment } from '../../Domains/comments/entities/Comment';
import CommentGet, {
  ICommentGet,
  PayloadCommentGet,
} from '../../Domains/comments/entities/CommentGet';
import CommentModel, { ICommentModel } from '../model/Comment';
import { IUserModel } from '../model/User';

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

  async getCommentsByPostId(
    postId: string,
    userId: string
  ): Promise<PayloadCommentGet[]> {
    const comments = await this.Model.find(
      { postId, parentComment: undefined },
      '-updatedAt'
    ).populate<{ userId: IUserModel }>('userId', 'username profilePhoto');

    return comments.map(
      ({
        _id,
        userId: user,
        content,
        // eslint-disable-next-line no-shadow
        postId,
        createdAt,
        likes,
      }) => ({
        id: _id.toString(),
        user: {
          id: user._id,
          username: user.username,
          profilePhoto: user.profilePhoto,
        },
        content,
        postId: postId.toString(),
        createdAt,
        likesCount: likes.length,
        isLiked: likes.filter((like) => like.toString() === userId).length > 0,
      })
    );
  }

  async getReplies(
    parentComment: string,
    userId: string
  ): Promise<ICommentGet[]> {
    type ReplyTo = ICommentModel & {
      _id: ObjectId;
      userId: IUserModel;
    };

    const comments = await this.Model.find({ parentComment }, '-updatedAt')
      .populate<{ userId: IUserModel }>('userId', 'username profilePhoto')
      .populate<{ replyTo: ReplyTo }>({
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
      ({ _id, userId: user, content, postId, createdAt, replyTo, likes }) =>
        new CommentGet({
          id: _id.toString(),
          user: {
            id: user._id,
            username: user.username,
            profilePhoto: user.profilePhoto,
          },
          content,
          postId: postId.toString(),
          replyTo: {
            id: replyTo._id.toString(),
            user: {
              id: replyTo.userId._id,
              username: replyTo.userId.username,
            },
          },
          createdAt,
          likesCount: likes.length,
          isLiked:
            likes.filter((like) => like.toString() === userId).length > 0,
        })
    );
  }

  async isCommentLiked(payload: LikeCommentPayload): Promise<boolean> {
    const isLiked = await this.Model.countDocuments({
      _id: payload.commentId,
      likes: payload.userId,
    });
    return !!isLiked;
  }

  async likeComment(payload: LikeCommentPayload): Promise<void> {
    await this.Model.updateOne(
      { _id: payload.commentId },
      { $push: { likes: payload.userId } }
    );
  }

  async unlikeComment(payload: LikeCommentPayload): Promise<void> {
    await this.Model.updateOne(
      { _id: payload.commentId },
      { $pull: { likes: payload.userId } }
    );
  }

  async getUserIdComment(id: string): Promise<string> {
    const result = await this.Model.findById(id).populate<{
      userId: IUserModel;
    }>('userId', '_id');

    if (!result) throw new NotFoundError('comment not found');

    return result.userId._id.toString();
  }
}

export default CommentRepositoryMongo;
