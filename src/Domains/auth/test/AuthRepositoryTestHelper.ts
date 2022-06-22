import AuthRepository from '../AuthRepository';

class MockAuthRepository extends AuthRepository {
  addRefreshToken(token: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export default MockAuthRepository;
