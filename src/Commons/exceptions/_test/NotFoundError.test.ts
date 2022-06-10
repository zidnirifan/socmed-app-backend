import ClientError from '../ClientError';
import NotFoundError from '../NotFoundError';

describe('NotFoundError', () => {
  it('should create error correctly', () => {
    const notFoundError = new NotFoundError('error, not found');

    expect(notFoundError).toBeInstanceOf(NotFoundError);
    expect(notFoundError).toBeInstanceOf(ClientError);
    expect(notFoundError).toBeInstanceOf(Error);

    expect(notFoundError.message).toEqual('error, not found');
    expect(notFoundError.statusCode).toEqual(404);
    expect(notFoundError.name).toEqual('NotFoundError');
  });
});
