import PostGet, { IPostGet } from '../../Domains/posts/entities/PostGet';
import { IPostRepository } from '../../Domains/posts/PostRepository';

interface Dependency {
  postRepository: IPostRepository;
}

class GetPost {
  postRepository: IPostRepository;

  constructor(dependency: Dependency) {
    this.postRepository = dependency.postRepository;
  }

  async execute(id: string, userId: string): Promise<IPostGet> {
    await this.postRepository.isPostExist(id);

    const post = await this.postRepository.getPostById(id, userId);
    return new PostGet(post);
  }
}

export default GetPost;
