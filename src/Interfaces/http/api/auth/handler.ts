import { NextFunction, Request, Response } from 'express';
import LoginUser from '../../../../Applications/use_case/LoginUser';
import BaseHandler from '../BaseHandler';

class AuthHandler extends BaseHandler {
  async postAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const loginUserUseCase = this.container.getInstance(LoginUser.name);
      const tokens = await loginUserUseCase.execute(req.body);

      return res.status(201).json({
        status: 'success',
        message: 'login success',
        data: tokens,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default AuthHandler;
