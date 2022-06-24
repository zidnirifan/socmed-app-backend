import { IAuthRepository } from '../../Domains/auth/AuthRepository';
import { ITokenManager } from '../security/TokenManager';
import { IValidator } from '../validator/Validator';

export interface IRefreshToken {
  refreshToken: string;
}

interface IDependency {
  validator: IValidator<IRefreshToken>;
  authRepository: IAuthRepository;
  tokenManager: ITokenManager;
}

class RefreshAuth {
  private validator: IValidator<IRefreshToken>;
  private authRepository: IAuthRepository;
  private tokenManager: ITokenManager;

  constructor(dependency: IDependency) {
    this.validator = dependency.validator;
    this.authRepository = dependency.authRepository;
    this.tokenManager = dependency.tokenManager;
  }

  async execute(payload: IRefreshToken): Promise<string> {
    this.validator.validate(payload);

    const { refreshToken } = payload;

    await this.authRepository.isTokenExist(refreshToken);
    this.tokenManager.verifyRefreshToken(refreshToken);

    const { id, username } = this.tokenManager.decodeToken(refreshToken);

    return this.tokenManager.createAccessToken({ id, username });
  }
}

export default RefreshAuth;
