import { NextFunction, Response } from 'express';
import AddComment from '../../../../Applications/use_case/AddComment';
import { RequestAuth } from '../../middleware/auth';
import BaseHandler from '../BaseHandler';

class CommentsHandler extends BaseHandler {
  async postComment(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const postId = req.params.id;

      const post = {
        ...req.body,
        userId,
        postId,
      };

      const addComment = this.container.getInstance(AddComment.name);
      const commentId = await addComment.execute(post);

      return res.status(201).json({
        status: 'success',
        message: 'comment successfully posted',
        data: { commentId },
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default CommentsHandler;
