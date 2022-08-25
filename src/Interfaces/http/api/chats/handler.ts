import { NextFunction, Response } from 'express';
import GetLatestChat from '../../../../Applications/use_case/GetLatestChat';
import { RequestAuth } from '../../middleware/auth';
import BaseHandler from '../BaseHandler';

class ChatsHandler extends BaseHandler {
  async getLatestChats(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;

      const getLatestChats = this.container.getInstance(GetLatestChat.name);
      const chats = await getLatestChats.execute(userId);

      return res.status(201).json({
        status: 'success',
        data: { chats },
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default ChatsHandler;
