export interface IPasswordHash {
  hash(password: string): Promise<string>;
  comparePassword(password: string, encryptedPassword: string): Promise<void>;
}

abstract class PasswordHash implements IPasswordHash {
  abstract hash(password: string): Promise<string>;

  abstract comparePassword(
    password: string,
    encryptedPassword: string
  ): Promise<void>;
}

export default PasswordHash;
