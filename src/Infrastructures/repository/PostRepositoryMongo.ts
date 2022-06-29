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
}

export default PostRepositoryMongo;
