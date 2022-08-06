import { ICommentRepository } from '../../Domains/comments/CommentRepository';
import Comment, { IComment } from '../../Domains/comments/entities/Comment';
import { IPostRepository } from '../../Domains/posts/PostRepository';
import { IValidator } from '../validator/Validator';

interface Dependency {
  validator: IValidator<IComment>;
  postRepository: IPostRepository;
  commentRepository: ICommentRepository;
}

class AddComment {
  private validator: IValidator<IComment>;
  private postRepository: IPostRepository;
  private commentRepository: ICommentRepository;

  constructor(dependency: Dependency) {
    this.validator = dependency.validator;
    this.postRepository = dependency.postRepository;
    this.commentRepository = dependency.commentRepository;
  }

  async execute(payload: IComment): Promise<string> {
    this.validator.validate(payload);
    await this.postRepository.isPostExist(payload.postId);
    if (payload.replyTo) {
      await this.commentRepository.isCommentExist(payload.replyTo);
    }
    const comment = new Comment(payload);
    return this.commentRepository.addComment(comment);
  }
}

export default AddComment;
