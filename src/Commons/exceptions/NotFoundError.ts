import ClientError from './ClientError';

class NotFoundError extends ClientError {
  name = 'NotFoundError';
  constructor(message: string) {
    super(message, 404);
  }
}
export default NotFoundError;
