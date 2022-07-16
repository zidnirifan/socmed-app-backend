import PostGet, { IPostGet } from '../../Domains/posts/entities/PostGet';
import { IPostRepository } from '../../Domains/posts/PostRepository';

interface Dependency {
  postRepository: IPostRepository;
}

class GetHomePost {
  postRepository: IPostRepository;

  constructor(dependency: Dependency) {
    this.postRepository = dependency.postRepository;
  }

  async execute(userId: string): Promise<IPostGet[]> {
    const posts = await this.postRepository.getHomePosts(userId);
    return posts.map((p) => new PostGet(p));
  }
}

export default GetHomePost;
