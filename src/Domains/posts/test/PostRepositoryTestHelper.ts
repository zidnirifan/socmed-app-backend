/* istanbul ignore file */

import { IPostGet } from '../entities/PostGet';
import PostRepository, { PostPayload } from '../PostRepository';

class MockPostRepository extends PostRepository {
  addPost(payload: PostPayload): Promise<string> {
    throw new Error('Method not implemented.');
  }
  isPostExist(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getPostById(id: string): Promise<IPostGet> {
    throw new Error('Method not implemented.');
  }
  getHomePosts(): Promise<IPostGet[]> {
    throw new Error('Method not implemented.');
  }
}

export default MockPostRepository;
