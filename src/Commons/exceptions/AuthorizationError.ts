import ClientError from './ClientError';

class AuthorizationError extends ClientError {
  name = 'AuthorizationError';

  constructor(message: string) {
    super(message, 403);
  }
}

export default AuthorizationError;
