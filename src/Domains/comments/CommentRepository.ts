import { IComment } from './entities/Comment';
import { ICommentGet, PayloadCommentGet } from './entities/CommentGet';

export interface LikeCommentPayload {
  userId: string;
  commentId: string;
}

export interface ICommentRepository {
  addComment(payload: IComment): Promise<string>;
  isCommentExist(id: string): Promise<void>;
  getCommentsByPostId(
    postId: string,
    userId: string
  ): Promise<PayloadCommentGet[]>;
  getReplies(id: string, userId: string): Promise<ICommentGet[]>;
  isCommentLiked(payload: LikeCommentPayload): Promise<boolean>;
  likeComment(payload: LikeCommentPayload): Promise<void>;
  unlikeComment(payload: LikeCommentPayload): Promise<void>;
  getUserIdComment(id: string): Promise<string>;
}

abstract class CommentRepository implements ICommentRepository {
  abstract addComment(payload: IComment): Promise<string>;
  abstract isCommentExist(id: string): Promise<void>;
  abstract getCommentsByPostId(
    postId: string,
    userId: string
  ): Promise<PayloadCommentGet[]>;
  abstract getReplies(id: string, userId: string): Promise<ICommentGet[]>;
  abstract isCommentLiked(payload: LikeCommentPayload): Promise<boolean>;
  abstract likeComment(payload: LikeCommentPayload): Promise<void>;
  abstract unlikeComment(payload: LikeCommentPayload): Promise<void>;
  abstract getUserIdComment(id: string): Promise<string>;
}

export default CommentRepository;
