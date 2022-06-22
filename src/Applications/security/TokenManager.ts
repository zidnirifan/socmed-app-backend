export interface PayloadToken {
  id: string;
  username: string;
}

export interface ITokenManager {
  createAccessToken(payload: PayloadToken): string;
  createRefreshToken(payload: PayloadToken): string;
}

abstract class TokenManager implements ITokenManager {
  abstract createAccessToken(payload: PayloadToken): string;

  abstract createRefreshToken(payload: PayloadToken): string;
}

export default TokenManager;
