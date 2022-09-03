/* istanbul ignore file */

import CommentRepository, { LikeCommentPayload } from '../CommentRepository';
import { IComment } from '../entities/Comment';
import { ICommentGet, PayloadCommentGet } from '../entities/CommentGet';

class MockCommentRepository extends CommentRepository {
  getUserIdComment(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
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
  isCommentLiked(payload: LikeCommentPayload): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  likeComment(payload: LikeCommentPayload): Promise<void> {
    throw new Error('Method not implemented.');
  }
  unlikeComment(payload: LikeCommentPayload): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default MockCommentRepository;
