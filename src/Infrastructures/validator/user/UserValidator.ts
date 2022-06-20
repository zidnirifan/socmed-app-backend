import { ObjectSchema } from 'joi';
import { IUser } from '../../../Domains/users/entities/User';
import Validator from '../Validator';

class UserValidator extends Validator<IUser> {
  protected schema(): ObjectSchema<IUser> {
    const { Joi } = this;

    return Joi.object({
      username: Joi.string()
        .min(5)
        .max(50)
        .regex(/^[\w]+$/)
        .required(),
      fullName: Joi.string().required(),
      password: Joi.string().min(8).required(),
      profilePhoto: Joi.string(),
      bio: Joi.string(),
    });
  }
}

export default UserValidator;
