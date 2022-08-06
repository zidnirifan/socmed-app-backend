import auth from '../../middleware/auth';
import BaseRouter from '../BaseRouter';
import PostsHandler from './handler';

class CommentsRoutes extends BaseRouter {
  routes(): void {
    const handler = new PostsHandler(this.container);

    this.router.post('/:postId/comments', auth, handler.postComment);
    this.router.get('/:postId/comments', auth, handler.getPostComments);
    this.router.put(
      '/:postId/comments/:commentId/like',
      auth,
      handler.toggleLikeComment
    );
  }
}

export default CommentsRoutes;
