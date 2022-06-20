export interface IPasswordHash {
  hash(password: string): Promise<string>;
}

abstract class PasswordHash implements IPasswordHash {
  abstract hash(password: string): Promise<string>;
}

export default PasswordHash;
