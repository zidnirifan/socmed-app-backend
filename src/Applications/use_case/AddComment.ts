import { ICommentRepository } from '../../Domains/comments/CommentRepository';
import Comment, { IComment } from '../../Domains/comments/entities/Comment';
import { IPostRepository } from '../../Domains/posts/PostRepository';
import { ISocketClient } from '../socketClient/SocketClient';
import { IValidator } from '../validator/Validator';

interface Dependency {
  validator: IValidator<IComment>;
  postRepository: IPostRepository;
  commentRepository: ICommentRepository;
  socketClient: ISocketClient;
}

class AddComment {
  private validator: IValidator<IComment>;
  private postRepository: IPostRepository;
  private commentRepository: ICommentRepository;
  private socketClient: ISocketClient;

  constructor(dependency: Dependency) {
    this.validator = dependency.validator;
    this.postRepository = dependency.postRepository;
    this.commentRepository = dependency.commentRepository;
    this.socketClient = dependency.socketClient;
  }

  async execute(payload: IComment): Promise<string> {
    this.validator.validate(payload);
    await this.postRepository.isPostExist(payload.postId);
    if (payload.replyTo) {
      await this.commentRepository.isCommentExist(payload.replyTo);
    }
    const comment = new Comment(payload);

    const commentId = await this.commentRepository.addComment(comment);

    // send notif
    this.socketClient.sendNotif({
      userId: payload.userId,
      postId: payload.postId,
      type: payload.replyTo ? 'reply-comment' : 'comment',
      comment: comment.content,
      commentId: payload.replyTo ? payload.replyTo : commentId,
    });

    return commentId;
  }
}

export default AddComment;
