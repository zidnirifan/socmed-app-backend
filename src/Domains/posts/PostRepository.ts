export interface PostPayload {
  userId: string;
  caption: string;
  media: string[];
}

export interface IPostRepository {
  addPost(payload: PostPayload): string;
}

abstract class PostRepository implements IPostRepository {
  abstract addPost(payload: PostPayload): string;
}

export default PostRepository;
