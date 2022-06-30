import { Types } from 'mongoose';
import NotFoundError from '../../Commons/exceptions/NotFoundError';
import { IPostGet } from '../../Domains/posts/entities/PostGet';
import PostRepository, {
  PostPayload,
} from '../../Domains/posts/PostRepository';
import PostModel from '../model/Post';

class PostRepositoryMongo extends PostRepository {
  private Model;

  constructor() {
    super();
    this.Model = PostModel;
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

  async getPostById(id: string): Promise<IPostGet> {
    const { _id, caption, media, createdAt, userId } =
      await this.Model.findById(id)
        .select('_id caption media createdAt')
        .populate('userId', 'username -_id');

    return {
      id: _id.toString(),
      username: userId.username,
      caption,
      media,
      createdAt,
    };
  }
}

export default PostRepositoryMongo;
