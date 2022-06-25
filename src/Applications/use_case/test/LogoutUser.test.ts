import MockAuthRepository from '../../../Domains/auth/test/AuthRepositoryTestHelper';
import MockValidator from '../../validator/test/ValidatorTestHelper';
import LogoutUser from '../LogoutUser';

describe('LogoutUser use case', () => {
  it('should orchestrating the refresh auth action correctly', async () => {
    // Arrange
    const payload = {
      refreshToken: 'refresh_token',
    };

    const mockValidator = new MockValidator();
    const mockAuthRepository = new MockAuthRepository();

    // Mocking
    mockValidator.validate = jest.fn(() => {});
    mockAuthRepository.isTokenExist = jest.fn(() => Promise.resolve());
    mockAuthRepository.deleteToken = jest.fn(() => Promise.resolve());

    // Create use case instance
    const logoutUser = new LogoutUser({
      validator: mockValidator,
      authRepository: mockAuthRepository,
    });

    // Action
    await logoutUser.execute(payload);

    // Assert
    expect(mockValidator.validate).toBeCalledWith(payload);
    expect(mockAuthRepository.isTokenExist).toBeCalledWith(
      payload.refreshToken
    );
    expect(mockAuthRepository.deleteToken).toBeCalledWith(payload.refreshToken);
  });
});
