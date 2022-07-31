import UserSearch from '../UserSearch';

describe('a UserSearch entities', () => {
  it('should create user object correctly', () => {
    const payload = {
      id: 'user-123',
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      profilePhoto: 'img.jpg',
    };

    const { id, username, fullName, profilePhoto } = new UserSearch(payload);

    expect(id).toEqual(payload.id);
    expect(fullName).toEqual(payload.fullName);
    expect(username).toEqual(payload.username);
    expect(fullName).toEqual(payload.fullName);
    expect(profilePhoto).toEqual(payload.profilePhoto);
  });
});
