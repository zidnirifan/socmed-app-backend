import { ObjectSchema } from 'joi';
import ProfilePhoto from '../../../Domains/users/entities/ProfilePhoto';
import Validator from '../Validator';

class ProfilePhotoValidator extends Validator<ProfilePhoto> {
  protected schema(): ObjectSchema<ProfilePhoto> {
    const { Joi } = this;

    return Joi.object({
      userId: Joi.string().required(),
      path: Joi.string().required(),
      fileName: Joi.string().required(),
      fileType: Joi.string().valid('image/jpeg', 'image/png', 'image/webp'),
    });
  }
}

export default ProfilePhotoValidator;
