import { IAuthRepository } from '../../Domains/auth/AuthRepository';
import { IValidator } from '../validator/Validator';

export interface IRefreshToken {
  refreshToken: string;
}

interface Dependency {
  validator: IValidator<IRefreshToken>;
  authRepository: IAuthRepository;
}

class LogoutUser {
  private validator: IValidator<IRefreshToken>;
  private authRepository: IAuthRepository;

  constructor(dependency: Dependency) {
    this.validator = dependency.validator;
    this.authRepository = dependency.authRepository;
  }

  async execute(payload: IRefreshToken): Promise<void> {
    this.validator.validate(payload);
    await this.authRepository.isTokenExist(payload.refreshToken);
    await this.authRepository.deleteToken(payload.refreshToken);
  }
}

export default LogoutUser;
