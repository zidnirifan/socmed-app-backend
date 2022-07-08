import { IPostRepository } from '../../Domains/posts/PostRepository';

interface Dependency {
  postRepository: IPostRepository;
}

interface Payload {
  userId: string;
  postId: string;
}

class ToggleLikePost {
  private postRepository: IPostRepository;

  constructor(dependency: Dependency) {
    this.postRepository = dependency.postRepository;
  }

  async execute(payload: Payload) {
    await this.postRepository.isPostExist(payload.postId);
    const isLiked = await this.postRepository.isPostLiked(payload);

    if (isLiked) {
      await this.postRepository.unlikePost(payload);
      return 'unliked';
    }

    await this.postRepository.likePost(payload);
    return 'liked';
  }
}

export default ToggleLikePost;
