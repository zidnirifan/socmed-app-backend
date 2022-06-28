/* istanbul ignore file */
import supertest from 'supertest';
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
};

export default testHelper;
