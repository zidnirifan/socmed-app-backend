export interface IAuthRepository {
  addRefreshToken(refreshToken: string): Promise<void>;
  isTokenExist(refreshToken: string): Promise<void>;
  deleteToken(refreshToken: string): Promise<void>;
}

abstract class AuthRepository implements IAuthRepository {
  abstract addRefreshToken(refreshToken: string): Promise<void>;
  abstract isTokenExist(refreshToken: string): Promise<void>;
  abstract deleteToken(refreshToken: string): Promise<void>;
}

export default AuthRepository;
