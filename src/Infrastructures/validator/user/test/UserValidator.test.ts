import InvariantError from '../../../../Commons/exceptions/InvariantError';
import { IUser } from '../../../../Domains/users/entities/User';
import UserValidator from '../UserValidator';

describe('UserValidator', () => {
  it('should throw InvariantError when payload not meet data spesification', () => {
    const payload = {
      username: 'jhon',
      fullName: true,
      password: 123,
    };

    const validator = new UserValidator();

    expect(() => validator.validate(payload as unknown as IUser)).toThrowError(
      InvariantError
    );
  });

  it('should not throw InvariantError when payload meet data specification', () => {
    const payload = {
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      password: 'password',
    };

    const validator = new UserValidator();

    expect(() => validator.validate(payload)).not.toThrowError(InvariantError);
  });
});
