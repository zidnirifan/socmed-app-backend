/* istanbul ignore file */

import PasswordHash from '../PasswordHash';

class MockPasswordHash extends PasswordHash {
  hash(password: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default MockPasswordHash;
