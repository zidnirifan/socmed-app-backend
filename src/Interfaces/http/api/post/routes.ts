import multer from 'multer';
import os from 'os';
import auth from '../../middleware/auth';
import BaseRouter from '../BaseRouter';
import PostsHandler from './handler';

class PostsRoutes extends BaseRouter {
  routes(): void {
    const handler = new PostsHandler(this.container);

    this.router.post(
      '/',
      auth,
      multer({ dest: os.tmpdir() }).array('media'),
      handler.postPost
    );
    this.router.get('/id/:id', auth, handler.getPostById);
    this.router.get('/following', auth, handler.GetFollowingPosts);
    // post method to send body but this route not save data
    this.router.post('/explore', auth, handler.getExplorePosts);
    // post method to send body but this route not save data
    this.router.post('/explore/media', auth, handler.getExplorePostsMedia);
    this.router.put('/:id/like', auth, handler.toggleLike);
  }
}

export default PostsRoutes;
