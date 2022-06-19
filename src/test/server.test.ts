import supertest from 'supertest';
import Server from '../Infrastructures/http/Server';
import container from '../Infrastructures/container';

const { app } = new Server(container);

describe('HTTP Server', () => {
  it('should response 404 when request unregistered router', async () => {
    const { statusCode, body } = await supertest(app).get('/unregisteredroute');

    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('not found');
  });
});
