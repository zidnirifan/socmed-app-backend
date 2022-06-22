import { ObjectSchema } from 'joi';
import { IUserLogin } from '../../../Domains/users/entities/UserLogin';
import Validator from '../Validator';

class UserLoginValidator extends Validator<IUserLogin> {
  protected schema(): ObjectSchema<IUserLogin> {
    const { Joi } = this;

    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  }
}

export default UserLoginValidator;
