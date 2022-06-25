import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import db from '../../database/mongo/db';
import AuthModel from '../../model/Auth';
import AuthRepositoryMongo from '../AuthRepositoryMongo';

describe('AuthRepositoryMongo', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await AuthModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('addRefreshToken function', () => {
    it('should save refresh token to database', async () => {
      const refreshToken = 'refresh_token';

      const authRepositoryMongo = new AuthRepositoryMongo();
      await authRepositoryMongo.addRefreshToken(refreshToken);

      const { refreshToken: tokenSaved } = await AuthModel.findOne({
        refreshToken,
      });

      expect(tokenSaved).toEqual(refreshToken);
    });
  });

  describe('isTokenExist function', () => {
    it('should throw NotFoundError if token not found', async () => {
      const refreshToken = 'refresh_token';

      const authRepositoryMongo = new AuthRepositoryMongo();

      await expect(
        authRepositoryMongo.isTokenExist(refreshToken)
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw NotFoundError if token exist', async () => {
      const refreshToken = 'refresh_token';

      const auth = new AuthModel({ refreshToken });
      await auth.save();

      const authRepository = new AuthRepositoryMongo();

      await expect(
        authRepository.isTokenExist(refreshToken)
      ).resolves.not.toThrowError(NotFoundError);
    });
  });
});
