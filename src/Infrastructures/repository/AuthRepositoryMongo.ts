import AuthRepository from '../../Domains/auth/AuthRepository';
import AuthModel from '../model/Auth';

class AuthRepositoryMongo extends AuthRepository {
  private Model;

  constructor() {
    super();
    this.Model = AuthModel;
  }

  async addRefreshToken(token: string): Promise<void> {
    const auth = new this.Model({ refreshToken: token });
    await auth.save();
  }
}

export default AuthRepositoryMongo;
