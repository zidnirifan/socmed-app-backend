/* istanbul ignore file */
import supertest from 'supertest';
import path from 'path';
import Server from '../Infrastructures/http/Server';
import container from '../Infrastructures/container';

const { app } = new Server(container);

const testHelper = {
  getToken: async () => {
    const user = {
      username: 'jhondoe',
      fullName: 'Jhon Doe',
      password: 'password',
    };

    await supertest(app).post('/users').send(user);

    const { body } = await supertest(app)
      .post('/auth')
      .send({ username: user.username, password: user.password });

    return body.data.accessToken;
  },
  postPost: async () => {
    const mediaPath = path.resolve(__dirname, './images/gedang.jpg');
    const caption = 'helo ges';
    const token = await testHelper.getToken();

    const { body } = await supertest(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .field('caption', caption)
      .attach('media', mediaPath);

    return { postId: body.data.postId, token };
  },
};

export default testHelper;
