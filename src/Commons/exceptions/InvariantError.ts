import ClientError from './ClientError';

class InvariantError extends ClientError {
  name: string = 'InvariantError';
}

export default InvariantError;
