import InvariantError from '../../../../Commons/exceptions/InvariantError';
import { IPost } from '../../../../Domains/posts/entities/Post';
import PostValidator from '../PostValidator';

describe('PostValidator', () => {
  it('should throw InvariantError when payload not meet data spesification', () => {
    const payload = {
      caption: 'helo ges',
      media: [
        {
          path: 54321,
          fileName: true,
          fileType: 'image/jpeg' as const,
        },
      ],
    };

    const validator = new PostValidator();

    expect(() => validator.validate(payload as unknown as IPost)).toThrowError(
      InvariantError
    );
  });

  it('should not throw InvariantError when payload meet data spesification', () => {
    const payload = {
      userId: 'user-123',
      caption: 'helo ges',
      media: [
        {
          path: '/images/img.jpg',
          fileName: 'img.jpg',
          fileType: 'image/jpeg' as const,
        },
      ],
    };

    const validator = new PostValidator();

    expect(() => validator.validate(payload)).not.toThrowError(InvariantError);
  });
});
