import auth from '../../middleware/auth';
import BaseRouter from '../BaseRouter';
import ChatsHandler from './handler';

class ChatsRoutes extends BaseRouter {
  routes(): void {
    const handler = new ChatsHandler(this.container);

    this.router.get('/latest', auth, handler.getLatestChats);
  }
}

export default ChatsRoutes;
