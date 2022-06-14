import bcryptHash from 'bcrypt';
import PasswordHash from '../../Applications/security/PasswordHash';

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
}

export default BcryptPasswordHash;
