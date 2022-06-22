import InvariantError from '../../../../Commons/exceptions/InvariantError';
import { IUserLogin } from '../../../../Domains/users/entities/UserLogin';
import UserLoginValidator from '../UserLoginValidator';

describe('UserLoginValidator', () => {
  it('should throw InvariantError when payload not meet data spesification', () => {
    const payload = {
      username: 'jhon',
      password: 123,
    };

    const validator = new UserLoginValidator();

    expect(() =>
      validator.validate(payload as unknown as IUserLogin)
    ).toThrowError(InvariantError);
  });

  it('should not throw InvariantError when payload meet data specification', () => {
    const payload = {
      username: 'jhondoe',
      password: 'password',
    };

    const validator = new UserLoginValidator();

    expect(() => validator.validate(payload)).not.toThrowError(InvariantError);
  });
});
