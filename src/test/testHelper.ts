/* istanbul ignore file */
import supertest from 'supertest';
import path from 'path';
import Server from '../Infrastructures/http/Server';
import container from '../Infrastructures/container';

const { app } = new Server(container);

const testHelper = {
  getToken: async (
    user = {
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      password: 'password',
    }
  ) => {
    const { body: bodyUser } = await supertest(app).post('/users').send(user);

    const { body } = await supertest(app)
      .post('/auth')
      .send({ username: user.username, password: user.password });

    if (bodyUser.status === 'fail') {
      return { id: '', token: body.data.accessToken };
    }

    return {
      id: bodyUser.data.userId.toString(),
      token: body.data.accessToken,
    };
  },

  postPost: async (caption = 'helo ges') => {
    const mediaPath = path.resolve(__dirname, './images/gedang.jpg');
    const { token } = await testHelper.getToken();

    const { body } = await supertest(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .field('caption', caption)
      .attach('media', mediaPath);

    return { postId: body.data.postId, token };
  },

  postComment: async (comment: any = { content: 'my comment' }) => {
    const { token, postId } = await testHelper.postPost();

    const { body } = await supertest(app)
      .post(`/posts/${postId}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .send(comment);

    return { token, commentId: body.data.commentId, postId };
  },
};

export default testHelper;
