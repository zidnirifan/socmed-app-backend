import supertest from 'supertest';
import Server from '../Infrastructures/http/Server';
import container from '../Infrastructures/container';

const { app } = new Server(container);

describe('auth middleware', () => {
  it('should response 401 when missing authentication', async () => {
    const { statusCode, body } = await supertest(app).put('/users/photo');

    expect(statusCode).toEqual(401);
    expect(body.status).toEqual('fail');
    expect(body.message).toBeDefined();
  });

  it('should response 401 when token is invalid', async () => {
    const token = 'invalid_token';

    const { statusCode, body } = await supertest(app)
      .put('/users/photo')
      .set('Authorization', `Bearer ${token}`);

    expect(statusCode).toEqual(401);
    expect(body.status).toEqual('fail');
    expect(body.message).toBeDefined();
  });
});
