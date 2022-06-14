import bcrypt from 'bcrypt';
import BcryptPasswordHash from '../BcryptPasswordHash';

describe('BcryptPasswordHash', () => {
  it('should encrypt password correctly', async () => {
    const password = 'password';
    const spyHash = jest.spyOn(bcrypt, 'hash');
    const bcryptPasswordHash = new BcryptPasswordHash(bcrypt);

    const encryptedPassword = await bcryptPasswordHash.hash(password);
    expect(encryptedPassword).not.toEqual(password);
    expect(spyHash).toBeCalledWith(password, 10);
  });
});
