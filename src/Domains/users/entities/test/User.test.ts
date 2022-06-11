import User from '../User';

describe('a User entities', () => {
  it('should throw error when username less than 5 character', () => {
    const payload = {
      username: 'jhon',
      fullName: 'Jhon Doe',
      password: 'password',
    };

    expect(() => new User(payload)).toThrowError('USER.USERNAME_MINIMAL_CHAR');
  });

  it('should throw error when username contains more than 50 character', () => {
    const payload = {
      username: 'wkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkw',
      fullName: 'wadidaw',
      password: 'password',
    };

    expect(() => new User(payload)).toThrowError('USER.USERNAME_LIMIT_CHAR');
  });

  it('should throw error when username contains restricted character', () => {
    const payload = {
      username: 'jhon doe',
      fullName: 'Jhon Doe',
      password: 'password',
    };

    expect(() => new User(payload)).toThrowError(
      'USER.USERNAME_CONTAIN_RESTRICTED_CHARACTER'
    );
  });

  it('should throw error when password less than 8 character', () => {
    const payload = {
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      password: 'secret',
    };

    expect(() => new User(payload)).toThrowError('USER.PASSWORD_MINIMAL_CHAR');
  });

  it('should create user object correctly', () => {
    const payload = {
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      password: 'password',
      profilePhoto: 'https://img.com',
      bio: 'I am an engineer',
    };

    const { username, fullName, password, profilePhoto, bio } = new User(
      payload
    );

    expect(username).toEqual(payload.username);
    expect(fullName).toEqual(payload.fullName);
    expect(password).toEqual(payload.password);
    expect(profilePhoto).toEqual(payload.profilePhoto);
    expect(bio).toEqual(payload.bio);
  });
});
