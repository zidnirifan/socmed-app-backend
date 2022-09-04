import { NextFunction, Response } from 'express';
import GetCountNotifChat from '../../../../Applications/use_case/GetCountNotifChat';
import GetNotifs from '../../../../Applications/use_case/GetNotifs';
import ReadNotif from '../../../../Applications/use_case/ReadNotif';
import { RequestAuth } from '../../middleware/auth';
import BaseHandler from '../BaseHandler';

class NotifsHandler extends BaseHandler {
  async getNotifs(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;

      const getNotifs = this.container.getInstance(GetNotifs.name);
      const notifs = await getNotifs.execute(userId);

      return res.status(200).json({
        status: 'success',
        data: { notifs },
      });
    } catch (error) {
      return next(error);
    }
  }

  async getCountNotifChat(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;

      const getCountNotifChat = this.container.getInstance(
        GetCountNotifChat.name
      );
      const count = await getCountNotifChat.execute(userId);

      return res.status(200).json({
        status: 'success',
        data: count,
      });
    } catch (error) {
      return next(error);
    }
  }

  async readNotif(
    req: RequestAuth,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      /* istanbul ignore next */
      const userId = req.auth?.id;

      const readNotif = this.container.getInstance(ReadNotif.name);
      await readNotif.execute(userId);

      return res.status(200).json({
        status: 'success',
        data: 'notifications readed',
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default NotifsHandler;
