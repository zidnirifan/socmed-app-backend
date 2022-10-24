import { NextFunction, Response } from 'express';
import AddPost from '../../../../Applications/use_case/AddPost';
import GetExplorePostsMedia from '../../../../Applications/use_case/GetExplorePostsMedia';
import GetExplorePosts from '../../../../Applications/use_case/GetExplorePosts';
import GetFollowingPosts from '../../../../Applications/use_case/GetFollowingPosts';
import GetPost from '../../../../Applications/use_case/GetPost';
import ToggleLikePost from '../../../../Applications/use_case/ToggleLikePost';
import { RequestAuth } from '../../middleware/auth';
import BaseHandler from '../BaseHandler';

class PostsHandler extends BaseHandler {
  async postPost(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const mediaFiles: any = req.files;
      const media = mediaFiles.map((e: any) => ({
        path: e.path,
        fileName: e.originalname,
        fileType: e.mimetype,
      }));
      /* istanbul ignore next */
      const userId = req.auth?.id;

      const post = {
        ...req.body,
        userId,
        media,
      };

      const addPost = this.container.getInstance(AddPost.name);
      const postId = await addPost.execute(post);

      return res.status(201).json({
        status: 'success',
        message: 'post successfully uploaded',
        data: { postId },
      });
    } catch (error) {
      return next(error);
    }
  }

  async getPostById(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const getPost = this.container.getInstance(GetPost.name);
      const post = await getPost.execute(req.params.id, userId);

      return res.status(200).json({
        status: 'success',
        data: { post },
      });
    } catch (error) {
      return next(error);
    }
  }

  async GetFollowingPosts(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const getFollowingPosts = this.container.getInstance(
        GetFollowingPosts.name
      );
      const posts = await getFollowingPosts.execute(userId);

      return res.status(200).json({
        status: 'success',
        data: { posts },
      });
    } catch (error) {
      return next(error);
    }
  }

  async toggleLike(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const payload = { userId, postId: req.params.id };

      const toggleLike = this.container.getInstance(ToggleLikePost.name);
      const likeUnlike = await toggleLike.execute(payload);

      return res.status(200).json({
        status: 'success',
        message: `post ${likeUnlike}`,
      });
    } catch (error) {
      return next(error);
    }
  }

  async getExplorePosts(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const { exceptPosts } = req.body;
      const getExplorePosts = this.container.getInstance(GetExplorePosts.name);
      const posts = await getExplorePosts.execute(userId, exceptPosts || []);

      return res.status(200).json({
        status: 'success',
        data: { posts },
      });
    } catch (error) {
      return next(error);
    }
  }

  async getExplorePostsMedia(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { exceptPosts } = req.body;
      const getExplorePostsMedia = this.container.getInstance(
        GetExplorePostsMedia.name
      );
      const posts = await getExplorePostsMedia.execute(exceptPosts || []);

      return res.status(200).json({
        status: 'success',
        data: { posts },
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default PostsHandler;
