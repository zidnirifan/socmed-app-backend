import UserEdit from '../UserEdit';

describe('a UserEdit entities', () => {
  it('should add blank string value to optional property when optional property not filled', () => {
    const payload = {
      id: 'user-123',
      username: 'jhondoe',
      fullName: 'Jhon Doe',
    };

    const { fullName, bio } = new UserEdit(payload);

    expect(fullName).toEqual(payload.fullName);
    expect(bio).toEqual('');
  });

  it('should create user object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      bio: 'I am an engineer',
    };

    const { fullName, bio } = new UserEdit(payload);

    expect(fullName).toEqual(payload.fullName);
    expect(bio).toEqual(payload.bio);
  });
});
