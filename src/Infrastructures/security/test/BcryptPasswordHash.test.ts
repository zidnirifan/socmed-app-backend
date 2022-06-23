import bcrypt from 'bcrypt';
import AuthenticationError from '../../../Commons/exceptions/AuthenticationError';
import BcryptPasswordHash from '../BcryptPasswordHash';

describe('BcryptPasswordHash', () => {
  describe('hash function', () => {
    it('should encrypt password correctly', async () => {
      const password = 'password';
      const spyHash = jest.spyOn(bcrypt, 'hash');
      const bcryptPasswordHash = new BcryptPasswordHash();

      const encryptedPassword = await bcryptPasswordHash.hash(password);
      expect(encryptedPassword).not.toEqual(password);
      expect(spyHash).toBeCalledWith(password, 10);
    });
  });

  describe('comparePassword function', () => {
    it('should throw AuthenticationError when password not match', async () => {
      const bcryptPasswordHash = new BcryptPasswordHash();

      await expect(
        bcryptPasswordHash.comparePassword('password', 'encryptedPassword')
      ).rejects.toThrowError(AuthenticationError);
    });

    it('should not throw AuthenticationError when password match', async () => {
      const password = 'password';

      const encryptedPassword = await bcrypt.hash(password, 10);

      const bcryptPasswordHash = new BcryptPasswordHash();

      await expect(
        bcryptPasswordHash.comparePassword(password, encryptedPassword)
      ).resolves.not.toThrowError(AuthenticationError);
    });
  });
});
