import supertest from 'supertest';
import db from '../Infrastructures/database/mongo/db';
import AuthModel from '../Infrastructures/model/Auth';
import UserModel from '../Infrastructures/model/User';
import Server from '../Infrastructures/http/Server';
import container from '../Infrastructures/container';

const { app } = new Server(container);

describe('/auth endpoint', () => {
  beforeAll(async () => {
    db.on('open', () => {});

    const user = {
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      password: 'password',
    };

    await supertest(app).post('/users').send(user);
  });

  afterEach(async () => {
    await AuthModel.deleteMany();
  });

  afterAll(async () => {
    await UserModel.deleteMany();
    db.close();
  });

  describe('when POST /auth', () => {
    it('should response 201 and tokens', async () => {
      const bodyRequest = {
        username: 'jhondoe',
        password: 'password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/auth')
        .send(bodyRequest);

      expect(statusCode).toEqual(201);
      expect(body.status).toEqual('success');
      expect(body.message).toBeDefined();
      expect(body.data).toHaveProperty('accessToken');
      expect(body.data).toHaveProperty('refreshToken');
    });

    it('should response 404 when username not found', async () => {
      const bodyRequest = {
        username: 'stranger',
        password: 'password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/auth')
        .send(bodyRequest);

      expect(statusCode).toEqual(404);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when body request not contain needed property', async () => {
      const bodyRequest = {
        username: 'jhondoe',
      };

      const { statusCode, body } = await supertest(app)
        .post('/auth')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when body request not meet data type spesification', async () => {
      const bodyRequest = {
        username: true,
        password: 123,
      };

      const { statusCode, body } = await supertest(app)
        .post('/auth')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 401 when password is wrong', async () => {
      const bodyRequest = {
        username: 'jhondoe',
        password: 'wrong_password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/auth')
        .send(bodyRequest);

      expect(statusCode).toEqual(401);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });
});
