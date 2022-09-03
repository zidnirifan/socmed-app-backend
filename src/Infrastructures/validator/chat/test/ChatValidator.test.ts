import InvariantError from '../../../../Commons/exceptions/InvariantError';
import { IChat } from '../../../../Domains/chats/entities/Chat';
import ChatValidator from '../ChatValidator';

describe('ChatValidator', () => {
  it('should throw InvariantError when payload not meet data spesification', () => {
    const payload = {
      from: 123,
      to: true,
    };

    const validator = new ChatValidator();

    expect(() => validator.validate(payload as unknown as IChat)).toThrowError(
      InvariantError
    );
  });

  it('should not throw InvariantError when payload meet data spesification', () => {
    const payload = {
      from: 'user-1',
      to: 'user-2',
      chat: 'hello',
    };

    const validator = new ChatValidator();

    expect(() => validator.validate(payload)).not.toThrowError(InvariantError);
  });
});
