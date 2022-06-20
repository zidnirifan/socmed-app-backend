import User from '../User';

describe('a User entities', () => {
  it('should add blank string value to optional property when optional property not filled', () => {
    const payload = {
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      password: 'password',
    };

    const { profilePhoto, bio } = new User(payload);

    expect(profilePhoto).toEqual('');
    expect(bio).toEqual('');
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
