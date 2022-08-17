import { ObjectSchema } from 'joi';
import { IUserEdit } from '../../../Domains/users/entities/UserEdit';
import Validator from '../Validator';

class EditUserValidator extends Validator<IUserEdit> {
  protected schema(): ObjectSchema<IUserEdit> {
    const { Joi } = this;

    return Joi.object({
      id: Joi.string().required(),
      username: Joi.string()
        .min(5)
        .max(50)
        .regex(/^[\w]+$/)
        .required(),
      fullName: Joi.string().required(),
      bio: Joi.string().allow(''),
    });
  }
}

export default EditUserValidator;
