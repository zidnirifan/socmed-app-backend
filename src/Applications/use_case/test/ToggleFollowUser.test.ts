import MockUserRepository from '../../../Domains/users/test/UserRepositoryTestHelper';
import MockSocketClient from '../../socketClient/test/SocketClientTestHelper';
import ToggleFollowUser from '../ToggleFollowUser';

describe('ToggleFollowUser use case', () => {
  it('should orchestrating follow user action correctly if user not followed', async () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      userFollow: 'user-321',
    };

    const mockUserRepository = new MockUserRepository();
    const mockSocketClient = new MockSocketClient();

    // Mocking
    mockUserRepository.isUserExistById = jest.fn(() => Promise.resolve());
    mockUserRepository.isUserFollowed = jest.fn(() => Promise.resolve(false));
    mockUserRepository.followUser = jest.fn(() => Promise.resolve());
    mockUserRepository.unfollowUser = jest.fn(() => Promise.resolve());
    mockSocketClient.sendNotif = jest.fn(() => Promise.resolve());

    // Create use case instancea
    const toggleFollow = new ToggleFollowUser({
      userRepository: mockUserRepository,
      socketClient: mockSocketClient,
    });

    // Action
    const result = await toggleFollow.execute(payload);

    // Assert
    expect(result).toEqual('followed');
    expect(mockUserRepository.isUserExistById).toBeCalledWith(
      payload.userFollow
    );
    expect(mockUserRepository.isUserFollowed).toBeCalledWith(payload);
    expect(mockUserRepository.followUser).toBeCalledWith(payload);
    expect(mockUserRepository.unfollowUser).not.toBeCalled();
  });

  it('should orchestrating unfollow user action correctly if user already followed', async () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      userFollow: 'user-321',
    };

    const mockUserRepository = new MockUserRepository();
    const mockSocketClient = new MockSocketClient();

    // Mocking
    mockUserRepository.isUserExistById = jest.fn(() => Promise.resolve());
    mockUserRepository.isUserFollowed = jest.fn(() => Promise.resolve(true));
    mockUserRepository.unfollowUser = jest.fn(() => Promise.resolve());
    mockUserRepository.followUser = jest.fn(() => Promise.resolve());
    mockSocketClient.sendNotif = jest.fn(() => Promise.resolve());

    // Create use case instancea
    const toggleFollow = new ToggleFollowUser({
      userRepository: mockUserRepository,
      socketClient: mockSocketClient,
    });

    // Action
    const result = await toggleFollow.execute(payload);

    // Assert
    expect(result).toEqual('unfollowed');
    expect(mockUserRepository.isUserExistById).toBeCalledWith(
      payload.userFollow
    );
    expect(mockUserRepository.isUserFollowed).toBeCalledWith(payload);
    expect(mockUserRepository.unfollowUser).toBeCalledWith(payload);
    expect(mockUserRepository.followUser).not.toBeCalled();
  });
});
