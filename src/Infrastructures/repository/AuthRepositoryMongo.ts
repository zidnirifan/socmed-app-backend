import NotFoundError from '../../Commons/exceptions/NotFoundError';
import AuthRepository from '../../Domains/auth/AuthRepository';
import AuthModel from '../model/Auth';

class AuthRepositoryMongo extends AuthRepository {
  private Model;

  constructor() {
    super();
    this.Model = AuthModel;
  }

  async addRefreshToken(refreshToken: string): Promise<void> {
    const auth = new this.Model({ refreshToken });
    await auth.save();
  }

  async isTokenExist(refreshToken: string): Promise<void> {
    const token = await this.Model.findOne({ refreshToken });
    if (!token) {
      throw new NotFoundError('refresh token not found');
    }
  }

  async deleteToken(refreshToken: string): Promise<void> {
    await this.Model.deleteOne({ refreshToken });
  }
}

export default AuthRepositoryMongo;
