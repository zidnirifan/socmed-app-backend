import MockAuthRepository from '../../../Domains/auth/test/AuthRepositoryTestHelper';
import MockTokenManager from '../../security/test/TokenManagerTestHelper';
import MockValidator from '../../validator/test/ValidatorTestHelper';
import RefreshAuth from '../RefreshAuth';

describe('RefreshAuth use case', () => {
  it('should orchestrating the refresh auth action correctly', async () => {
    // Arrange
    const payload = {
      refreshToken: 'refresh_token',
    };

    const expectedAccessToken = 'access_token';
    const expectedDecoded = { id: 'user-123', username: 'jhondoe' };

    const mockValidator = new MockValidator();
    const mockAuthRepository = new MockAuthRepository();
    const mockTokenManager = new MockTokenManager();

    // Mocking
    mockValidator.validate = jest.fn(() => {});
    mockAuthRepository.isTokenExist = jest.fn(() => Promise.resolve());
    mockTokenManager.verifyRefreshToken = jest.fn(() => {});
    mockTokenManager.decodeToken = jest.fn(() => expectedDecoded);
    mockTokenManager.createAccessToken = jest.fn(() => expectedAccessToken);

    // Create use case instance
    const refreshAuth = new RefreshAuth({
      validator: mockValidator,
      authRepository: mockAuthRepository,
      tokenManager: mockTokenManager,
    });

    // Action
    const accessToken = await refreshAuth.execute(payload);

    // Assert
    expect(accessToken).toEqual(expectedAccessToken);
    expect(mockValidator.validate).toBeCalledWith(payload);
    expect(mockAuthRepository.isTokenExist).toBeCalledWith(
      payload.refreshToken
    );
    expect(mockTokenManager.verifyRefreshToken).toBeCalledWith(
      payload.refreshToken
    );
    expect(mockTokenManager.decodeToken).toBeCalledWith(payload.refreshToken);
    expect(mockTokenManager.createAccessToken).toBeCalledWith(expectedDecoded);
  });
});
