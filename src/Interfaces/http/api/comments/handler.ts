import { NextFunction, Response } from 'express';
import AddComment from '../../../../Applications/use_case/AddComment';
import GetPostComments from '../../../../Applications/use_case/GetPostComments';
import ToggleLikeComment from '../../../../Applications/use_case/ToggleLikeComment';
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
      const { postId } = req.params;

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

  async getPostComments(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const { postId } = req.params;

      const getPostComments = this.container.getInstance(GetPostComments.name);
      const comments = await getPostComments.execute(postId, userId);

      return res.status(200).json({
        status: 'success',
        data: { comments },
      });
    } catch (error) {
      return next(error);
    }
  }
  async toggleLikeComment(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const { commentId } = req.params;

      const toggleLikeComment = this.container.getInstance(
        ToggleLikeComment.name
      );
      const likeUnlike = await toggleLikeComment.execute({ userId, commentId });

      return res.status(200).json({
        status: 'success',
        message: `comment ${likeUnlike}`,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default CommentsHandler;
