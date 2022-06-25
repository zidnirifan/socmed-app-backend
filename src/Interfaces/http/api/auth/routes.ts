import BaseRouter from '../BaseRouter';
import AuthHandler from './handler';

class AuthRoutes extends BaseRouter {
  routes(): void {
    const handler = new AuthHandler(this.container);

    this.router.post('/', handler.postAuth);
    this.router.put('/', handler.putAuth);
    this.router.delete('/', handler.deleteAuth);
  }
}

export default AuthRoutes;
