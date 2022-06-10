/* istanbul ignore file */

abstract class ClientError extends Error {
  statusCode: number;
  name: string = 'ClientError';

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ClientError;
