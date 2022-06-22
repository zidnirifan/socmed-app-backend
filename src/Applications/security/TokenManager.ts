export interface PayloadToken {
  id: string;
  username: string;
}

abstract class TokenManager {
  abstract createAccessToken(payload: PayloadToken): string;

  abstract createRefreshToken(payload: PayloadToken): string;
}

export default TokenManager;
