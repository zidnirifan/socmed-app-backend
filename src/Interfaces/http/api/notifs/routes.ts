import auth from '../../middleware/auth';
import BaseRouter from '../BaseRouter';
import ChatsHandler from './handler';

class NotifsRoutes extends BaseRouter {
  routes(): void {
    const handler = new ChatsHandler(this.container);

    this.router.get('/', auth, handler.getNotifs);
  }
}

export default NotifsRoutes;
