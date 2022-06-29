import supertest from 'supertest';
import db from '../Infrastructures/database/mongo/db';
import PostModel from '../Infrastructures/model/Post';
import Server from '../Infrastructures/http/Server';
import container from '../Infrastructures/container';
import testHelper from './testHelper';
import path from 'path';

const { app } = new Server(container);

describe('/posts endpoint', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await PostModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('when POST /posts', () => {
    it('should response 201 and id ppost', async () => {
      const mediaPath = path.resolve(__dirname, './images/gedang.jpg');
      const caption = 'helo ges';
      const token = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .field('caption', caption)
        .attach('media', mediaPath);

      expect(statusCode).toEqual(201);
      expect(body.status).toEqual('success');
      expect(body.message).toBeDefined();
      expect(body.data).toHaveProperty('postId');
    });

    it('should response 400 when body request not meet data spesification', async () => {
      const mediaPath = path.resolve(__dirname, './images/gedang.jpg');
      const token = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .attach('media', mediaPath);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });

    it('should response 400 when not attach a media', async () => {
      const token = await testHelper.getToken();
      const caption = 'helo ges';

      const { statusCode, body } = await supertest(app)
        .post('/posts')
        .set('Authorization', `Bearer ${token}`)
        .field('caption', caption);

      expect(statusCode).toEqual(400);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });
});
