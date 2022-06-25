export interface IAuthRepository {
  addRefreshToken(token: string): Promise<void>;
  isTokenExist(token: string): Promise<void>;
}

abstract class AuthRepository implements IAuthRepository {
  abstract addRefreshToken(refreshToken: string): Promise<void>;
  abstract isTokenExist(refreshToken: string): Promise<void>;
}

export default AuthRepository;
