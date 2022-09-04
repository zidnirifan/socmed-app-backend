import { NextFunction, Response } from 'express';
import GetNotifs from '../../../../Applications/use_case/GetNotifs';
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
}

export default NotifsHandler;
