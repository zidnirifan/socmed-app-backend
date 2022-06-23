import Joi, { ObjectSchema } from 'joi';
import ValidatorAbstract from '../../Applications/validator/Validator';
import InvariantError from '../../Commons/exceptions/InvariantError';

abstract class Validator<Payload> extends ValidatorAbstract<Payload> {
  protected Joi;

  constructor() {
    super();
    this.Joi = Joi;
  }

  validate(payload: Payload): void {
    const validationResult = this.schema().validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  protected abstract schema(): ObjectSchema<Payload>;
}

export default Validator;
