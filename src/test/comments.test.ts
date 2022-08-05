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

  describe('when GET /posts/:id/comments', () => {
    it('should response 201 and id comment', async () => {
      const { token, commentId, postId } = await testHelper.postComment();

      await testHelper.postComment({
        content: 'reply',
        replyTo: commentId,
        parentComment: commentId,
      });

      const { statusCode, body } = await supertest(app)
        .get(`/posts/${postId}/comments`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data).toHaveProperty('comments');
      expect(body.data.comments[0]).toHaveProperty('id');
      expect(body.data.comments[0]).toHaveProperty('user');
      expect(body.data.comments[0]).toHaveProperty('content');
      expect(body.data.comments[0]).toHaveProperty('postId');
      expect(body.data.comments[0]).toHaveProperty('replies');
      expect(body.data.comments[0].replies).toHaveLength(1);
      expect(body.data.comments[0]).toHaveProperty('createdAt');
    });

    it('should response 404 when post not found', async () => {
      const { token } = await testHelper.postComment();

      const { statusCode, body } = await supertest(app)
        .get('/posts/not_found_id/comments')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });

  describe('when PUT /posts/:postId/:commentId/like', () => {
    it('should response 200', async () => {
      const { token, commentId, postId } = await testHelper.postComment();

      const { statusCode, body } = await supertest(app)
        .put(`/posts/${postId}/comments/${commentId}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.message).toBeDefined();
    });

    it('should response 404 when post or comment not found', async () => {
      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .put(`/posts/not_found_id/comments/not_found_id/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });
});
