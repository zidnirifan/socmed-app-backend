import supertest from 'supertest';
import db from '../Infrastructures/database/mongo/db';
import PostModel from '../Infrastructures/model/Post';
import UserModel from '../Infrastructures/model/User';
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
    await UserModel.deleteMany();
  });

  afterAll(() => {
    db.close();
  });

  describe('when POST /posts', () => {
    it('should response 201 and id ppost', async () => {
      const mediaPath = path.resolve(__dirname, './images/gedang.jpg');
      const caption = 'helo ges';
      const { token } = await testHelper.getToken();

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

    it('should response 400 when not attach a media', async () => {
      const { token } = await testHelper.getToken();
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

  describe('when GET /posts/id/:id', () => {
    it('should response 200 and post object', async () => {
      const { postId, token } = await testHelper.postPost();

      const { statusCode, body } = await supertest(app)
        .get(`/posts/id/${postId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data.post).toHaveProperty('id');
      expect(body.data.post).toHaveProperty('user');
      expect(body.data.post).toHaveProperty('caption');
      expect(body.data.post).toHaveProperty('media');
      expect(body.data.post).toHaveProperty('createdAt');
      expect(body.data.post).toHaveProperty('likesCount');
      expect(body.data.post).toHaveProperty('isLiked');
      expect(body.data.post).toHaveProperty('commentsCount');
      expect(body.data.post.user).toHaveProperty('id');
      expect(body.data.post.user).toHaveProperty('username');
      expect(body.data.post.user).toHaveProperty('profilePhoto');
    });

    it('should response 404 when post not found', async () => {
      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .get('/posts/id/invalid_id')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });

  describe('when GET /posts/following', () => {
    it('should response 200 and array of posts object', async () => {
      const { id: userId1, token } = await testHelper.getToken();

      const user2 = new UserModel({
        username: 'jhondoe',
        fullName: 'Jhon Doe',
        password: 'password',
        profilePhoto: 'profile.png',
        followers: [userId1],
      });

      const { _id: userId2 } = await user2.save();

      const post = new PostModel({
        userId: userId2,
        caption: 'hello ges',
        media: ['http://images.com/img.png'],
        likes: [userId1],
      });

      await post.save();

      const { statusCode, body } = await supertest(app)
        .get('/posts/following')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data.posts[0]).toHaveProperty('id');
      expect(body.data.posts[0]).toHaveProperty('user');
      expect(body.data.posts[0]).toHaveProperty('caption');
      expect(body.data.posts[0]).toHaveProperty('media');
      expect(body.data.posts[0]).toHaveProperty('createdAt');
      expect(body.data.posts[0]).toHaveProperty('likesCount');
      expect(body.data.posts[0]).toHaveProperty('isLiked');
      expect(body.data.posts[0]).toHaveProperty('commentsCount');
      expect(body.data.posts[0].user).toHaveProperty('id');
      expect(body.data.posts[0].user).toHaveProperty('username');
      expect(body.data.posts[0].user).toHaveProperty('profilePhoto');
    });

    it('should response 200 and blank array if posts not exists', async () => {
      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .get('/posts/following')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data.posts.length).toEqual(0);
    });
  });

  describe('when PUT /posts/:id/like', () => {
    it('should response 200', async () => {
      const { token, postId } = await testHelper.postPost();

      const { statusCode, body } = await supertest(app)
        .put(`/posts/${postId}/like`)
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.message).toBeDefined();
    });

    it('should response 404 when post not found', async () => {
      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .put('/posts/not_found_id/like')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(404);
      expect(body.status).toEqual('fail');
      expect(body.message).toBeDefined();
    });
  });

  describe('when GET /posts/explore', () => {
    it('should response 200 and array of posts object', async () => {
      const { token } = await testHelper.postPost();

      const { statusCode, body } = await supertest(app)
        .post('/posts/explore')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data.posts[0]).toHaveProperty('id');
      expect(body.data.posts[0]).toHaveProperty('user');
      expect(body.data.posts[0]).toHaveProperty('caption');
      expect(body.data.posts[0]).toHaveProperty('media');
      expect(body.data.posts[0]).toHaveProperty('createdAt');
      expect(body.data.posts[0]).toHaveProperty('likesCount');
      expect(body.data.posts[0]).toHaveProperty('isLiked');
      expect(body.data.posts[0]).toHaveProperty('commentsCount');
      expect(body.data.posts[0].user).toHaveProperty('id');
      expect(body.data.posts[0].user).toHaveProperty('username');
      expect(body.data.posts[0].user).toHaveProperty('profilePhoto');
    });

    it('should response 200 and blank array if posts not exists', async () => {
      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .post('/posts/explore')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data.posts.length).toEqual(0);
    });
  });

  describe('when GET /posts/explore/media', () => {
    it('should response 200 and array of post media object', async () => {
      const { token } = await testHelper.postPost();

      const { statusCode, body } = await supertest(app)
        .post('/posts/explore/media')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data.posts[0]).toHaveProperty('id');
      expect(body.data.posts[0]).toHaveProperty('media');
    });

    it('should response 200 and blank array if post media not exist', async () => {
      const { token } = await testHelper.getToken();

      const { statusCode, body } = await supertest(app)
        .post('/posts/explore/media')
        .set('Authorization', `Bearer ${token}`);

      expect(statusCode).toEqual(200);
      expect(body.status).toEqual('success');
      expect(body.data.posts.length).toEqual(0);
    });
  });
});
