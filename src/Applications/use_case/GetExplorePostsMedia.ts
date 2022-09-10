import { IPostRepository } from '../../Domains/posts/PostRepository';

export interface PostMedia {
  id: string;
  media: string;
}

interface Dependency {
  postRepository: IPostRepository;
}

class GetExplorePostsMedia {
  postRepository: IPostRepository;

  constructor(dependency: Dependency) {
    this.postRepository = dependency.postRepository;
  }

  async execute(exceptPosts: string[]): Promise<PostMedia[]> {
    return this.postRepository.getExplorePostsMedia(exceptPosts);
  }
}

export default GetExplorePostsMedia;
