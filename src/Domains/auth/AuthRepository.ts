export interface IAuthRepository {
  addRefreshToken(token: string): Promise<void>;
}

abstract class AuthRepository implements IAuthRepository {
  abstract addRefreshToken(token: string): Promise<void>;
}

export default AuthRepository;
