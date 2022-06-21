import BaseRouter from '../BaseRouter';
import UsersHandler from './handler';

class UsersRoutes extends BaseRouter {
  routes(): void {
    const handler = new UsersHandler(this.container);

    this.router.post('/', handler.postUserHandler);
  }
}

export default UsersRoutes;
