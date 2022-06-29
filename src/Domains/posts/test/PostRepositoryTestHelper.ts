/* istanbul ignore file */

import PostRepository, { PostPayload } from '../PostRepository';

class MockPostRepository extends PostRepository {
  addPost(payload: PostPayload): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default MockPostRepository;
