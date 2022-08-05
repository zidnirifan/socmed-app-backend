/* istanbul ignore file */

import CommentRepository from '../CommentRepository';
import { IComment } from '../entities/Comment';
import { ICommentGet, PayloadCommentGet } from '../entities/CommentGet';

class MockCommentRepository extends CommentRepository {
  addComment(payload: IComment): Promise<string> {
    throw new Error('Method not implemented.');
  }
  isCommentExist(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getCommentsByPostId(postId: string): Promise<PayloadCommentGet[]> {
    throw new Error('Method not implemented.');
  }
  getReplies(id: string): Promise<ICommentGet[]> {
    throw new Error('Method not implemented.');
  }
}

export default MockCommentRepository;
