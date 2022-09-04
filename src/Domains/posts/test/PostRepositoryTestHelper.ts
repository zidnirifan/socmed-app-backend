/* istanbul ignore file */

import { PostMedia } from '../../../Applications/use_case/GetExplorePostsMedia';
import { PayloadPostGet } from '../entities/PostGet';
import PostRepository, {
  PostLikePayload,
  PostMediaGet,
  PostPayload,
} from '../PostRepository';

class MockPostRepository extends PostRepository {
  getUserIdPost(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  addPost(payload: PostPayload): Promise<string> {
    throw new Error('Method not implemented.');
  }
  isPostExist(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getPostById(id: string, userId: string): Promise<PayloadPostGet> {
    throw new Error('Method not implemented.');
  }
  getFollowingPosts(userId: string): Promise<PayloadPostGet[]> {
    throw new Error('Method not implemented.');
  }
  getPostMediaByUserId(userId: string): Promise<PostMediaGet[]> {
    throw new Error('Method not implemented.');
  }
  isPostLiked(payload: PostLikePayload): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  likePost(payload: PostLikePayload): Promise<void> {
    throw new Error('Method not implemented.');
  }
  unlikePost(payload: PostLikePayload): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getExplorePosts(userId: string): Promise<PayloadPostGet[]> {
    throw new Error('Method not implemented.');
  }
  getExplorePostsMedia(): Promise<PostMedia[]> {
    throw new Error('Method not implemented.');
  }
}

export default MockPostRepository;
