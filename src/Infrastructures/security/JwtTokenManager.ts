import jwt from 'jsonwebtoken';
import TokenManager, {
  PayloadToken,
} from '../../Applications/security/TokenManager';
import config from '../../Commons/config';
import AuthenticationError from '../../Commons/exceptions/AuthenticationError';
import InvariantError from '../../Commons/exceptions/InvariantError';

class JwtTokenManager extends TokenManager {
  private accessTokenKey: string;
  private refreshTokeKey: string;
  private tokenExpiration: number;

  constructor() {
    super();
    this.accessTokenKey = config.accessTokenKey as string;
    this.refreshTokeKey = config.refreshTokenKey as string;
    this.tokenExpiration = config.tokenExpiration;
  }

  createAccessToken(payload: PayloadToken): string {
    return jwt.sign(payload, this.accessTokenKey, {
      expiresIn: this.tokenExpiration,
    });
  }

  createRefreshToken(payload: PayloadToken): string {
    return jwt.sign(payload, this.refreshTokeKey);
  }

  verifyRefreshToken(refreshToken: string): void {
    try {
      jwt.verify(refreshToken, this.refreshTokeKey);
    } catch (error) {
      throw new InvariantError('invalid refresh token');
    }
  }

  verifyAccessToken(accessToken: string): void {
    try {
      jwt.verify(accessToken, this.accessTokenKey);
    } catch (error) {
      if (error instanceof Error && error.message === 'jwt expired') {
        throw new AuthenticationError('token expired');
      }
      throw new AuthenticationError('invalid access token');
    }
  }

  decodeToken(token: string): PayloadToken {
    const decoded = jwt.decode(token);
    return decoded as PayloadToken;
  }
}

export default JwtTokenManager;
