/* istanbul ignore file */

import TokenManager, { PayloadToken } from '../TokenManager';

class MockTokenManager extends TokenManager {
  createAccessToken(payload: PayloadToken): string {
    throw new Error('Method not implemented.');
  }

  createRefreshToken(payload: PayloadToken): string {
    throw new Error('Method not implemented.');
  }

  verifyRefreshToken(refreshToken: string): void {
    throw new Error('Method not implemented.');
  }

  verifyAccessToken(accessToken: string): void {
    throw new Error('Method not implemented.');
  }

  decodeToken(token: string): PayloadToken {
    throw new Error('Method not implemented.');
  }
}

export default MockTokenManager;
