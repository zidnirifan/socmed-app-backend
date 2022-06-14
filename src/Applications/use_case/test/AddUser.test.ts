import User from '../../../Domains/users/entities/User';
import MockUserRepository from '../../../Domains/users/test/UserRepositoryTestHelper';
import MockPasswordHash from '../../security/test/PasswordHashTestHelper';
import AddUser from '../AddUser';

describe('AddUser use case', () => {
  it('should orchestrating the add user action correctly', async () => {
    const useCasePayload = {
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      password: 'password',
    };
    const id = 'user-123';

    const mockUserRepository = new MockUserRepository();
    const mockPasswordHash = new MockPasswordHash();

    mockUserRepository.verifyAvailableUsername = jest.fn(() =>
      Promise.resolve()
    );
    mockUserRepository.addUser = jest.fn(() => Promise.resolve(id));
    mockPasswordHash.hash = jest.fn(() =>
      Promise.resolve('encrypted_password')
    );

    const addUserUseCase = new AddUser({
      userRepository: mockUserRepository,
      passwordHash: mockPasswordHash,
    });

    const userId = await addUserUseCase.execute(useCasePayload);

    expect(userId).toEqual(id);
    expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(
      useCasePayload.username
    );
    expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
    expect(mockUserRepository.addUser).toBeCalledWith(
      new User({
        ...useCasePayload,
        password: 'encrypted_password',
      })
    );
  });
});
