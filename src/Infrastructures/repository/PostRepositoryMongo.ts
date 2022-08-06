import { Types } from 'mongoose';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import { PayloadPostGet } from '../../Domains/posts/entities/PostGet';
import PostRepository, {
  PostLikePayload,
  PostMediaGet,
  PostPayload,
} from '../../Domains/posts/PostRepository';
import CommentModel from '../model/Comment';
import PostModel from '../model/Post';

class PostRepositoryMongo extends PostRepository {
  private Model;
  private CommentModel;

  constructor() {
    super();
    this.Model = PostModel;
    this.CommentModel = CommentModel;
  }

  async addPost(payload: PostPayload): Promise<string> {
    const post = new this.Model(payload);
    const { _id } = await post.save();
    return _id.toString();
  }

  async isPostExist(id: string): Promise<void> {
    const isValidId = Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new NotFoundError('post not found');
    }

    const isExist = await this.Model.countDocuments({ _id: id });
    if (!isExist) {
      throw new NotFoundError('post not found');
    }
  }

  async getPostById(id: string, userId: string): Promise<PayloadPostGet> {
    const {
      _id,
      caption,
      media,
      createdAt,
      userId: user,
      likes,
    } = await this.Model.findById(id)
      .select('_id caption media createdAt likes')
      .populate('userId', 'username profilePhoto _id');

    const commentsCount = await this.CommentModel.countDocuments({
      postId: id,
    });

    return {
      id: _id.toString(),
      user: {
        id: user._id.toString(),
        username: user.username,
        profilePhoto: user.profilePhoto,
      },
      caption,
      media,
      createdAt,
      likesCount: likes.length,
      isLiked:
        likes.filter((like: Types.ObjectId) => like.toString() === userId)
          .length > 0,
      commentsCount,
    };
  }

  async getHomePosts(userId: string): Promise<PayloadPostGet[]> {
    const posts = await this.Model.find()
      .select('_id caption media createdAt likes')
      .populate('userId', 'username profilePhoto _id');

    const postsMapped = Promise.all(
      posts.map(
        async ({ _id, caption, media, createdAt, userId: user, likes }) => {
          const commentsCount = await this.CommentModel.countDocuments({
            postId: _id,
          });
          return {
            id: _id.toString(),
            user: {
              id: user._id.toString(),
              username: user.username,
              profilePhoto: user.profilePhoto,
            },
            caption,
            media,
            createdAt,
            likesCount: likes.length,
            isLiked:
              likes.filter((like: Types.ObjectId) => like.toString() === userId)
                .length > 0,
            commentsCount,
          };
        }
      )
    );

    return postsMapped;
  }

  async getPostMediaByUserId(userId: string): Promise<PostMediaGet[]> {
    const posts = await this.Model.find({ userId }, '_id media');

    return posts.map(({ _id, media }) => ({
      id: _id.toString(),
      media: media[0],
    }));
  }

  async isPostLiked(payload: PostLikePayload): Promise<boolean> {
    const isLiked = await this.Model.countDocuments({
      _id: payload.postId,
      likes: payload.userId,
    });
    return !!isLiked;
  }

  async likePost(payload: PostLikePayload): Promise<void> {
    await this.Model.updateOne(
      { _id: payload.postId },
      { $push: { likes: payload.userId } }
    );
  }

  async unlikePost(payload: PostLikePayload): Promise<void> {
    await this.Model.updateOne(
      { _id: payload.postId },
      { $pull: { likes: payload.userId } }
    );
  }
}

export default PostRepositoryMongo;
