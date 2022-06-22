import { IUserRepository } from '../../Domains/users/UserRepository';
import { ITokenManager } from '../security/TokenManager';
import { IAuthRepository } from '../../Domains/auth/AuthRepository';
import { IPasswordHash } from '../security/PasswordHash';
import UserLogin, { IUserLogin } from '../../Domains/users/entities/UserLogin';
import { IValidator } from '../validator/Validator';
import Auth, { IAuth } from '../../Domains/auth/entities/Auth';

interface IDependency {
  validator: IValidator<IUserLogin>;
  userRepository: IUserRepository;
  tokenManager: ITokenManager;
  authRepository: IAuthRepository;
  passwordHash: IPasswordHash;
}

class LoginUser {
  private validator: IValidator<IUserLogin>;
  private userRepository: IUserRepository;
  private tokenManager: ITokenManager;
  private authRepository: IAuthRepository;
  private passwordHash: IPasswordHash;

  constructor(dependency: IDependency) {
    this.validator = dependency.validator;
    this.userRepository = dependency.userRepository;
    this.tokenManager = dependency.tokenManager;
    this.authRepository = dependency.authRepository;
    this.passwordHash = dependency.passwordHash;
  }

  async execute(payload: IUserLogin): Promise<IAuth> {
    this.validator.validate(payload);
    const { username, password } = new UserLogin(payload);

    await this.userRepository.isUsernameExist(username);

    const encryptedPassword = await this.userRepository.getPasswordByUsername(
      username
    );

    await this.passwordHash.comparePassword(password, encryptedPassword);

    const id = await this.userRepository.getIdByUsername(username);

    const accessToken = this.tokenManager.createAccessToken({
      id,
      username,
    });
    const refreshToken = this.tokenManager.createRefreshToken({
      id,
      username,
    });

    await this.authRepository.addRefreshToken(refreshToken);

    return new Auth({ accessToken, refreshToken });
  }
}

export default LoginUser;
