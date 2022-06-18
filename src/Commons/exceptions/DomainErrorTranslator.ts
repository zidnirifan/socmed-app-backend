import InvariantError from './InvariantError';

interface IDomainErrorTranslator {
  translate(error: TypeError): TypeError;
  directories: { [key: string]: TypeError };
}

const DomainErrorTranslator: IDomainErrorTranslator = {
  translate(error: TypeError): TypeError {
    return this.directories[error.message] || error;
  },
  directories: {
    'USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError(
      'not contain needed property'
    ),
    'USER.NOT_MEET_DATA_TYPE_SPESIFICATION': new InvariantError(
      'not meet data type spesification'
    ),
    'USER.USERNAME_MINIMAL_CHAR': new InvariantError(
      'username minimal 5 character'
    ),
    'USER.USERNAME_LIMIT_CHAR': new InvariantError(
      'username maksimum 50 character'
    ),
    'REGISTER_USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER': new InvariantError(
      'username contain restricted character'
    ),
    'USER.PASSWORD_MINIMAL_CHAR': new InvariantError(
      'password minimal 8 character'
    ),
  },
};

export default DomainErrorTranslator;
