import { IPostRepository } from '../../Domains/posts/PostRepository';
import UserProfile, {
  IUserProfile,
} from '../../Domains/users/entities/UserProfile';
import { IUserRepository } from '../../Domains/users/UserRepository';

interface Dependency {
  userRepository: IUserRepository;
  postRepository: IPostRepository;
}

class GetUserProfile {
  userRepository: IUserRepository;
  postRepository: IPostRepository;

  constructor(dependency: Dependency) {
    this.userRepository = dependency.userRepository;
    this.postRepository = dependency.postRepository;
  }

  async execute(id: string, userId: string): Promise<IUserProfile> {
    await this.userRepository.isUserExistById(id);

    const user = await this.userRepository.getUserProfileById(id, userId);
    const postMedia = await this.postRepository.getPostMediaByUserId(id);

    return new UserProfile({
      ...user,
      posts: postMedia,
      postsCount: postMedia.length,
    });
  }
}

export default GetUserProfile;
