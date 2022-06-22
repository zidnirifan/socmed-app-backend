import jwt from 'jsonwebtoken';
import TokenManager, {
  PayloadToken,
} from '../../Applications/security/TokenManager';
import config from '../../Commons/config';

class JwtTokenManager extends TokenManager {
  private accessTokenKey = config.accessTokenKey;
  private refreshTokeKey = config.refreshTokenKey;
  private tokenExpiration = config.tokenExpiration;

  createAccessToken(payload: PayloadToken): string {
    return jwt.sign(payload, this.accessTokenKey as string, {
      expiresIn: this.tokenExpiration,
    });
  }

  createRefreshToken(payload: PayloadToken): string {
    return jwt.sign(payload, this.refreshTokeKey as string);
  }
}

export default JwtTokenManager;
