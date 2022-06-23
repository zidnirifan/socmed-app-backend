import jwt from 'jsonwebtoken';
import TokenManager, {
  PayloadToken,
} from '../../Applications/security/TokenManager';
import config from '../../Commons/config';

class JwtTokenManager extends TokenManager {
  private accessTokenKey: string;
  private refreshTokeKey: string;
  private tokenExpiration: number;

  constructor() {
    super();
    this.accessTokenKey = config.accessTokenKey as string;
    this.refreshTokeKey = config.refreshTokenKey as string;
    this.tokenExpiration = config.tokenExpiration as unknown as number;
  }

  createAccessToken(payload: PayloadToken): string {
    return jwt.sign(payload, this.accessTokenKey, {
      expiresIn: this.tokenExpiration,
    });
  }

  createRefreshToken(payload: PayloadToken): string {
    return jwt.sign(payload, this.refreshTokeKey);
  }
}

export default JwtTokenManager;
