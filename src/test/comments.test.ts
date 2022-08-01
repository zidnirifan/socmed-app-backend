import supertest from 'supertest';
import db from '../Infrastructures/database/mongo/db';
import PostModel from '../Infrastructures/model/Post';
import UserModel from '../Infrastructures/model/User';
import Server from '../Infrastructures/http/Server';
import container from '../Infrastructures/container';
import testHelper from './testHelper';
import CommentModel from '../Infrastructures/model/Comment';

const { app } = new Server(container);

describe('/posts endpoint', () => {
  beforeAll(() => {
    db.on('open', () => {});
  });

  afterEach(async () => {
    await PostModel.deleteMany();
    await UserModel.deleteMany();
    await CommentModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('when POST /posts/:id/comments', () => {
    it('should response 201 and id comment', async () => {
      const { token, postId } = await testHelper.postPost();

      const bodyRequest = {
        content: 'my comment',
      };

      const { statusCode, body } = await supertest(app)
        .post(`/posts/${postId}/comments`)
        .set('Authorization', `Bearer ${token}`)
        .send(bodyRequest);

      expect(statusCode).toEqual(201);
      expect(body.status).toEqual('success');
      expect(body.message).toBeDefined();
      expect(body.data).toHaveProperty('commentId');
    });

    it('should response 404 when post not found', async () => {
      const { token } = await testHelper.postPost();

      const bodyRequest = {
        content: 'my comment',
      };

      const { statusCode, body } = await supertest(app)
        .post('/posts/not_found_id/comments')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyRequest);

      expect(statusCode).toEqual(404);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });
});
