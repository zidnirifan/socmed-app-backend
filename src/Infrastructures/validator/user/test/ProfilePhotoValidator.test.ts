import InvariantError from '../../../../Commons/exceptions/InvariantError';
import ProfilePhotoValidator from '../ProfilePhotoValidator';
import { IProfilePhoto } from '../../../../Domains/users/entities/ProfilePhoto';

describe('ProfilePhotoValidator', () => {
  it('should throw InvariantError when payload not meet data spesification', () => {
    const payload = {
      userId: 'user-123',
      path: true,
      fileName: 123,
    };

    const validator = new ProfilePhotoValidator();

    expect(() => validator.validate(payload as unknown as IProfilePhoto)).toThrowError(
      InvariantError
    );
  });

  it('should not throw InvariantError when payload meet data specification', () => {
    const payload = {
      userId: 'user-123',
      path: '/images/img.jpg',
      fileName: 'img.jpg',
      fileType: 'image/jpeg' as const
    };

    const validator = new ProfilePhotoValidator();

    expect(() => validator.validate(payload)).not.toThrowError(InvariantError);
  });
});
