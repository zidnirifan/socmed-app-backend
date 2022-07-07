import supertest from 'supertest';
import db from '../Infrastructures/database/mongo/db';
import UserModel from '../Infrastructures/model/User';
import Server from '../Infrastructures/http/Server';
import container from '../Infrastructures/container';
import testHelper from './testHelper';
import path from 'path';

const { app } = new Server(container);

describe('/users endpoint', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await UserModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('when POST /users', () => {
    it('should response 201 and persisted user', async () => {
      const bodyRequest = {
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/users')
        .send(bodyRequest);

      expect(statusCode).toEqual(201);
      expect(body.status).toEqual('success');
      expect(body.message).toBeDefined();
      expect(body.data).toHaveProperty('userId');
    });

    it('should response 400 when body request not contain needed property', async () => {
      const bodyRequest = {
        username: 'jhondoe',
        fullName: 'Jhon Doe',
      };

      const { statusCode, body } = await supertest(app)
        .post('/users')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when body request not meet data type spesification', async () => {
      const bodyRequest = {
        username: 123,
        fullName: true,
        password: undefined,
      };

      const { statusCode, body } = await supertest(app)
        .post('/users')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when username less than 5 character', async () => {
      const bodyRequest = {
        username: 'jhon',
        fullName: 'Jhon Doe',
        password: 'password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/users')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when username more than 50 character', async () => {
      const bodyRequest = {
        username: 'wkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwkwk',
        fullName: 'Jhon Doe',
        password: 'password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/users')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when username contain restricted character', async () => {
      const bodyRequest = {
        username: 'jhon doe',
        fullName: 'Jhon Doe',
        password: 'password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/users')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when password less than 8 character', async () => {
      const bodyRequest = {
        username: 'jhon doe',
        fullName: 'Jhon Doe',
        password: 'password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/users')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when username already exist', async () => {
      const username = 'jhondoe';
      const user = new UserModel({
        username,
        fullName: 'Jhon Lenon',
        password: 'secretpass',
      });

      await user.save();

      const bodyRequest = {
        username,
        fullName: 'Jhon Doe',
        password: 'password',
      };

      const { statusCode, body } = await supertest(app)
        .post('/users')
        .send(bodyRequest);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });

  describe('when PUT /users/photo', () => {
    it('should response 200 and valid profilePhoto url', async () => {
      const photoPath = path.resolve(__dirname, './images/gedang.jpg');

      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .put('/users/photo')
        .set('Authorization', `Bearer ${token}`)
        .attach('photo', photoPath);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.message).toBeDefined();
      expect(body.data).toHaveProperty('profilePhoto');
    });

    it('should response 400 when photo not attached', async () => {
      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .put('/users/photo')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 404 when user not found', async () => {
      const photoPath = path.resolve(__dirname, './images/gedang.jpg');
      const { token } = await testHelper.getToken();

      await UserModel.deleteOne({ username: 'jhondoe' });

      const { statusCode, body } = await supertest(app)
        .put('/users/photo')
        .set('Authorization', `Bearer ${token}`)
        .attach('photo', photoPath);

      expect(statusCode).toEqual(404);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });

  describe('when GET /users/:id', () => {
    it('should response 200 and user profile', async () => {
      const { token, id } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .get(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data.userProfile).toHaveProperty('id');
      expect(body.data.userProfile).toHaveProperty('username');
      expect(body.data.userProfile).toHaveProperty('fullName');
      expect(body.data.userProfile).toHaveProperty('profilePhoto');
      expect(body.data.userProfile).toHaveProperty('bio');
      expect(body.data.userProfile).toHaveProperty('posts');
      expect(body.data.userProfile).toHaveProperty('postsCount');
    });

    it('should response 404 when user not found', async () => {
      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .get('/users/not_found_id')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });
});
