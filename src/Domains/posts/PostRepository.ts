import { PostMedia } from '../../Applications/use_case/GetExplorePostsMedia';
import { PayloadPostGet } from './entities/PostGet';

export interface PostPayload {
  userId: string;
  caption?: string;
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
  getPostById(id: string, userId: string): Promise<PayloadPostGet>;
  getHomePosts(userId: string): Promise<PayloadPostGet[]>;
  getPostMediaByUserId(id: string): Promise<PostMediaGet[]>;
  isPostLiked(payload: PostLikePayload): Promise<boolean>;
  likePost(payload: PostLikePayload): Promise<void>;
  unlikePost(payload: PostLikePayload): Promise<void>;
  getExplorePosts(userId: string): Promise<PayloadPostGet[]>;
  getExplorePostsMedia(): Promise<PostMedia[]>;
}

abstract class PostRepository implements IPostRepository {
  abstract addPost(payload: PostPayload): Promise<string>;
  abstract isPostExist(id: string): Promise<void>;
  abstract getPostById(id: string, userId: string): Promise<PayloadPostGet>;
  abstract getHomePosts(userId: string): Promise<PayloadPostGet[]>;
  abstract getPostMediaByUserId(userId: string): Promise<PostMediaGet[]>;
  abstract isPostLiked(payload: PostLikePayload): Promise<boolean>;
  abstract likePost(payload: PostLikePayload): Promise<void>;
  abstract unlikePost(payload: PostLikePayload): Promise<void>;
  abstract getExplorePosts(userId: string): Promise<PayloadPostGet[]>;
  abstract getExplorePostsMedia(): Promise<PostMedia[]>;
}

export default PostRepository;
