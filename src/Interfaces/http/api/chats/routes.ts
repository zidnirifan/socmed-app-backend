import auth from '../../middleware/auth';
import BaseRouter from '../BaseRouter';
import ChatsHandler from './handler';

class ChatsRoutes extends BaseRouter {
  routes(): void {
    const handler = new ChatsHandler(this.container);

    this.router.get('/latest', auth, handler.getLatestChats);
    this.router.get('/conversation/:userId', auth, handler.getConversation);
    this.router.put('/conversation/:userId/read', auth, handler.readChat);
  }
}

export default ChatsRoutes;
