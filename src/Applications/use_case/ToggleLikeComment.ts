import { ICommentRepository } from '../../Domains/comments/CommentRepository';
import { ISocketClient } from '../socketClient/SocketClient';

interface Dependency {
  commentRepository: ICommentRepository;
  socketClient: ISocketClient;
}

interface Payload {
  userId: string;
  commentId: string;
}

type likeUnlike = 'liked' | 'unliked';

class ToggleLikeComment {
  private commentRepository: ICommentRepository;
  private socketClient: ISocketClient;

  constructor(dependency: Dependency) {
    this.commentRepository = dependency.commentRepository;
    this.socketClient = dependency.socketClient;
  }

  async execute(payload: Payload): Promise<likeUnlike> {
    await this.commentRepository.isCommentExist(payload.commentId);
    const isLiked = await this.commentRepository.isCommentLiked(payload);

    if (isLiked) {
      await this.commentRepository.unlikeComment(payload);
      return 'unliked';
    }

    await this.commentRepository.likeComment(payload);

    // send notif
    this.socketClient.sendNotif({
      userId: payload.userId,
      commentId: payload.commentId,
      type: 'like-comment',
    });

    return 'liked';
  }
}

export default ToggleLikeComment;
