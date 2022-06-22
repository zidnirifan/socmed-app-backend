import TokenManager, { PayloadToken } from '../TokenManager';

class MockTokenManager extends TokenManager {
  createAccessToken(payload: PayloadToken): string {
    throw new Error('Method not implemented.');
  }

  createRefreshToken(payload: PayloadToken): string {
    throw new Error('Method not implemented.');
  }
}

export default MockTokenManager;
