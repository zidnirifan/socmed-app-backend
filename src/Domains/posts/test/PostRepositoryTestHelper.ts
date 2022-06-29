import PostRepository, { PostPayload } from '../PostRepository';

class MockPostRepository extends PostRepository {
  addPost(payload: PostPayload): string {
    throw new Error('Method not implemented.');
  }
}

export default MockPostRepository;
