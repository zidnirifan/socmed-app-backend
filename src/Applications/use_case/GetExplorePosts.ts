import PostGet, { IPostGet } from '../../Domains/posts/entities/PostGet';
import { IPostRepository } from '../../Domains/posts/PostRepository';

interface Dependency {
  postRepository: IPostRepository;
}

class GetExplorePosts {
  postRepository: IPostRepository;

  constructor(dependency: Dependency) {
    this.postRepository = dependency.postRepository;
  }

  async execute(userId: string, exceptPosts: string[]): Promise<IPostGet[]> {
    // exceptPosts for posts not duplicate
    const posts = await this.postRepository.getExplorePosts(
      userId,
      exceptPosts
    );

    return posts.map((p) => new PostGet(p));
  }
}

export default GetExplorePosts;
