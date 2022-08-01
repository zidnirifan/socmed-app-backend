import auth from '../../middleware/auth';
import BaseRouter from '../BaseRouter';
import PostsHandler from './handler';

class CommentsRoutes extends BaseRouter {
  routes(): void {
    const handler = new PostsHandler(this.container);

    this.router.post('/:id/comments', auth, handler.postComment);
  }
}

export default CommentsRoutes;
