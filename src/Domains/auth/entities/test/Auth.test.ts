import Auth from '../Auth';

describe('Auth entity', () => {
  it('should create Auth object correctly', () => {
    const payload = {
      accessToken: 'access.token',
      refreshToken: 'refresh.token',
    };

    const { accessToken, refreshToken } = new Auth(payload);

    expect(accessToken).toEqual(payload.accessToken);
    expect(refreshToken).toEqual(payload.refreshToken);
  });
});
