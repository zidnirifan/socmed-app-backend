/* istanbul ignore file */

import CommentRepository from '../CommentRepository';
import { IComment } from '../entities/Comment';

class MockCommentRepository extends CommentRepository {
  addComment(payload: IComment): Promise<string> {
    throw new Error('Method not implemented.');
  }
  isCommentExist(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default MockCommentRepository;
