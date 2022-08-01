import { IComment } from './entities/Comment';

export interface ICommentRepository {
  addComment(payload: IComment): Promise<string>;
  isCommentExist(id: string): Promise<void>;
}

abstract class CommentRepository implements ICommentRepository {
  abstract addComment(payload: IComment): Promise<string>;
  abstract isCommentExist(id: string): Promise<void>;
}

export default CommentRepository;
