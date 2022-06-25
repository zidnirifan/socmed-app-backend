import { ObjectSchema } from 'joi';
import { IRefreshToken } from '../../../Applications/use_case/LogoutUser';
import Validator from '../Validator';

class LoguoutUserValidator extends Validator<IRefreshToken> {
  protected schema(): ObjectSchema<IRefreshToken> {
    return this.Joi.object({
      refreshToken: this.Joi.string().required(),
    });
  }
}

export default LoguoutUserValidator;
