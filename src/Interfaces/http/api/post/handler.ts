import { NextFunction, Response } from 'express';
import AddPost from '../../../../Applications/use_case/AddPost';
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
}

export default PostsHandler;
