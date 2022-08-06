import InvariantError from '../../../../Commons/exceptions/InvariantError';
import { IComment } from '../../../../Domains/comments/entities/Comment';
import CommentValidator from '../CommentValidator';

describe('CommentValidator', () => {
  it('should throw InvariantError when payload not meet data spesification', () => {
    const payload = {
      userId: 123,
      content: true,
      postId: [],
    };

    const validator = new CommentValidator();

    expect(() =>
      validator.validate(payload as unknown as IComment)
    ).toThrowError(InvariantError);
  });

  it('should not throw InvariantError when payload meet data specification', () => {
    const payload = {
      userId: 'user-123',
      content: 'comment',
      postId: 'post-123',
    };

    const validator = new CommentValidator();

    expect(() => validator.validate(payload)).not.toThrowError(InvariantError);
  });
});
