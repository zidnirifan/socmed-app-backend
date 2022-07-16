import jwt from 'jsonwebtoken';
import config from '../../../Commons/config';
import AuthenticationError from '../../../Commons/exceptions/AuthenticationError';
import InvariantError from '../../../Commons/exceptions/InvariantError';
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

  describe('verifyRefreshToken function', () => {
    it('should throw InvariantError when refresh token invalid', () => {
      const jwtTokenManager = new JwtTokenManager();

      const refreshToken = 'invalid_refresh_token';

      expect(() =>
        jwtTokenManager.verifyRefreshToken(refreshToken)
      ).toThrowError(InvariantError);
    });

    it('should not throw InvariantError when refresh token is valid', () => {
      const payload = {
        id: 'user-123',
        username: 'jhondoe',
      };

      const jwtTokenManager = new JwtTokenManager();

      const refreshToken = jwtTokenManager.createRefreshToken(payload);

      expect(() =>
        jwtTokenManager.verifyRefreshToken(refreshToken)
      ).not.toThrowError(InvariantError);
    });
  });

  describe('verifyAccessToken function', () => {
    it('should throw AuthenticationError when access token invalid', () => {
      const jwtTokenManager = new JwtTokenManager();

      const accessToken = 'invalid_access_token';

      expect(() => jwtTokenManager.verifyAccessToken(accessToken)).toThrowError(
        AuthenticationError
      );
    });

    it('should throw AuthenticationError when access token expired', async () => {
      const payload = {
        id: 'user-123',
        username: 'jhondoe',
      };

      const jwtTokenManager = new JwtTokenManager();

      const accessToken = jwt.sign(payload, config.accessTokenKey as string, {
        expiresIn: 0,
      });

      expect(() => jwtTokenManager.verifyAccessToken(accessToken)).toThrowError(
        AuthenticationError
      );
    });

    it('should not throw AuthenticationError when access token is valid', () => {
      const payload = {
        id: 'user-123',
        username: 'jhondoe',
      };

      const jwtTokenManager = new JwtTokenManager();

      const accessToken = jwtTokenManager.createAccessToken(payload);

      expect(() =>
        jwtTokenManager.verifyAccessToken(accessToken)
      ).not.toThrowError(AuthenticationError);
    });
  });

  describe('decodeToken function', () => {
    it('should return decoded object correctly', () => {
      const payload = {
        id: 'user-123',
        username: 'jhondoe',
      };

      const jwtTokenManager = new JwtTokenManager();

      const refreshToken = jwtTokenManager.createRefreshToken(payload);

      const decoded = jwtTokenManager.decodeToken(refreshToken);

      expect(decoded.id).toEqual(payload.id);
      expect(decoded.username).toEqual(payload.username);
    });
  });
});
