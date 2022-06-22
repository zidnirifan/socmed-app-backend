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

      const authRepositoryMongo = new AuthRepositoryMongo(AuthModel);
      await authRepositoryMongo.addRefreshToken(refreshToken);

      const { refreshToken: tokenSaved } = await AuthModel.findOne({
        refreshToken,
      });

      expect(tokenSaved).toEqual(refreshToken);
    });
  });
});
