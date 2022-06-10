import ClientError from './ClientError';

class AuthenticationError extends ClientError {
  name = 'AuthenticationError';

  constructor(message: string) {
    super(message, 401);
  }
}

export default AuthenticationError;
