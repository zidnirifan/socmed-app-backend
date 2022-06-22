import bcryptHash from 'bcrypt';
import PasswordHash from '../../Applications/security/PasswordHash';
import AuthenticationError from '../../Commons/exceptions/AuthenticationError';

class BcryptPasswordHash extends PasswordHash {
  private bcrypt: typeof bcryptHash;
  private saltRound: number;

  constructor(bcrypt: typeof bcryptHash, saltRound = 10) {
    super();
    this.bcrypt = bcrypt;
    this.saltRound = saltRound;
  }

  hash(password: string): Promise<string> {
    return this.bcrypt.hash(password, this.saltRound);
  }

  async comparePassword(
    password: string,
    encryptedPassword: string
  ): Promise<void> {
    const result = await this.bcrypt.compare(password, encryptedPassword);

    if (!result) {
      throw new AuthenticationError('wrong password');
    }
  }
}

export default BcryptPasswordHash;
