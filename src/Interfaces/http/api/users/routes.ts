import multer from 'multer';
import os from 'os';
import auth from '../../middleware/auth';
import BaseRouter from '../BaseRouter';
import UsersHandler from './handler';

class UsersRoutes extends BaseRouter {
  routes(): void {
    const handler = new UsersHandler(this.container);

    this.router.post('/', handler.postUserHandler);
    this.router.put(
      '/photo',
      auth,
      multer({ dest: os.tmpdir() }).single('photo'),
      handler.putProfilePhoto
    );
  }
}

export default UsersRoutes;
