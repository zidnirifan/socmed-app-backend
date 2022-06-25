import { IRefreshToken } from '../../../../Applications/use_case/LogoutUser';
import InvariantError from '../../../../Commons/exceptions/InvariantError';
import LogoutUserValidator from '../LogoutUserValidator';

describe('LogoutUserValidator', () => {
  it('should throw InvariantError when payload not meet data spesification', () => {
    const payload = {
      refreshToken: 12324,
    };

    const validator = new LogoutUserValidator();

    expect(() =>
      validator.validate(payload as unknown as IRefreshToken)
    ).toThrowError(InvariantError);
  });

  it('should not throw InvariantError when payload meet data spesification', () => {
    const payload = {
      refreshToken: 'refresh_token',
    };

    const validator = new LogoutUserValidator();

    expect(() => validator.validate(payload)).not.toThrowError(InvariantError);
  });
});
