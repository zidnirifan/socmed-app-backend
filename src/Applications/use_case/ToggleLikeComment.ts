import { ICommentRepository } from '../../Domains/comments/CommentRepository';

interface Dependency {
  commentRepository: ICommentRepository;
}

interface Payload {
  userId: string;
  commentId: string;
}

type likeUnlike = 'liked' | 'unliked';

class ToggleLikeComment {
  private commentRepository: ICommentRepository;

  constructor(dependency: Dependency) {
    this.commentRepository = dependency.commentRepository;
  }

  async execute(payload: Payload): Promise<likeUnlike> {
    await this.commentRepository.isCommentExist(payload.commentId);
    const isLiked = await this.commentRepository.isCommentLiked(payload);

    if (isLiked) {
      await this.commentRepository.unlikeComment(payload);
      return 'unliked';
    }

    await this.commentRepository.likeComment(payload);
    return 'liked';
  }
}

export default ToggleLikeComment;
