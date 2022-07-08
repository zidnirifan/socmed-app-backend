import { PayloadPostGet } from './entities/PostGet';

export interface PostPayload {
  userId: string;
  caption: string;
  media: string[];
}

export interface PostMediaGet {
  id: string;
  media: string;
}

export interface PostLikePayload {
  userId: string;
  postId: string;
}

export interface IPostRepository {
  addPost(payload: PostPayload): Promise<string>;
  isPostExist(id: string): Promise<void>;
  getPostById(id: string): Promise<PayloadPostGet>;
  getHomePosts(): Promise<PayloadPostGet[]>;
  getPostMediaByUserId(id: string): Promise<PostMediaGet[]>;
  isPostLiked(payload: PostLikePayload): Promise<boolean>;
  likePost(payload: PostLikePayload): Promise<void>;
  unlikePost(payload: PostLikePayload): Promise<void>;
}

abstract class PostRepository implements IPostRepository {
  abstract addPost(payload: PostPayload): Promise<string>;
  abstract isPostExist(id: string): Promise<void>;
  abstract getPostById(id: string): Promise<PayloadPostGet>;
  abstract getHomePosts(): Promise<PayloadPostGet[]>;
  abstract getPostMediaByUserId(userId: string): Promise<PostMediaGet[]>;
  abstract isPostLiked(payload: PostLikePayload): Promise<boolean>;
  abstract likePost(payload: PostLikePayload): Promise<void>;
  abstract unlikePost(payload: PostLikePayload): Promise<void>;
}

export default PostRepository;
