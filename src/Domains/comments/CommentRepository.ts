import { IComment } from './entities/Comment';
import { ICommentGet, PayloadCommentGet } from './entities/CommentGet';

export interface ICommentRepository {
  addComment(payload: IComment): Promise<string>;
  isCommentExist(id: string): Promise<void>;
  getCommentsByPostId(postId: string): Promise<PayloadCommentGet[]>;
  getReplies(id: string): Promise<ICommentGet[]>;
}

abstract class CommentRepository implements ICommentRepository {
  abstract addComment(payload: IComment): Promise<string>;
  abstract isCommentExist(id: string): Promise<void>;
  abstract getCommentsByPostId(postId: string): Promise<PayloadCommentGet[]>;
  abstract getReplies(id: string): Promise<ICommentGet[]>;
}

export default CommentRepository;
