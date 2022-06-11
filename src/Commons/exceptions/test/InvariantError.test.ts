import InvariantError from '../InvariantError';
import ClientError from '../ClientError';

describe('InvariantError', () => {
  it('should create an error correctly', () => {
    const invariantError = new InvariantError('an error');

    expect(invariantError).toBeInstanceOf(InvariantError);
    expect(invariantError).toBeInstanceOf(ClientError);
    expect(invariantError).toBeInstanceOf(Error);

    expect(invariantError.name).toEqual('InvariantError');
    expect(invariantError.message).toEqual('an error');
    expect(invariantError.statusCode).toEqual(400);
  });
});
