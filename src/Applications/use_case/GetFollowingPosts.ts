import PostGet, { IPostGet } from '../../Domains/posts/entities/PostGet';
import { IPostRepository } from '../../Domains/posts/PostRepository';

interface Dependency {
  postRepository: IPostRepository;
}

class GetFollowingPosts {
  postRepository: IPostRepository;

  constructor(dependency: Dependency) {
    this.postRepository = dependency.postRepository;
  }

  async execute(userId: string): Promise<IPostGet[]> {
    const posts = await this.postRepository.getFollowingPosts(userId);
    return posts.map((p) => new PostGet(p));
  }
}

export default GetFollowingPosts;
