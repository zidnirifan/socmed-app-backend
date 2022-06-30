import { IPostGet } from './entities/PostGet';

export interface PostPayload {
  userId: string;
  caption: string;
  media: string[];
}

export interface IPostRepository {
  addPost(payload: PostPayload): Promise<string>;
  isPostExist(id: string): Promise<void>;
  getPostById(id: string): Promise<IPostGet>;
}

abstract class PostRepository implements IPostRepository {
  abstract addPost(payload: PostPayload): Promise<string>;
  abstract isPostExist(id: string): Promise<void>;
  abstract getPostById(id: string): Promise<IPostGet>;
}

export default PostRepository;
