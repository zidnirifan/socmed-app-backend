import LoginUser from '../LoginUser';
import MockUserRepository from '../../../Domains/users/test/UserRepositoryTestHelper';
import MockValidator from '../../validator/test/ValidatorTestHelper';
import MockTokenManager from '../../security/test/TokenManagerTestHelper';
import MockAuthRepository from '../../../Domains/auth/test/AuthRepositoryTestHelper';
import MockPasswordHash from '../../security/test/PasswordHashTestHelper';

describe('LoginUser use case', () => {
  it('should orchestrating the login user action correctly', async () => {
    // Arrange
    const payload = {
      username: 'jhondoe',
      password: 'password',
    };

    const payloadToken = {
      id: 'user-123',
      username: payload.username,
    };

    const expectedAuth = {
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    };

    const mockValidator = new MockValidator();
    const mockUserRepository = new MockUserRepository();
    const mockTokenManager = new MockTokenManager();
    const mockAuthRepository = new MockAuthRepository();
    const mockPasswordHash = new MockPasswordHash();

    // Mocking
    mockValidator.validate = jest.fn(() => {});
    mockUserRepository.isUsernameExist = jest.fn(() => Promise.resolve());
    mockUserRepository.getPasswordByUsername = jest.fn(() =>
      Promise.resolve('encrypted_password')
    );
    mockUserRepository.getIdByUsername = jest.fn(() =>
      Promise.resolve(payloadToken.id)
    );
    mockTokenManager.createAccessToken = jest.fn(
      () => expectedAuth.accessToken
    );
    mockTokenManager.createRefreshToken = jest.fn(
      () => expectedAuth.refreshToken
    );
    mockAuthRepository.addRefreshToken = jest.fn(() => Promise.resolve());
    mockPasswordHash.comparePassword = jest.fn(() => Promise.resolve());

    // Create use case instance
    const loginUser = new LoginUser({
      validator: mockValidator,
      userRepository: mockUserRepository,
      tokenManager: mockTokenManager,
      authRepository: mockAuthRepository,
      passwordHash: mockPasswordHash,
    });

    // Action
    const auth = await loginUser.execute(payload);

    // Assert
    expect(auth).toEqual(expectedAuth);
    expect(mockValidator.validate).toBeCalledWith(payload);
    expect(mockUserRepository.isUsernameExist).toBeCalledWith(payload.username);
    expect(mockUserRepository.getPasswordByUsername).toBeCalledWith(
      payload.username
    );
    expect(mockUserRepository.getIdByUsername).toBeCalledWith(payload.username);
    expect(mockTokenManager.createAccessToken).toBeCalledWith(payloadToken);
    expect(mockTokenManager.createRefreshToken).toBeCalledWith(payloadToken);
    expect(mockAuthRepository.addRefreshToken).toBeCalledWith(
      expectedAuth.refreshToken
    );
    expect(mockPasswordHash.comparePassword).toBeCalledWith(
      payload.password,
      'encrypted_password'
    );
  });
});
