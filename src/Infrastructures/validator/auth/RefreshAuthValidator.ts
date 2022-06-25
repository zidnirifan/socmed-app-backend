import { ObjectSchema } from 'joi';
import { IRefreshToken } from '../../../Applications/use_case/RefreshAuth';
import Validator from '../Validator';

class RefreshAuthValidator extends Validator<IRefreshToken> {
  protected schema(): ObjectSchema<IRefreshToken> {
    return this.Joi.object({
      refreshToken: this.Joi.string().required(),
    });
  }
}

export default RefreshAuthValidator;
