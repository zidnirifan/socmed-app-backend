import DomainErrorTranslator from '../DomainErrorTranslator';
import InvariantError from '../InvariantError';

describe('DomainErrorTranslator', () => {
  it('should translate error correctly', () => {
    expect(
      DomainErrorTranslator.translate(
        new Error('USER.NOT_CONTAIN_NEEDED_PROPERTY')
      )
    ).toStrictEqual(new InvariantError('not contain needed property'));
  });

  it('should return original error when error not needed to translate', () => {
    const error = new Error('just error');

    expect(DomainErrorTranslator.translate(error)).toStrictEqual(error);
  });
});
