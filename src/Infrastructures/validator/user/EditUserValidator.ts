import { ObjectSchema } from 'joi';
import { IUserEdit } from '../../../Domains/users/entities/UserEdit';
import Validator from '../Validator';

class EditUserValidator extends Validator<IUserEdit> {
  protected schema(): ObjectSchema<IUserEdit> {
    const { Joi } = this;

    return Joi.object({
      id: Joi.string().required(),
      fullName: Joi.string().required(),
      bio: Joi.string().allow(''),
    });
  }
}

export default EditUserValidator;
