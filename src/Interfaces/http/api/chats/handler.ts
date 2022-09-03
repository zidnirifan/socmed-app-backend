import { NextFunction, Response } from 'express';
import GetConversation from '../../../../Applications/use_case/GetConversation';
import GetLatestChat from '../../../../Applications/use_case/GetLatestChat';
import ReadChat from '../../../../Applications/use_case/ReadChat';
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

      return res.status(200).json({
        status: 'success',
        data: { chats },
      });
    } catch (error) {
      return next(error);
    }
  }

  async getConversation(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const foreignUserId = req.params.userId;

      const getConversation = this.container.getInstance(GetConversation.name);
      const chats = await getConversation.execute(userId, foreignUserId);

      return res.status(200).json({
        status: 'success',
        data: { chats },
      });
    } catch (error) {
      return next(error);
    }
  }

  async readChat(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;
      const foreignUserId = req.params.userId;

      const readChat = this.container.getInstance(ReadChat.name);
      await readChat.execute(userId, foreignUserId);

      return res.status(200).json({
        status: 'success',
        message: 'chat readed',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default ChatsHandler;
