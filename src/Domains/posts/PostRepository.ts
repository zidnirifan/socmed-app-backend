export interface PostPayload {
  userId: string;
  caption: string;
  media: string[];
}

export interface IPostRepository {
  addPost(payload: PostPayload): Promise<string>;
}

abstract class PostRepository implements IPostRepository {
  abstract addPost(payload: PostPayload): Promise<string>;
}

export default PostRepository;
