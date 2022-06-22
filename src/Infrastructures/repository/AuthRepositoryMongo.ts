import AuthRepository from '../../Domains/auth/AuthRepository';
import { IAuthModel } from '../model/Auth';

class AuthRepositoryMongo extends AuthRepository {
  private Model: IAuthModel;

  constructor(authModel: IAuthModel) {
    super();
    this.Model = authModel;
  }

  async addRefreshToken(token: string): Promise<void> {
    const auth = new this.Model({ refreshToken: token });
    await auth.save();
  }
}

export default AuthRepositoryMongo;
