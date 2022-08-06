import { ICommentRepository } from '../../Domains/comments/CommentRepository';
import CommentGet, {
  ICommentGet,
} from '../../Domains/comments/entities/CommentGet';
import { IPostRepository } from '../../Domains/posts/PostRepository';

interface Dependency {
  commentRepository: ICommentRepository;
  postRepository: IPostRepository;
}

class GetPostComments {
  private commentRepository: ICommentRepository;
  private postRepository: IPostRepository;

  constructor(dependency: Dependency) {
    this.commentRepository = dependency.commentRepository;
    this.postRepository = dependency.postRepository;
  }

  async execute(postId: string, userId: string): Promise<ICommentGet[]> {
    await this.postRepository.isPostExist(postId);

    const comments = await this.commentRepository.getCommentsByPostId(
      postId,
      userId
    );

    const commentsWithReplies = await Promise.all(
      comments.map(async (c) => {
        const replies = await this.commentRepository.getReplies(c.id, userId);
        return { ...c, replies };
      })
    );

    return commentsWithReplies.map((c) => new CommentGet(c));
  }
}

export default GetPostComments;
