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
    this.router.get('/profile/:id', auth, handler.getUserProfile);
    this.router.get('/profile', auth, handler.getUserProfile);
    this.router.put('/:id/follow', auth, handler.toggleFollowUser);
    this.router.put('/', auth, handler.putUser);
  }
}

export default UsersRoutes;
