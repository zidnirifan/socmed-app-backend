import MockPostRepository from '../../../Domains/posts/test/PostRepositoryTestHelper';
import UserProfile from '../../../Domains/users/entities/UserProfile';
import MockUserRepository from '../../../Domains/users/test/UserRepositoryTestHelper';
import GetUserProfile from '../GetUserProfile';

describe('GetUserProfile use case', () => {
  it('should orchestrating the add user action correctly', async () => {
    const id = 'user-123';
    const userId = 'user-333';
    const user = {
      id,
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      profilePhoto: 'img.jpg',
      bio: 'i am an engineer',
      followersCount: 1,
      followingCount: 1,
      isFollowed: true,
    };
    const posts = [
      {
        id: 'post-123',
        media: 'img.jpg',
      },
    ];
    const expectedUserProfile = {
      ...user,
      posts,
      postsCount: 1,
    };

    const mockUserRepository = new MockUserRepository();
    const mockPostRepository = new MockPostRepository();

    mockUserRepository.isUserExistById = jest.fn(() => Promise.resolve());
    mockUserRepository.getUserProfileById = jest.fn(() =>
      Promise.resolve(user)
    );
    mockPostRepository.getPostMediaByUserId = jest.fn(() =>
      Promise.resolve(posts)
    );

    const getUserProfileUseCase = new GetUserProfile({
      userRepository: mockUserRepository,
      postRepository: mockPostRepository,
    });

    const userProfile = await getUserProfileUseCase.execute(id, userId);

    expect(userProfile).toBeInstanceOf(UserProfile);
    expect(userProfile).toEqual(expectedUserProfile);
    expect(mockUserRepository.isUserExistById).toBeCalledWith(id);
    expect(mockUserRepository.getUserProfileById).toBeCalledWith(id, userId);
    expect(mockPostRepository.getPostMediaByUserId).toBeCalledWith(id);
  });
});
