import { Types } from 'mongoose';
import { PostMedia } from '../../Applications/use_case/GetExplorePostsMedia';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import { PayloadPostGet } from '../../Domains/posts/entities/PostGet';
import PostRepository, {
  PostLikePayload,
  PostMediaGet,
  PostPayload,
} from '../../Domains/posts/PostRepository';
import CommentModel from '../model/Comment';
import PostModel from '../model/Post';
import UserModel, { IUserModel } from '../model/User';

class PostRepositoryMongo extends PostRepository {
  private Model;
  private CommentModel;
  private UserModel;

  constructor() {
    super();
    this.Model = PostModel;
    this.CommentModel = CommentModel;
    this.UserModel = UserModel;
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
    const post = await this.Model.findById(id)
      .select('_id caption media createdAt likes')
      .populate<{ userId: IUserModel }>('userId', 'username profilePhoto _id');

    if (!post) throw new NotFoundError('post not found');

    const { _id, userId: user, caption, media, createdAt, likes } = post;

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
      isLiked: likes.filter((like) => like.toString() === userId).length > 0,
      commentsCount,
    };
  }

  async getFollowingPosts(userId: string): Promise<PayloadPostGet[]> {
    // const weekInMs = 604800000;

    const usersFollowing = await this.UserModel.find(
      { followers: userId },
      '_id'
    );

    const usersIdFollowing = usersFollowing.map((u) => u._id);

    const posts = await this.Model.aggregate([
      {
        $match: {
          userId: { $in: usersIdFollowing },
          // createdAt: {
          //   $lt: new Date(),
          //   $gt: new Date(new Date().valueOf() - weekInMs),
          // },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          caption: 1,
          media: 1,
          createdAt: 1,
          likesCount: { $size: '$likes' },
          'user.id': '$user._id',
          'user.username': 1,
          'user.profilePhoto': 1,
          commentsCount: { $size: '$comments' },
          isLiked: {
            $filter: {
              input: '$likes',
              as: 'likes',
              cond: { $eq: ['$$likes', new Types.ObjectId(userId)] },
            },
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    return posts.map((p) => ({
      ...p,
      isLiked: !!p.isLiked[0],
    }));
  }

  async getPostMediaByUserId(userId: string): Promise<PostMediaGet[]> {
    const posts = await this.Model.find({ userId }, '_id media').sort({
      createdAt: -1,
    });

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

  async getExplorePosts(
    userId: string,
    exceptPosts: string[] = []
  ): Promise<PayloadPostGet[]> {
    const exceptPostsMapped = exceptPosts.map((e) => new Types.ObjectId(e));
    const posts = await this.Model.aggregate([
      {
        // avoid duplicate posts
        $match: { _id: { $nin: exceptPostsMapped } },
      },
      {
        $sample: { size: 3 },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          caption: 1,
          media: 1,
          createdAt: 1,
          likesCount: { $size: '$likes' },
          'user.id': '$user._id',
          'user.username': 1,
          'user.profilePhoto': 1,
          commentsCount: { $size: '$comments' },
          isLiked: {
            $filter: {
              input: '$likes',
              as: 'likes',
              cond: { $eq: ['$$likes', new Types.ObjectId(userId)] },
            },
          },
        },
      },
    ]);

    return posts.map((p) => ({
      ...p,
      isLiked: !!p.isLiked[0],
    })) as unknown as PayloadPostGet[];
  }

  async getExplorePostsMedia(exceptPosts: string[]): Promise<PostMedia[]> {
    const exceptPostsMapped = exceptPosts.map((e) => new Types.ObjectId(e));
    return this.Model.aggregate([
      {
        // avoid duplicate posts
        $match: { _id: { $nin: exceptPostsMapped } },
      },
      {
        $sample: { size: 15 },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          media: { $slice: ['$media', 1] },
        },
      },
      {
        $unwind: '$media',
      },
    ]);
  }

  async getUserIdPost(id: string): Promise<string> {
    const result = await this.Model.findById(id).populate<{
      userId: IUserModel;
    }>('userId', '_id');

    if (!result) throw new NotFoundError('user not found');

    return result.userId._id.toString();
  }
}

export default PostRepositoryMongo;
