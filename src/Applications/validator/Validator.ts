export interface IValidator<Payload> {
  validate(payload: Payload): void;
}

abstract class Validator<Payload> implements IValidator<Payload> {
  abstract validate(payload: Payload): void;
}

export default Validator;
