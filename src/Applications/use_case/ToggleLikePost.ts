import { IPostRepository } from '../../Domains/posts/PostRepository';
import { ISocketClient } from '../socketClient/SocketClient';

interface Dependency {
  postRepository: IPostRepository;
  socketClient: ISocketClient;
}

interface Payload {
  userId: string;
  postId: string;
}

type likeUnlike = 'liked' | 'unliked';

class ToggleLikePost {
  private postRepository: IPostRepository;
  private socketClient: ISocketClient;

  constructor(dependency: Dependency) {
    this.postRepository = dependency.postRepository;
    this.socketClient = dependency.socketClient;
  }

  async execute(payload: Payload): Promise<likeUnlike> {
    await this.postRepository.isPostExist(payload.postId);
    const isLiked = await this.postRepository.isPostLiked(payload);

    if (isLiked) {
      await this.postRepository.unlikePost(payload);
      return 'unliked';
    }

    await this.postRepository.likePost(payload);

    // send notif
    this.socketClient.sendNotif({
      userId: payload.userId,
      postId: payload.postId,
      type: 'like-post',
    });

    return 'liked';
  }
}

export default ToggleLikePost;
