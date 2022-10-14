import SearchUsers from '../SearchUsers';
import MockUserRepository from '../../../Domains/users/test/UserRepositoryTestHelper';
import UserGet from '../../../Domains/users/entities/UserGet';

describe('SearchUsers use case', () => {
  it('should orchestrating search users action correctly', async () => {
    // Arrange
    const id = 'user-123';
    const ownUserId = 'user-33';

    const userFromRepo = {
      id,
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      profilePhoto: 'img.jpg',
      isFollowed: false,
    };

    const text = 'jhon';

    const mockUserRepository = new MockUserRepository();

    // Mocking
    mockUserRepository.searchUsers = jest.fn(() =>
      Promise.resolve([userFromRepo])
    );

    // Create use case instancea
    const searchUsers = new SearchUsers({
      userRepository: mockUserRepository,
    });

    // Action
    const users = await searchUsers.execute(text, ownUserId);

    // Assert
    expect(users[0]).toBeInstanceOf(UserGet);
    expect(users).toHaveLength(1);
    expect(mockUserRepository.searchUsers).toBeCalledWith(text, ownUserId);
  });
});
