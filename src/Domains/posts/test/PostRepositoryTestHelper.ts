/* istanbul ignore file */

import { PayloadPostGet } from '../entities/PostGet';
import PostRepository, { PostMediaGet, PostPayload } from '../PostRepository';

class MockPostRepository extends PostRepository {
  addPost(payload: PostPayload): Promise<string> {
    throw new Error('Method not implemented.');
  }
  isPostExist(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getPostById(id: string): Promise<PayloadPostGet> {
    throw new Error('Method not implemented.');
  }
  getHomePosts(): Promise<PayloadPostGet[]> {
    throw new Error('Method not implemented.');
  }
  getPostMediaByUserId(userId: string): Promise<PostMediaGet[]> {
    throw new Error('Method not implemented.');
  }
}

export default MockPostRepository;
