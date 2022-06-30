import { NextFunction, Response, Request } from 'express';
import AddPost from '../../../../Applications/use_case/AddPost';
import GetHomePost from '../../../../Applications/use_case/GetHomePosts';
import GetPost from '../../../../Applications/use_case/GetPost';
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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const getPost = this.container.getInstance(GetPost.name);
      const post = await getPost.execute(req.params.id);

      return res.status(200).json({
        status: 'success',
        data: { post },
      });
    } catch (error) {
      return next(error);
    }
  }

  async getHomePosts(req: Request, res: Response): Promise<Response> {
    const getPost = this.container.getInstance(GetHomePost.name);
    const posts = await getPost.execute(req.params.id);

    return res.status(200).json({
      status: 'success',
      data: { posts },
    });
  }
}

export default PostsHandler;
