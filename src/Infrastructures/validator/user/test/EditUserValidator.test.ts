import InvariantError from '../../../../Commons/exceptions/InvariantError';
import EditUserValidator from '../EditUserValidator';
import { IUserEdit } from '../../../../Domains/users/entities/UserEdit';

describe('EditUserValidator', () => {
  it('should throw InvariantError when payload not meet data spesification', () => {
    const payload = {
      id: 'user-123',
      fullName: 13213,
      bio: true,
    };

    const validator = new EditUserValidator();

    expect(() =>
      validator.validate(payload as unknown as IUserEdit)
    ).toThrowError(InvariantError);
  });

  it('should not throw InvariantError when payload meet data specification', () => {
    const payload = {
      id: 'user-123',
      username: 'jhondoe',
      fullName: 'Jhon',
      bio: 'wadidaw',
    };

    const validator = new EditUserValidator();

    expect(() => validator.validate(payload)).not.toThrowError(InvariantError);
  });
});
