/* istanbul ignore file */

import AuthRepository from '../AuthRepository';

class MockAuthRepository extends AuthRepository {
  isTokenExist(refreshToken: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  addRefreshToken(refreshToken: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteToken(refreshToken: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default MockAuthRepository;
