export interface PayloadToken {
  id: string;
  username: string;
}

export interface ITokenManager {
  createAccessToken(payload: PayloadToken): string;
  createRefreshToken(payload: PayloadToken): string;
  verifyRefreshToken(refreshToken: string): void;
  verifyAccessToken(accessToken: string): void;
  decodeToken(token: string): PayloadToken;
}

abstract class TokenManager implements ITokenManager {
  abstract createAccessToken(payload: PayloadToken): string;

  abstract createRefreshToken(payload: PayloadToken): string;

  abstract verifyRefreshToken(refreshToken: string): void;

  abstract verifyAccessToken(accessToken: string): void;

  abstract decodeToken(token: string): PayloadToken;
}

export default TokenManager;
