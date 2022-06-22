import JwtTokenManager from '../JwtTokenManager';

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', () => {
      const payload = {
        id: 'user-123',
        username: 'jhondoe',
      };

      const jwtTokenManager = new JwtTokenManager();

      const accessToken = jwtTokenManager.createAccessToken(payload);

      expect(typeof accessToken).toEqual('string');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken corecctly', () => {
      const payload = {
        id: 'user-123',
        username: 'jhondoe',
      };

      const jwtTokenManager = new JwtTokenManager();

      const refreshToken = jwtTokenManager.createRefreshToken(payload);

      expect(typeof refreshToken).toEqual('string');
    });
  });
});
