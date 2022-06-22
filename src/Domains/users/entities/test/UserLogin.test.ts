import UserLogin from '../UserLogin';

describe('UserLogin entity', () => {
  it('should create UserLogin object correctly', () => {
    const payload = {
      username: 'jhondoe',
      password: 'password',
    };

    const { username, password } = new UserLogin(payload);

    expect(username).toEqual(payload.username);
    expect(password).toEqual(payload.password);
  });
});
